// import { Button } from "@/components/ui/button";
// import { BookOpenCheck, FileUser, Mail, Sparkles } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Map } from "lucide-react";
// import { MessagesSquare } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";



// const Navbar = () => {
//   const { signOut } = useClerk();
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
//       <div className="container mx-auto flex h-20 items-center justify-between px-4">
//         <Link to="/" className="flex items-center gap-2">
//           <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
//             <Sparkles className="h-5 w-5 text-primary-foreground" />
//           </div>
//           <span className="text-xl font-bold">CareerAI</span>
//         </Link>

//         <div className="hidden items-center gap-6 md:flex">



//         </div>

//         <div className="flex items-center gap-3">

//           <DropdownMenu>
//             <DropdownMenuTrigger className="bg-violet-700 px-1 rounded ml-2 py-1 md:px-4 md:py-2 md:rounded-xl">Your Assistant</DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem className="p-2 gap-2">
//                 <MessagesSquare className="h-4 w-4" />
//                 <Link to='/interview-prep'>Interview Prep</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem className="p-2 gap-2 ">
//                 <Mail className="h-4 w-4" />
//                 <Link to='/cover-letter'>Cover Letter</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem className="p-2 gap-2">
//                 <FileUser className="h-4 w-4" />
//                 <Link to='/resume-maker'>Resume maker</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem className="p-2 gap-2">
//                 <Map className="h-4 w-4" />
//                 <Link to='/career-roadmap'>Career Roadmap</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem className="p-2 gap-2">
//                 <BookOpenCheck className="h-4 w-4" />
//                 <Link to='/quiz-app'>Mock Interview</Link>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Button variant="ghost" size="sm" asChild>
//             <Link to="/auth">Log in</Link>
//           </Button>
//           {/* <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
//             <Link to="/auth?mode=signup">Get Started</Link>
//           </Button> */}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Button } from "@/components/ui/button";
import {
  BookOpenCheck,
  FileUser,
  Mail,
  Sparkles,
  Map,
  MessagesSquare,
  LogOut,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";

const Navbar = () => {
  const { signOut } = useClerk();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">CareerAI</span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* ASSISTANT DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-violet-700 text-white px-3 py-2 rounded-xl hover:bg-violet-600 transition">
              Your Assistant
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/interview-prep" className="flex items-center gap-2">
                  <MessagesSquare className="h-4 w-4" />
                  Interview Prep
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link to="/cover-letter" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Cover Letter
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link to="/resume-maker" className="flex items-center gap-2">
                  <FileUser className="h-4 w-4" />
                  Resume Maker
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link to="/career-roadmap" className="flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  Career Roadmap
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link to="/quiz-app" className="flex items-center gap-2">
                  <BookOpenCheck className="h-4 w-4" />
                  Mock Interview
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* AUTH BUTTONS */}
          <SignedOut>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>

            <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => signOut(() => (window.location.href = "/login"))}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button> */}
            <Button
              // variant="outline"
              className="bg-red-600 hover:bg-red-800 py-2 px-4"
              size="sm"
              onClick={() => signOut({ redirectUrl: "/login" })}
            >
              Logout
            </Button>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
