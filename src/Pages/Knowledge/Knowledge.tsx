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
import { useState } from "react";
const Knowledge = () => {
  const techs = [
    { level: "70", title: "JAVASCRIPT", img: javaScript },
    { level: "50", title: "ANGULAR", img: angular },
    { level: "80", title: "REACT", img: react },
    { level: "50", title: "TYPESCRIPT", img: typeScript },
    { level: "70", title: "HTML", img: html },
    { level: "80", title: "CSS", img: css },
    { level: "60", title: "SASS", img: sass },
    { level: "40", title: "BOOTSTRAP", img: bootsTrap },
    { level: "40", title: "TAILWIND", img: tailWind },
    { level: "60", title: "GIT", img: git },
    { level: "50", title: "AZURE", img: azure },
  ];
  const [show, setShow] = useState<any>({
    isHover: false,
    tech: null,
  });
  const hoverTech = (techInfo: any) => {
    setShow(techInfo);
  };
  const showTech = () => {
    return show.tech ? (
      <>
        <img src={show.tech.img} alt="" />
        <div className="side-info">
          <h2>{show.tech.title}</h2>
          <div className="level-group">
            <progress
              max={100}
              value={show.tech.level}
              id={show.tech.title}
            ></progress>
            <label htmlFor={show.tech.title}>{show.tech.level}%</label>
          </div>
        </div>
      </>
    ) : (
      <div className="no-hovered">
        <h5>Hover on any of the technologies to see the info</h5>
      </div>
    );
  };
  return (
    <div id="knowledge-container">
      {show && <div className="tech-details">{showTech()}</div>}
      <ul className="techs-list">
        {techs.map((tech) => (
          <li
            key={tech.img}
            className="tech-item"
            onMouseEnter={() => hoverTech({ isHover: true, tech: tech })}
            onMouseLeave={() => hoverTech({ isHover: false, tech: null })}
          >
            <img src={tech.img} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Knowledge;
