
import { useState } from "react";
import { Bell, Mail, MessageSquare, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface NotificationSettingsProps {
  isArabic: boolean;
}

const NotificationSettings = ({ isArabic }: NotificationSettingsProps) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    browserNotifications: true,
    custodyAlerts: true,
    userManagement: true,
    systemUpdates: false,
    dailyReports: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const notificationCategories = [
    {
      icon: Bell,
      title: { en: "General Notifications", ar: "التنبيهات العامة" },
      description: { en: "System-wide notification preferences", ar: "إعدادات التنبيهات العامة للنظام" },
      settings: [
        { key: "emailNotifications", label: { en: "Email Notifications", ar: "تنبيهات البريد الإلكتروني" } },
        { key: "smsNotifications", label: { en: "SMS Notifications", ar: "تنبيهات الرسائل القصيرة" } },
        { key: "browserNotifications", label: { en: "Browser Notifications", ar: "تنبيهات المتصفح" } }
      ]
    },
    {
      icon: MessageSquare,
      title: { en: "Feature Alerts", ar: "تنبيهات الميزات" },
      description: { en: "Notifications for specific features", ar: "التنبيهات الخاصة بميزات محددة" },
      settings: [
        { key: "custodyAlerts", label: { en: "Custody Alerts", ar: "تنبيهات العهد" } },
        { key: "userManagement", label: { en: "User Management", ar: "إدارة المستخدمين" } },
        { key: "systemUpdates", label: { en: "System Updates", ar: "تحديثات النظام" } }
      ]
    },
    {
      icon: Mail,
      title: { en: "Reports", ar: "التقارير" },
      description: { en: "Automated report notifications", ar: "تنبيهات التقارير الآلية" },
      settings: [
        { key: "dailyReports", label: { en: "Daily Reports", ar: "التقارير اليومية" } }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-xl font-semibold text-gray-900 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "إعدادات التنبيهات" : "Notification Settings"}
          </h2>
          <p className={`text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "إدارة التنبيهات والإشعارات في النظام" : "Manage notifications and alerts in the system"}
          </p>
        </div>
        
        <Button className="bg-takamul-emerald-green hover:bg-green-600">
          <Save className="w-4 h-4 mr-2" />
          {isArabic ? "حفظ الإعدادات" : "Save Settings"}
        </Button>
      </div>

      {/* Notification Categories */}
      <div className="grid gap-6">
        {notificationCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                <category.icon className="w-5 h-5 text-takamul-royal-blue" />
                {category.title[isArabic ? 'ar' : 'en']}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {category.description[isArabic ? 'ar' : 'en']}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.settings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                      {setting.label[isArabic ? 'ar' : 'en']}
                    </span>
                    <Switch
                      checked={settings[setting.key as keyof typeof settings]}
                      onCheckedChange={() => toggleSetting(setting.key as keyof typeof settings)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
