import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Clock, ListChecks, PlayCircle } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const steps: Step[] = [
  {
    title: "Choose your interview round",
    description:
      "Pick Aptitude, Tech General, Domain-specific Tech (Frontend, Backend, Data, AI/ML, DevOps), or HR—just like real company rounds.",
    icon: ListChecks,
  },
  {
    title: "Engage with AI Modules",
    description:
      "Interact with the interview chatbot for explanations, submit code for intelligent evaluation, and participate in adaptive mock interviews.",
    icon: PlayCircle,
  },
  {
    title: "Receive Real-Time Feedback",
    description:
      "Get instant analysis on your code, detailed explanations for complex concepts, and immediate performance scoring on assessments.",
    icon: Clock,
  },
  {
    title: "Review results and learn",
    description:
      "See your score, speed, warnings, and explanations so you know exactly what to fix before the real interview.",
    icon: CheckCircle2,
  },
];

const HowItWorksSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How Our System{" "}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            A comprehensive workflow combining AI-driven analysis, real-time feedback, and personalized learning to maximize your interview readiness and career growth.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-x-auto pb-4"
        >
          <div className="hidden md:block absolute left-12 right-12 top-1/2 -translate-y-1/2 h-px bg-border/60" />

          <div className="flex gap-4 md:gap-6 min-w-full md:min-w-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const delayClass = visible
                ? `transition-all duration-500 ease-out delay-[${index * 80}ms]`
                : "";
              return (
                <Card
                  key={step.title}
                  className={`relative flex-1 min-w-[230px] md:min-w-0 border-border/60 bg-card/60 ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  } ${delayClass}`}
                >
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-[-14px] -translate-y-1/2">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <CardContent className="p-5 md:p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {index + 1}
                      </div>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

