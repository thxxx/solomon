import create from "zustand";

export type UserState = {
  darkMode: boolean;
  question: string;
  answer: string;
  setDarkMode: (by: boolean) => void;
  setQuestion: (by: string) => void;
  setAnswer: (by: string) => void;
};

export const useStore = create<UserState>((set) => ({
  darkMode: false,
  question: "",
  answer: "",
  setDarkMode: (by) => {
    set((state) => ({ ...state, darkMode: by }));
  },
  setQuestion: (by) => {
    set((state) => ({ ...state, question: by }));
  },
  setAnswer: (by) => {
    set((state) => ({ ...state, answer: by }));
  },
}));
