import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

// Components
import DomainSelector from "@/components/mockInterview/DomainSelector";
import QuestionCard from "@/components/mockInterview/QuestionCard";
import ConfirmationDialog from "@/components/mockInterview/ConfirmationDialog";
import WarningDialog from "@/components/mockInterview/WarningDialog";
import TestSummary from "@/components/mockInterview/TestSummary";

// Data and utilities
import {
    domainQuestions,
    calculatePerformanceLevel,
    MIN_RESPONSE_TIME,
} from "@/data/mockInterviewData";
import { generateQuestionExplanation, generateInterviewQuestions } from "@/utils/aiApi";
import { Question, TestResult, TestSummary as TestSummaryType } from "@/data/mockInterviewData";
import { saveTestResult } from "@/api/testApi";


type TestPhase = "idle" | "loading" | "testing" | "completed";

const QuizApp = () => {
    const { toast } = useToast();

    // Auth state
    const { user, token } = useAuth();
    const userId = user?.id;

    // Test state
    const [testPhase, setTestPhase] = useState<TestPhase>("idle");
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [results, setResults] = useState<TestResult[]>([]);

    // Timer state
    const [responseTime, setResponseTime] = useState(0);
    const questionStartTime = useRef<number>(Date.now());
    const timerInterval = useRef<NodeJS.Timeout | null>(null);

    // Dialog states
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [tabWarningCount, setTabWarningCount] = useState(0);

    // AI Explanation state
    const [showExplanation, setShowExplanation] = useState(false);
    const [explanation, setExplanation] = useState("");
    const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);

    // Answer validation state
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [randomClickCount, setRandomClickCount] = useState(0);

    // Emoji display state
    const [showEmojiDisplay, setShowEmojiDisplay] = useState(false);
    const [displayEmoji, setDisplayEmoji] = useState("");

    // Current question helper
    const currentQuestion = questions[currentQuestionIndex];

    // Get user from auth client on mount


    useEffect(() => {
        if (testPhase === "testing") {
            // Prevent page refresh/close
            const handleBeforeUnload = (e: BeforeUnloadEvent) => {
                e.preventDefault();
                e.returnValue = "You have an ongoing test. Are you sure you want to leave?";
                return e.returnValue;
            };

            // Block browser back button
            window.history.pushState(null, "", window.location.href);
            const handlePopState = () => {
                window.history.pushState(null, "", window.location.href);
                toast({
                    title: "Navigation Blocked",
                    description: "Please complete the test before leaving.",
                    variant: "destructive",
                });
            };

            // Handle tab visibility change
            const handleVisibilityChange = () => {
                if (document.hidden) {
                    // User switched to another tab
                    const newWarningCount = tabWarningCount + 1;
                    setTabWarningCount(newWarningCount);

                    if (newWarningCount >= 2) {
                        // Third attempt to switch tabs - restart test
                        toast({
                            title: "Test Restarted ⚠️",
                            description: "You switched tabs multiple times. The test has been restarted.",
                            variant: "destructive",
                        });
                        setTestPhase("idle");
                        setSelectedDomain(null);
                        setQuestions([]);
                        setCurrentQuestionIndex(0);
                        setSelectedAnswer(null);
                        setResults([]);
                        setIsAnswered(false);
                        setIsCorrect(null);
                        setShowExplanation(false);
                        setExplanation("");
                        setRandomClickCount(0);
                        setTabWarningCount(0);
                    } else {
                        // Show warning
                        toast({
                            title: "Tab Switch Warning ⚠️",
                            description: `Stay focused! Switching tabs again will restart your test. (${newWarningCount}/2)`,
                            variant: "destructive",
                        });
                    }
                }
            };

            window.addEventListener("beforeunload", handleBeforeUnload);
            window.addEventListener("popstate", handlePopState);
            document.addEventListener("visibilitychange", handleVisibilityChange);

            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
                window.removeEventListener("popstate", handlePopState);
                document.removeEventListener("visibilitychange", handleVisibilityChange);
            };
        }

    }, [testPhase, toast, tabWarningCount]);

    // Save test results when completed
    useEffect(() => {
        if (testPhase !== "completed") return;

        const persistResult = async () => {
            try {
                if (!token || !userId) {
                    throw new Error('User not authenticated');
                }

                // Calculate test summary inline
                const correctAnswers = results.filter((r) => r.isCorrect).length;
                const wrongAnswers = results.filter((r) => !r.isCorrect).length;
                const totalResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0);
                const avgResponseTime = results.length > 0 ? totalResponseTime / results.length : 0;
                const percentage = (correctAnswers / results.length) * 100;

                const summary: TestSummaryType = {
                    domain:
                        domainQuestions.find((d) => d.domain === selectedDomain)?.label || selectedDomain || "",
                    totalQuestions: results.length,
                    correctAnswers,
                    wrongAnswers,
                    averageResponseTime: avgResponseTime,
                    performanceLevel: calculatePerformanceLevel(percentage),
                };

                await saveTestResult(
                    summary,
                    results,
                    token!,
                    userId
                );

                toast({
                    title: "Test Saved ✅",
                    description: "Your interview test result was saved successfully.",
                });
            } catch (error) {
                console.error("Save failed:", error);
                toast({
                    title: "Save Failed",
                    description: "Could not save your test result.",
                    variant: "destructive",
                });
            }
        };

        persistResult();
    }, [testPhase, token, userId, toast, results, selectedDomain]);

    // Timer logic
    useEffect(() => {
        if (testPhase === "testing" && !isAnswered) {
            questionStartTime.current = Date.now();
            setResponseTime(0);

            timerInterval.current = setInterval(() => {
                setResponseTime(Date.now() - questionStartTime.current);
            }, 100);

            return () => {
                if (timerInterval.current) {
                    clearInterval(timerInterval.current);
                }
            };
        }
    }, [testPhase, toast]);

    // Start test handler
    const handleStartTest = useCallback(async () => {
        if (!selectedDomain) return;

        setTestPhase("loading");

        try {
            const domainLabel =
                domainQuestions.find((d) => d.domain === selectedDomain)?.label || selectedDomain;

            // Generate questions using AI
            const aiResponse = await generateInterviewQuestions(selectedDomain, domainLabel || "");

            if (aiResponse.questions && aiResponse.questions.length > 0) {
                // Add difficulty field if missing and ensure proper structure
                const processedQuestions: Question[] = aiResponse.questions.map((q: any, index: number) => ({
                    id: q.id || `q${index + 1}`,
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    keywords: q.keywords || [],
                    difficulty: q.difficulty || 'medium'
                }));

                setQuestions(processedQuestions);
                setCurrentQuestionIndex(0);
                setResults([]);
                setTestPhase("testing");
                setIsAnswered(false);
                setIsCorrect(null);
                setShowExplanation(false);
                setExplanation("");

                toast({
                    title: "Test Started",
                    description: `Good luck with your ${domainLabel} interview test! ${processedQuestions.length} questions generated.`,
                });
            } else {
                throw new Error("No questions generated");
            }
        } catch (error) {
            console.error("Error generating questions:", error);
            setTestPhase("idle");
            toast({
                title: "Error",
                description: "Failed to generate questions. Please try again.",
                variant: "destructive",
            });
        }
    }, [selectedDomain, toast]);

    // Answer selection with behavior-aware validation
    const handleSelectAnswer = useCallback(
        (answerIndex: number) => {
            if (isAnswered) return;

            setSelectedAnswer(answerIndex);
            const currentResponseTime = Date.now() - questionStartTime.current;
            
            // Determine minimum response time based on question difficulty
            const minTime = currentQuestion.difficulty === 'easy' ? 2000 : currentQuestion.difficulty === 'medium' ? 3000 : 5000;
            
            // Check for quick/random answer behavior
            if (currentResponseTime < minTime) {
                // Check keyword relevance in the selected option
                const selectedOption = currentQuestion.options[answerIndex].toLowerCase();
                const hasKeywordMatch = currentQuestion.keywords.some((keyword) =>
                    selectedOption.includes(keyword.toLowerCase())
                );

                if (!hasKeywordMatch) {
                    const newRandomClickCount = randomClickCount + 1;
                    setRandomClickCount(newRandomClickCount);

                    if (newRandomClickCount >= 3) {
                        // Third random click - restart test
                        toast({
                            title: "Test Restarted 🔄",
                            description: "You clicked randomly 3 times. The test has been restarted.",
                            variant: "destructive",
                        });
                        // Reset test state
                        setTestPhase("idle");
                        setSelectedDomain(null);
                        setQuestions([]);
                        setCurrentQuestionIndex(0);
                        setSelectedAnswer(null);
                        setResults([]);
                        setIsAnswered(false);
                        setIsCorrect(null);
                        setShowExplanation(false);
                        setExplanation("");
                        setRandomClickCount(0);
                        setTabWarningCount(0);
                        return;
                    } else {
                        // Show warning
                        setShowWarning(true);
                        return;
                    }
                }
            }

            // Show confirmation dialog
            setShowConfirmation(true);
        },
        [currentQuestion, isAnswered, randomClickCount, toast]
    );

    // Confirm answer handler
    const handleConfirmAnswer = useCallback(() => {
        if (selectedAnswer === null || !currentQuestion) return;

        setShowConfirmation(false);

        // Stop timer
        if (timerInterval.current) {
            clearInterval(timerInterval.current);
        }

        const finalResponseTime = Date.now() - questionStartTime.current;
        const correct = selectedAnswer === currentQuestion.correctAnswer;

        // Display emoji feedback
        const emoji = correct 
            ? ['🎉', '✅', '👏', '🌟', '💯'][Math.floor(Math.random() * 5)]
            : ['❌', '😕', '📚', '💡', '🔄'][Math.floor(Math.random() * 5)];
        
        setDisplayEmoji(emoji);
        setShowEmojiDisplay(true);
        setTimeout(() => setShowEmojiDisplay(false), 1500);

        // Record result
        const result: TestResult = {
            questionId: currentQuestion.id,
            selectedAnswer,
            isCorrect: correct,
            responseTime: finalResponseTime,
            wasWarned: showWarning,
        };

        setResults((prev) => [...prev, result]);
        setIsAnswered(true);
        setIsCorrect(correct);

        toast({
            title: correct ? "Correct! ✓" : "Incorrect ✗",
            description: correct
                ? "Great job! That's the right answer."
                : `The correct answer was: ${currentQuestion.options[currentQuestion.correctAnswer]}`,
            variant: correct ? "default" : "destructive",
        });
    }, [selectedAnswer, currentQuestion, showWarning, toast]);

    // Move to next question
    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setIsCorrect(null);
            setShowExplanation(false);
            setExplanation("");
        } else {
            // Test completed
            setTestPhase("completed");
        }
    }, [currentQuestionIndex, questions.length]);

    // Generate AI explanation
    const handleToggleExplanation = useCallback(async () => {
        if (!showExplanation && !explanation && currentQuestion) {
            setShowExplanation(true);
            setIsLoadingExplanation(true);

            try {
                const domainLabel =
                    domainQuestions.find((d) => d.domain === selectedDomain)?.label || selectedDomain;
                const aiExplanation = await generateQuestionExplanation(
                    currentQuestion.question,
                    currentQuestion.options[currentQuestion.correctAnswer],
                    domainLabel || ""
                );
                setExplanation(aiExplanation);
            } catch (error) {
                setExplanation(
                    "Unable to generate explanation at this time. The correct answer is based on industry-standard knowledge and best practices in this domain."
                );
                toast({
                    title: "Explanation Error",
                    description: "Could not generate AI explanation. Showing default response.",
                    variant: "destructive",
                });
            } finally {
                setIsLoadingExplanation(false);
            }
        } else {
            setShowExplanation(!showExplanation);
        }
    }, [showExplanation, explanation, currentQuestion, selectedDomain, toast]);

    // Calculate test summary
    const getTestSummary = useCallback((): TestSummaryType => {
        const correctAnswers = results.filter((r) => r.isCorrect).length;
        const wrongAnswers = results.filter((r) => !r.isCorrect).length;
        const totalResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0);
        const avgResponseTime = results.length > 0 ? totalResponseTime / results.length : 0;
        const percentage = (correctAnswers / results.length) * 100;

        return {
            domain:
                domainQuestions.find((d) => d.domain === selectedDomain)?.label || selectedDomain || "",
            totalQuestions: results.length,
            correctAnswers,
            wrongAnswers,
            averageResponseTime: avgResponseTime,
            performanceLevel: calculatePerformanceLevel(percentage),
        };
    }, [results, selectedDomain]);

    // Retry test handler
    const handleRetry = useCallback(() => {
        setTestPhase("idle");
        setSelectedDomain(null);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setResults([]);
        setIsAnswered(false);
        setIsCorrect(null);
        setShowExplanation(false);
        setExplanation("");
        setRandomClickCount(0);
        setTabWarningCount(0);
        setShowEmojiDisplay(false);
    }, []);

    // Warning dismiss handler
    const handleDismissWarning = useCallback(() => {
        setShowWarning(false);
        setSelectedAnswer(null);
    }, []);

    // Cancel confirmation handler
    const handleCancelConfirmation = useCallback(() => {
        setShowConfirmation(false);
        setSelectedAnswer(null);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* Header - only show when not in test */}
            {testPhase !== "testing" && (
                <div className="p-5">
                    <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                </div>
            )}

            <div className="container max-w-4xl mx-auto px-4 py-8">
                {/* Phase: Idle - Domain Selection */}
                {testPhase === "idle" && (
                    <DomainSelector
                        domains={domainQuestions}
                        selectedDomain={selectedDomain}
                        onSelectDomain={setSelectedDomain}
                        onStartTest={handleStartTest}
                    />
                )}

                {/* Phase: Loading - Generating Questions */}
                {testPhase === "loading" && (
                    <div className="flex flex-col items-center justify-center gap-6 py-12">
                        <div className="animate-spin">
                            <svg className="w-12 h-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold">Generating Questions</h3>
                            <p className="text-muted-foreground mt-2">AI is preparing 30 questions for your interview test...</p>
                        </div>
                    </div>
                )}

                {/* Phase: Testing - Question Display */}
                {testPhase === "testing" && currentQuestion && (
                    <div className="space-y-6">
                        {/* Emoji Display Overlay */}
                        {showEmojiDisplay && (
                            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
                                <div className="text-9xl animate-bounce">
                                    {displayEmoji}
                                </div>
                            </div>
                        )}

                        <QuestionCard
                            question={currentQuestion}
                            questionNumber={currentQuestionIndex + 1}
                            totalQuestions={questions.length}
                            selectedAnswer={selectedAnswer}
                            onSelectAnswer={handleSelectAnswer}
                            responseTime={responseTime}
                            showExplanation={showExplanation}
                            onToggleExplanation={handleToggleExplanation}
                            explanation={explanation}
                            isLoadingExplanation={isLoadingExplanation}
                            isAnswered={isAnswered}
                            isCorrect={isCorrect}
                        />

                        {/* Next/Finish Button */}
                        {isAnswered && (
                            <div className="flex justify-end">
                                <Button
                                    size="lg"
                                    onClick={handleNextQuestion}
                                    className="px-8 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                                >
                                    {currentQuestionIndex < questions.length - 1 ? "Next Question →" : "View Results"}
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Phase: Completed - Test Summary */}
                {testPhase === "completed" && (
                    <TestSummary
                        summary={getTestSummary()}
                        results={results}
                        onRetry={handleRetry}
                    />
                )}
            </div>

            {/* Dialogs */}
            <ConfirmationDialog
                isOpen={showConfirmation}
                onConfirm={handleConfirmAnswer}
                onCancel={handleCancelConfirmation}
            />

            <WarningDialog
                isOpen={showWarning}
                onDismiss={handleDismissWarning}
                randomClickCount={randomClickCount}
            />
        </div>
    );
};

export default QuizApp;