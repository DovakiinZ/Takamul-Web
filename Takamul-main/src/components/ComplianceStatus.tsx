
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface ComplianceStatusProps {
  isArabic: boolean;
}

const ComplianceStatus = ({ isArabic }: ComplianceStatusProps) => {
  const complianceItems = [
    {
      title: isArabic ? "ضريبة القيمة المضافة" : "VAT Compliance",
      status: "compliant",
      dueDate: isArabic ? "15 يوماً" : "15 days left"
    },
    {
      title: isArabic ? "زاتكا - فاتورة" : "ZATCA e-Invoice",
      status: "compliant",
      dueDate: isArabic ? "متفعل" : "Active"
    },
    {
      title: isArabic ? "زكاة الشركات" : "Corporate Zakat",
      status: "warning",
      dueDate: isArabic ? "30 يوماً" : "30 days left"
    },
    {
      title: isArabic ? "قوسي - التأمينات" : "GOSI Registration",
      status: "pending",
      dueDate: isArabic ? "قيد المراجعة" : "Under Review"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      compliant: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-0',
      warning: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-0',
      pending: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-0'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800 border-0';
  };

  return (
    <Card className="bg-white/90 backdrop-blur-md border border-blue-100 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className={`text-xl font-bold text-takamul-royal-blue flex items-center justify-center text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
          <Shield className="w-5 h-5 mr-2 text-takamul-royal-blue" />
          {isArabic ? "حالة الامتثال" : "Compliance Status"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {complianceItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-takamul-light-gray rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-3">
              {getStatusIcon(item.status)}
              <div className="text-center">
                <p className={`font-semibold text-sm text-takamul-dark-gray text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>{item.title}</p>
                <p className={`text-xs text-gray-600 text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>{item.dueDate}</p>
              </div>
            </div>
            <Badge className={`${getStatusBadge(item.status)} text-xs font-medium px-3 py-1 rounded-full text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
              {item.status === 'compliant' ? (isArabic ? 'متوافق' : 'OK') :
               item.status === 'warning' ? (isArabic ? 'تحذير' : 'Warning') :
               (isArabic ? 'معلق' : 'Pending')}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ComplianceStatus;
