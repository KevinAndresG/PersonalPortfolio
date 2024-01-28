import "./Home.scss";
import linkedin from "../../assets/SocialIcons/Linkedin.svg";
import twitter from "../../assets/SocialIcons/Twitter.svg";
import whatsapp from "../../assets/SocialIcons/Whatsapp.svg";
import { Link, useNavigate } from "react-router-dom";
import Rope from "../Shared/Rope/Rope";
import ScrollReveal from "scrollreveal";
import { useEffect } from "react";

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
  useEffect(() => {
    ScrollReveal().reveal(".see-more-cont", {
      duration: 2000,
      distance: "100px",
    });
  }, []);
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
      <div className="see-more-cont">
        <h3 className="see-more" onClick={seeMoreRedirect}>
          SEE MORE...
          <span className="active"></span>
        </h3>
      </div>
    </div>
  );
};

export default Home;
