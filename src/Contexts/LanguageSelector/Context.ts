import { createContext } from "react";
const state = {
  state: {
    text: "En",
    messages: {},
  },
  changeLanguage: (_lang: string) => {},
};
export const LanguageContext = createContext(state);
