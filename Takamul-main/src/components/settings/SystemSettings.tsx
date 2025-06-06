
import { useState } from "react";
import { Globe, Clock, Calendar, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SystemSettingsProps {
  isArabic: boolean;
}

const SystemSettings = ({ isArabic }: SystemSettingsProps) => {
  const [settings, setSettings] = useState({
    language: "ar",
    timezone: "Asia/Riyadh",
    dateFormat: "DD/MM/YYYY",
    currency: "SAR",
    fiscalYear: "2024",
    companyName: "Takamul"
  });

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-xl font-semibold text-gray-900 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "إعدادات النظام" : "System Settings"}
          </h2>
          <p className={`text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "تكوين الإعدادات العامة للنظام" : "Configure general system settings"}
          </p>
        </div>
        
        <Button className="bg-takamul-emerald-green hover:bg-green-600">
          <Save className="w-4 h-4 mr-2" />
          {isArabic ? "حفظ الإعدادات" : "Save Settings"}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Localization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-3 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
              <Globe className="w-5 h-5 text-takamul-royal-blue" />
              {isArabic ? "إعدادات التوطين" : "Localization Settings"}
            </CardTitle>
            <CardDescription className={isArabic ? 'font-cairo' : 'font-poppins'}>
              {isArabic ? "إعدادات اللغة والمنطقة الزمنية" : "Language and regional settings"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={isArabic ? 'font-cairo' : 'font-poppins'}>
                  {isArabic ? "اللغة الافتراضية" : "Default Language"}
                </Label>
                <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">{isArabic ? "العربية" : "Arabic"}</SelectItem>
                    <SelectItem value="en">{isArabic ? "الإنجليزية" : "English"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className={isArabic ? 'font-cairo' : 'font-poppins'}>
                  {isArabic ? "المنطقة الزمنية" : "Timezone"}
                </Label>
                <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Riyadh">{isArabic ? "الرياض" : "Riyadh"}</SelectItem>
                    <SelectItem value="Asia/Dubai">{isArabic ? "دبي" : "Dubai"}</SelectItem>
                    <SelectItem value="Asia/Kuwait">{isArabic ? "الكويت" : "Kuwait"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date and Time Settings */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-3 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
              <Calendar className="w-5 h-5 text-takamul-royal-blue" />
              {isArabic ? "إعدادات التاريخ والوقت" : "Date and Time Settings"}
            </CardTitle>
            <CardDescription className={isArabic ? 'font-cairo' : 'font-poppins'}>
              {isArabic ? "تنسيق التاريخ والعملة" : "Date format and currency settings"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={isArabic ? 'font-cairo' : 'font-poppins'}>
                  {isArabic ? "تنسيق التاريخ" : "Date Format"}
                </Label>
                <Select value={settings.dateFormat} onValueChange={(value) => updateSetting("dateFormat", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className={isArabic ? 'font-cairo' : 'font-poppins'}>
                  {isArabic ? "العملة" : "Currency"}
                </Label>
                <Select value={settings.currency} onValueChange={(value) => updateSetting("currency", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAR">{isArabic ? "ريال سعودي (SAR)" : "Saudi Riyal (SAR)"}</SelectItem>
                    <SelectItem value="AED">{isArabic ? "درهم إماراتي (AED)" : "UAE Dirham (AED)"}</SelectItem>
                    <SelectItem value="USD">{isArabic ? "دولار أمريكي (USD)" : "US Dollar (USD)"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Settings */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-3 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
              <Clock className="w-5 h-5 text-takamul-royal-blue" />
              {isArabic ? "إعدادات الشركة" : "Company Settings"}
            </CardTitle>
            <CardDescription className={isArabic ? 'font-cairo' : 'font-poppins'}>
              {isArabic ? "المعلومات الأساسية للشركة" : "Basic company information"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={isArabic ? 'font-cairo' : 'font-poppins'}>
                  {isArabic ? "اسم الشركة" : "Company Name"}
                </Label>
                <Input
                  value={settings.companyName}
                  onChange={(e) => updateSetting("companyName", e.target.value)}
                  placeholder={isArabic ? "اسم الشركة" : "Company Name"}
                />
              </div>
              
              <div className="space-y-2">
                <Label className={isArabic ? 'font-cairo' : 'font-poppins'}>
                  {isArabic ? "السنة المالية" : "Fiscal Year"}
                </Label>
                <Select value={settings.fiscalYear} onValueChange={(value) => updateSetting("fiscalYear", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettings;
