import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TestSummary as TestSummaryType, TestResult } from "@/data/mockInterviewData";
import { Trophy, Target, RotateCcw, Home, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface TestSummaryProps {
    summary: TestSummaryType;
    results: TestResult[];
    onRetry: () => void;
}

const TestSummary = ({ summary, results, onRetry }: TestSummaryProps) => {
    const percentage = Math.round((summary.correctAnswers / summary.totalQuestions) * 100);

    const getPerformanceColor = () => {
        switch (summary.performanceLevel) {
            case 'Excellent':
                return 'from-green-500 to-emerald-500';
            case 'Good':
                return 'from-blue-500 to-cyan-500';
            case 'Average':
                return 'from-yellow-500 to-orange-500';
            default:
                return 'from-red-500 to-pink-500';
        }
    };

    const getPerformanceEmoji = () => {
        switch (summary.performanceLevel) {
            case 'Excellent':
                return '🏆';
            case 'Good':
                return '👍';
            case 'Average':
                return '📈';
            default:
                return '💪';
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20">
                    <Trophy className="w-12 h-12 text-yellow-400" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">Test Completed!</h1>
                <p className="text-muted-foreground">
                    Here's your performance summary for {summary.domain}
                </p>
            </div>

            {/* Score Card */}
            <Card className="p-8 bg-card/50 border-border overflow-hidden relative">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getPerformanceColor()} opacity-5`} />

                <div className="relative z-10 space-y-6">
                    {/* Score Circle */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className={`
                w-32 h-32 rounded-full flex items-center justify-center
                bg-gradient-to-br ${getPerformanceColor()} p-1
              `}>
                                <div className="w-full h-full rounded-full bg-card flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-foreground">{percentage}%</span>
                                    <span className="text-xs text-muted-foreground">Score</span>
                                </div>
                            </div>
                            <div className="absolute -top-2 -right-2 text-3xl">
                                {getPerformanceEmoji()}
                            </div>
                        </div>
                    </div>

                    {/* Performance Level */}
                    <div className="text-center">
                        <span className={`
              inline-block px-6 py-2 rounded-full text-lg font-semibold
              bg-gradient-to-r ${getPerformanceColor()} text-white
            `}>
                            {summary.performanceLevel}
                        </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Target className="w-4 h-4 text-muted-foreground" />
                                <span className="text-2xl font-bold text-foreground">{summary.totalQuestions}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Total Questions</span>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="text-2xl font-bold text-green-400">{summary.correctAnswers}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Correct</span>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <XCircle className="w-4 h-4 text-red-500" />
                                <span className="text-2xl font-bold text-red-400">{summary.wrongAnswers}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Wrong</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Performance</span>
                            <span className="text-foreground font-medium">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                    </div>

                    {/* Average Response Time */}
                    <div className="text-center pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                            Average Response Time: <span className="text-foreground font-medium">
                                {Math.round(summary.averageResponseTime / 1000)}s
                            </span>
                        </p>
                    </div>
                </div>
            </Card>

            {/* Question Breakdown */}
            <Card className="p-6 bg-card/50 border-border">
                <h3 className="text-lg font-semibold mb-4">Question Breakdown</h3>
                <div className="space-y-2">
                    {results.map((result, index) => (
                        <div
                            key={result.questionId}
                            className={`
                flex items-center justify-between p-3 rounded-lg border
                ${result.isCorrect
                                    ? 'border-green-500/30 bg-green-500/5'
                                    : 'border-red-500/30 bg-red-500/5'
                                }
              `}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-muted-foreground">Q{index + 1}</span>
                                {result.isCorrect ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-500" />
                                )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {Math.round(result.responseTime / 1000)}s
                            </span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={onRetry}
                    className="gap-2"
                >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                </Button>
                <Link to="/">
                    <Button
                        size="lg"
                        className="gap-2 w-full bg-gradient-to-r from-primary to-purple-500"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default TestSummary;
