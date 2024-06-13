import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../Contexts/LanguageSelector/Context";
import "./LanguageSelector.scss";

const LanguageSelector = () => {
  const { state, changeLanguage } = useContext(LanguageContext);
  const [activelanguage, setActivelanguage] = useState<string>(state.text);

  const handleLanguage = (language: string) => {
    changeLanguage(language);
    setActivelanguage(language);
  };
  useEffect(() => {
    setActivelanguage(state.text);
  }, [state]);

  return (
    <div className="lang-cont">
      <button
        className={`lang-button ${activelanguage === "Es" && "active"}`}
        onClick={() => handleLanguage("Es")}
      >
        Es
      </button>
      <button
        className={`lang-button ${activelanguage === "En" && "active"}`}
        onClick={() => handleLanguage("En")}
      >
        En
      </button>
    </div>
  );
};

export default LanguageSelector;
