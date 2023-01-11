import create from "zustand";

export type UserState = {
  darkMode: boolean;
  question: string;
  answer: string;
  uid: string;
  setDarkMode: (by: boolean) => void;
  setQuestion: (by: string) => void;
  setAnswer: (by: string) => void;
  setUid: (by: string) => void;
};

export const useStore = create<UserState>((set) => ({
  darkMode: false,
  question: "",
  answer: "",
  uid: "anonymous",
  setDarkMode: (by) => {
    set((state) => ({ ...state, darkMode: by }));
  },
  setQuestion: (by) => {
    set((state) => ({ ...state, question: by }));
  },
  setAnswer: (by) => {
    set((state) => ({ ...state, answer: by }));
  },
  setUid: (by) => {
    set((state) => ({ ...state, uid: by }));
  },
}));
