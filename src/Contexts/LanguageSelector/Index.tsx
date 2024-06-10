import { useEffect, useReducer } from "react";
import { LanguageContext } from "./Context";
import English from "../../lang/en.json";
import Spanish from "../../lang/es.json";

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "Es":
      return {
        ...state,
        text: action.value.text,
        messages: action.value.messages,
      };
    case "En":
      return {
        ...state,
        text: action.value.text,
        messages: action.value.messages,
      };
    default:
      break;
  }
};
const LanguageProvider = ({ children }: any) => {
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
    let langSel = "lang" in localStorage ? localStorage.getItem("lang")! : "En";
    changeLanguage(langSel);
  }, []);
  return (
    <LanguageContext.Provider value={{ state, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
