import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";


import CoverLetterGenerator from "./pages/CoverLetterGenerator";
import ResumeMaker from "./pages/ResumeMaker";
import CareerRoadmap from "./pages/CareerRoadmap";
import InterviewPrep from "./pages/InterviewPrep";
import QuizApp from "./pages/QuizApp";
import Features from "./components/landing/Features";

const queryClient = new QueryClient();

const App = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="dark min-h-screen">
            <Toaster />
            <Sonner />

          <Routes>
            {/* ================= PUBLIC ROUTES ================= */}
            <Route path="/" element={<Index />} />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/quiz-app" replace />}
            />

            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/quiz-app" replace />}
            />
            

            

            {/* ================= PROTECTED ROUTES ================= */}
            <Route
              path="/quiz-app"
              element={user ? <QuizApp/> : <Navigate to="/login" replace />}
            />

            <Route
              path="/cover-letter"
              element={user ? <CoverLetterGenerator /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/resume-maker"
              element={user ? <ResumeMaker /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/career-roadmap"
              element={user ? <CareerRoadmap /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/interview-prep"
              element={user ? <InterviewPrep /> : <Navigate to="/login" replace />}
            />

            <Route
               path="/Aifeatures"
               element={
                <Features/>
               }/>

            {/* ================= FALLBACK ================= */}
            <Route
              path="*"
              element={
                <>
                  {user ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )}
                </>
              }
            />
          </Routes>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
