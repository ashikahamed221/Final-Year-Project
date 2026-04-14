import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Map,
  MessageSquare,
  Linkedin,
  FileUser,
  LucideIcon,
  BookOpenCheck,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const features: Feature[] = [
  {
    icon: MessageSquare,
    title: "AI Interview Preparation Chatbot",
    description:
      "Domain-specific explanations, structured answers, communication guidance, and follow-up questions to master technical and behavioral interviews.",
    color: "text-feature-blue",
    bgColor: "bg-feature-blue/10",
  },
  {
    icon: BookOpenCheck,
    title: "Intelligent Code Evaluation",
    description:
      "AI-powered code analysis with real-time feedback on logic, optimization strategies, and time-complexity with suggestions for improvement.",
    color: "text-feature-purple",
    bgColor: "bg-feature-purple/10",
  },
  {
    icon: Map,
    title: "Dynamic Roadmap Generator",
    description:
      "Personalized learning paths based on your current skills, career goals, and assessment performance for targeted development.",
    color: "text-feature-green",
    bgColor: "bg-feature-green/10",
  },
  
  {
    icon: BarChart3,
    title: "Adaptive Mock Interview System",
    description:
      "AI-generated MCQs, rapid-answer detection, intelligent explanations, and comprehensive performance analytics through detailed dashboards.",
    color: "text-feature-pink",
    bgColor: "bg-feature-pink/10",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Four AI-Driven Modules for{" "}
            <span className="gradient-text">Complete Interview Mastery</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Integrated AI modules designed to enhance technical skills, interview readiness, and career planning through personalized guidance and real-time feedback.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <CardContent className="p-6">
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
               
              </CardContent>

              {/* Hover glow effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div
                  className="absolute -inset-px rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(217 91% 60% / 0.1) 0%, transparent 50%)",
                  }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
