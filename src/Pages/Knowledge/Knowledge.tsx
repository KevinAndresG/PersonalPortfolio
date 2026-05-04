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
import { useContext, useEffect, useRef, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import HoverBoardBackground from "../../Components/HoverBoardBackground/HoverBoardBackground";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

type TechInfo = { level: number; title: string; img: string; color: string };

const TECHS: TechInfo[] = [
  { level: 60, title: "JavaScript", img: javaScript, color: "#f7df1e" },
  { level: 60, title: "Angular",    img: angular,    color: "#dd0031" },
  { level: 60, title: "React",      img: react,      color: "#61dafb" },
  { level: 50, title: "TypeScript", img: typeScript, color: "#3178c6" },
  { level: 60, title: "HTML",       img: html,       color: "#e34f26" },
  { level: 70, title: "CSS",        img: css,        color: "#1572b6" },
  { level: 60, title: "Sass",       img: sass,       color: "#cc6699" },
  { level: 40, title: "Bootstrap",  img: bootsTrap,  color: "#7952b3" },
  { level: 50, title: "Tailwind",   img: tailWind,   color: "#06b6d4" },
  { level: 60, title: "Git",        img: git,        color: "#f05032" },
  { level: 50, title: "Azure",      img: azure,      color: "#0078d4" },
];

const Knowledge = () => {
  const [active, setActive] = useState<TechInfo | null>(null);
  const { state } = useContext(LanguageContext);
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!state.text || !gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".tech-item", {
        y: 20,
        opacity: 0,
        scale: 0.88,
        stagger: 0.04,
        duration: 0.45,
        ease: "back.out(1.3)",
        delay: 0.3,
        clearProps: "all",
      });
    }, gridRef);
    return () => ctx.revert();
  }, [state.text]);

  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <motion.div
          id="knowledge-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <HoverBoardBackground />

          <div className="knowledge-inner">
            <div className="knowledge-header">
              <span className="section-eyebrow-k">Skills</span>
              <h1 className="knowledge-title">Tech Stack</h1>
              <p className="knowledge-subtitle">
                <FormattedMessage id="knowledge.title" />
              </p>
            </div>

            {/* Active tech detail */}
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.title}
                  className="tech-detail-panel"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  style={{ "--tech-color": active.color } as React.CSSProperties}
                >
                  <img src={active.img} alt={active.title} className="detail-img" />
                  <div className="detail-info">
                    <h2>{active.title}</h2>
                    <div className="skill-bar-wrap">
                      <div className="skill-bar-track">
                        <motion.div
                          className="skill-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${active.level}%`, transition: { duration: 0.6, ease: "easeOut" } }}
                          style={{ background: active.color }}
                        />
                      </div>
                      <span className="skill-pct">{active.level}%</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="tech-detail-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <span>↑</span>
                  <p><FormattedMessage id="knowledge.title" /></p>
                </motion.div>
              )}
            </AnimatePresence>

            <ul className="techs-list" ref={gridRef}>
              {TECHS.map((tech) => (
                <li
                  key={tech.title}
                  className={`tech-item ${active?.title === tech.title ? "active-tech" : ""}`}
                  style={{ "--tech-color": tech.color } as React.CSSProperties}
                  onMouseEnter={() => setActive(tech)}
                  onMouseLeave={() => setActive(null)}
                >
                  <div className="tech-item-inner">
                    <img src={tech.img} alt={tech.title} />
                    <span className="tech-name">{tech.title}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </IntlProvider>
  );
};

export default Knowledge;
