import { useState } from "react";
import Editor from "@monaco-editor/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import axios from "axios";
import AIResponsePanel from "@/components/code/AIResponsePanel";

type LanguageOption = "javascript" | "python" | "java";

const starterCode: Record<LanguageOption, string> = {
  javascript: `function solve() {
  // Write your JavaScript solution here
  console.log("Hello from JavaScript");
}

solve();`,
  python: `def solve():
    # Write your Python solution here
    print("Hello from Python")

solve()`,
  java: `public class Main {
    public static void main(String[] args) {
        // Write your Java solution here
        System.out.println("Hello from Java");
    }
}`,
};

const CodingPrepRound = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [language, setLanguage] = useState<LanguageOption>("javascript");
  const [code, setCode] = useState<string>(starterCode.javascript);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewResponse, setReviewResponse] = useState<{
    logicExplanation?: string;
    timeComplexity?: string;
    spaceComplexity?: string;
    mistakes?: string[];
    betterApproach?: string;
    improvedCode?: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleLanguageChange = (nextLanguage: LanguageOption) => {
    setLanguage(nextLanguage);
    setCode(starterCode[nextLanguage]);
  };

  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/code-review`, {
        code,
        language,
      });
      const review = response?.data?.review || {};

      // Map backend review shape into the UI response format.
      setReviewResponse({
        logicExplanation: review.logicExplanation || review.summary || "Not available.",
        timeComplexity: review.timeComplexity || "Not specified",
        spaceComplexity: review.spaceComplexity || "Not specified",
        mistakes: Array.isArray(review.mistakes)
          ? review.mistakes
          : Array.isArray(review.issues)
            ? review.issues
            : [],
        betterApproach:
          review.betterApproach ||
          (Array.isArray(review.suggestedImprovements)
            ? review.suggestedImprovements.join(" ")
            : "Not available."),
        improvedCode: review.improvedCode || "",
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        "Failed to submit code. Please try again.";
      setSubmitError(message);
      setReviewResponse(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-[76px] pb-12">
        <section className="container mx-auto px-4 py-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Coding Prep Round</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Write and submit your code in your preferred language.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="language-select" className="text-sm text-muted-foreground">
                Language
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as LanguageOption)}
                className="h-9 rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
              <Button onClick={handleSubmitCode} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Code"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-border/60">
              <Editor
                height="520px"
                language={language}
                value={code}
                onChange={(value) => setCode(value ?? "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            <AIResponsePanel
              response={reviewResponse}
              isLoading={isSubmitting}
              error={submitError}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CodingPrepRound;

