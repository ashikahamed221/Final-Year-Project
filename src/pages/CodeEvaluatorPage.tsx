import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, BookOpen, Zap } from "lucide-react";
import CodeEvaluator from "@/components/code/CodeEvaluator";

export default function CodeEvaluatorPage() {
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-background to-background/50 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 mb-4">
            <Code className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            AI Code Evaluator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get comprehensive feedback on your code with AI-powered analysis. Improve code quality,
            performance, and readability with actionable insights.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Multi-Language Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Support for JavaScript, Python, Java, C++, Go, Rust, SQL, and more.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Performance Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Identify bottlenecks and get optimization suggestions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Learning Resources</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate code snippets and learn best practices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Evaluator Component */}
        <CodeEvaluator />

        {/* Guide Section */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-border/60 p-6 bg-card/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-semibold">Paste Your Code</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Select your programming language and paste the code you want evaluated.
              </p>
            </div>

            <div className="rounded-lg border border-border/60 p-6 bg-card/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-semibold">AI Analysis</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your code for quality, performance, and best practices.
              </p>
            </div>

            <div className="rounded-lg border border-border/60 p-6 bg-card/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-semibold">Get Feedback</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive detailed insights and improved code suggestions.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices Section */}
        <div className="mt-12 rounded-lg border border-border/60 p-8 bg-card/50">
          <h2 className="text-2xl font-bold mb-6">What We Evaluate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Code Quality
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Logic correctness</li>
                <li>✓ Best practices adherence</li>
                <li>✓ Code patterns and conventions</li>
                <li>✓ Potential bugs and issues</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Performance
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Time complexity analysis</li>
                <li>✓ Space complexity analysis</li>
                <li>✓ Performance bottlenecks</li>
                <li>✓ Optimization suggestions</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Readability
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Naming conventions</li>
                <li>✓ Code organization</li>
                <li>✓ Comments and documentation</li>
                <li>✓ Function/method clarity</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Security & Best Practices
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Error handling</li>
                <li>✓ Input validation</li>
                <li>✓ Security vulnerabilities</li>
                <li>✓ Industry best practices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
