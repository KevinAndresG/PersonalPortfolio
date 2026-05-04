import "./About.scss";
import TypeScript from "../../assets/TypeScript.svg";
import ReactIcon from "../../assets/React.svg";
import Angular from "../../assets/Angular.svg";
import JavaScript from "../../assets/JavaScript.svg";
import LogicCard from "../../Components/LogicCard/LogicCard";
import { LogicItem } from "../../models/LogicItems/LogicItems";
import { motion } from "framer-motion";
import Clock from "../../Components/Clock/Clock";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useContext, useEffect, useRef } from "react";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import HoverBoardBackground from "../../Components/HoverBoardBackground/HoverBoardBackground";
import MagneticCard from "../../Components/MagneticCard/MagneticCard";
import { gsap } from "gsap";

const TECH_ICONS = [
  { src: TypeScript, alt: "TypeScript", color: "#3178c6" },
  { src: ReactIcon, alt: "React", color: "#61dafb" },
  { src: Angular, alt: "Angular", color: "#dd0031" },
  { src: JavaScript, alt: "JavaScript", color: "#f7df1e" },
];

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!state.text) return;
    const ctx = gsap.context(() => {
      // Hero elements animate on mount (no ScrollTrigger — already in viewport)
      gsap.from(".hero-anim", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1,
      });
      // Tech cards animate on mount with slight delay
      gsap.from(".tech-card", {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.3)",
        delay: 0.4,
      });
      // Logic cards — animate on mount with stagger (avoid ScrollTrigger route-change timing issues)
      gsap.from(".reveal-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [state.text]);

  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <motion.div
          id="about-container"
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <HoverBoardBackground />

          {/* Clock: decorative, positioned in top-right */}
          <div className="clock-deco">
            <Clock />
          </div>

          {/* Hero section */}
          <section className="about-hero">
            <div className="about-hero-left">
              <span className="section-eyebrow hero-anim">About me</span>
              <h1 className="about-title hero-anim">
                <span className="text-gradient">
                  <FormattedMessage id="about.im" />
                </span>
              </h1>
              <p className="about-desc hero-anim">
                <FormattedMessage id="about.description" />
              </p>
              <p className="about-desc2 hero-anim">
                <FormattedMessage id="about.description.two" />
              </p>
            </div>
            <div className="about-hero-right">
              <div className="techs-grid">
                {TECH_ICONS.map((t, i) => (
                  <MagneticCard key={t.alt} strength={0.4}>
                    <div
                      className={`tech-card tech-card-${i}`}
                      style={{ "--tech-card-color": t.color } as React.CSSProperties}
                    >
                      <img src={t.src} alt={t.alt} />
                      <span style={{ color: t.color }}>{t.alt}</span>
                    </div>
                  </MagneticCard>
                ))}
              </div>
            </div>
          </section>

          {/* Logic section */}
          <section className="logic-section">
            <div>
              <span className="section-eyebrow">Process</span>
              <h2 className="logic-title">
                <FormattedMessage id="about.logical.think" />
              </h2>
            </div>
            <div className="logic-grid">
              {logicItems.map((item, i) => (
                <div key={i} className="reveal-card">
                  <LogicCard item={item} index={i} />
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      )}
    </IntlProvider>
  );
};

export default About;
