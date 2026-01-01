import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Map,
  MessageSquare,
  Linkedin,
  FileUser,
  LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const features: Feature[] = [
  {
    icon: FileText,
    title: "Cover Letter Generator",
    description:
      "Create compelling, personalized cover letters tailored to any job posting in seconds.",
    color: "text-feature-blue",
    bgColor: "bg-feature-blue/10",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    description:
      "Get AI-generated career paths and skill development plans based on your goals.",
    color: "text-feature-purple",
    bgColor: "bg-feature-purple/10",
  },
  {
    icon: MessageSquare,
    title: "Interview Prep Bot",
    description:
      "Practice with an AI interviewer that simulates real interview scenarios and gives feedback.",
    color: "text-feature-green",
    bgColor: "bg-feature-green/10",
  },
  {
    icon: Linkedin,
    title: "LinkedIn Optimizer",
    description:
      "Generate professional headline, summary, and content ideas to boost your profile.",
    color: "text-feature-orange",
    bgColor: "bg-feature-orange/10",
  },
  {
    icon: FileUser,
    title: "Resume Maker",
    description:
      "Build ATS-friendly resumes with AI-enhanced descriptions and formatting.",
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
            Everything You Need to{" "}
            <span className="gradient-text">Land Your Dream Job</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Five powerful AI tools designed to accelerate every step of your job
            search and career development.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
