import "./About.scss";
import TypeScript from "../../assets/technologiesIcons/TypeScript.svg";
import React from "../../assets/technologiesIcons/React.svg";
import Angular from "../../assets/technologiesIcons/Angular.svg";
import JavaScript from "../../assets/technologiesIcons/JavaScript.svg";
import PageArrows from "../Shared/PageDownArrows/PageArrows";
import LogicCard from "../Shared/LogicCard/LogicCard";
import { LogicItem } from "../../models/LogicItems/LogicItems";
const About = () => {
  const logicItems: LogicItem[] = [
    { title: "ANALYZE", text: "Analyze the problem or new functionality" },
    {
      title: "DESTRUCTURE",
      text: "Divide the problem into smaller problems to solve them more easily.",
    },
    { title: "SOLVE", text: "Solve each small previously unstructured task" },
    {
      title: "BIND",
      text: "Join the solutions or functionalities to test their performance and correct operation",
    },
  ];
  return (
    <div id="about-container">
      <div className="top-square">
        <h2 className="name">
          <span className="name-line kl"></span>KEVIN
          <span className="name-line kr"></span>
        </h2>
        <h2 className="name">
          <span className="name-line gl"></span>GARCIA
          <span className="name-line gr"></span>
        </h2>
      </div>
      <p className="about-desc">
        <span className="desc-bold">I’m A Front End Developer</span>, I have
        worked on various projects applying efficient and good code optimization
        techniques. I always try to apply the best practices...
      </p>
      <span className="arrows1">
        <PageArrows />
      </span>
      <div className="desc2">
        <p className="about-desc2">
          I have participated in projects using different frameworks for the
          front, in addition to a good implementation of appropriate libraries
          to speed up times. I have also created solutions for applications with
          agility without the need to use or implement an external library...
          <span className="desc-line"></span>
        </p>
        <div className="techs">
          <img className="tech" src={TypeScript} alt="" />
          <img className="tech" src={React} alt="" />
          <img className="tech" src={Angular} alt="" />
          <img className="tech" src={JavaScript} alt="" />
        </div>
      </div>
      <span className="arrows2">
        <PageArrows />
      </span>
      <div className="logical-think-cont">
        <h2 className="logic-think">My Logical Thinking</h2>
        {logicItems.map((item, i) => (
          <div key={i} id="card-container">
            <span className="logic-line"></span>
            <LogicCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
