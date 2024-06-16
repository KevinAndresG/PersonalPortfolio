import "./About.scss";
import TypeScript from "../../assets/TypeScript.svg";
import React from "../../assets/React.svg";
import Angular from "../../assets/Angular.svg";
import JavaScript from "../../assets/JavaScript.svg";
import PageArrows from "../../Components/PageDownArrows/PageArrows";
import LogicCard from "../../Components/LogicCard/LogicCard";
import { LogicItem } from "../../models/LogicItems/LogicItems";
import { motion } from "framer-motion";
import Clock from "../../Components/Clock/Clock";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useContext } from "react";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import HoverBoardBackground from "../../Components/HoverBoardBackground/HoverBoardBackground";
const About = () => {
  const logicItems: LogicItem[] = [
    {
      title: <FormattedMessage id="about.card.title.analyze" />,
      text: <FormattedMessage id="about.card.text.analyze" />,
    },
    {
      title: <FormattedMessage id="about.card.title.destructure" />,
      text: <FormattedMessage id="about.card.text.destructure" />,
    },
    {
      title: <FormattedMessage id="about.card.title.solve" />,
      text: <FormattedMessage id="about.card.text.solve" />,
    },
    {
      title: <FormattedMessage id="about.card.title.bind" />,
      text: <FormattedMessage id="about.card.text.bind" />,
    },
  ];
  const { state } = useContext(LanguageContext);

  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <motion.div
          id="about-container"
          animate={{
            width: ["0%", "100%"],
            transition: { duration: 1.5 },
          }}
        >
          <HoverBoardBackground />
          <Clock />
          <p className="about-desc">
            <span className="desc-bold">
              <FormattedMessage id="about.im" />
            </span>
            <FormattedMessage id="about.description" />
          </p>
          <span className="arrows1">
            <PageArrows />
          </span>
          <div className="desc2">
            <p className="about-desc2">
              <FormattedMessage id="about.description.two" />
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
            <h2 className="logic-think">
              <FormattedMessage id="about.logical.think" />
            </h2>
            <div className="cards-cont">
              {logicItems.map((item, i) => (
                <div key={i} className="each-card">
                  <div id="card-container">
                    <span className="logic-line"></span>
                    <LogicCard item={item} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </IntlProvider>
  );
};

export default About;
