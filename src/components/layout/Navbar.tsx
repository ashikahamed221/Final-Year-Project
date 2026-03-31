// import { Button } from "@/components/ui/button";
// import {
//   BookOpenCheck,
//   FileUser,
//   Mail,
//   Sparkles,
//   Map,
//   MessagesSquare,
//   LogOut,
//   LogIn,
//   Moon,
//   Sun,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useAuth } from "@/context/AuthContext";
// import { useTheme } from "@/context/ThemeContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { isDark, toggleTheme } = useTheme();

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
//       <div className="container mx-auto flex h-20 items-center justify-between px-4">
//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-2">
//           <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
//             <Sparkles className="h-5 w-5 text-primary-foreground" />
//           </div>
//           <span className="text-xl font-bold">CareerAI</span>
//         </Link>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-3">
//           {/* THEME TOGGLE */}
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={toggleTheme}
//             className="h-9 w-9 p-0 rounded-lg hover:bg-secondary"
//             title={isDark ? "Switch to light mode" : "Switch to dark mode"}
//           >
//             {isDark ? (
//               <Sun className="h-5 w-5" />
//             ) : (
//               <Moon className="h-5 w-5" />
//             )}
//           </Button>

//           {/* ASSISTANT DROPDOWN */}
//           <DropdownMenu>
//             <DropdownMenuTrigger className="bg-violet-700 text-white px-3 py-2 rounded-xl hover:bg-violet-600 transition">
//               Your Assistant
//             </DropdownMenuTrigger>

//             <DropdownMenuContent className="w-56">
//               <DropdownMenuItem asChild>
//                 <Link to="/interview-prep" className="flex items-center gap-2">
//                   <MessagesSquare className="h-4 w-4" />
//                   Interview Prep
//                 </Link>
//               </DropdownMenuItem>

//               <DropdownMenuItem asChild>
//                 <Link to="/cover-letter" className="flex items-center gap-2">
//                   <Mail className="h-4 w-4" />
//                   Cover Letter
//                 </Link>
//               </DropdownMenuItem>

//               <DropdownMenuItem asChild>
//                 <Link to="/resume-maker" className="flex items-center gap-2">
//                   <FileUser className="h-4 w-4" />
//                   Resume Maker
//                 </Link>
//               </DropdownMenuItem>

//               <DropdownMenuItem asChild>
//                 <Link to="/career-roadmap" className="flex items-center gap-2">
//                   <Map className="h-4 w-4" />
//                   Career Roadmap
//                 </Link>
//               </DropdownMenuItem>

//               <DropdownMenuItem asChild>
//                 <Link to="/quiz-app" className="flex items-center gap-2">
//                   <BookOpenCheck className="h-4 w-4" />
//                   Mock Interview
//                 </Link>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {/* AUTH BUTTONS */}
//           {!user ? (
//             <>
//               <Button variant="ghost" size="sm" asChild>
//                 <Link to="/login" className="flex items-center gap-2">
//               <DropdownMenuItem asChild>
//                 <Link to="/history" className="flex items-center gap-2">
//                   <FileUser className="h-4 w-4" />
//                   Profile
//                 </Link>
//               </DropdownMenuItem>
//                   <LogIn className="h-4 w-4" />
//                   Login
//                 </Link>
//               </Button>

//               <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
//                 <Link to="/register">Register</Link>
//               </Button>
//             </>
//           ) : (
//             <Button
//               className="bg-red-600 hover:bg-red-800 py-2 px-4"
//               size="sm"
//               onClick={() => logout()}
//             >
//               Logout
//             </Button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  LogIn,
  Moon,
  Sun,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { getUserStats } from "@/services/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchStats = async () => {
        try {
          const userStats = await getUserStats();
          setStats(userStats);
        } catch (error) {
          console.log("Could not fetch stats");
        }
      };
      fetchStats();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
          {/* THEME TOGGLE */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-9 w-9 p-0 rounded-lg hover:bg-secondary"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* AUTH SECTION */}
          {!user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/register" className="flex items-center gap-2">
                    Sign Up
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {/* STATS DISPLAY */}
              {/* {stats && (
                <div className="flex items-center gap-4 px-3 py-2 rounded-lg bg-secondary/50">
                  <div className="text-sm">
                    <p className="font-semibold">{stats.testsCompleted || 0}</p>
                    <p className="text-xs text-muted-foreground">Tests</p>
                  </div>
                  <div className="h-4 w-px bg-border"></div>
                  <div className="text-sm">
                    <p className="font-semibold">{stats.averageScore || 0}%</p>
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                  </div>
                </div>
              )} */}

              {/* DASHBOARD DROPDOWN */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;