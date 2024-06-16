import "./Home.scss";
import linkedin from "../../assets/Linkedin.svg";
import twitter from "../../assets/Twitter.svg";
import whatsapp from "../../assets/Whatsapp.svg";
import { Link, useNavigate } from "react-router-dom";
import Rope from "../../Components/Rope/Rope";
import { motion } from "framer-motion";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useContext } from "react";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import HoverBoardBackground from "../../Components/HoverBoardBackground/HoverBoardBackground";

const Home = () => {
  let socialIcons = [
    { icon: linkedin, link: "https://www.linkedin.com/in/kevinandresg/" },
    { icon: twitter, link: "https://twitter.com/KevinAndresG22" },
    { icon: whatsapp, link: "https://wa.me/3117796748" },
  ];
  const { state } = useContext(LanguageContext);
  const navigate = useNavigate();

  const seeMoreRedirect = () => {
    navigate("/about");
  };
  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <motion.div id="home-container">
          <HoverBoardBackground />
          <Rope />
          <div className="info-cont">
            <h2 className="front-d">
              {state.text === "Es" ? (
                <span style={{ letterSpacing: "15px" }}>
                  <FormattedMessage id="general.developer" />
                </span>
              ) : (
                <FormattedMessage id="general.front.end" />
              )}
              {state.text === "Es" ? (
                <span className="developer" style={{ letterSpacing: "0" }}>
                  <FormattedMessage id="general.front.end" />
                </span>
              ) : (
                <span className="developer" style={{ letterSpacing: "30px" }}>
                  <FormattedMessage id="general.developer" />
                </span>
              )}
            </h2>
            <p className="desc">
              <FormattedMessage id="home.description" />
            </p>
          </div>
          <div className="social-icons">
            <div className="icons-container">
              {socialIcons.map((icons) => (
                <Link key={icons.link} target="_blank" to={icons.link}>
                  <img
                    key={icons.link}
                    src={icons.icon}
                    alt="social"
                    className="social-icon"
                  />
                </Link>
              ))}
            </div>
            <h1 className="contact">
              <FormattedMessage id="home.contact" />
            </h1>
          </div>
          <motion.div
            className="hide-content"
            initial={{ top: -window.innerHeight / 4.5 }}
            animate={{ top: window.innerHeight, transition: { duration: 1 } }}
            exit={{
              top: -window.innerHeight / 4.5,
              transition: { duration: 1 },
            }}
          >
            <span className="hover-panel"></span>
            <div className="see-more-cont">
              <h3 className="see-more" onClick={seeMoreRedirect}>
                <FormattedMessage id="home.see.more" />
                ...
                <span className="active"></span>
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </IntlProvider>
  );
};

export default Home;
