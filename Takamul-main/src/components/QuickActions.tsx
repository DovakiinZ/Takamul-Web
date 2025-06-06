
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, Send } from "lucide-react";

interface QuickActionsProps {
  isArabic: boolean;
}

const QuickActions = ({ isArabic }: QuickActionsProps) => {
  const actions = [
    {
      title: isArabic ? "فاتورة جديدة" : "New Invoice",
      icon: Plus,
      color: "bg-takamul-royal-blue hover:bg-blue-700"
    },
    {
      title: isArabic ? "رفع مستند" : "Upload Document",
      icon: Upload,
      color: "bg-takamul-emerald-green hover:bg-green-600"
    },
    {
      title: isArabic ? "تقرير مالي" : "Financial Report",
      icon: Download,
      color: "bg-gradient-to-r from-takamul-emerald-green to-green-600 hover:from-green-600 hover:to-green-700"
    },
    {
      title: isArabic ? "إرسال كشف" : "Send Statement",
      icon: Send,
      color: "bg-gradient-to-r from-takamul-royal-blue to-blue-600 hover:from-blue-600 hover:to-blue-700"
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
          <Button
            key={index}
            className={`w-full justify-center text-center ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium ${isArabic ? 'font-cairo' : 'font-poppins'}`}
            size="sm"
          >
            <action.icon className="w-4 h-4 mr-2" />
            {action.title}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
