
import { useState } from "react";
import { Shield, Key, Lock, Save, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SecuritySettingsProps {
  isArabic: boolean;
}

const SecuritySettings = ({ isArabic }: SecuritySettingsProps) => {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: "90",
    sessionTimeout: "30",
    loginAttempts: "5",
    auditLogging: true,
    encryptData: true,
    requirePasswordChange: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const securityChecks = [
    {
      label: { en: "Two-Factor Authentication", ar: "المصادقة الثنائية" },
      status: settings.twoFactorAuth,
      severity: "high"
    },
    {
      label: { en: "Password Expiry Policy", ar: "سياسة انتهاء كلمة المرور" },
      status: parseInt(settings.passwordExpiry) <= 90,
      severity: "medium"
    },
    {
      label: { en: "Data Encryption", ar: "تشفير البيانات" },
      status: settings.encryptData,
      severity: "high"
    },
    {
      label: { en: "Audit Logging", ar: "تسجيل العمليات" },
      status: settings.auditLogging,
      severity: "medium"
    }
  ];

  const getSecurityScore = () => {
    const completedChecks = securityChecks.filter(check => check.status);
    return Math.round((completedChecks.length / securityChecks.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-xl font-semibold text-gray-900 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "إعدادات الأمان" : "Security Settings"}
          </h2>
          <p className={`text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "إدارة أمان النظام وحماية البيانات" : "Manage system security and data protection"}
          </p>
        </div>
        
        <Button className="bg-takamul-emerald-green hover:bg-green-600">
          <Save className="w-4 h-4 mr-2" />
          {isArabic ? "حفظ الإعدادات" : "Save Settings"}
        </Button>
      </div>

      {/* Security Score */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            <Shield className="w-5 h-5 text-takamul-royal-blue" />
            {isArabic ? "نقاط الأمان" : "Security Score"}
          </CardTitle>
          <CardDescription className={isArabic ? 'font-cairo' : 'font-poppins'}>
            {isArabic ? "تقييم شامل لمستوى أمان النظام" : "Overall system security assessment"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className={`text-3xl font-bold ${getSecurityScore() >= 80 ? 'text-green-600' : getSecurityScore() >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {getSecurityScore()}%
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {securityChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={`text-sm ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                      {check.label[isArabic ? 'ar' : 'en']}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${check.status ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Settings */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            <Key className="w-5 h-5 text-takamul-royal-blue" />
            {isArabic ? "إعدادات المصادقة" : "Authentication Settings"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className={`font-medium ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                {isArabic ? "المصادقة الثنائية" : "Two-Factor Authentication"}
              </span>
              <p className={`text-sm text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                {isArabic ? "طبقة حماية إضافية لحسابات المستخدمين" : "Extra security layer for user accounts"}
              </p>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={() => toggleSetting('twoFactorAuth')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "انتهاء كلمة المرور (أيام)" : "Password Expiry (days)"}
              </Label>
              <Select value={settings.passwordExpiry} onValueChange={(value) => updateSetting("passwordExpiry", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 {isArabic ? "يوم" : "days"}</SelectItem>
                  <SelectItem value="60">60 {isArabic ? "يوم" : "days"}</SelectItem>
                  <SelectItem value="90">90 {isArabic ? "يوم" : "days"}</SelectItem>
                  <SelectItem value="never">{isArabic ? "أبداً" : "Never"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "انتهاء الجلسة (دقائق)" : "Session Timeout (minutes)"}
              </Label>
              <Select value={settings.sessionTimeout} onValueChange={(value) => updateSetting("sessionTimeout", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 {isArabic ? "دقيقة" : "minutes"}</SelectItem>
                  <SelectItem value="30">30 {isArabic ? "دقيقة" : "minutes"}</SelectItem>
                  <SelectItem value="60">60 {isArabic ? "دقيقة" : "minutes"}</SelectItem>
                  <SelectItem value="120">120 {isArabic ? "دقيقة" : "minutes"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Policies */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            <Lock className="w-5 h-5 text-takamul-royal-blue" />
            {isArabic ? "سياسات الأمان" : "Security Policies"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className={`font-medium ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {isArabic ? "تسجيل العمليات" : "Audit Logging"}
                </span>
                <p className={`text-sm text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {isArabic ? "تسجيل جميع العمليات الحساسة" : "Log all sensitive operations"}
                </p>
              </div>
              <Switch
                checked={settings.auditLogging}
                onCheckedChange={() => toggleSetting('auditLogging')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className={`font-medium ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {isArabic ? "تشفير البيانات" : "Data Encryption"}
                </span>
                <p className={`text-sm text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {isArabic ? "تشفير البيانات الحساسة" : "Encrypt sensitive data"}
                </p>
              </div>
              <Switch
                checked={settings.encryptData}
                onCheckedChange={() => toggleSetting('encryptData')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className={`font-medium ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {isArabic ? "إجبار تغيير كلمة المرور" : "Force Password Change"}
                </span>
                <p className={`text-sm text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {isArabic ? "إجبار المستخدمين على تغيير كلمة المرور عند أول دخول" : "Force users to change password on first login"}
                </p>
              </div>
              <Switch
                checked={settings.requirePasswordChange}
                onCheckedChange={() => toggleSetting('requirePasswordChange')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className={isArabic ? 'font-cairo' : 'font-poppins'}>
              {isArabic ? "عدد محاولات الدخول المسموح" : "Maximum Login Attempts"}
            </Label>
            <Select value={settings.loginAttempts} onValueChange={(value) => updateSetting("loginAttempts", value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 {isArabic ? "محاولات" : "attempts"}</SelectItem>
                <SelectItem value="5">5 {isArabic ? "محاولات" : "attempts"}</SelectItem>
                <SelectItem value="10">10 {isArabic ? "محاولات" : "attempts"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Security Alerts */}
      {getSecurityScore() < 80 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className={`font-medium text-yellow-800 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {isArabic ? "تحسين الأمان مطلوب" : "Security Improvement Required"}
                </h3>
                <p className={`text-sm text-yellow-700 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {isArabic 
                    ? "نقاط الأمان الحالية أقل من المطلوب. يرجى تفعيل المزيد من إعدادات الأمان."
                    : "Your current security score is below recommended levels. Please enable more security features."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SecuritySettings;
