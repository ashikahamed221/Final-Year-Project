import { Card, CardContent } from "@/components/ui/card";
import {
  Map,
  MessageSquare,
  FileUser,
  LucideIcon,
  BookOpenCheck,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  link: string;
}

const features: Feature[] = [
  {
    icon: BookOpenCheck,
    title: "AI Mock Interview",
    description:
      "Practice real-time interview simulations with instant AI feedback and performance scoring.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    link: "/quiz-app",
  },
  {
    icon: Map,
    title: "AI Career Roadmap",
    description:
      "Generate personalized career paths and structured skill development plans tailored to your goals.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    link: "/career-roadmap",
  },
  {
    icon: MessageSquare,
    title: "AI Interview Prep",
    description:
      "Prepare smarter with targeted questions, smart answer suggestions, and confidence boosting insights.",
    color: "text-green-600",
    bgColor: "bg-green-100",
    link: "/interview-prep",
  },
  {
    icon: FileUser,
    title: "Resume Maker",
    description:
      "Create ATS-friendly resumes with AI-enhanced bullet points and professional formatting.",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    link: "/resume-maker",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Land Your Dream Job
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Powerful AI tools designed to accelerate every step of your job
            search and career development.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2">

          {features.map((feature) => (
            <Link key={feature.title} to={feature.link}>

              <Card className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">

                <CardContent className="p-8">

                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor}`}
                  >
                    <feature.icon
                      className={`h-6 w-6 ${feature.color}`}
                    />
                  </div>

                  {/* Title + Arrow */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>

                </CardContent>

                {/* Subtle Hover Gradient Glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                </div>

              </Card>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
