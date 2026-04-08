import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-14">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">CareerAI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Practice smarter with AI-powered mock interviews, instant feedback, and clear explanations.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Explore</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/quiz-app" className="text-muted-foreground hover:text-foreground transition-colors">
                AI Mock Interview
              </Link>
              <Link to="/interview-prep" className="text-muted-foreground hover:text-foreground transition-colors">
                Interview Prep
              </Link>
              <Link to="/career-roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                Career Roadmap
              </Link>
              <Link to="/resume-maker" className="text-muted-foreground hover:text-foreground transition-colors">
                Resume Maker
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Account</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-muted-foreground hover:text-foreground transition-colors">
                Sign up
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/history" className="text-muted-foreground hover:text-foreground transition-colors">
                Profile History
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CareerAI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built to help you improve every round. Practice. Review. Repeat.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
