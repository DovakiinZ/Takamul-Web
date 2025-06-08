import { useState } from "react";
import { Users, ArrowLeft, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HRPayroll = () => {
  const [isArabic, setIsArabic] = useState(false);

  const features = [
    {
      title: isArabic ? "السعودة" : "Saudization",
      description: isArabic ? "متابعة نسبة السعودة ومتطلبات وزارة العمل" : "Track Saudization percentage and Ministry of Labor requirements"
    },
    {
      title: isArabic ? "قوسي GOSI" : "GOSI Integration",
      description: isArabic ? "تكامل مع التأمينات الاجتماعية" : "Integration with General Organization for Social Insurance"
    },
    {
      title: isArabic ? "نظام الأجور WPS" : "WPS System",
      description: isArabic ? "نظام حماية الأجور المطلوب قانونياً" : "Legally required Wage Protection System"
    },
    {
      title: isArabic ? "إدارة الموظفين" : "Employee Management",
      description: isArabic ? "ملفات شاملة للموظفين والحضور" : "Comprehensive employee files and attendance"
    }
  ];

  return (
    <div className={`min-h-screen bg-takamul-light-gray ${isArabic ? 'font-cairo' : 'font-poppins'}`} dir={isArabic ? "rtl" : "ltr"}>
      {/* Navigation Bar */}
      <nav className="bg-takamul-royal-blue shadow-lg border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-white hover:text-blue-100 hover:bg-blue-600/50">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 via-takamul-emerald-green to-green-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {isArabic ? "الموارد البشرية" : "HR & Payroll"}
                  </h1>
                  <p className="text-sm text-blue-100">
                    {isArabic ? "السعودة وقوسي ونظام الأجور" : "Saudization, GOSI, WPS"}
                  </p>
                </div>
              </div>
            </div>
            
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
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className={`text-3xl font-bold text-takamul-royal-blue mb-4 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "نظام الموارد البشرية والرواتب" : "HR & Payroll Management System"}
          </h2>
          <p className={`text-lg text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic 
              ? "نظام شامل لإدارة الموارد البشرية متوافق مع اللوائح السعودية" 
              : "Comprehensive HR management system compliant with Saudi regulations"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-md border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className={`text-xl font-bold text-takamul-royal-blue ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white/90 backdrop-blur-md border border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className={`text-2xl font-bold text-takamul-royal-blue text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
              {isArabic ? "جاهز للاستخدام" : "Ready to Use"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className={`text-lg text-gray-600 mb-6 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
              {isArabic 
                ? "ابدأ في إدارة موظفيك ورواتبهم بكفاءة" 
                : "Start managing your employees and payroll efficiently"
              }
            </p>
            <Button className="bg-takamul-emerald-green hover:bg-green-600 text-white">
              {isArabic ? "إضافة موظف جديد" : "Add New Employee"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HRPayroll; 