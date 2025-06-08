import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Upload, Download, Send, Settings } from "lucide-react";

interface QuickActionsProps {
  isArabic: boolean;
}

const QuickActions = ({ isArabic }: QuickActionsProps) => {
  const actions = [
    {
      title: isArabic ? "فاتورة جديدة" : "New Invoice",
      icon: Plus,
      color: "bg-takamul-royal-blue hover:bg-blue-700",
      route: "/new-invoice"
    },
    {
      title: isArabic ? "رفع مستند" : "Upload Document",
      icon: Upload,
      color: "bg-takamul-emerald-green hover:bg-green-600",
      route: "/dashboard" // You can create a specific upload page later
    },
    {
      title: isArabic ? "تقرير مالي" : "Financial Report",
      icon: Download,
      color: "bg-gradient-to-r from-takamul-emerald-green to-green-600 hover:from-green-600 hover:to-green-700",
      route: "/accounting" // Links to accounting for now
    },
    {
      title: isArabic ? "الإعدادات" : "Settings",
      icon: Settings,
      color: "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
      route: "/settings"
    }
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-md border border-blue-100 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className={`text-xl font-bold text-takamul-royal-blue text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
          {isArabic ? "إجراءات سريعة" : "Quick Actions"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Link key={index} to={action.route}>
            <Button
              className={`w-full justify-center text-center ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium ${isArabic ? 'font-cairo' : 'font-poppins'}`}
              size="sm"
            >
              <action.icon className="w-4 h-4 mr-2" />
              {action.title}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
