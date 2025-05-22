import { create } from 'zustand';

type Store = {
  passed: boolean;
  setPassed: (value: boolean) => void;
};

export const usePassed = create((set) => ({
  passed: false,
  subject: null,
  setPassed: (value) => set({ passed: value }),
  setSubject: (subject) => set({ subject }),
}));
