
export interface TestItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

export interface Patient {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email?: string;
}

export interface Registration {
  id: string; // Reg Number: LAB-YYYYMMDD-XXXX
  patient: Patient;
  tests: TestItem[];
  totalAmount: number;
  discount: number;
  paidAmount: number;
  registrationDate: string;
  deliveryDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Delivered';
  notes?: string;
}

export type ViewType = 'dashboard' | 'registration' | 'history' | 'inventory' | 'settings';
