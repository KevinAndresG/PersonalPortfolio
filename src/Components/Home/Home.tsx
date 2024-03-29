import "./Home.scss";
import linkedin from "../../assets/SocialIcons/Linkedin.svg";
import twitter from "../../assets/SocialIcons/Twitter.svg";
import whatsapp from "../../assets/SocialIcons/Whatsapp.svg";
import { Link, useNavigate } from "react-router-dom";
import Rope from "../Shared/Rope/Rope";
import { motion } from "framer-motion";

const Home = () => {
  let socialIcons = [
    { icon: linkedin, link: "https://www.linkedin.com/in/kevinandresg/" },
    { icon: twitter, link: "https://twitter.com/KevinAndresG22" },
    { icon: whatsapp, link: "https://wa.me/3117796748" },
  ];
  const navigate = useNavigate();

  const seeMoreRedirect = () => {
    navigate("/about");
  };
  return (
    <motion.div id="home-container">
      <Rope />
      <div className="info-cont">
        <h2 className="front-d">
          <span>Front End</span>
          <span className="developer">DEVELOPER</span>
        </h2>
        <p className="desc">
          Look At My Profile, My Mrojects, My History And My Desire To Improve
          Myself More And More Every Day...
        </p>
      </div>
      <div className="social-icons">
        {socialIcons.map((icons) => (
          <Link target="_blank" to={icons.link}>
            <img
              key={icons.link}
              src={icons.icon}
              alt="social"
              className="social-icon"
            />
          </Link>
        ))}
      </div>
      <motion.div
        className="hide-content"
        initial={{ top: -window.innerHeight / 4.5 }}
        animate={{ top: window.innerHeight, transition: { duration: 1 } }}
        exit={{ top: -window.innerHeight / 4.5, transition: { duration: 1 } }}
      >
        <span className="hover-panel"></span>
        <div className="see-more-cont">
          <h3 className="see-more" onClick={seeMoreRedirect}>
            SEE MORE...
            <span className="active"></span>
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
