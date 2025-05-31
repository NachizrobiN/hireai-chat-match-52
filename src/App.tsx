
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CandidateSignup from "./pages/candidate/Signup";
import RecruiterSignup from "./pages/recruiter/Signup";
import ProfileSetup from "./pages/candidate/ProfileSetup";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/candidate/signup" element={<CandidateSignup />} />
          <Route path="/recruiter/signup" element={<RecruiterSignup />} />
          <Route path="/candidate/profile-setup" element={<ProfileSetup />} />
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
