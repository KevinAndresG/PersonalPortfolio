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
import next from "../../assets/Next.js.svg";
import node from "../../assets/Node.js.svg";
import postgres from "../../assets/PostgresSQL.svg";
import python from "../../assets/Python.svg";
import ai from "../../assets/AI.svg";
import n8n from "../../assets/n8n.svg";
import { useContext, useRef } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import { motion } from "framer-motion";
import { pageFade, useRise } from "../../hooks/useRise";

const TECHS: { level: number; title: string; img: string; invert?: boolean }[] =
  [
    { level: 70, title: "JavaScript", img: javaScript },
    { level: 70, title: "Angular", img: angular },
    { level: 90, title: "React", img: react },
    { level: 80, title: "TypeScript", img: typeScript },
    // the Next.js mark is solid black, so it is inverted for the dark water
    { level: 60, title: "Next.js", img: next, invert: true },
    { level: 80, title: "HTML", img: html },
    { level: 80, title: "CSS", img: css },
    { level: 80, title: "Sass", img: sass },
    { level: 40, title: "Bootstrap", img: bootsTrap },
    { level: 70, title: "Tailwind", img: tailWind },
    { level: 80, title: "Git", img: git },
    { level: 50, title: "Node.js", img: node },
    { level: 50, title: "Python", img: python },
    { level: 50, title: "PostgreSQL", img: postgres },
    { level: 60, title: "AI / LLMs", img: ai },
    { level: 50, title: "n8n", img: n8n },
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
          {...pageFade}
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
                  style={
                    { "--level": t.level, "--i": i } as React.CSSProperties
                  }
                  aria-label={`${t.title}, ${t.level}%`}
                >
                  <span className="bead-drop">
                    <img
                      src={t.img}
                      alt=""
                      className={t.invert ? "invert" : ""}
                    />
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
