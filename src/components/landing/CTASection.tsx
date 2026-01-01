import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm md:p-16">
          {/* Background gradient */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, hsl(217 91% 60% / 0.1) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Join thousands of job seekers using AI to land their dream roles
              faster.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="group gap-2 bg-primary px-8 hover:bg-primary/90"
                asChild
              >
                <Link to="/auth?mode=signup">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
