import { create } from "zustand";

interface DataState {
  data: any[];
  setData: (data: any[]) => void;
}

const useBusTypeStore = create<DataState>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export default useBusTypeStore;
