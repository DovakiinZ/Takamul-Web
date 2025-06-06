
import { useState } from "react";
import { Shield, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface Permission {
  id: string;
  module: string;
  action: string;
  admin: boolean;
  manager: boolean;
  user: boolean;
  description: string;
}

interface PermissionsManagementProps {
  isArabic: boolean;
}

const PermissionsManagement = ({ isArabic }: PermissionsManagementProps) => {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "1",
      module: isArabic ? "العهد" : "Custodies",
      action: isArabic ? "عرض" : "View",
      admin: true,
      manager: true,
      user: true,
      description: isArabic ? "عرض قائمة العهد" : "View custody list"
    },
    {
      id: "2",
      module: isArabic ? "العهد" : "Custodies",
      action: isArabic ? "إضافة" : "Create",
      admin: true,
      manager: true,
      user: false,
      description: isArabic ? "إضافة عهدة جديدة" : "Create new custody"
    },
    {
      id: "3",
      module: isArabic ? "العهد" : "Custodies",
      action: isArabic ? "تعديل" : "Edit",
      admin: true,
      manager: true,
      user: false,
      description: isArabic ? "تعديل بيانات العهد" : "Edit custody data"
    },
    {
      id: "4",
      module: isArabic ? "العهد" : "Custodies",
      action: isArabic ? "حذف" : "Delete",
      admin: true,
      manager: false,
      user: false,
      description: isArabic ? "حذف العهد" : "Delete custody"
    },
    {
      id: "5",
      module: isArabic ? "المستخدمون" : "Users",
      action: isArabic ? "عرض" : "View",
      admin: true,
      manager: true,
      user: false,
      description: isArabic ? "عرض قائمة المستخدمين" : "View users list"
    },
    {
      id: "6",
      module: isArabic ? "المستخدمون" : "Users",
      action: isArabic ? "إدارة" : "Manage",
      admin: true,
      manager: false,
      user: false,
      description: isArabic ? "إدارة المستخدمين والصلاحيات" : "Manage users and permissions"
    }
  ]);

  const togglePermission = (id: string, role: 'admin' | 'manager' | 'user') => {
    setPermissions(prev =>
      prev.map(permission =>
        permission.id === id
          ? { ...permission, [role]: !permission[role] }
          : permission
      )
    );
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      manager: "bg-blue-100 text-blue-800",
      user: "bg-green-100 text-green-800"
    };
    
    const labels = {
      admin: isArabic ? "مدير" : "Admin",
      manager: isArabic ? "مشرف" : "Manager",
      user: isArabic ? "مستخدم" : "User"
    };

    return (
      <Badge className={colors[role as keyof typeof colors]}>
        {labels[role as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-xl font-semibold text-gray-900 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "إدارة الصلاحيات" : "Permissions Management"}
          </h2>
          <p className={`text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "تحديد صلاحيات المستخدمين لكل وحدة في النظام" : "Define user permissions for each module in the system"}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            {isArabic ? "إعادة تعيين" : "Reset"}
          </Button>
          <Button className="bg-takamul-emerald-green hover:bg-green-600">
            <Save className="w-4 h-4 mr-2" />
            {isArabic ? "حفظ التغييرات" : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Role Legend */}
      <div className="flex flex-wrap gap-2">
        {getRoleBadge("admin")}
        {getRoleBadge("manager")}
        {getRoleBadge("user")}
      </div>

      {/* Permissions Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "الوحدة" : "Module"}
              </TableHead>
              <TableHead className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "الإجراء" : "Action"}
              </TableHead>
              <TableHead className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "الوصف" : "Description"}
              </TableHead>
              <TableHead className={`text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                {isArabic ? "مدير" : "Admin"}
              </TableHead>
              <TableHead className={`text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                {isArabic ? "مشرف" : "Manager"}
              </TableHead>
              <TableHead className={`text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                {isArabic ? "مستخدم" : "User"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className={`font-medium ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {permission.module}
                </TableCell>
                <TableCell className={isArabic ? 'font-cairo' : 'font-poppins'}>
                  {permission.action}
                </TableCell>
                <TableCell className={`text-sm text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {permission.description}
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={permission.admin}
                    onCheckedChange={() => togglePermission(permission.id, 'admin')}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={permission.manager}
                    onCheckedChange={() => togglePermission(permission.id, 'manager')}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={permission.user}
                    onCheckedChange={() => togglePermission(permission.id, 'user')}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PermissionsManagement;
