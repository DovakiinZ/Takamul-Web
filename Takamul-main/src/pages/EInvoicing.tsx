import { Receipt, ArrowLeft, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EInvoicing = () => {
  const { isArabic, toggleLanguage } = useLanguage();

  const features = [
    {
      title: isArabic ? "فاتورة - تكامل زاتكا" : "ZATCA Fatoora Integration",
      description: isArabic ? "متوافق 100% مع لوائح هيئة الزكاة والضريبة" : "100% compliant with ZATCA regulations"
    },
    {
      title: isArabic ? "الفوترة الإلكترونية" : "Electronic Invoicing",
      description: isArabic ? "إنشاء وإرسال الفواتير إلكترونياً" : "Create and send invoices electronically"
    },
    {
      title: isArabic ? "رمز الاستجابة السريعة" : "QR Code Generation",
      description: isArabic ? "رموز QR مطابقة للمعايير السعودية" : "QR codes compliant with Saudi standards"
    },
    {
      title: isArabic ? "التوقيع الرقمي" : "Digital Signature",
      description: isArabic ? "حماية متقدمة للفواتير الإلكترونية" : "Advanced protection for electronic invoices"
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
                <div className="w-10 h-10 bg-gradient-to-r from-takamul-emerald-green to-green-700 rounded-xl flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {isArabic ? "الفوترة الإلكترونية" : "e-Invoicing"}
                  </h1>
                  <p className="text-sm text-blue-100">
                    {isArabic ? "متوافق مع فاتورة وزاتكا" : "ZATCA Fatoora Integration"}
                  </p>
                </div>
              </div>
            </div>
            
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
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className={`text-3xl font-bold text-takamul-royal-blue mb-4 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "نظام الفوترة الإلكترونية" : "Electronic Invoicing System"}
          </h2>
          <p className={`text-lg text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic 
              ? "نظام فوترة إلكتروني متوافق مع لوائح هيئة الزكاة والضريبة والدخل السعودية" 
              : "Electronic invoicing system compliant with Saudi Arabia's ZATCA regulations"
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
                ? "ابدأ الآن في إنشاء فواتير إلكترونية متوافقة مع المعايير السعودية" 
                : "Start creating electronic invoices compliant with Saudi standards now"
              }
            </p>
            <Button className="bg-takamul-emerald-green hover:bg-green-600 text-white">
              {isArabic ? "إنشاء فاتورة جديدة" : "Create New Invoice"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EInvoicing; 