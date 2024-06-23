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
import { useContext, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import HoverBoardBackground from "../../Components/HoverBoardBackground/HoverBoardBackground";
const Knowledge = () => {
  const techs = [
    { level: "60", title: "JAVASCRIPT", img: javaScript },
    { level: "60", title: "ANGULAR", img: angular },
    { level: "60", title: "REACT", img: react },
    { level: "50", title: "TYPESCRIPT", img: typeScript },
    { level: "60", title: "HTML", img: html },
    { level: "70", title: "CSS", img: css },
    { level: "60", title: "SASS", img: sass },
    { level: "40", title: "BOOTSTRAP", img: bootsTrap },
    { level: "50", title: "TAILWIND", img: tailWind },
    { level: "60", title: "GIT", img: git },
    { level: "50", title: "AZURE", img: azure },
  ];
  const [show, setShow] = useState<any>({});
  const { state } = useContext(LanguageContext);

  const hoverTech = (techInfo: any) => {
    setShow(techInfo);
  };

  const showTech = () => (
    <div className={`det-cont ${show.title && "show"}`}>
      {show && (
        <>
          <img src={show.img} alt="" />
          <div className="side-info">
            <h2>{show.title}</h2>
            <div className="level-group">
              <progress max={100} value={show.level} id={show.title}></progress>
              <label htmlFor={show.title}>{show.level}%</label>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <div id="knowledge-container">
          <HoverBoardBackground />
          {show && (
            <div className="tech-details">
              {
                <>
                  {showTech()}
                  {!show.title && (
                    <div className="no-hovered">
                      <h5>
                        <FormattedMessage id="knowledge.title" />
                      </h5>
                    </div>
                  )}
                </>
              }
            </div>
          )}
          <ul className="techs-list">
            {techs.map((tech) => (
              <li
                key={tech.img}
                className="tech-item"
                onMouseEnter={() => hoverTech(tech)}
                onMouseLeave={() => hoverTech({})}
              >
                <img src={tech.img} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </IntlProvider>
  );
};

export default Knowledge;
