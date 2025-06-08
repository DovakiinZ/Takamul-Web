import { useState } from "react";
import { Plus, ArrowLeft, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewInvoice = () => {
  const [isArabic, setIsArabic] = useState(false);

  const invoiceTypes = [
    {
      title: isArabic ? "فاتورة مبيعات" : "Sales Invoice",
      description: isArabic ? "إنشاء فاتورة مبيعات جديدة للعملاء" : "Create a new sales invoice for customers"
    },
    {
      title: isArabic ? "فاتورة خدمة" : "Service Invoice",
      description: isArabic ? "فاتورة للخدمات المقدمة" : "Invoice for services provided"
    },
    {
      title: isArabic ? "فاتورة مشتريات" : "Purchase Invoice",
      description: isArabic ? "فاتورة مشتريات من الموردين" : "Purchase invoice from suppliers"
    },
    {
      title: isArabic ? "فاتورة ضريبية" : "Tax Invoice",
      description: isArabic ? "فاتورة ضريبية متوافقة مع زاتكا" : "ZATCA compliant tax invoice"
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
                <div className="w-10 h-10 bg-takamul-royal-blue rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {isArabic ? "فاتورة جديدة" : "New Invoice"}
                  </h1>
                  <p className="text-sm text-blue-100">
                    {isArabic ? "إنشاء فاتورة جديدة" : "Create a new invoice"}
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
            {isArabic ? "اختر نوع الفاتورة" : "Choose Invoice Type"}
          </h2>
          <p className={`text-lg text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic 
              ? "اختر نوع الفاتورة التي تريد إنشاؤها" 
              : "Select the type of invoice you want to create"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {invoiceTypes.map((type, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-md border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
              <CardHeader>
                <CardTitle className={`text-xl font-bold text-takamul-royal-blue ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-gray-600 mb-4 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {type.description}
                </p>
                <Button className="w-full bg-takamul-emerald-green hover:bg-green-600 text-white">
                  {isArabic ? "إنشاء" : "Create"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white/90 backdrop-blur-md border border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className={`text-2xl font-bold text-takamul-royal-blue text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
              {isArabic ? "نصائح للفوترة" : "Invoicing Tips"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className={`text-lg text-gray-600 mb-6 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
              {isArabic 
                ? "تأكد من صحة جميع البيانات قبل إرسال الفاتورة للعميل" 
                : "Make sure all data is correct before sending the invoice to the customer"
              }
            </p>
            <Link to="/e-invoicing">
              <Button className="bg-takamul-royal-blue hover:bg-blue-700 text-white">
                {isArabic ? "الذهاب إلى الفوترة الإلكترونية" : "Go to e-Invoicing"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewInvoice; 