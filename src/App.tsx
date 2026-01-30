// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Index from "./pages/Index";
// // import NotFound from "./pages/NotFound";
// // import CoverLetterGenerator from "./pages/CoverLetterGenerator";
// // import ResumeMaker from "./pages/ResumeMaker";
// // import CareerRoadmap from "./pages/CareerRoadmap";
// // import InterviewPrep from "./pages/InterviewPrep";
// // import QuizApp from "./pages/QuizApp";

// // const queryClient = new QueryClient();

// // const App = () => (
// //   <QueryClientProvider client={queryClient}>
// //     <TooltipProvider>
// //       <div className="dark">
// //         <Toaster />
// //         <Sonner />
// //         <BrowserRouter>
// //           <Routes>
// //             <Route path="/" element={<Index />} />
// //             <Route path="/cover-letter" element={<CoverLetterGenerator />} />
// //             <Route path="/resume-maker" element={<ResumeMaker />} />
// //             <Route path="/career-roadmap" element={<CareerRoadmap />} />
// //             <Route path="/interview-prep" element={<InterviewPrep />} />
// //             <Route path="/quiz-app" element={<QuizApp />} />
// //             {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
// //             <Route path="*" element={<NotFound />} />
// //           </Routes>
// //         </BrowserRouter>
// //       </div>
// //     </TooltipProvider>
// //   </QueryClientProvider>
// // );

// // export default App;
// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { Routes, Route } from "react-router-dom";

// // import Index from "./pages/Index";
// // import NotFound from "./pages/NotFound";
// // import CoverLetterGenerator from "./pages/CoverLetterGenerator";
// // import ResumeMaker from "./pages/ResumeMaker";
// // import CareerRoadmap from "./pages/CareerRoadmap";
// // import InterviewPrep from "./pages/InterviewPrep";
// // import QuizApp from "./pages/QuizApp";
// // import { SignedIn, SignedOut } from "@clerk/clerk-react";

// // import Login from "./pages/Login";
// // import Register from "./pages/Register";



// // const queryClient = new QueryClient();

// // const App = () => (
// //   <QueryClientProvider client={queryClient}>
// //     <TooltipProvider>
// //       <div className="dark">
// //         <Toaster />
// //         <Sonner />

// //         {/* ROUTES ONLY — NO BrowserRouter HERE */}
// //         <Routes>
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />
// //           <Route path="/" element={<Index />} />

// //           <Route path="/cover-letter" element={<CoverLetterGenerator />} />
// //           <Route path="/resume-maker" element={<ResumeMaker />} />
// //           <Route path="/career-roadmap" element={<CareerRoadmap />} />
// //           <Route path="/interview-prep" element={<InterviewPrep />} />
// //           <Route path="/quiz-app" element={<QuizApp />} />
// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       </div>
// //     </TooltipProvider>
// //   </QueryClientProvider>
// // );

// // export default App;

// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { SignedIn, SignedOut } from "@clerk/clerk-react";

// // Pages
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import CoverLetterGenerator from "./pages/CoverLetterGenerator";
// import ResumeMaker from "./pages/ResumeMaker";
// import CareerRoadmap from "./pages/CareerRoadmap";
// import InterviewPrep from "./pages/InterviewPrep";
// import QuizApp from "./pages/QuizApp";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// const queryClient = new QueryClient();

// const App = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <div className="dark min-h-screen">
//           <Toaster />
//           <Sonner />

//           <Routes>
//             {/* ================= PUBLIC ROUTES ================= */}
//             <Route path="/" element={<Index />} />
//             <Route path="/cover-letter" element={<CoverLetterGenerator />} />
//             <Route path="/resume-maker" element={<ResumeMaker />} />
//             <Route path="/career-roadmap" element={<CareerRoadmap />} />
//             <Route path="/interview-prep" element={<InterviewPrep />} />

//             {/* ================= AUTH ROUTES ================= */}
//             <Route
//               path="/login"
//               element={
//                 <SignedOut>
//                   <Login />
//                 </SignedOut>
//               }
//             />

//             <Route
//               path="/register"
//               element={
//                 <SignedOut>
//                   <Register />
//                 </SignedOut>
//               }
//             />
            

//             {/* ================= PROTECTED ROUTES ================= */}
//             <Route
//               path="/quiz-app"
//               element={
//                 <SignedIn>
//                   <QuizApp />
//                 </SignedIn>
//               }
//             />
//             <Route 
//              path="/cover-letter"
//              element={
//               <SignedIn>
//                 <CoverLetterGenerator/>
//               </SignedIn>
//              }/>

//             {/* ================= FALLBACK ================= */}
//             <Route
//               path="*"
//               element={
//                 <>
//                   <SignedIn>
//                     <Navigate to="/" replace />
//                   </SignedIn>
//                   <SignedOut>
//                     <Navigate to="/login" replace />
//                   </SignedOut>
//                 </>
//               }
//             />
//           </Routes>
//         </div>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ThemeProvider } from "@/context/ThemeContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";


import CoverLetterGenerator from "./pages/CoverLetterGenerator";
import ResumeMaker from "./pages/ResumeMaker";
import CareerRoadmap from "./pages/CareerRoadmap";
import InterviewPrep from "./pages/InterviewPrep";
import QuizApp from "./pages/QuizApp";

const queryClient = new QueryClient();

const App = () => {
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
              element={
                <SignedOut>
                  <Login />
                </SignedOut>
              }
            />

            <Route
              path="/register"
              element={
                <SignedOut>
                  <Register />
                </SignedOut>
              }
            />
            

            

            {/* ================= PROTECTED ROUTES ================= */}
            <Route
              path="/quiz-app"
              element={
                <SignedIn>
                  <QuizApp/>
                </SignedIn>
              }
            />

            <Route
              path="/cover-letter"
              element={
                <SignedIn>
                  <CoverLetterGenerator />
                </SignedIn>
              }
            />

            <Route
              path="/resume-maker"
              element={
                <SignedIn>
                  <ResumeMaker />
                </SignedIn>
              }
            />

            <Route
              path="/career-roadmap"
              element={
                <SignedIn>
                  <CareerRoadmap />
                </SignedIn>
              }
            />

            <Route
              path="/interview-prep"
              element={
                <SignedIn>
                  <InterviewPrep />
                </SignedIn>
              }
            />

            {/* ================= FALLBACK ================= */}
            <Route
              path="*"
              element={
                <>
                  <SignedIn>
                    <Navigate to="/" replace />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/login" replace />
                  </SignedOut>
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
