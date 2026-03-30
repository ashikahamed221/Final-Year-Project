import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, ThumbsUp, AlertCircle } from "lucide-react";
import React from "react";

interface InterviewStatsProps {
  correctAnswers: number;
  totalQuestions: number;
  averageResponseTime: number;
  performanceLevel:
    | "Excellent"
    | "Good"
    | "Average"
    | "Needs Improvement";
  difficultyBreakdown?: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  };
}

export const InterviewStats: React.FC<InterviewStatsProps> = ({
  correctAnswers,
  totalQuestions,
  averageResponseTime,
  performanceLevel,
  difficultyBreakdown,
}) => {
  const percentage = Math.round(
    (correctAnswers / totalQuestions) * 100
  );

  const getPerformanceColor = (level: string) => {
    switch (level) {
      case "Excellent":
        return "from-green-500 to-emerald-500";
      case "Good":
        return "from-blue-500 to-cyan-500";
      case "Average":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-red-500 to-pink-500";
    }
  };

  const getPerformanceBadgeColor = (label: string) => {
    switch (label) {
      case "Excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Average":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    }
  };

  const getDifficultyPercentage = (
    correct: number,
    total: number
  ) => {
    return total === 0 ? 0 : Math.round((correct / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Main Performance Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center space-y-3">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              {percentage}%
            </div>
            <Badge
              className={`${getPerformanceBadgeColor(
                performanceLevel
              )} text-sm px-4 py-1`}
            >
              {performanceLevel}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {correctAnswers} out of {totalQuestions} correct
            </p>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Accuracy</span>
              <span className="text-muted-foreground">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-3" />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <div className="text-sm text-muted-foreground">Correct</div>
              <div className="text-2xl font-bold text-green-600">
                {correctAnswers}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <div className="text-sm text-muted-foreground">Incorrect</div>
              <div className="text-2xl font-bold text-red-600">
                {totalQuestions - correctAnswers}
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Avg Response Time
            </span>
            <span className="font-semibold">{averageResponseTime.toFixed(1)}s</span>
          </div>
        </CardContent>
      </Card>

      {/* Difficulty Breakdown */}
      {difficultyBreakdown && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance by Difficulty
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Easy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100/50 text-green-700 border-green-300">
                    Easy
                  </Badge>
                </span>
                <span className="text-sm font-semibold">
                  {difficultyBreakdown.easy.correct}/{difficultyBreakdown.easy.total}
                </span>
              </div>
              <Progress
                value={getDifficultyPercentage(
                  difficultyBreakdown.easy.correct,
                  difficultyBreakdown.easy.total
                )}
                className="h-2"
              />
            </div>

            {/* Medium */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-100/50 text-yellow-700 border-yellow-300">
                    Medium
                  </Badge>
                </span>
                <span className="text-sm font-semibold">
                  {difficultyBreakdown.medium.correct}/{difficultyBreakdown.medium.total}
                </span>
              </div>
              <Progress
                value={getDifficultyPercentage(
                  difficultyBreakdown.medium.correct,
                  difficultyBreakdown.medium.total
                )}
                className="h-2"
              />
            </div>

            {/* Hard */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-100/50 text-red-700 border-red-300">
                    Hard
                  </Badge>
                </span>
                <span className="text-sm font-semibold">
                  {difficultyBreakdown.hard.correct}/{difficultyBreakdown.hard.total}
                </span>
              </div>
              <Progress
                value={getDifficultyPercentage(
                  difficultyBreakdown.hard.correct,
                  difficultyBreakdown.hard.total
                )}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insight Card */}
      <Card className="border-0 shadow-sm border-l-4 border-l-yellow-500 bg-yellow-50/30 dark:bg-yellow-900/10">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            Key Insight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {percentage >= 80
              ? "Excellent performance! You have a strong grasp of the concepts. Keep practicing to maintain your skills."
              : percentage >= 60
                ? "Good job! Focus on the areas where you struggled to improve further."
                : percentage >= 40
                  ? "You're on the right track. Dedicate more time to practice and review failed questions."
                  : "Consider revisiting the fundamentals and practice more questions."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewStats;
