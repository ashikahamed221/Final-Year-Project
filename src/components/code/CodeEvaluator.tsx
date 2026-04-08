import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Loader,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Copy,
  Download,
  RefreshCw,
} from "lucide-react";
import { evaluateCode, generateCodeSnippets } from "@/utils/aiApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CodeReviewResponse {
  codeQuality: string;
  logicExplanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  bestPractices: Array<{
    category: string;
    suggestion: string;
    severity: string;
  }>;
  mistakes: Array<{
    issue: string;
    impact: string;
    fix: string;
  }>;
  improvedCode: string;
  performance: {
    score: number;
    bottlenecks: string[];
    optimizations: string[];
  };
  readability: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  overallScore: number;
  strengths: string[];
  keyTakeaways: string[];
}

const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "sql", label: "SQL" },
];

const DIFFICULTY_OPTIONS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export default function CodeEvaluator() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState<CodeReviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSnippets, setShowSnippets] = useState(false);
  const [snippetLanguage, setSnippetLanguage] = useState("javascript");
  const [snippetDifficulty, setSnippetDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [snippetTopic, setSnippetTopic] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  const handleEvaluate = async () => {
    if (!code.trim()) {
      setError("Please enter some code to evaluate");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await evaluateCode(code, language, description);
      setReview(response);
    } catch (err) {
      setError("Failed to evaluate code. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (review?.improvedCode) {
      navigator.clipboard.writeText(review.improvedCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleDownloadReport = () => {
    if (!review) return;

    const report = `
CODE EVALUATION REPORT
${new Date().toLocaleDateString()}

LANGUAGE: ${language}
OVERALL SCORE: ${review.overallScore}/10

=== CODE QUALITY ===
Quality: ${review.codeQuality}
Logic: ${review.logicExplanation}

=== COMPLEXITY ANALYSIS ===
Time Complexity: ${review.timeComplexity}
Space Complexity: ${review.spaceComplexity}

=== PERFORMANCE ===
Score: ${review.performance.score}/10
Bottlenecks: ${review.performance.bottlenecks.join(", ") || "None identified"}
Optimizations: ${review.performance.optimizations.join(", ") || "None needed"}

=== READABILITY ===
Score: ${review.readability.score}/10
Issues: ${review.readability.issues.join(", ") || "None"}
Suggestions: ${review.readability.suggestions.join(", ") || "None"}

=== STRENGTHS ===
${review.strengths.map((s) => `• ${s}`).join("\n")}

=== KEY TAKEAWAYS ===
${review.keyTakeaways.map((k) => `• ${k}`).join("\n")}

=== BEST PRACTICES ===
${review.bestPractices
  .map((bp) => `• [${bp.severity.toUpperCase()}] ${bp.category}: ${bp.suggestion}`)
  .join("\n") || "No issues found"}

=== ISSUES FOUND ===
${review.mistakes.map((m) => `• ${m.issue}\n  Impact: ${m.impact}\n  Fix: ${m.fix}`).join("\n\n") || "No critical issues"}

=== IMPROVED CODE ===
${review.improvedCode}
    `;

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(report));
    element.setAttribute("download", `code-review-${Date.now()}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "average":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-blue-600";
    if (score >= 4) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="w-full space-y-6">
      {/* Code Input Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            AI Code Evaluator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Programming Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Problem Description (Optional)
              </label>
              <input
                type="text"
                placeholder="What does this code solve?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Paste Your Code Here
            </label>
            <Textarea
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm h-64"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleEvaluate}
              disabled={isLoading || !code.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Evaluating...
                </>
              ) : (
                <>
                  <Code className="w-4 h-4 mr-2" />
                  Evaluate Code
                </>
              )}
            </Button>

            <Button
              onClick={() => setShowSnippets(!showSnippets)}
              variant="outline"
            >
              <TrendingUp className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Code Snippets Section */}
      {showSnippets && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Learning Code Snippets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Language
                </label>
                <Select value={snippetLanguage} onValueChange={setSnippetLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Difficulty
                </label>
                <Select value={snippetDifficulty} onValueChange={(val) => setSnippetDifficulty(val as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g., Array sorting"
                  value={snippetTopic}
                  onChange={(e) => setSnippetTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <Button
              onClick={async () => {
                if (!snippetTopic.trim()) {
                  alert("Please enter a topic");
                  return;
                }
                // This would trigger the snippet generation
                await generateCodeSnippets(snippetTopic, snippetLanguage, snippetDifficulty);
              }}
              className="w-full"
            >
              Generate Snippets
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Review Results */}
      {review && (
        <div className="space-y-6">
          {/* Overall Score Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-purple-500/10">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(review.overallScore)}`}>
                    {review.overallScore}/10
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Overall Score</p>
                </div>

                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(review.performance.score)}`}>
                    {review.performance.score}/10
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Performance</p>
                </div>

                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(review.readability.score)}`}>
                    {review.readability.score}/10
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Readability</p>
                </div>

                <div className="text-center">
                  <Badge className={getQualityColor(review.codeQuality)}>
                    {review.codeQuality}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">Quality</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logic & Complexity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base">Logic Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.logicExplanation}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base">Complexity Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Time Complexity
                  </p>
                  <p className="text-sm font-mono mt-1">
                    {review.timeComplexity}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Space Complexity
                  </p>
                  <p className="text-sm font-mono mt-1">
                    {review.spaceComplexity}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strengths */}
          {review.strengths.length > 0 && (
            <Card className="border-0 shadow-lg border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {review.strengths.map((strength, idx) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Best Practices */}
          {review.bestPractices.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base">Best Practices & Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {review.bestPractices.map((bp, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-border/60 bg-muted/30">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-sm">{bp.category}</p>
                        <Badge
                          variant={
                            bp.severity === "critical"
                              ? "destructive"
                              : bp.severity === "major"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {bp.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {bp.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mistakes */}
          {review.mistakes.length > 0 && (
            <Card className="border-0 shadow-lg border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Issues Found
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {review.mistakes.map((mistake, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20">
                    <p className="font-semibold text-sm mb-2">{mistake.issue}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Impact:</span> {mistake.impact}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Fix:</span> {mistake.fix}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Improved Code */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Improved Code</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyCode}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    {copiedCode ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                <code>{review.improvedCode}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          {review.keyTakeaways.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base">Key Takeaways</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {review.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <span className="text-primary font-bold">{idx + 1}.</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleDownloadReport}
              className="flex-1"
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button
              onClick={() => {
                setCode("");
                setReview(null);
              }}
              className="flex-1"
              variant="outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Evaluate Different Code
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
