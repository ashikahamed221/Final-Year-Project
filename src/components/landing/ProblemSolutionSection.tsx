import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Target } from "lucide-react";

const ProblemSolutionSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10 md:mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The Challenge{" "}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              We Address
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Traditional preparation platforms lack personalized guidance, structured learning paths, and real-time feedback—limiting effective skill development.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-stretch">
          {/* Problem side */}
          <Card className="border-border/60 bg-card/60 h-full">
            <CardContent className="p-6 md:p-7 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500">
                <Target className="h-3.5 w-3.5" />
                The Challenge
              </div>
              <h3 className="text-lg font-semibold">Gap in Career Preparation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Most platforms lack personalized guidance adapted to individual skill levels and career aspirations, offer limited structured learning paths, and provide minimal real-time feedback.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                <li>• No personalization based on individual profile</li>
                <li>• Absence of structured learning pathways</li>
                <li>• Limited real-time, actionable feedback</li>
                <li>• Reduced engagement and learning efficiency</li>
              </ul>
            </CardContent>
          </Card>

          {/* Solution side */}
          <Card className="border-primary/50 bg-primary/5 h-full">
            <CardContent className="p-6 md:p-7 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                <Brain className="h-3.5 w-3.5" />
                Our Integrated Solution
              </div>
              <h3 className="text-lg font-semibold">
                AI-Powered Intelligent Assessment
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A unified platform integrating four independent AI-driven modules that work together to provide personalized guidance, structured learning, and comprehensive feedback.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                <li className="flex gap-2">
                  <span className="mt-0.5 text-primary">•</span>
                  Domain-specific explanations and adaptive questioning
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-primary">•</span>
                  Real-time code analysis with optimization guidance
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-primary">•</span>
                  Personalized learning roadmaps and performance analytics
                </li>
              </ul>
              <div className="pt-1">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                  Improved learning efficiency and interview readiness
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

