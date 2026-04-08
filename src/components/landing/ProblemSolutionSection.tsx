import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Target } from "lucide-react";

const ProblemSolutionSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10 md:mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The problem we{" "}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              actually solve
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Most platforms throw thousands of questions at you. What you really
            need is focused, round-wise practice with feedback that tells you
            exactly where you stand.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-stretch">
          {/* Problem side */}
          <Card className="border-border/60 bg-card/60 h-full">
            <CardContent className="p-6 md:p-7 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500">
                <Target className="h-3.5 w-3.5" />
                The problem
              </div>
              <h3 className="text-lg font-semibold">Scattered, unfocused practice</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You jump between random Aptitude, Coding, HR and Tech questions
                from different sources, hoping it matches what companies will ask.
                There&apos;s no structure and almost no feedback.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                <li>• No clear mapping to real interview rounds</li>
                <li>• Very little explanation on why an answer is correct</li>
                <li>• Hard to know if you&apos;re actually interview-ready</li>
              </ul>
            </CardContent>
          </Card>

          {/* Solution side */}
          <Card className="border-primary/50 bg-primary/5 h-full">
            <CardContent className="p-6 md:p-7 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                <Brain className="h-3.5 w-3.5" />
                Our AI-based solution
              </div>
              <h3 className="text-lg font-semibold">
                Round-based, AI-generated interview simulations
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You pick the round and domain. The platform creates a focused test,
                measures your behavior, and explains each question—so you learn
                faster with every attempt.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                <li className="flex gap-2">
                  <span className="mt-0.5 text-primary">•</span>
                  AI questions aligned to Aptitude, Tech, Domain, and HR rounds
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-primary">•</span>
                  Instant scoring and explanations instead of guesswork
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-primary">•</span>
                  History and summaries to track your overall progress
                </li>
              </ul>
              <div className="pt-1">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                  Designed to feel like real interview rounds
                  <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;

