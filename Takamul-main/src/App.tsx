import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Reg from "./pages/Reg";
import Dashboard from "./pages/Dashboard";
import Accounting from "./pages/Accounting";
import EInvoicing from "./pages/EInvoicing";
import Inventory from "./pages/Inventory";
import HRPayroll from "./pages/HRPayroll";
import CRM from "./pages/CRM";
import PointOfSale from "./pages/PointOfSale";
import Procurement from "./pages/Procurement";
import Expenses from "./pages/Expenses";
import NewInvoice from "./pages/NewInvoice";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/regester" element={<Reg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Module Pages */}
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/e-invoicing" element={<EInvoicing />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/hr-payroll" element={<HRPayroll />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/point-of-sale" element={<PointOfSale />} />
            <Route path="/procurement" element={<Procurement />} />
            <Route path="/expenses" element={<Expenses />} />
            
            {/* Quick Action Pages */}
            <Route path="/new-invoice" element={<NewInvoice />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
