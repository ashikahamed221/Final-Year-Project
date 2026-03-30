import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, Award } from "lucide-react";
import React from "react";

interface InterviewRecord {
  id: string;
  date: string;
  domain: string;
  score: number;
  total: number;
  performanceLevel: "Excellent" | "Good" | "Average" | "Needs Improvement";
  responseTime: number;
}

interface InterviewProgressProps {
  currentRecord: InterviewRecord;
  previousRecords?: InterviewRecord[];
  showTrend?: boolean;
}

export const InterviewProgress: React.FC<InterviewProgressProps> = ({
  currentRecord,
  previousRecords = [],
  showTrend = true,
}) => {
  const currentPercentage = Math.round(
    (currentRecord.score / currentRecord.total) * 100
  );

  const previousPercentage =
    previousRecords.length > 0
      ? Math.round(
          (previousRecords[0].score / previousRecords[0].total) * 100
        )
      : 0;

  const scoreTrend =
    previousRecords.length > 0 ? currentPercentage - previousPercentage : 0;
  const trendDirection = scoreTrend >= 0 ? "up" : "down";

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateAverageScore = () => {
    if (previousRecords.length === 0) return 0;
    const allScores = [currentPercentage, ...previousRecords.map(r => (r.score / r.total) * 100)];
    return Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);
  };

  const averageScore = calculateAverageScore();

  return (
    <div className="space-y-5">
      {/* Current Interview Summary */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/10 to-purple-600/10">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Latest Interview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Score and Performance */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {currentRecord.domain}
              </span>
              <span className="text-sm font-medium">
                {formatDate(currentRecord.date)}
              </span>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <div className="text-3xl font-bold">{currentPercentage}%</div>
                <p className="text-xs text-muted-foreground">
                  {currentRecord.score}/{currentRecord.total} correct
                </p>
              </div>
              <Badge
                className={`${getPerformanceBadgeColor(
                  currentRecord.performanceLevel
                )}`}
              >
                {currentRecord.performanceLevel}
              </Badge>
            </div>

            <Progress value={currentPercentage} className="h-2" />
          </div>

          {/* Trend Indicator */}
          {showTrend && previousRecords.length > 0 && (
            <div className="p-3 rounded-lg bg-background/50 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Previous Score: {previousPercentage}%
              </div>
              <div
                className={`flex items-center gap-1 font-semibold ${
                  trendDirection === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                <TrendingUp
                  className={`w-4 h-4 ${
                    trendDirection === "down" ? "rotate-180" : ""
                  }`}
                />
                <span>{Math.abs(scoreTrend).toFixed(0)}%</span>
              </div>
            </div>
          )}

          {/* Response Time */}
          <div className="text-xs text-muted-foreground p-2 rounded-lg bg-muted/50">
            Avg Response Time: <span className="font-semibold">{currentRecord.responseTime.toFixed(1)}s</span>
          </div>
        </CardContent>
      </Card>

      {/* Progress Statistics */}
      {previousRecords.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Average Score */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">
                  Average Score
                </span>
                <span className="text-sm font-semibold">{averageScore}%</span>
              </div>
              <Progress value={averageScore} className="h-2" />
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">Tests Taken</p>
                <p className="text-xl font-bold">
                  {previousRecords.length + 1}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">Best Score</p>
                <p className="text-xl font-bold text-green-600">
                  {Math.max(
                    currentPercentage,
                    ...previousRecords.map(
                      (r) => (r.score / r.total) * 100
                    )
                  ).toFixed(0)}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previous Interviews */}
      {previousRecords.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {previousRecords.slice(0, 5).map((record, idx) => {
                const percentage = Math.round(
                  (record.score / record.total) * 100
                );
                const scoreDiff =
                  idx === 0
                    ? currentPercentage - percentage
                    : percentage -
                      Math.round(
                        (previousRecords[idx - 1].score /
                          previousRecords[idx - 1].total) *
                          100
                      );

                return (
                  <div
                    key={record.id}
                    className="p-3 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{record.domain}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(record.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{percentage}%</p>
                        {scoreDiff !== 0 && (
                          <p
                            className={`text-xs ${
                              scoreDiff > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {scoreDiff > 0 ? "+" : ""}
                            {scoreDiff}%
                          </p>
                        )}
                      </div>
                      <Badge
                        className={`${getPerformanceBadgeColor(
                          record.performanceLevel
                        )} text-xs`}
                      >
                        {record.performanceLevel.split(" ")[0]}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Previous Records Message */}
      {previousRecords.length === 0 && (
        <Card className="border-0 shadow-sm border-dashed bg-muted/50">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              This is your first interview
            </p>
            <p className="text-xs text-muted-foreground">
              Take more interviews to track your progress
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterviewProgress;
