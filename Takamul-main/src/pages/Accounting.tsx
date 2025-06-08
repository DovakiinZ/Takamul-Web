import { useState } from "react";
import { Calculator, ArrowLeft, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Accounting = () => {
  const [isArabic, setIsArabic] = useState(false);

  const features = [
    {
      title: isArabic ? "دفتر الأستاذ العام" : "General Ledger",
      description: isArabic ? "إدارة شاملة للحسابات المالية" : "Comprehensive financial account management"
    },
    {
      title: isArabic ? "الضرائب والزكاة" : "VAT & Zakat",
      description: isArabic ? "متوافق مع هيئة الزكاة والضريبة" : "ZATCA compliant tax management"
    },
    {
      title: isArabic ? "العملات المتعددة" : "Multi-Currency",
      description: isArabic ? "دعم جميع العملات الرئيسية" : "Support for major currencies"
    },
    {
      title: isArabic ? "التقارير المالية" : "Financial Reports",
      description: isArabic ? "تقارير شاملة ومفصلة" : "Comprehensive detailed reports"
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
                <div className="w-10 h-10 bg-gradient-to-r from-takamul-royal-blue to-blue-700 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {isArabic ? "المحاسبة" : "Accounting"}
                  </h1>
                  <p className="text-sm text-blue-100">
                    {isArabic ? "إدارة الحسابات والضرائب" : "Multi-currency, VAT & Zakat ready"}
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
            {isArabic ? "نظام المحاسبة" : "Accounting System"}
          </h2>
          <p className={`text-lg text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic 
              ? "نظام محاسبي شامل متوافق مع المعايير السعودية واللوائح الضريبية" 
              : "Comprehensive accounting system compliant with Saudi standards and tax regulations"
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
              {isArabic ? "قريباً - المزيد من الميزات" : "Coming Soon - More Features"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className={`text-lg text-gray-600 mb-6 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
              {isArabic 
                ? "نعمل على تطوير المزيد من الميزات المحاسبية المتقدمة" 
                : "We're working on developing more advanced accounting features"
              }
            </p>
            <Button className="bg-takamul-emerald-green hover:bg-green-600 text-white">
              {isArabic ? "اطلب عرضاً تجريبياً" : "Request Demo"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Accounting; 