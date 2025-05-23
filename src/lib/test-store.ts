import { create } from 'zustand';

interface TestState {
  count: number;
  increment: () => void;
}

export const useTestStore = create<TestState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
