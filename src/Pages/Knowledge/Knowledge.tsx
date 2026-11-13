import "./Knowledge.scss";
import javaScript from "../../assets/JavaScriptTechs.svg";
import angular from "../../assets/AngularTechs.svg";
import react from "../../assets/ReactTechs.svg";
import typeScript from "../../assets/TypeScriptTechs.svg";
import html from "../../assets/HtmlTechs.svg";
import css from "../../assets/CssTechs.svg";
import sass from "../../assets/SassTechs.svg";
import bootsTrap from "../../assets/BootstrapTechs.svg";
import tailWind from "../../assets/TailWindTechs.svg";
import git from "../../assets/GitTechs.svg";
import azure from "../../assets/AzureTechs.png";
import { useContext, useRef } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import { motion } from "framer-motion";
import { useRise } from "../../hooks/useRise";

const TECHS = [
  { level: 60, title: "JavaScript", img: javaScript },
  { level: 60, title: "Angular", img: angular },
  { level: 60, title: "React", img: react },
  { level: 50, title: "TypeScript", img: typeScript },
  { level: 60, title: "HTML", img: html },
  { level: 70, title: "CSS", img: css },
  { level: 60, title: "Sass", img: sass },
  { level: 40, title: "Bootstrap", img: bootsTrap },
  { level: 50, title: "Tailwind", img: tailWind },
  { level: 60, title: "Git", img: git },
  { level: 50, title: "Azure", img: azure },
];

const Knowledge = () => {
  const { state } = useContext(LanguageContext);
  const ref = useRef<HTMLElement>(null);
  useRise(ref, state.text);

  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <motion.main
          ref={ref}
          className="page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          <h1 className="page-title">
            <span data-water>
              <FormattedMessage id="knowledge.heading" />
            </span>
          </h1>
          <p className="page-sub muted rise">
            <FormattedMessage id="knowledge.title" />
          </p>

          {/* each skill is a bead of water; its size and ring are the level */}
          <ul className="beads">
            {TECHS.map((t, i) => (
              <li key={t.title} className="rise">
                <button
                  className="bead"
                  style={{ "--level": t.level, "--i": i } as React.CSSProperties}
                  aria-label={`${t.title}, ${t.level}%`}
                >
                  <span className="bead-drop">
                    <img src={t.img} alt="" />
                  </span>
                  <span className="bead-name">{t.title}</span>
                  <span className="bead-level">{t.level}%</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.main>
      )}
    </IntlProvider>
  );
};

export default Knowledge;
