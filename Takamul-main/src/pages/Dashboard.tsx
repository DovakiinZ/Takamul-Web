import { Languages, Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardHeader from "@/components/DashboardHeader";
import StatsOverview from "@/components/StatsOverview";
import ModuleGrid from "@/components/ModuleGrid";
import QuickActions from "@/components/QuickActions";
import ComplianceStatus from "@/components/ComplianceStatus";
import ChatBot from "@/components/ChatBot";
import Custodies from "@/components/Custodies";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { isArabic, toggleLanguage } = useLanguage();

  return (
    <div className={`min-h-screen bg-takamul-light-gray ${isArabic ? 'font-cairo' : 'font-poppins'}`} dir={isArabic ? "rtl" : "ltr"}>
      {/* Navigation Bar */}
      <nav className="bg-takamul-royal-blue shadow-lg border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-takamul-royal-blue font-bold text-xl">ت</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-2xl font-bold text-white">
                    {isArabic ? "تكامل" : "Takamul"}
                  </h1>
                  <p className="text-sm text-blue-100">
                    {isArabic ? "نظام تخطيط موارد المؤسسة" : "Enterprise Resource Planning"}
                  </p>
                </div>
              </div>
            </div>
            
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
                onClick={toggleLanguage}
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
