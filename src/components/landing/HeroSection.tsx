import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-16 ">
      {/* 
      {/* Background glow effect */}

       <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px", // size of each grid box
        }}
      />

      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl animate-glow-pulse"
        style={{
          background:
            "linear-gradient(#666 1px, transparent 1px), linear-gradient(90deg, #666 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      /> 

      




      <div className="container relative z-10 mx-auto px-4 mt-20 text-center">
        <div
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 text-sm opacity-0 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">
            AI-Powered Career Success
          </span>
        </div>

        <h1
          className="mx-auto max-w-4xl text-4xl font-bold tracking-tight opacity-0 animate-fade-in-up sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.2s" }}
        >
          Your AI Interview{" "}
          <span className="gradient-text">Coach & Assistant</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-lg text-center text-muted-foreground opacity-0 animate-fade-in-up sm:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          Generate stunning cover letters, build professional resumes, ace
          interviews, and optimize your LinkedIn profile — all powered by
          advanced AI.
        </p>

        <div
          className="mt-10 flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-in-up sm:flex-row"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            size="lg"
            className="group gap-2 bg-primary px-8 hover:bg-primary/90"
            asChild
          >
            <Link to="/auth?mode=signup">
              Start Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 bg-white text-black hover:bg-secondary/50"
            asChild
          >
            <Link to="/Aifeatures">View Features</Link>
          </Button>
        </div>

       
      </div>
    </section>
  );
};

export default HeroSection;
