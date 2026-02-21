import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProfilePage from "./pages/ProfilePage";
import FeaturesPage from "./pages/FeaturesPage";
import EditProjectPage from "./pages/EditProjectPage";
import AnalyticsPage from "./pages/AnalyticsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/projects/:id/edit" element={<EditProjectPage />} />
          <Route path="/projects/:id/analytics" element={<AnalyticsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
