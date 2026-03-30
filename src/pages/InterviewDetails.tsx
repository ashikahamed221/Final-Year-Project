import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTestDetails } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  BarChart3,
  AlertCircle,
  Lightbulb,
  ArrowLeft,
  Download,
} from "lucide-react";

interface TestDetail {
  id: string;
  domain: string;
  score: number;
  total: number;
  performance: string;
  completionDate?: string;
  resumeSkills?: string[];
  experience?: string;
  questions: {
    id: string;
    question: string;
    selected: string;
    isCorrect: boolean;
    responseTime: number;
    correctAnswer?: string;
    difficulty?: "easy" | "medium" | "hard";
  }[];
  areasToImprove?: string[];
  strengths?: string[];
  recommendations?: string[];
}

export default function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState<TestDetail | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, [id]);

  const loadDetails = async () => {
    try {
      setLoading(true);
      const data = await getTestDetails(id);
      setTest(data);
    } catch (error) {
      console.error("Error loading interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return "from-green-500 to-emerald-500";
    if (percentage >= 60) return "from-blue-500 to-cyan-500";
    if (percentage >= 40) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getPerformanceLabel = (percentage: number) => {
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Good";
    if (percentage >= 40) return "Average";
    return "Needs Improvement";
  };

  const getPerformanceBadgeColor = (label: string) => {
    switch (label) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Average":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm">
            <Zap className="w-12 h-12 text-primary animate-pulse" />
          </div>
          <p className="text-lg text-muted-foreground">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <p className="text-lg text-muted-foreground">Interview details not found</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((test.score / test.total) * 100);
  const performanceLabel = getPerformanceLabel(percentage);
  const correctAnswers = test.score;
  const wrongAnswers = test.total - test.score;
  const avgResponseTime =
    test.questions.reduce((sum, q) => sum + q.responseTime, 0) / test.questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-8 px-4 md:px-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Interview Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              {test.domain} - Resume Based Mock Interview
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Score Card */}
        <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall Score
              </CardTitle>
              <Trophy className="w-5 h-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{percentage}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {test.score} out of {test.total} questions
            </p>
          </CardContent>
        </Card>

        {/* Performance Card */}
        <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Performance
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <Badge className={`${getPerformanceBadgeColor(performanceLabel)} mb-2`}>
              {performanceLabel}
            </Badge>
            <p className="text-xs text-muted-foreground">Based on score and time</p>
          </CardContent>
        </Card>

        {/* Accuracy Card */}
        <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Accuracy
              </CardTitle>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{correctAnswers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {wrongAnswers} incorrect
            </p>
          </CardContent>
        </Card>

        {/* Time Card */}
        <Card className="border-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Response
              </CardTitle>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgResponseTime.toFixed(1)}s</div>
            <p className="text-xs text-muted-foreground mt-1">per question</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Performance Visualization */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Question Accuracy</span>
                  <span className="text-sm text-muted-foreground">{percentage}%</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getPerformanceColor(
                      percentage
                    )} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {correctAnswers}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Correct</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {wrongAnswers}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Incorrect</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {avgResponseTime.toFixed(1)}s
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Avg Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview Details - Resume Based */}
          {test.resumeSkills || test.experience ? (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Resume-Based Interview Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {test.experience && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Experience Level
                    </p>
                    <Badge variant="secondary">{test.experience}</Badge>
                  </div>
                )}
                {test.resumeSkills && test.resumeSkills.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">
                      Skills Assessed
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {test.resumeSkills.map((skill, idx) => (
                        <Badge key={idx} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}

          {/* Questions Review */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Question-by-Question Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {test.questions.map((q, index) => (
                  <div
                    key={q.id}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Question Header */}
                    <button
                      onClick={() =>
                        setExpandedQuestion(
                          expandedQuestion === q.id ? null : q.id
                        )
                      }
                      className="w-full p-4 flex items-start justify-between bg-muted/50 hover:bg-muted transition-colors text-left"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sm">
                            Q{index + 1}.
                          </span>
                          <span className="text-sm line-clamp-2">
                            {q.question}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                        {q.difficulty && (
                          <Badge
                            className={`${getDifficultyColor(
                              q.difficulty
                            )} text-xs`}
                          >
                            {q.difficulty}
                          </Badge>
                        )}
                        {q.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {expandedQuestion === q.id && (
                      <div className="p-4 bg-background border-t space-y-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            Your Answer
                          </p>
                          <div
                            className={`p-3 rounded-lg text-sm ${
                              q.isCorrect
                                ? "bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-red-100 text-red-900 dark:bg-red-900/20 dark:text-red-400"
                            }`}
                          >
                            {q.selected || "No answer provided"}
                          </div>
                        </div>

                        {!q.isCorrect && q.correctAnswer && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">
                              Correct Answer
                            </p>
                            <div className="p-3 rounded-lg text-sm bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-400">
                              {q.correctAnswer}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Response Time: {q.responseTime}s</span>
                          <span>
                            {q.isCorrect ? (
                              <span className="text-green-600 font-medium">
                                ✓ Correct
                              </span>
                            ) : (
                              <span className="text-red-600 font-medium">
                                ✗ Incorrect
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Insights */}
        <div className="space-y-6">
          {/* Strengths */}
          {test.strengths && test.strengths.length > 0 && (
            <Card className="border-0 shadow-sm border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {test.strengths.map((strength, idx) => (
                    <li
                      key={idx}
                      className="text-sm flex gap-2 items-start text-muted-foreground"
                    >
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Areas to Improve */}
          {test.areasToImprove && test.areasToImprove.length > 0 && (
            <Card className="border-0 shadow-sm border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  Areas to Improve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {test.areasToImprove.map((area, idx) => (
                    <li
                      key={idx}
                      className="text-sm flex gap-2 items-start text-muted-foreground"
                    >
                      <span className="text-blue-600 mt-1">→</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {test.recommendations && test.recommendations.length > 0 && (
            <Card className="border-0 shadow-sm border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {test.recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="text-sm flex gap-2 items-start text-muted-foreground"
                    >
                      <span className="text-purple-600 mt-1">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* CTA Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/10 to-purple-500/10">
            <CardHeader>
              <CardTitle className="text-base">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default">
                Take Another Test
              </Button>
              <Button className="w-full" variant="outline">
                Review Materials
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}