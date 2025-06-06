
import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, Check, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { downloadTemplate } from '@/utils/templateGenerator';

interface BulkUploadProps {
  isArabic: boolean;
  serviceName: string;
  serviceNameArabic: string;
  onUpload?: (file: File) => void;
}

interface UploadResult {
  success: boolean;
  message: string;
  recordsProcessed?: number;
  errors?: string[];
}

const BulkUpload = ({ isArabic, serviceName, serviceNameArabic, onUpload }: BulkUploadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: isArabic ? "نوع ملف غير صحيح" : "Invalid File Type",
        description: isArabic ? "يرجى رفع ملف Excel أو CSV فقط" : "Please upload Excel or CSV files only",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setUploadResult(null);

    // Simulate file processing
    setTimeout(() => {
      const mockResult: UploadResult = {
        success: true,
        message: isArabic ? "تم رفع الملف بنجاح" : "File uploaded successfully",
        recordsProcessed: Math.floor(Math.random() * 100) + 10,
        errors: Math.random() > 0.7 ? [
          isArabic ? "تحذير: بعض الصفوف تحتوي على بيانات غير مكتملة" : "Warning: Some rows contain incomplete data"
        ] : []
      };

      setUploadResult(mockResult);
      setIsProcessing(false);

      if (onUpload) {
        onUpload(file);
      }

      toast({
        title: mockResult.success ? (isArabic ? "نجح الرفع" : "Upload Successful") : (isArabic ? "فشل الرفع" : "Upload Failed"),
        description: mockResult.message,
        variant: mockResult.success ? "default" : "destructive"
      });
    }, 2000);
  };

  const handleDownloadTemplate = () => {
    try {
      downloadTemplate(serviceName, isArabic);
      toast({
        title: isArabic ? "تم تحميل القالب" : "Template Downloaded",
        description: isArabic ? `تم تحميل قالب ${serviceNameArabic} بنجاح` : `${serviceName} template downloaded successfully`
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          variant="outline"
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          <Upload className="w-4 h-4 mr-1" />
          {isArabic ? "رفع ملف" : "Upload"}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right" dir={isArabic ? 'rtl' : 'ltr'}>
            {isArabic ? `رفع ملف جماعي - ${serviceNameArabic}` : `Bulk Upload - ${serviceName}`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4" dir={isArabic ? 'rtl' : 'ltr'}>
          <Button 
            onClick={handleDownloadTemplate}
            variant="outline" 
            className="w-full"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            {isArabic ? "تحميل القالب" : "Download Template"}
          </Button>

          <Card className={`border-2 border-dashed transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}>
            <CardContent 
              className="p-6 text-center cursor-pointer"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {isProcessing ? (
                <div className="space-y-2">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-gray-600">
                    {isArabic ? "جاري معالجة الملف..." : "Processing file..."}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">
                    {isArabic ? "اسحب وأفلت الملف هنا أو انقر للتحديد" : "Drag and drop file here or click to select"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isArabic ? "Excel, CSV (الحد الأقصى 10 ميجابايت)" : "Excel, CSV (Max 10MB)"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {uploadResult && (
            <Card className={`${uploadResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  {uploadResult.success ? (
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${uploadResult.success ? 'text-green-800' : 'text-red-800'}`}>
                      {uploadResult.message}
                    </p>
                    {uploadResult.recordsProcessed && (
                      <p className="text-xs text-gray-600 mt-1">
                        {isArabic ? `تم معالجة ${uploadResult.recordsProcessed} سجل` : `${uploadResult.recordsProcessed} records processed`}
                      </p>
                    )}
                    {uploadResult.errors && uploadResult.errors.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {uploadResult.errors.map((error, index) => (
                          <div key={index} className="flex items-center space-x-1 text-xs text-amber-700">
                            <AlertCircle className="w-3 h-3" />
                            <span>{error}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUpload;
