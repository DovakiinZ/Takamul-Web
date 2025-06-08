import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BulkUpload from "./BulkUpload";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  Receipt, 
  Package, 
  Users, 
  Target, 
  ShoppingCart,
  TruckIcon,
  CreditCard,
  BarChart3,
  Smartphone
} from "lucide-react";

interface ModuleGridProps {
  isArabic: boolean;
}

const ModuleGrid = ({ isArabic }: ModuleGridProps) => {
  const modules = [
    {
      title: isArabic ? "المحاسبة" : "Accounting",
      titleArabic: "المحاسبة",
      description: isArabic ? "إدارة الحسابات والضرائب" : "Multi-currency, VAT & Zakat ready",
      icon: Calculator,
      color: "from-takamul-royal-blue to-blue-700",
      status: "active",
      route: "/accounting"
    },
    {
      title: isArabic ? "الفوترة الإلكترونية" : "e-Invoicing",
      titleArabic: "الفوترة الإلكترونية",
      description: isArabic ? "متوافق مع فاتورة وزاتكا" : "ZATCA Fatoora Integration",
      icon: Receipt,
      color: "from-takamul-emerald-green to-green-700",
      status: "active",
      route: "/e-invoicing"
    },
    {
      title: isArabic ? "إدارة المخزون" : "Inventory",
      titleArabic: "إدارة المخزون",
      description: isArabic ? "باركود ودعم الدفعات" : "Barcode & Batch Support",
      icon: Package,
      color: "from-takamul-royal-blue to-takamul-emerald-green",
      status: "active",
      route: "/inventory"
    },
    {
      title: isArabic ? "الموارد البشرية" : "HR & Payroll",
      titleArabic: "الموارد البشرية",
      description: isArabic ? "السعودة وقوسي ونظام الأجور" : "Saudization, GOSI, WPS",
      icon: Users,
      color: "from-orange-500 via-takamul-emerald-green to-green-600",
      status: "active",
      route: "/hr-payroll"
    },
    {
      title: isArabic ? "إدارة العملاء" : "CRM",
      titleArabic: "إدارة العملاء",
      description: isArabic ? "متابعة العملاء والمبيعات" : "Sales Pipeline & Leads",
      icon: Target,
      color: "from-indigo-500 via-takamul-royal-blue to-blue-600",
      status: "active",
      route: "/crm"
    },
    {
      title: isArabic ? "نقطة البيع" : "Point of Sale",
      titleArabic: "نقطة البيع",
      description: isArabic ? "دعم مدى والدفع المحلي" : "Mada Payment Support",
      icon: ShoppingCart,
      color: "from-cyan-500 via-takamul-emerald-green to-green-500",
      status: "coming-soon",
      route: "/point-of-sale"
    },
    {
      title: isArabic ? "المشتريات" : "Procurement",
      titleArabic: "المشتريات",
      description: isArabic ? "إدارة الموردين والعقود" : "Vendor KYC & Management",
      icon: TruckIcon,
      color: "from-takamul-dark-gray to-gray-600",
      status: "coming-soon",
      route: "/procurement"
    },
    {
      title: isArabic ? "إدارة المصروفات" : "Expenses",
      titleArabic: "إدارة المصروفات",
      description: isArabic ? "مسح الإيصالات بالذكاء الاصطناعي" : "Arabic OCR & Card Sync",
      icon: CreditCard,
      color: "from-yellow-500 via-takamul-emerald-green to-orange-500",
      status: "coming-soon",
      route: "/expenses"
    }
  ];

  return (
    <div className="mb-10">
      <h2 className={`text-3xl font-bold text-takamul-royal-blue mb-8 text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
        {isArabic ? "وحدات النظام" : "System Modules"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((module, index) => (
          <Link key={index} to={module.route}>
            <Card className="bg-white/90 backdrop-blur-md border border-blue-100 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <div className={`w-14 h-14 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <module.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className={`text-xl font-bold text-takamul-dark-gray text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-center">
                <p className={`text-sm text-gray-600 mb-6 leading-relaxed text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>{module.description}</p>
                <div className="flex items-center justify-center mb-3 space-x-2">
                  {module.status === 'active' ? (
                    <Button 
                      size="sm" 
                      className={`bg-takamul-emerald-green hover:bg-green-600 shadow-lg text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 ${isArabic ? 'font-cairo' : 'font-poppins'}`}
                    >
                      {isArabic ? "فتح" : "Open"}
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      className={`bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 ${isArabic ? 'font-cairo' : 'font-poppins'}`}
                    >
                      {isArabic ? "قريباً" : "Soon"}
                    </Button>
                  )}
                  {module.status === 'active' && (
                    <span className="w-3 h-3 bg-takamul-emerald-green rounded-full shadow-lg animate-pulse"></span>
                  )}
                </div>
                
                {/* Bulk Upload Section - Only for active modules */}
                {module.status === 'active' && (
                  <div className="flex justify-center">
                    <BulkUpload 
                      isArabic={isArabic}
                      serviceName={module.title}
                      serviceNameArabic={module.titleArabic}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ModuleGrid;
