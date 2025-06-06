
import { useState } from "react";
import { Database, Download, Upload, RefreshCw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface DatabaseSettingsProps {
  isArabic: boolean;
}

const DatabaseSettings = ({ isArabic }: DatabaseSettingsProps) => {
  const [backupProgress, setBackupProgress] = useState(0);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const startBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const databaseStats = [
    {
      label: { en: "Total Records", ar: "إجمالي السجلات" },
      value: "12,456",
      status: "healthy"
    },
    {
      label: { en: "Database Size", ar: "حجم قاعدة البيانات" },
      value: "2.4 GB",
      status: "healthy"
    },
    {
      label: { en: "Last Backup", ar: "آخر نسخة احتياطية" },
      value: "2024-01-15",
      status: "warning"
    },
    {
      label: { en: "Connection Status", ar: "حالة الاتصال" },
      value: isArabic ? "متصل" : "Connected",
      status: "healthy"
    }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      healthy: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800"
    };
    
    const labels = {
      healthy: isArabic ? "جيد" : "Healthy",
      warning: isArabic ? "تحذير" : "Warning",
      error: isArabic ? "خطأ" : "Error"
    };

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-xl font-semibold text-gray-900 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "إعدادات قاعدة البيانات" : "Database Settings"}
          </h2>
          <p className={`text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "إدارة النسخ الاحتياطية وصحة قاعدة البيانات" : "Manage backups and database health"}
          </p>
        </div>
        
        <Button className="bg-takamul-emerald-green hover:bg-green-600">
          <RefreshCw className="w-4 h-4 mr-2" />
          {isArabic ? "تحديث الحالة" : "Refresh Status"}
        </Button>
      </div>

      {/* Database Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            <Database className="w-5 h-5 text-takamul-royal-blue" />
            {isArabic ? "إحصائيات قاعدة البيانات" : "Database Statistics"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {databaseStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                    {stat.label[isArabic ? 'ar' : 'en']}
                  </span>
                  {getStatusBadge(stat.status)}
                </div>
                <div className={`text-2xl font-bold text-gray-900 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup Management */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            <Download className="w-5 h-5 text-takamul-royal-blue" />
            {isArabic ? "إدارة النسخ الاحتياطية" : "Backup Management"}
          </CardTitle>
          <CardDescription className={isArabic ? 'font-cairo' : 'font-poppins'}>
            {isArabic ? "إنشاء واستعادة النسخ الاحتياطية" : "Create and restore database backups"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isBackingUp && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {isArabic ? "جاري إنشاء النسخة الاحتياطية..." : "Creating backup..."}
                </span>
                <span className={`text-sm text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {backupProgress}%
                </span>
              </div>
              <Progress value={backupProgress} className="w-full" />
            </div>
          )}
          
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={startBackup}
              disabled={isBackingUp}
              className="bg-takamul-emerald-green hover:bg-green-600"
            >
              <Download className="w-4 h-4 mr-2" />
              {isArabic ? "إنشاء نسخة احتياطية" : "Create Backup"}
            </Button>
            
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              {isArabic ? "استعادة من نسخة احتياطية" : "Restore from Backup"}
            </Button>
            
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              {isArabic ? "جدولة النسخ الآلية" : "Schedule Auto Backup"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Backups */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "النسخ الاحتياطية الأخيرة" : "Recent Backups"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "2024-01-15", size: "2.4 GB", status: "completed" },
              { date: "2024-01-14", size: "2.3 GB", status: "completed" },
              { date: "2024-01-13", size: "2.3 GB", status: "completed" }
            ].map((backup, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="w-4 h-4 text-gray-600" />
                  <div>
                    <div className={`font-medium ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                      {backup.date}
                    </div>
                    <div className={`text-sm text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                      {backup.size}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(backup.status)}
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseSettings;
