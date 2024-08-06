import { create } from "zustand";

interface DataState {
  data: any[];
  setData: (data: any[]) => void;
}

const useWorkTypeStore: () => DataState = create<DataState>((set) => ({
  latest: false,
  data: [],
  setData: (data: any[]) => set({ data }),
  setLatest: (latest: boolean) => {}, // Add an empty function or provide a valid expression here
}));

export default useWorkTypeStore;
