
import { TrendingUp, Calendar, Sparkles } from "lucide-react";

interface DashboardHeaderProps {
  isArabic: boolean;
}

const DashboardHeader = ({ isArabic }: DashboardHeaderProps) => {
  const currentDate = new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <div className="space-y-3 text-center">
          <h1 className={`text-4xl font-bold text-takamul-royal-blue text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "لوحة التحكم الرئيسية" : "Dashboard Overview"}
          </h1>
          <div className={`flex items-center justify-center text-takamul-dark-gray bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            <Calendar className="w-4 h-4 mr-2 text-takamul-royal-blue" />
            <span className="font-medium text-center">{currentDate}</span>
          </div>
        </div>
        <div className={`flex items-center justify-center space-x-3 bg-takamul-emerald-green text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold text-lg text-center">
            {isArabic ? "أداء ممتاز" : "Excellent Performance"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
