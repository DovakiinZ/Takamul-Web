import { Package, ArrowLeft, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Inventory = () => {
  const { isArabic, toggleLanguage } = useLanguage();

  const features = [
    {
      title: isArabic ? "إدارة المخزون" : "Stock Management",
      description: isArabic ? "تتبع المخزون في الوقت الفعلي" : "Real-time inventory tracking"
    },
    {
      title: isArabic ? "نظام الباركود" : "Barcode System",
      description: isArabic ? "دعم شامل لأنظمة الباركود" : "Comprehensive barcode support"
    },
    {
      title: isArabic ? "إدارة الدفعات" : "Batch Management",
      description: isArabic ? "تتبع دفعات الإنتاج وتواريخ الانتهاء" : "Track production batches and expiry dates"
    },
    {
      title: isArabic ? "تقارير المخزون" : "Inventory Reports",
      description: isArabic ? "تقارير مفصلة لحركة المخزون" : "Detailed inventory movement reports"
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
                <div className="w-10 h-10 bg-gradient-to-r from-takamul-royal-blue to-takamul-emerald-green rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {isArabic ? "إدارة المخزون" : "Inventory"}
                  </h1>
                  <p className="text-sm text-blue-100">
                    {isArabic ? "باركود ودعم الدفعات" : "Barcode & Batch Support"}
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
            {isArabic ? "نظام إدارة المخزون" : "Inventory Management System"}
          </h2>
          <p className={`text-lg text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic 
              ? "نظام شامل لإدارة المخزون مع دعم الباركود وتتبع الدفعات" 
              : "Comprehensive inventory management system with barcode support and batch tracking"
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
                ? "ابدأ في إدارة مخزونك بكفاءة وفعالية" 
                : "Start managing your inventory efficiently and effectively"
              }
            </p>
            <Button className="bg-takamul-emerald-green hover:bg-green-600 text-white">
              {isArabic ? "إضافة منتج جديد" : "Add New Product"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory; 