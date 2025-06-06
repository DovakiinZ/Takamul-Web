
import { useState } from "react";
import { ArrowLeft, Users, Shield, Bell, Globe, Database, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import UserManagement from "@/components/settings/UserManagement";
import PermissionsManagement from "@/components/settings/PermissionsManagement";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SystemSettings from "@/components/settings/SystemSettings";
import DatabaseSettings from "@/components/settings/DatabaseSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";

interface SettingsProps {}

const Settings = () => {
  const [isArabic, setIsArabic] = useState(false);

  const settingsTabs = [
    {
      id: "users",
      icon: Users,
      label: { en: "Users", ar: "المستخدمون" },
      component: UserManagement
    },
    {
      id: "permissions",
      icon: Shield,
      label: { en: "Permissions", ar: "الصلاحيات" },
      component: PermissionsManagement
    },
    {
      id: "notifications",
      icon: Bell,
      label: { en: "Notifications", ar: "التنبيهات" },
      component: NotificationSettings
    },
    {
      id: "system",
      icon: Globe,
      label: { en: "System", ar: "النظام" },
      component: SystemSettings
    },
    {
      id: "database",
      icon: Database,
      label: { en: "Database", ar: "قاعدة البيانات" },
      component: DatabaseSettings
    },
    {
      id: "security",
      icon: Key,
      label: { en: "Security", ar: "الأمان" },
      component: SecuritySettings
    }
  ];

  return (
    <div className="min-h-screen bg-takamul-light-gray" dir={isArabic ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-takamul-royal-blue hover:bg-blue-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {isArabic ? "العودة للوحة الرئيسية" : "Back to Dashboard"}
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className={`text-2xl font-bold text-takamul-royal-blue ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                {isArabic ? "الإعدادات" : "Settings"}
              </h1>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsArabic(!isArabic)}
              className="text-takamul-royal-blue hover:bg-blue-50 font-cairo"
            >
              <Globe className="w-4 h-4 mr-1" />
              {isArabic ? "English" : "العربية"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
            {settingsTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`flex items-center justify-center space-x-2 ${isArabic ? 'font-cairo' : 'font-poppins'}`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label[isArabic ? 'ar' : 'en']}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {settingsTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <tab.component isArabic={isArabic} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
