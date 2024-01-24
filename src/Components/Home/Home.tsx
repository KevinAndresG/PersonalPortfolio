import "./Home.scss";
import linkedin from "../../assets/SocialIcons/Linkedin.svg";
import twitter from "../../assets/SocialIcons/Twitter.svg";
import whatsapp from "../../assets/SocialIcons/Whatsapp.svg";
import { useNavigate } from "react-router-dom";
import Rope from "../Shared/Rope/Rope";

const Home = () => {
  let socialIcons = [linkedin, twitter, whatsapp];
  const navigate = useNavigate();

  const navigationMenu = () => {
    navigate("/about");
  };
  return (
    <div id="home-container">
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
        {socialIcons.map((icon) => (
          <img key={icon} src={icon} alt="social" className="social-icon" />
        ))}
      </div>
      <div className="see-more-cont">
        <h3 className="see-more" onClick={navigationMenu}>
          SEE MORE...
          <span className="active"></span>
        </h3>
      </div>
    </div>
  );
};

export default Home;
