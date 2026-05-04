import React, { useEffect, useReducer } from "react";
import { LanguageContext } from "./Context";
import English from "../../lang/en.json";
import Spanish from "../../lang/es.json";

type State = { text: string; messages: Record<string, string> };
type Action = { type: string; value: { text: string; messages: Record<string, string> } };

// eslint-disable-next-line react-refresh/only-export-components
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "Es":
    case "En":
      return { ...state, text: action.value.text, messages: action.value.messages };
    default:
      return state;
  }
};
const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    text: "",
    messages: {},
  });
  const changeLanguage = (lang: string) => {
    localStorage.setItem("lang", lang);
    switch (lang) {
      case "Es":
        dispatch({
          type: lang,
          value: { text: lang, messages: { ...Spanish } },
        });
        break;
      case "En":
        dispatch({
          type: lang,
          value: { text: lang, messages: { ...English } },
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const langSel = "lang" in localStorage ? localStorage.getItem("lang")! : "En";
    changeLanguage(langSel);
  }, []);
  return (
    <LanguageContext.Provider value={{ state, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
