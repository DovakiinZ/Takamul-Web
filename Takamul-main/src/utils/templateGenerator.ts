
export interface TemplateField {
  name: string;
  type: 'text' | 'number' | 'date' | 'email' | 'select';
  required: boolean;
  options?: string[];
}

export interface TemplateConfig {
  serviceName: string;
  serviceNameArabic: string;
  fields: TemplateField[];
  sampleData: Record<string, any>[];
}

const templateConfigs: Record<string, TemplateConfig> = {
  'Accounting': {
    serviceName: 'Accounting',
    serviceNameArabic: 'المحاسبة',
    fields: [
      { name: 'Account Name', type: 'text', required: true },
      { name: 'Account Code', type: 'text', required: true },
      { name: 'Account Type', type: 'select', required: true, options: ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'] },
      { name: 'Opening Balance', type: 'number', required: false },
      { name: 'Currency', type: 'text', required: true },
      { name: 'Description', type: 'text', required: false }
    ],
    sampleData: [
      {
        'Account Name': 'Cash Account',
        'Account Code': '1001',
        'Account Type': 'Asset',
        'Opening Balance': 50000,
        'Currency': 'SAR',
        'Description': 'Main cash account'
      },
      {
        'Account Name': 'Office Supplies',
        'Account Code': '5001',
        'Account Type': 'Expense',
        'Opening Balance': 0,
        'Currency': 'SAR',
        'Description': 'Office supplies expense account'
      }
    ]
  },
  'e-Invoicing': {
    serviceName: 'e-Invoicing',
    serviceNameArabic: 'الفوترة الإلكترونية',
    fields: [
      { name: 'Invoice Number', type: 'text', required: true },
      { name: 'Customer Name', type: 'text', required: true },
      { name: 'Customer VAT', type: 'text', required: true },
      { name: 'Invoice Date', type: 'date', required: true },
      { name: 'Item Description', type: 'text', required: true },
      { name: 'Quantity', type: 'number', required: true },
      { name: 'Unit Price', type: 'number', required: true },
      { name: 'VAT Rate', type: 'number', required: true }
    ],
    sampleData: [
      {
        'Invoice Number': 'INV-2024-001',
        'Customer Name': 'ABC Company',
        'Customer VAT': '300123456789003',
        'Invoice Date': '2024-01-15',
        'Item Description': 'Consulting Services',
        'Quantity': 1,
        'Unit Price': 5000,
        'VAT Rate': 15
      }
    ]
  },
  'Inventory': {
    serviceName: 'Inventory',
    serviceNameArabic: 'إدارة المخزون',
    fields: [
      { name: 'Item Code', type: 'text', required: true },
      { name: 'Item Name', type: 'text', required: true },
      { name: 'Category', type: 'text', required: true },
      { name: 'Unit of Measure', type: 'text', required: true },
      { name: 'Current Stock', type: 'number', required: true },
      { name: 'Minimum Stock', type: 'number', required: true },
      { name: 'Unit Cost', type: 'number', required: true },
      { name: 'Selling Price', type: 'number', required: true }
    ],
    sampleData: [
      {
        'Item Code': 'ITEM001',
        'Item Name': 'Office Chair',
        'Category': 'Furniture',
        'Unit of Measure': 'PCS',
        'Current Stock': 25,
        'Minimum Stock': 5,
        'Unit Cost': 500,
        'Selling Price': 750
      }
    ]
  },
  'HR & Payroll': {
    serviceName: 'HR & Payroll',
    serviceNameArabic: 'الموارد البشرية',
    fields: [
      { name: 'Employee ID', type: 'text', required: true },
      { name: 'Full Name', type: 'text', required: true },
      { name: 'Email', type: 'email', required: true },
      { name: 'Department', type: 'text', required: true },
      { name: 'Position', type: 'text', required: true },
      { name: 'Hire Date', type: 'date', required: true },
      { name: 'Basic Salary', type: 'number', required: true },
      { name: 'GOSI Number', type: 'text', required: false }
    ],
    sampleData: [
      {
        'Employee ID': 'EMP001',
        'Full Name': 'Ahmed Mohammed Ali',
        'Email': 'ahmed.ali@company.com',
        'Department': 'IT',
        'Position': 'Software Developer',
        'Hire Date': '2024-01-01',
        'Basic Salary': 8000,
        'GOSI Number': '12345678'
      }
    ]
  },
  'CRM': {
    serviceName: 'CRM',
    serviceNameArabic: 'إدارة العملاء',
    fields: [
      { name: 'Customer Name', type: 'text', required: true },
      { name: 'Email', type: 'email', required: true },
      { name: 'Phone', type: 'text', required: true },
      { name: 'Company', type: 'text', required: false },
      { name: 'Lead Source', type: 'select', required: true, options: ['Website', 'Social Media', 'Referral', 'Cold Call'] },
      { name: 'Status', type: 'select', required: true, options: ['New', 'Qualified', 'Proposal', 'Won', 'Lost'] },
      { name: 'Expected Value', type: 'number', required: false }
    ],
    sampleData: [
      {
        'Customer Name': 'Sara Ahmed',
        'Email': 'sara.ahmed@example.com',
        'Phone': '+966501234567',
        'Company': 'Tech Solutions Ltd',
        'Lead Source': 'Website',
        'Status': 'Qualified',
        'Expected Value': 15000
      }
    ]
  },
  'Custodies': {
    serviceName: 'Custodies',
    serviceNameArabic: 'العهد',
    fields: [
      { name: 'Item Name', type: 'text', required: true },
      { name: 'Item Type', type: 'select', required: true, options: ['car', 'phone', 'laptop', 'other'] },
      { name: 'Serial Number', type: 'text', required: true },
      { name: 'Assigned To', type: 'text', required: false },
      { name: 'Description', type: 'text', required: false },
      { name: 'Purchase Date', type: 'date', required: false },
      { name: 'Purchase Value', type: 'number', required: false }
    ],
    sampleData: [
      {
        'Item Name': 'Toyota Camry 2023',
        'Item Type': 'car',
        'Serial Number': 'CAR001',
        'Assigned To': 'Ahmed Mohammed',
        'Description': 'Company car for manager',
        'Purchase Date': '2023-06-15',
        'Purchase Value': 85000
      },
      {
        'Item Name': 'iPhone 14 Pro',
        'Item Type': 'phone',
        'Serial Number': 'PH001',
        'Assigned To': 'Sara Ahmed',
        'Description': 'Work phone',
        'Purchase Date': '2023-09-10',
        'Purchase Value': 4500
      }
    ]
  }
};

export const generateTemplate = (serviceName: string): string => {
  const config = templateConfigs[serviceName];
  if (!config) {
    throw new Error(`Template not found for service: ${serviceName}`);
  }

  const headers = config.fields.map(field => field.name);
  const csvContent = [
    headers.join(','),
    ...config.sampleData.map(row => 
      headers.map(header => `"${row[header] || ''}"`).join(',')
    )
  ].join('\n');

  return csvContent;
};

export const downloadTemplate = (serviceName: string, isArabic: boolean = false): void => {
  try {
    const csvContent = generateTemplate(serviceName);
    const config = templateConfigs[serviceName];
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${serviceName.toLowerCase().replace(/\s+/g, '_')}_template.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading template:', error);
    throw error;
  }
};

export const getTemplateConfig = (serviceName: string): TemplateConfig | null => {
  return templateConfigs[serviceName] || null;
};
