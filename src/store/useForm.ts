import { create } from "zustand";

interface EmployeeInfo {
  name: string;
  age: number;
  position: string;
  address: string;
  phone: string;
  nickname: string;
}

interface EmployeeStore {
  employeeInfo: EmployeeInfo;
  setEmployeeInfo: (data: EmployeeInfo) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employeeInfo: {
    name: "",
    age: 0,
    position: "",
    address: "",
    phone: "",
    nickname: "",
  },
  setEmployeeInfo: (data: EmployeeInfo) => set({ employeeInfo: data }),
}));

export type { EmployeeInfo };

interface FormData {
  date: string | null;
  quotationnumber: string | null;
  recipientAddress: string | null;
  totalamount: string | null;
  subject: string | null;
  bodytext: string | null;
  recipientName: string | null;
  sender: string | null;
  [key: string]: string | null; // Index signature
}

interface FormStore {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  formData: {
    quotationnumber: null,
    date: null,
    recipientName: null,
    recipientAddress: null,
    totalamount: null,
    subject: null,
    bodytext: null,
    sender: null,
    letterhead: null,
  },
  setFormData: (data: FormData) => set({ formData: data }),
}));

export type { FormData };
