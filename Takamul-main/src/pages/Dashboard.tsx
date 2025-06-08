import { useState } from "react";
import { Languages, Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import StatsOverview from "@/components/StatsOverview";
import ModuleGrid from "@/components/ModuleGrid";
import QuickActions from "@/components/QuickActions";
import ComplianceStatus from "@/components/ComplianceStatus";
import ChatBot from "@/components/ChatBot";
import Custodies from "@/components/Custodies";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [isArabic, setIsArabic] = useState(false);

  return (
    <div className={`min-h-screen bg-takamul-light-gray ${isArabic ? 'font-cairo' : 'font-poppins'}`} dir={isArabic ? "rtl" : "ltr"}>
      {/* Navigation Bar */}
      <nav className="bg-takamul-royal-blue shadow-lg border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Right side - logo + name */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src="/uploads/logo.png"
                  alt="Takamul Logo"
                  className="h-8 w-8 object-contain opacity-100 hover:opacity-60 transition-opacity duration-300"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-bold text-white leading-tight">
                  Takamull
                </span>
                <span className="text-xs text-blue-100">
                  ERP System
                </span>
              </div>
            </div>

            {/* Left side - controls */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-100 hover:bg-blue-600/50">
                <Search className="w-5 h-5" />
              </Button>
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="text-white hover:text-blue-100 hover:bg-blue-600/50">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-blue-100 hover:bg-blue-600/50"
                onClick={() => setIsArabic(!isArabic)}
              >
                <Languages className="w-5 h-5" />
                <span className="ml-1">{isArabic ? "English" : "العربية"}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader isArabic={isArabic} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-3">
            <StatsOverview isArabic={isArabic} />
            <ModuleGrid isArabic={isArabic} />
          </div>
          <div className="space-y-6">
            <QuickActions isArabic={isArabic} />
            <ComplianceStatus isArabic={isArabic} />
          </div>
        </div>

        <Custodies isArabic={isArabic} />
      </div>

      <ChatBot isArabic={isArabic} />
    </div>
  );
};

export default Dashboard;
