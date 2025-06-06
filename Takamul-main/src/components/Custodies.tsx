import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import BulkUpload from "./BulkUpload";
import { Plus, Car, Smartphone, Laptop, Package, Edit, Trash2, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from '@/hooks/use-toast';
import { downloadTemplate } from '@/utils/templateGenerator';

interface CustodyItem {
  id: string;
  itemName: string;
  itemType: 'car' | 'phone' | 'laptop' | 'other';
  serialNumber: string;
  assignedTo: string;
  assignedDate: string;
  status: 'assigned' | 'available' | 'maintenance';
  description: string;
}

interface CustodiesProps {
  isArabic: boolean;
}

const Custodies = ({ isArabic }: CustodiesProps) => {
  const [custodies, setCustodies] = useState<CustodyItem[]>([
    {
      id: "1",
      itemName: isArabic ? "سيارة كامري" : "Camry Car",
      itemType: "car",
      serialNumber: "CAR001",
      assignedTo: isArabic ? "أحمد محمد" : "Ahmed Mohammed",
      assignedDate: "2024-01-15",
      status: "assigned",
      description: isArabic ? "سيارة الشركة للمدير" : "Company car for manager"
    },
    {
      id: "2",
      itemName: isArabic ? "آيفون 14" : "iPhone 14",
      itemType: "phone",
      serialNumber: "PH001",
      assignedTo: isArabic ? "سارة أحمد" : "Sara Ahmed",
      assignedDate: "2024-02-10",
      status: "assigned",
      description: isArabic ? "هاتف العمل" : "Work phone"
    },
    {
      id: "3",
      itemName: isArabic ? "لابتوب ديل" : "Dell Laptop",
      itemType: "laptop",
      serialNumber: "LAP001",
      assignedTo: "",
      assignedDate: "",
      status: "available",
      description: isArabic ? "لابتوب للموظفين الجدد" : "Laptop for new employees"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'car': return Car;
      case 'phone': return Smartphone;
      case 'laptop': return Laptop;
      default: return Package;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'text-green-600 bg-green-100';
      case 'available': return 'text-blue-600 bg-blue-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    if (isArabic) {
      switch (status) {
        case 'assigned': return 'مُسند';
        case 'available': return 'متاح';
        case 'maintenance': return 'صيانة';
        default: return status;
      }
    }
    return status;
  };

  const handleAddCustody = (data: any) => {
    const newCustody: CustodyItem = {
      id: Date.now().toString(),
      ...data,
      assignedDate: data.assignedTo ? new Date().toISOString().split('T')[0] : '',
      status: data.assignedTo ? 'assigned' : 'available'
    };
    
    setCustodies([...custodies, newCustody]);
    setIsAddDialogOpen(false);
    form.reset();
    
    toast({
      title: isArabic ? "تم إضافة العهدة" : "Custody Added",
      description: isArabic ? "تم إضافة العهدة بنجاح" : "Custody item added successfully"
    });
  };

  const handleDownloadSample = () => {
    try {
      downloadTemplate('Custodies', isArabic);
      toast({
        title: isArabic ? "تم تحميل القالب" : "Template Downloaded",
        description: isArabic ? "تم تحميل قالب العهد بنجاح" : "Custodies template downloaded successfully"
      });
    } catch (error) {
      toast({
        title: isArabic ? "خطأ في التحميل" : "Download Error",
        description: isArabic ? "حدث خطأ أثناء تحميل القالب" : "An error occurred while downloading the template",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6" dir={isArabic ? 'rtl' : 'ltr'}>
      <Card className="bg-white/90 backdrop-blur-md border border-blue-100 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`text-2xl font-bold text-takamul-royal-blue text-center ${isArabic ? 'font-cairo' : 'font-poppins'}`}>
              {isArabic ? "إدارة العهد" : "Custodies Management"}
            </CardTitle>
            <div className="flex items-center space-x-3">
              <BulkUpload 
                isArabic={isArabic}
                serviceName="Custodies"
                serviceNameArabic="العهد"
                onUpload={() => {}}
              />
              <Button 
                onClick={handleDownloadSample}
                variant="outline"
                size="sm"
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                {isArabic ? "تحميل نموذج" : "Download Sample"}
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-takamul-emerald-green hover:bg-green-600">
                    <Plus className="w-4 h-4 mr-1" />
                    {isArabic ? "إضافة عهدة" : "Add Custody"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-right" dir={isArabic ? 'rtl' : 'ltr'}>
                      {isArabic ? "إضافة عهدة جديدة" : "Add New Custody"}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddCustody)} className="space-y-4" dir={isArabic ? 'rtl' : 'ltr'}>
                      <FormField
                        control={form.control}
                        name="itemName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isArabic ? "اسم العهدة" : "Item Name"}</FormLabel>
                            <FormControl>
                              <Input {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="itemType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isArabic ? "نوع العهدة" : "Item Type"}</FormLabel>
                            <FormControl>
                              <select {...field} className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm" required>
                                <option value="">{isArabic ? "اختر النوع" : "Select Type"}</option>
                                <option value="car">{isArabic ? "سيارة" : "Car"}</option>
                                <option value="phone">{isArabic ? "هاتف" : "Phone"}</option>
                                <option value="laptop">{isArabic ? "لابتوب" : "Laptop"}</option>
                                <option value="other">{isArabic ? "أخرى" : "Other"}</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="serialNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isArabic ? "الرقم التسلسلي" : "Serial Number"}</FormLabel>
                            <FormControl>
                              <Input {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="assignedTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isArabic ? "مُسند إلى" : "Assigned To"}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder={isArabic ? "اختياري" : "Optional"} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isArabic ? "الوصف" : "Description"}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-takamul-emerald-green hover:bg-green-600">
                        {isArabic ? "إضافة" : "Add"}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">{isArabic ? "النوع" : "Type"}</TableHead>
                <TableHead className="text-center">{isArabic ? "اسم العهدة" : "Item Name"}</TableHead>
                <TableHead className="text-center">{isArabic ? "الرقم التسلسلي" : "Serial Number"}</TableHead>
                <TableHead className="text-center">{isArabic ? "مُسند إلى" : "Assigned To"}</TableHead>
                <TableHead className="text-center">{isArabic ? "تاريخ الإسناد" : "Assigned Date"}</TableHead>
                <TableHead className="text-center">{isArabic ? "الحالة" : "Status"}</TableHead>
                <TableHead className="text-center">{isArabic ? "الإجراءات" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {custodies.map((custody) => {
                const IconComponent = getTypeIcon(custody.itemType);
                return (
                  <TableRow key={custody.id}>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <IconComponent className="w-5 h-5 text-takamul-royal-blue" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium">{custody.itemName}</TableCell>
                    <TableCell className="text-center">{custody.serialNumber}</TableCell>
                    <TableCell className="text-center">{custody.assignedTo || (isArabic ? "غير مُسند" : "Unassigned")}</TableCell>
                    <TableCell className="text-center">{custody.assignedDate || "-"}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(custody.status)}`}>
                        {getStatusText(custody.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Custodies;
