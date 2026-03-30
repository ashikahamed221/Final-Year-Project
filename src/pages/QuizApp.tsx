import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

import DomainSelector from "@/components/mockInterview/DomainSelector";
import QuestionCard from "@/components/mockInterview/QuestionCard";
import ConfirmationDialog from "@/components/mockInterview/ConfirmationDialog";
import WarningDialog from "@/components/mockInterview/WarningDialog";
import TestSummary from "@/components/mockInterview/TestSummary";
import ResumeUploadForm from "@/components/mockInterview/ResumeUploadForm";
import ResumeAnalysisFeedback from "@/components/mockInterview/ResumeAnalysisFeedback";

// Data and utilities
import {
    domainQuestions,
    interviewRounds,
    calculatePerformanceLevel,
    MIN_RESPONSE_TIME,
    resumeBasedInterviewParts,
    ResumeAnalysis,
} from "@/data/mockInterviewData";
import { 
    generateQuestionExplanation, 
    generateInterviewQuestions,
    generateProjectBasedQuestions,
    analyzeResume 
} from "@/utils/aiApi";
import { Question, TestResult, TestSummary as TestSummaryType } from "@/data/mockInterviewData";
import { saveTestResult } from "@/api/testApi";

type TestPhase = "resume-upload" | "resume-analysis" | "part-selection" | "idle" | "loading" | "testing" | "completed";

