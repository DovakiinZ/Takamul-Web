
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, Package, FileText } from "lucide-react";

interface StatsOverviewProps {
  isArabic: boolean;
}

const StatsOverview = ({ isArabic }: StatsOverviewProps) => {
  const stats = [
    {
      title: isArabic ? "إجمالي الإيرادات (ريال)" : "Total Revenue (SAR)",
      value: "SAR 284,759",
      change: "+12.5%",
      icon: DollarSign,
      positive: true,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: isArabic ? "الفواتير المعلقة (درهم)" : "Pending Invoices (AED)",
      value: "AED 18,420",
      change: "-8.2%",
      icon: FileText,
      positive: false,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: isArabic ? "العملاء النشطون (دولار)" : "Active Customers (USD)",
      value: "$12,840",
      change: "+5.1%",
      icon: Users,
      positive: true,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: isArabic ? "المخزون المتاح" : "Inventory Items",
      value: "8,947",
      change: "+2.3%",
      icon: Package,
      positive: true,
      gradient: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/70 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-between">
              <div className="space-y-2 text-center flex-1">
                <p className={`text-sm font-medium text-slate-600 mb-1 text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>{stat.title}</p>
                <p className={`text-2xl font-bold text-slate-800 text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>{stat.value}</p>
                <div className={`flex items-center justify-center mt-2 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.positive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  <span className={`text-sm font-semibold ${isArabic ? 'font-cairo' : 'font-poppins'}`}>{stat.change}</span>
                </div>
              </div>
              <div className={`p-4 bg-gradient-to-r ${stat.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
