import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Question } from "@/data/mockInterviewData";
import { Clock, Lightbulb, ChevronRight } from "lucide-react";

interface QuestionCardProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    selectedAnswer: number | null;
    onSelectAnswer: (answerIndex: number) => void;
    responseTime: number;
    showExplanation: boolean;
    onToggleExplanation: () => void;
    explanation: string;
    isLoadingExplanation: boolean;
    isAnswered: boolean;
    isCorrect: boolean | null;
}

const QuestionCard = ({
    question,
    questionNumber,
    totalQuestions,
    selectedAnswer,
    onSelectAnswer,
    responseTime,
    showExplanation,
    onToggleExplanation,
    explanation,
    isLoadingExplanation,
    isAnswered,
    isCorrect,
}: QuestionCardProps) => {
    const progressPercentage = (questionNumber / totalQuestions) * 100;

    // Format time display
    const formatTime = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6">
            {/* Progress Header */}
            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                        Question {questionNumber} of {totalQuestions}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono">{formatTime(responseTime)}</span>
                    </div>
                </div>
                <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="p-6 bg-card/50 border-border backdrop-blur-sm">
                {/* Difficulty Badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`
            px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider
            ${question.difficulty === 'easy'
                            ? 'bg-green-500/20 text-green-400'
                            : question.difficulty === 'medium'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                        }
          `}>
                        {question.difficulty}
                    </span>
                    {isAnswered && (
                        <span className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${isCorrect
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }
            `}>
                            {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                        </span>
                    )}
                </div>

                {/* Question Text */}
                <h2 className="text-xl font-semibold text-foreground mb-6 leading-relaxed">
                    {question.question}
                </h2>

                {/* Options */}
                <RadioGroup
                    value={selectedAnswer?.toString() || ""}
                    onValueChange={(value) => !isAnswered && onSelectAnswer(parseInt(value))}
                    className="space-y-3"
                >
                    {question.options.map((option, index) => (
                        <div
                            key={index}
                            className={`
                relative flex items-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                ${isAnswered
                                    ? index === question.correctAnswer
                                        ? 'border-green-500 bg-green-500/10'
                                        : selectedAnswer === index && !isCorrect
                                            ? 'border-red-500 bg-red-500/10'
                                            : 'border-border opacity-60'
                                    : selectedAnswer === index
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border hover:border-primary/50 hover:bg-secondary/30'
                                }
              `}
                        >
                            <RadioGroupItem
                                value={index.toString()}
                                id={`option-${index}`}
                                className="mr-4"
                                disabled={isAnswered}
                            />
                            <Label
                                htmlFor={`option-${index}`}
                                className="flex-1 cursor-pointer text-base"
                            >
                                {option}
                            </Label>
                            {isAnswered && index === question.correctAnswer && (
                                <span className="text-green-400 font-medium text-sm">Correct Answer</span>
                            )}
                        </div>
                    ))}
                </RadioGroup>

                {/* AI Explanation Section */}
                {isAnswered && (
                    <div className="mt-6 pt-6 border-t border-border">
                        <Button
                            variant="outline"
                            onClick={onToggleExplanation}
                            className="w-full justify-between group"
                        >
                            <div className="flex items-center gap-2">
                                <Lightbulb className="w-4 h-4 text-yellow-400" />
                                <span>AI Explanation</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform ${showExplanation ? 'rotate-90' : ''}`} />
                        </Button>

                        {showExplanation && (
                            <div className="mt-4 p-4 rounded-xl bg-secondary/50 border border-border">
                                {isLoadingExplanation ? (
                                    <div className="flex items-center gap-3">
                                        <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
                                        <span className="text-muted-foreground">Generating explanation...</span>
                                    </div>
                                ) : (
                                    <div className="prose prose-sm prose-invert max-w-none">
                                        <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                                            {explanation}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default QuestionCard;
