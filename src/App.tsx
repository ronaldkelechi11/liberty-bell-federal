import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import Overview from "./pages/dashboard/Overview";
import Accounts from "./pages/dashboard/Accounts";
import AccountDetail from "./pages/dashboard/AccountDetail";
import Transactions from "./pages/dashboard/Transactions";
import Transfers from "./pages/dashboard/Transfers";
import Cards from "./pages/dashboard/Cards";
import Investments from "./pages/dashboard/Investments";
import Notifications from "./pages/dashboard/Notifications";
import Profile from "./pages/dashboard/Profile";

// Admin Pages
import Analytics from "./pages/admin/Analytics";
import UserAccounts from "./pages/admin/UserAccounts";
import PaymentMethods from "./pages/admin/PaymentMethods";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/dashboard/accounts" element={<Accounts />} />
          <Route path="/dashboard/accounts/:id" element={<AccountDetail />} />
          <Route path="/dashboard/transactions" element={<Transactions />} />
          <Route path="/dashboard/transfers" element={<Transfers />} />
          <Route path="/dashboard/cards" element={<Cards />} />
          <Route path="/dashboard/investments" element={<Investments />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/analytics" replace />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/accounts" element={<UserAccounts />} />
          <Route path="/admin/payment-methods" element={<PaymentMethods />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
