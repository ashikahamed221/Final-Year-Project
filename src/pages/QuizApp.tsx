import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

import QuestionCard from "@/components/mockInterview/QuestionCard";
import ConfirmationDialog from "@/components/mockInterview/ConfirmationDialog";
import WarningDialog from "@/components/mockInterview/WarningDialog";
import InterviewSetupForm from "@/components/mockInterview/InterviewSetupForm";

// Data and utilities
import {
    calculatePerformanceLevel,
} from "@/data/mockInterviewData";
import { 
    generateQuestionExplanation, 
    generateInterviewQuestions
} from "@/utils/aiApi";

import { Question, TestResult, TestSummary as TestSummaryType } from "@/data/mockInterviewData";
import { saveTestResult } from "@/api/testApi";

type TestPhase = "interview-setup" | "idle" | "loading" | "testing" | "completed";

const QuizApp = () => {
    const { toast } = useToast();

    // Auth state
    const { user, token } = useAuth();
    const userId = user?.id;

    // Interview setup state
    const [jobRole, setJobRole] = useState<string>("");
    const [skills, setSkills] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");
    const [selectedInterviewType, setSelectedInterviewType] = useState<string>("");
    const [isSetupLoading, setIsSetupLoading] = useState(false);

    // Interview state
    const [testPhase, setTestPhase] = useState<TestPhase>("interview-setup");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [results, setResults] = useState<TestResult[]>([]);

    // Timer state
    const [responseTime, setResponseTime] = useState(0);
    const questionStartTime = useRef<number>(Date.now());
    const timerInterval = useRef<ReturnType<typeof setInterval> | null>(null);


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

    // Emoji display state
    const [showEmojiDisplay, setShowEmojiDisplay] = useState(false);
    const [displayEmoji, setDisplayEmoji] = useState("");

    // Current question helper
    const currentQuestion = questions[currentQuestionIndex];

    // Handle interview setup form submission
    const handleInterviewSetup = useCallback(async (data: {
        jobRole: string;
        skills: string;
        jobDescription: string;
        interviewType: string;
    }) => {
        try {
            setIsSetupLoading(true);
            setJobRole(data.jobRole);
            setSkills(data.skills);
            setJobDescription(data.jobDescription);
            setSelectedInterviewType(data.interviewType);

            // Generate questions based on interview type
            setTestPhase("loading");
            const aiResponse = await generateInterviewQuestions(data.interviewType, data.interviewType);

            if (aiResponse.questions && aiResponse.questions.length > 0) {
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
                    title: "Interview Started 🚀",
                    description: `${processedQuestions.length} questions ready for ${data.interviewType} round.`,
                });
            } else {
                throw new Error("No questions generated");
            }
        } catch (error: any) {
            console.error("Interview setup error:", error);
            setTestPhase("interview-setup");
            
            let errorDescription = "Failed to start interview. Please try again.";
            if (error.message?.includes("insufficient credits")) {
                errorDescription = "You've run out of API credits. Please upgrade your account.";
            }
            
            toast({
                title: "Error",
                description: errorDescription,
                variant: "destructive",
            });
        } finally {
            setIsSetupLoading(false);
        }
    }, [toast]);

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
                        toast({
                            title: "Test Restarted ⚠️",
                            description: "You switched tabs multiple times. The test has been restarted.",
                            variant: "destructive",
                        });
                        setTestPhase("interview-setup");
                        setQuestions([]);
                        setCurrentQuestionIndex(0);
                        setSelectedAnswer(null);
                        setResults([]);
                        setIsAnswered(false);
                        setIsCorrect(null);
                        setShowExplanation(false);
                        setExplanation("");
        
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

    // Save test results when interview is completed
    useEffect(() => {
        if (testPhase !== "completed") return;

        const persistResults = async () => {
            try {
                if (!token || !userId) {
                    throw new Error('User not authenticated');
                }

                if (results.length === 0) return;

                const correctAnswers = results.filter((r) => r.isCorrect).length;
                const wrongAnswers = results.filter((r) => !r.isCorrect).length;
                const totalResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0);
                const avgResponseTime = results.length > 0 ? totalResponseTime / results.length : 0;
                const percentage = (correctAnswers / results.length) * 100;

                const summary: TestSummaryType = {
                    domain: selectedInterviewType,
                    totalQuestions: results.length,
                    correctAnswers,
                    wrongAnswers,
                    averageResponseTime: avgResponseTime,
                    performanceLevel: calculatePerformanceLevel(percentage),
                };

                await saveTestResult(summary, results, token!, userId);

                toast({
                    title: "Results Saved ✅",
                    description: "Your interview results have been saved successfully.",
                });
            } catch (error) {
                console.error("Save failed:", error);
                toast({
                    title: "Save Failed",
                    description: "Could not save your results.",
                    variant: "destructive",
                });
            }
        };

        persistResults();
    }, [testPhase, token, userId, results, selectedInterviewType, toast]);

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
    }, [testPhase, isAnswered]);

    // Generate questions for the current interview part
    // Removed - questions are generated during setup

    // Answer selection
    const handleSelectAnswer = useCallback(
        (answerIndex: number) => {
            if (isAnswered) return;

            setSelectedAnswer(answerIndex);
            setShowConfirmation(true);
        },
        [isAnswered]
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

    // Move to next question or complete interview
    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setIsCorrect(null);
            setShowExplanation(false);
            setExplanation("");
        } else {
            // Interview complete
            setTestPhase("completed");
        }
    }, [currentQuestionIndex, questions.length]);

    // Generate AI explanation
    const handleToggleExplanation = useCallback(async () => {
        if (!showExplanation && !explanation && currentQuestion) {
            setShowExplanation(true);
            setIsLoadingExplanation(true);

            try {
                const aiExplanation = await generateQuestionExplanation(
                    currentQuestion.question,
                    currentQuestion.options[currentQuestion.correctAnswer],
                    selectedInterviewType
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
    }, [showExplanation, explanation, currentQuestion, selectedInterviewType, toast]);

    // Get interview summary
    const getInterviewSummary = useCallback(() => {
        if (results.length === 0) return null;

        const correctAnswers = results.filter((r) => r.isCorrect).length;
        const wrongAnswers = results.filter((r) => !r.isCorrect).length;
        const totalResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0);
        const avgResponseTime = results.length > 0 ? totalResponseTime / results.length : 0;
        const percentage = (correctAnswers / results.length) * 100;

        return {
            interviewType: selectedInterviewType,
            totalQuestions: results.length,
            correctAnswers,
            wrongAnswers,
            averageResponseTime: avgResponseTime,
            performanceLevel: calculatePerformanceLevel(percentage),
            percentage,
        };
    }, [results, selectedInterviewType]);

    // Retry interview (restart with same settings)
    const handleRetry = useCallback(() => {
        setTestPhase("testing");
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setResults([]);
        setIsAnswered(false);
        setIsCorrect(null);
        setShowExplanation(false);
        setExplanation("");
        setTabWarningCount(0);
        setShowEmojiDisplay(false);
    }, []);

    // Start new interview (go back to setup)
    const handleStartNewInterview = useCallback(() => {
        setTestPhase("interview-setup");
        setJobRole("");
        setSkills("");
        setJobDescription("");
        setSelectedInterviewType("");
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setResults([]);
        setIsAnswered(false);
        setIsCorrect(null);
        setShowExplanation(false);
        setExplanation("");
        setTabWarningCount(0);
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
            {/* Header */}
            {testPhase !== "testing" && (
                <div className="p-5">
                    <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                </div>
            )}

            <div className="container max-w-4xl mx-auto px-4 py-8">
                {/* Phase: Interview Setup */}
                {testPhase === "interview-setup" && (
                    <InterviewSetupForm
                        onStart={handleInterviewSetup}
                        isLoading={isSetupLoading}
                    />
                )}

                {/* Phase: Loading */}
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
                            <p className="text-muted-foreground mt-2">AI is generating questions for your {selectedInterviewType} interview...</p>
                        </div>
                    </div>
                )}

                {/* Phase: Testing */}
                {testPhase === "testing" && currentQuestion && (
                    <div className="space-y-6">
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

                        {isAnswered && (
                            <div className="flex justify-end">
                                <Button
                                    size="lg"
                                    onClick={handleNextQuestion}
                                    className="px-8 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                                >
                                    {currentQuestionIndex < questions.length - 1 
                                        ? "Next Question →" 
                                        : "View Results"
                                    }
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Phase: Completed */}
                {testPhase === "completed" && (
                    <div className="space-y-6">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                                <span className="text-4xl">🎉</span>
                            </div>
                            <h1 className="text-3xl font-bold">Interview Complete!</h1>
                            <p className="text-muted-foreground">Here's your performance summary</p>
                        </div>

                        {/* Summary Card */}
                        {getInterviewSummary() && (
                            <div className="p-6 border border-border bg-card rounded-lg space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg capitalize">{getInterviewSummary()!.interviewType} Interview</h3>
                                        <p className="text-sm text-muted-foreground">Job Role: {jobRole}</p>
                                    </div>
                                    <span className="text-4xl text-primary font-bold">{getInterviewSummary()!.percentage.toFixed(1)}%</span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="p-3 rounded-lg bg-secondary/50">
                                        <p className="text-sm text-muted-foreground">Total Questions</p>
                                        <p className="font-semibold text-lg">{getInterviewSummary()!.totalQuestions}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                                        <p className="text-sm text-muted-foreground">Correct</p>
                                        <p className="font-semibold text-lg text-green-600">{getInterviewSummary()!.correctAnswers}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                                        <p className="text-sm text-muted-foreground">Wrong</p>
                                        <p className="font-semibold text-lg text-red-600">{getInterviewSummary()!.wrongAnswers}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-secondary/50">
                                        <p className="text-sm text-muted-foreground">Avg Time</p>
                                        <p className="font-semibold text-lg">{(getInterviewSummary()!.averageResponseTime / 1000).toFixed(1)}s</p>
                                    </div>
                                </div>
                                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                                    <p className="text-sm text-muted-foreground">Performance Level</p>
                                    <p className="font-semibold text-lg text-primary">{getInterviewSummary()!.performanceLevel}</p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button
                                onClick={handleRetry}
                                variant="outline"
                                size="lg"
                            >
                                Retry Interview
                            </Button>
                            <Button
                                onClick={handleStartNewInterview}
                                size="lg"
                                className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                            >
                                New Interview
                            </Button>
                            <Link to="/">
                                <Button variant="outline" size="lg">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
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
                
            />
        </div>
    );
};

export default QuizApp;