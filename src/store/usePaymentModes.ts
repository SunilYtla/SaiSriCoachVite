import { create } from "zustand";

interface DataState {
  paymentData: any[];
  setPaymentData: (data: any[]) => void;
  latest: boolean;
  setLatest: (latest: boolean) => void;
}

const usePaymentModeStore = create<DataState>((set) => ({
  paymentData: [],
  setPaymentData: (data) => set({ paymentData: data }),
  latest: false,
  setLatest: (value) => set({ latest: value }),
}));

export default usePaymentModeStore;
