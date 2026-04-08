import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BarChart3, Clock, HelpCircle } from "lucide-react";

const challenges = [
  {
    icon: AlertTriangle,
    title: "No idea what to expect",
    description:
      "Most students don’t know how interview rounds are structured or what topics actually get asked.",
  },
  {
    icon: BarChart3,
    title: "Hard to measure progress",
    description:
      "You solve random questions, but there’s no clear scorecard or trend of how you’re improving over time.",
  },
  {
    icon: Clock,
    title: "Limited time to prepare",
    description:
      "Between classes, projects, and exams, it’s hard to practice consistently and in a focused way.",
  },
  {
    icon: HelpCircle,
    title: "No instant feedback",
    description:
      "You often don’t know why an answer is wrong or how an interviewer expects you to explain it.",
  },
];

const ChallengesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why interview prep feels{" "}
            <span className="bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              difficult
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Before we fix it, let’s be honest about the common problems students
            and freshers face while preparing for placements and interviews.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {challenges.map((item) => (
            <Card key={item.title} className="border-border/60 bg-card/60">
              <CardContent className="p-6 flex gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;

