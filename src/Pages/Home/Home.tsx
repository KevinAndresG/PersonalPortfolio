import "./Home.scss";
import linkedin from "../../assets/Linkedin.svg";
// import twitter from "../../assets/Twitter.svg";
import whatsapp from "../../assets/Whatsapp.svg";
import ReactIcon from "../../assets/React.svg";
import TSIcon from "../../assets/TypeScript.svg";
import AngularIcon from "../../assets/Angular.svg";
import JSIcon from "../../assets/JavaScript.svg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useContext, useEffect, useRef } from "react";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import HoverBoardBackground from "../../Components/HoverBoardBackground/HoverBoardBackground";
import { gsap } from "gsap";

const socialIcons = [
  {
    icon: linkedin,
    link: "https://www.linkedin.com/in/kevinandresg/",
    label: "LinkedIn",
  },
  // { icon: twitter, link: "https://twitter.com/KevinAndresG22", label: "Twitter" },
  { icon: whatsapp, link: "https://wa.me/3117796748", label: "WhatsApp" },
];

const Home = () => {
  const { state } = useContext(LanguageContext);
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!state.text) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.8 },
      )
        .fromTo(
          nameRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.3",
        )
        .fromTo(
          roleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5",
        )
        .fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          socialRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3",
        );
    }, heroRef);
    return () => ctx.revert();
  }, [state.text]);

  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <motion.div
          id="home-container"
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <HoverBoardBackground />

          <div className="hero-content">
            <div className="hero-left">
              <div ref={lineRef} className="accent-line" />

              <h1 ref={nameRef} className="hero-name">
                Kevin
                <br />
                <span className="name-gradient">Garcia</span>
              </h1>

              <h2 ref={roleRef} className="hero-role">
                {state.text === "Es" ? (
                  <>
                    <FormattedMessage id="general.developer" />
                    &nbsp;
                    <span className="role-highlight">
                      <FormattedMessage id="general.front.end" />
                    </span>
                  </>
                ) : (
                  <>
                    <FormattedMessage id="general.front.end" />
                    &nbsp;
                    <span className="role-highlight">
                      <FormattedMessage id="general.developer" />
                    </span>
                  </>
                )}
              </h2>

              <p ref={descRef} className="hero-desc">
                <FormattedMessage id="home.description" />
              </p>

              <div ref={socialRef} className="social-row">
                {socialIcons.map((s) => (
                  <Link
                    key={s.link}
                    to={s.link}
                    target="_blank"
                    className="social-btn"
                  >
                    <img src={s.icon} alt={s.label} className="social-icon" />
                    <span className="social-label">{s.label}</span>
                  </Link>
                ))}
              </div>

              <div ref={ctaRef} className="cta-row">
                <button
                  className="cta-primary"
                  onClick={() => navigate("/work")}
                >
                  <FormattedMessage id="navBar.work" />
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  className="cta-secondary"
                  onClick={() => navigate("/about")}
                >
                  <FormattedMessage id="home.see.more" />
                </button>
              </div>
            </div>

            <div className="hero-right">
              {/* Central orb */}
              <div className="central-orb">
                <span className="orb-code">&lt;/&gt;</span>
                <div className="orb-ring orb-ring-1" />
                <div className="orb-ring orb-ring-2" />
              </div>

              {/* Orbit 1 — React */}
              <div className="orbit-path op-1">
                <div className="orbit-traveler">
                  <div className="orbit-icon-wrap" style={{ "--oi-color": "#61dafb" } as React.CSSProperties}>
                    <img src={ReactIcon} alt="React" />
                    <span>React</span>
                  </div>
                </div>
              </div>

              {/* Orbit 2 — TypeScript */}
              <div className="orbit-path op-2">
                <div className="orbit-traveler">
                  <div className="orbit-icon-wrap" style={{ "--oi-color": "#3178c6" } as React.CSSProperties}>
                    <img src={TSIcon} alt="TypeScript" />
                    <span>TS</span>
                  </div>
                </div>
              </div>

              {/* Orbit 3 — Angular */}
              <div className="orbit-path op-3">
                <div className="orbit-traveler">
                  <div className="orbit-icon-wrap" style={{ "--oi-color": "#dd0031" } as React.CSSProperties}>
                    <img src={AngularIcon} alt="Angular" />
                    <span>Angular</span>
                  </div>
                </div>
              </div>

              {/* Orbit 4 — JavaScript */}
              <div className="orbit-path op-4">
                <div className="orbit-traveler">
                  <div className="orbit-icon-wrap" style={{ "--oi-color": "#f7df1e" } as React.CSSProperties}>
                    <img src={JSIcon} alt="JavaScript" />
                    <span>JS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </IntlProvider>
  );
};

export default Home;
