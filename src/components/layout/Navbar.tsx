import { Button } from "@/components/ui/button";
import { BookOpenCheck, FileUser, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Map } from "lucide-react";
import { MessagesSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">CareerAI</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          
          
           
        </div>

        <div className="flex items-center gap-3">

          <DropdownMenu>
            <DropdownMenuTrigger className="bg-violet-700 px-1 rounded ml-2 py-1 md:px-4 md:py-2 md:rounded-xl">Your Assistant</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="p-2 gap-2">
                <MessagesSquare className="h-4 w-4" />
                <Link to='/interview-prep'>Interview Prep</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 gap-2 ">
                <Mail className="h-4 w-4" />
                <Link to='/cover-letter'>Cover Letter</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 gap-2">
                <FileUser className="h-4 w-4" />
                <Link to='/resume-maker'>Resume maker</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 gap-2">
                <Map className="h-4 w-4" />
                <Link to='/career-roadmap'>Career Roadmap</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 gap-2">
                <BookOpenCheck className="h-4 w-4" />
                <Link to='/quiz-app'>Mock Interview</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth">Log in</Link>
          </Button>
          {/* <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/auth?mode=signup">Get Started</Link>
          </Button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
