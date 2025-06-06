
import { useState } from "react";
import { Plus, Search, Edit2, Trash2, MoreHorizontal, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  lastLogin: string;
}

interface UserManagementProps {
  isArabic: boolean;
}

const UserManagement = ({ isArabic }: UserManagementProps) => {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "أحمد محمد",
      email: "ahmed.mohamed@takamul.sa",
      role: "Admin",
      department: "IT",
      status: "active",
      lastLogin: "2024-01-15"
    },
    {
      id: "2",
      name: "سارة أحمد",
      email: "sara.ahmed@takamul.sa",
      role: "Manager",
      department: "HR",
      status: "active",
      lastLogin: "2024-01-14"
    },
    {
      id: "3",
      name: "محمد علي",
      email: "mohamed.ali@takamul.sa",
      role: "User",
      department: "Finance",
      status: "inactive",
      lastLogin: "2024-01-10"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">{isArabic ? "نشط" : "Active"}</Badge>
    ) : (
      <Badge variant="secondary">{isArabic ? "غير نشط" : "Inactive"}</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-xl font-semibold text-gray-900 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "إدارة المستخدمين" : "User Management"}
          </h2>
          <p className={`text-gray-600 ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
            {isArabic ? "إضافة وإدارة المستخدمين وصلاحياتهم" : "Add and manage users and their permissions"}
          </p>
        </div>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-takamul-emerald-green hover:bg-green-600">
              <UserPlus className="w-4 h-4 mr-2" />
              {isArabic ? "إضافة مستخدم" : "Add User"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "إضافة مستخدم جديد" : "Add New User"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder={isArabic ? "الاسم الكامل" : "Full Name"} />
              <Input placeholder={isArabic ? "البريد الإلكتروني" : "Email Address"} />
              <Input placeholder={isArabic ? "القسم" : "Department"} />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  {isArabic ? "إلغاء" : "Cancel"}
                </Button>
                <Button className="bg-takamul-emerald-green hover:bg-green-600">
                  {isArabic ? "إضافة" : "Add"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder={isArabic ? "البحث عن المستخدمين..." : "Search users..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "الاسم" : "Name"}
              </TableHead>
              <TableHead className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "البريد الإلكتروني" : "Email"}
              </TableHead>
              <TableHead className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "الدور" : "Role"}
              </TableHead>
              <TableHead className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "القسم" : "Department"}
              </TableHead>
              <TableHead className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "الحالة" : "Status"}
              </TableHead>
              <TableHead className={isArabic ? 'font-cairo' : 'font-poppins'}>
                {isArabic ? "آخر دخول" : "Last Login"}
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className={`font-medium ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
                  {user.name}
                </TableCell>
                <TableCell className={isArabic ? 'font-cairo' : 'font-poppins'}>
                  {user.email}
                </TableCell>
                <TableCell className={isArabic ? 'font-cairo' : 'font-poppins'}>
                  {user.role}
                </TableCell>
                <TableCell className={isArabic ? 'font-cairo' : 'font-poppins'}>
                  {user.department}
                </TableCell>
                <TableCell>
                  {getStatusBadge(user.status)}
                </TableCell>
                <TableCell className={isArabic ? 'font-cairo' : 'font-poppins'}>
                  {user.lastLogin}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Edit2 className="w-4 h-4 mr-2" />
                        {isArabic ? "تعديل" : "Edit"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        {isArabic ? "حذف" : "Delete"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