const QuizApp = () => {
    const { toast } = useToast();

    // Auth state
    const { user, token } = useAuth();
    const userId = user?.id;

    // Resume state
    const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [resumeContent, setResumeContent] = useState<string>("");
    const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);

    // Interview state
    const [testPhase, setTestPhase] = useState<TestPhase>("resume-upload");
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
    const [selectedPart, setSelectedPart] = useState<number>(0); // Current interview part (0-3)
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [results, setResults] = useState<TestResult[]>([]);
    const [allPartsResults, setAllPartsResults] = useState<TestResult[][]>([]); // Results for all 4 parts

    // Timer state
    const [responseTime, setResponseTime] = useState(0);
    const questionStartTime = useRef<number>(Date.now());
    const timerInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const [interviewType, setInterviewType] = useState<string>("");
    const [subCategory, setSubCategory] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("");

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

    // Handle resume file upload
    const handleResumeUpload = useCallback(async (file: File) => {
        try {
            setIsAnalyzingResume(true);
            setResumeFile(file);

            // Read file content
            const text = await file.text();
            setResumeContent(text);

            // Analyze resume using AI
            const analysis = await analyzeResume(text);
            setResumeAnalysis(analysis);
            setTestPhase("resume-analysis");

            toast({
                title: "Resume Analyzed ✓",
                description: "Your resume has been analyzed. Review the feedback below.",
            });
        } catch (error: any) {
            console.error("Resume upload error:", error);
            
            // Check for specific error types
            let errorTitle = "Analysis Error";
            let errorDescription = "Failed to analyze resume. Please try again.";
            
            if (error.message?.includes("402") || error.message?.includes("insufficient credits")) {
                errorTitle = "Insufficient Credits";
                errorDescription = "You've run out of API credits. Please upgrade your account to continue.";
            } else if (error.message?.includes("401") || error.message?.includes("Unauthorized")) {
                errorTitle = "API Key Error";
                errorDescription = "There's an issue with the API configuration. Please contact support.";
            } else if (error.message?.includes("429") || error.message?.includes("Rate limited")) {
                errorTitle = "Rate Limited";
                errorDescription = "Too many requests. Please wait a moment and try again.";
            }
            
            toast({
                title: errorTitle,
                description: errorDescription,
                variant: "destructive",
            });
        } finally {
            setIsAnalyzingResume(false);
        }
    }, [toast]);

    // Handle start interview after resume analysis
    const handleStartInterview = useCallback(() => {
        setTestPhase("part-selection");
        setSelectedPart(0);
        setAllPartsResults([[], [], [], []]); // Initialize results for 4 parts
    }, []);

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
                        setTestPhase("part-selection");
                        setSelectedPart(0);
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

    // Save test results when a part is completed
    useEffect(() => {
        if (testPhase !== "completed") return;

        const persistResults = async () => {
            try {
                if (!token || !userId) {
                    throw new Error('User not authenticated');
                }

                // Save results for all 4 parts
                for (let i = 0; i < allPartsResults.length; i++) {
                    const partResults = allPartsResults[i];
                    if (partResults.length === 0) continue;

                    const correctAnswers = partResults.filter((r) => r.isCorrect).length;
                    const wrongAnswers = partResults.filter((r) => !r.isCorrect).length;
                    const totalResponseTime = partResults.reduce((sum, r) => sum + r.responseTime, 0);
                    const avgResponseTime = partResults.length > 0 ? totalResponseTime / partResults.length : 0;
                    const percentage = (correctAnswers / partResults.length) * 100;

                    const partName = resumeBasedInterviewParts[i].title;
                    const summary: TestSummaryType = {
                        domain: partName,
                        totalQuestions: partResults.length,
                        correctAnswers,
                        wrongAnswers,
                        averageResponseTime: avgResponseTime,
                        performanceLevel: calculatePerformanceLevel(percentage),
                    };

                    await saveTestResult(summary, partResults, token!, userId);
                }

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
    }, [testPhase, token, userId, allPartsResults, toast]);

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
    const generateQuestionsForPart = useCallback(async () => {
        const part = resumeBasedInterviewParts[selectedPart];
        setTestPhase("loading");

        try {
            let aiResponse;

            // If it's project-skills part, generate questions based on resume
            if (part.domain === "project-skills" && resumeAnalysis) {
                aiResponse = await generateProjectBasedQuestions(resumeAnalysis);
            } else {
                let domain = part.domain;
                let domainLabel = part.title;
                aiResponse = await generateInterviewQuestions(domain, domainLabel);
            }

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
                    title: `${part.title} - Questions Generated`,
                    description: `${processedQuestions.length} questions ready for this part.`,
                });
            } else {
                throw new Error("No questions generated");
            }
        } catch (error) {
            console.error("Error generating questions:", error);
            setTestPhase("part-selection");
            toast({
                title: "Error",
                description: "Failed to generate questions. Please try again.",
                variant: "destructive",
            });
        }
    }, [selectedPart, resumeAnalysis, toast]);

    // Handle start test for a part
    const handleStartTest = useCallback(() => {
        generateQuestionsForPart();
    }, [generateQuestionsForPart]);

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

    // Move to next question or next part
    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setIsCorrect(null);
            setShowExplanation(false);
            setExplanation("");
        } else {
            // This part is complete, save results and move to next part or finish
            const newAllPartsResults = [...allPartsResults];
            newAllPartsResults[selectedPart] = results;
            setAllPartsResults(newAllPartsResults);

            if (selectedPart < resumeBasedInterviewParts.length - 1) {
                // Move to next part
                setSelectedPart((prev) => prev + 1);
                setTestPhase("part-selection");
                setQuestions([]);
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setResults([]);
                setIsAnswered(false);
                setIsCorrect(null);
                setShowExplanation(false);
                setExplanation("");
                toast({
                    title: `Part ${selectedPart + 1} Complete ✓`,
                    description: `Moving to Part ${selectedPart + 2}: ${resumeBasedInterviewParts[selectedPart + 1].title}`,
                });
            } else {
                // All parts complete
                setTestPhase("completed");
            }
        }
    }, [currentQuestionIndex, questions.length, selectedPart, results, allPartsResults, toast]);

    // Generate AI explanation
    const handleToggleExplanation = useCallback(async () => {
        if (!showExplanation && !explanation && currentQuestion) {
            setShowExplanation(true);
            setIsLoadingExplanation(true);

            try {
                const part = resumeBasedInterviewParts[selectedPart];
                const aiExplanation = await generateQuestionExplanation(
                    currentQuestion.question,
                    currentQuestion.options[currentQuestion.correctAnswer],
                    part.title
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
    }, [showExplanation, explanation, currentQuestion, selectedPart, toast]);

    // Get test summary for completed interview
    const getInterviewSummary = useCallback(() => {
        const summaries = allPartsResults.map((partResults, idx) => {
            if (partResults.length === 0) return null;

            const correctAnswers = partResults.filter((r) => r.isCorrect).length;
            const wrongAnswers = partResults.filter((r) => !r.isCorrect).length;
            const totalResponseTime = partResults.reduce((sum, r) => sum + r.responseTime, 0);
            const avgResponseTime = partResults.length > 0 ? totalResponseTime / partResults.length : 0;
            const percentage = (correctAnswers / partResults.length) * 100;

            return {
                part: resumeBasedInterviewParts[idx].title,
                domain: resumeBasedInterviewParts[idx].domain,
                totalQuestions: partResults.length,
                correctAnswers,
                wrongAnswers,
                averageResponseTime: avgResponseTime,
                performanceLevel: calculatePerformanceLevel(percentage),
                percentage,
            };
        }).filter(Boolean);

        return summaries;
    }, [allPartsResults]);

    // Retry interview (restart from part 1)
    const handleRetry = useCallback(() => {
        setTestPhase("part-selection");
        setSelectedPart(0);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setResults([]);
        setAllPartsResults([[], [], [], []]);
        setIsAnswered(false);
        setIsCorrect(null);
        setShowExplanation(false);
        setExplanation("");
        setTabWarningCount(0);
        setShowEmojiDisplay(false);
    }, []);

    // Start new interview (upload new resume)
    const handleStartNewInterview = useCallback(() => {
        setTestPhase("resume-upload");
        setResumeAnalysis(null);
        setResumeFile(null);
        setResumeContent("");
        setSelectedPart(0);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setResults([]);
        setAllPartsResults([[], [], [], []]);
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
                {/* Phase: Resume Upload */}
                {testPhase === "resume-upload" && (
                    <ResumeUploadForm
                        onUpload={handleResumeUpload}
                        isLoading={isAnalyzingResume}
                    />
                )}

                {/* Phase: Resume Analysis */}
                {testPhase === "resume-analysis" && resumeAnalysis && (
                    <ResumeAnalysisFeedback
                        analysis={resumeAnalysis}
                        onStartInterview={handleStartInterview}
                        isLoading={false}
                    />
                )}

                {/* Phase: Interview Part Selection */}
                {testPhase === "part-selection" && (
                    <div className="space-y-6">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm">
                                <span className="text-4xl">📋</span>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                                {resumeBasedInterviewParts[selectedPart].title}
                            </h1>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                {resumeBasedInterviewParts[selectedPart].description}
                            </p>
                            <div className="text-sm text-muted-foreground">
                                Part {selectedPart + 1} of {resumeBasedInterviewParts.length}
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <Button
                                onClick={handleStartTest}
                                size="lg"
                                className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                            >
                                Start {resumeBasedInterviewParts[selectedPart].title}
                            </Button>
                            {selectedPart > 0 && (
                                <Button
                                    onClick={() => setSelectedPart(selectedPart - 1)}
                                    variant="outline"
                                    size="lg"
                                >
                                    ← Previous Part
                                </Button>
                            )}
                        </div>

                        {/* Progress indicator */}
                        <div className="flex gap-2 justify-center">
                            {resumeBasedInterviewParts.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-2 w-8 rounded-full transition-all ${
                                        idx === selectedPart
                                            ? 'bg-primary'
                                            : idx < selectedPart
                                            ? 'bg-green-500'
                                            : 'bg-secondary'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
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
                            <p className="text-muted-foreground mt-2">AI is generating questions for {resumeBasedInterviewParts[selectedPart].title}...</p>
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
                                        : selectedPart < resumeBasedInterviewParts.length - 1
                                        ? "Next Part →"
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
                            <p className="text-muted-foreground">Here's your comprehensive performance summary</p>
                        </div>

                        {/* Summary for all parts */}
                        <div className="space-y-4">
                            {getInterviewSummary().map((summary, idx) => (
                                <div key={idx} className="p-6 border border-border bg-card rounded-lg space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg">{summary.part}</h3>
                                        <span className="text-2xl text-primary font-bold">{summary.percentage.toFixed(1)}%</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Correct</p>
                                            <p className="font-semibold text-green-600">{summary.correctAnswers}/{summary.totalQuestions}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Wrong</p>
                                            <p className="font-semibold text-red-600">{summary.wrongAnswers}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Avg Time</p>
                                            <p className="font-semibold">{(summary.averageResponseTime / 1000).toFixed(1)}s</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Level</p>
                                            <p className="font-semibold">{summary.performanceLevel}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-center pt-6">
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
                                New Interview (New Resume)
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