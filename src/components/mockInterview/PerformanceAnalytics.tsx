import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
} from "lucide-react";
import React from "react";

interface PerformanceAnalytic {
  category: string;
  current: number;
  average: number;
  max: number;
  unit: string;
}

interface PerformanceAnalyticsProps {
  currentScore: number;
  averageScore?: number;
  maxScore?: number;
  speedMetrics?: {
    average: number;
    fastest: number;
    slowest: number;
  };
  accuracyByCategory?: {
    category: string;
    correct: number;
    total: number;
    percentage: number;
  }[];
  improvementTips?: string[];
}

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({
  currentScore,
  averageScore = 65,
  maxScore = 100,
  speedMetrics,
  accuracyByCategory = [],
  improvementTips = [],
}) => {
  const scorePercentage = (currentScore / maxScore) * 100;
  const performanceVsAverage =
    averageScore > 0 ? currentScore - averageScore : 0;
  const performanceGain = performanceVsAverage >= 0 ? "positive" : "negative";

  const getScoreBadgeColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (percentage >= 60)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (percentage >= 40)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  const scoreLevel =
    scorePercentage >= 80
      ? "Excellent"
      : scorePercentage >= 60
        ? "Good"
        : scorePercentage >= 40
          ? "Average"
          : "Needs Improvement";

  return (
    <div className="space-y-4">
      {/* Score Comparison Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Score Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Score */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Your Score</span>
              <span className="font-bold text-2xl">{currentScore}</span>
            </div>
            <Progress value={scorePercentage} className="h-3" />
            <div className="mt-2 flex gap-2">
              <Badge className={`${getScoreBadgeColor(scorePercentage)} text-xs`}>
                {scoreLevel}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {scorePercentage.toFixed(0)}%
              </Badge>
            </div>
          </div>

          {/* Comparison to Average */}
          {averageScore > 0 && (
            <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  vs. Average Score
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{averageScore}</span>
                </p>
              </div>
              <div
                className={`flex items-center gap-1 ${
                  performanceGain === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <TrendingUp
                  className={`w-4 h-4 ${
                    performanceGain === "negative" ? "rotate-180" : ""
                  }`}
                />
                <span className="font-semibold">
                  {Math.abs(performanceVsAverage).toFixed(0)} pts
                </span>
              </div>
            </div>
          )}

          {/* Max Score Reference */}
          {maxScore > 0 && (
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Max Score: {maxScore}</p>
              <p>Score Gap: {(maxScore - currentScore).toFixed(0)} points</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Speed Metrics */}
      {speedMetrics && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Response Speed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">Average</p>
                <p className="font-semibold">{speedMetrics.average.toFixed(1)}s</p>
              </div>
              <div className="p-2 rounded-lg bg-green-100/50 dark:bg-green-900/20 text-center">
                <p className="text-xs text-muted-foreground">Fastest</p>
                <p className="font-semibold text-green-600">
                  {speedMetrics.fastest.toFixed(1)}s
                </p>
              </div>
              <div className="p-2 rounded-lg bg-red-100/50 dark:bg-red-900/20 text-center">
                <p className="text-xs text-muted-foreground">Slowest</p>
                <p className="font-semibold text-red-600">
                  {speedMetrics.slowest.toFixed(1)}s
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Accuracy by Category */}
      {accuracyByCategory.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {accuracyByCategory.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{cat.category}</span>
                  <span className="text-sm font-semibold">
                    {cat.correct}/{cat.total}
                  </span>
                </div>
                <div className="w-full flex gap-2">
                  <Progress value={cat.percentage} className="h-2 flex-1" />
                  <span className="text-sm font-medium text-muted-foreground min-w-fit">
                    {cat.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Improvement Tips */}
      {improvementTips.length > 0 && (
        <Card className="border-0 shadow-sm border-l-4 border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/10">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-purple-600" />
              Actionable Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {improvementTips.slice(0, 3).map((tip, idx) => (
                <li
                  key={idx}
                  className="text-sm flex gap-2 items-start text-muted-foreground"
                >
                  <span className="text-purple-600 mt-0.5 flex-shrink-0">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PerformanceAnalytics;
