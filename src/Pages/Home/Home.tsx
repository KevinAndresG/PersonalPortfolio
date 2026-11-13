import "./Home.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useContext, useRef } from "react";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import { pageFade, useRise } from "../../hooks/useRise";

const SOCIAL = [
  { label: "LinkedIn", link: "https://www.linkedin.com/in/kevinandresg/" },
  { label: "WhatsApp", link: "https://wa.me/3117796748" },
];

const Home = () => {
  const { state } = useContext(LanguageContext);
  const ref = useRef<HTMLElement>(null);
  useRise(ref, state.text);

  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <motion.main
          ref={ref}
          className="page home"
          {...pageFade}
        >
          <h1 className="home-name">
            <span data-water>Kevin</span>
            <span data-water>Garcia</span>
          </h1>

          <div className="home-row">
            <div className="home-intro">
              <p className="home-role rise">
                <FormattedMessage id="home.role" />
              </p>
              <p className="lead rise">
                <FormattedMessage id="home.description" />
              </p>
            </div>

            <div className="home-actions">
              <div className="home-cta rise">
                <Link to="/about" className="btn glass">
                  <FormattedMessage id="home.cta.about" />
                </Link>
                <Link to="/work" className="btn btn-solid">
                  <FormattedMessage id="home.cta.work" />
                </Link>
              </div>
              <div className="home-social rise">
                {SOCIAL.map((s) => (
                  <a key={s.link} href={s.link} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <p className="home-hint muted rise">
            <FormattedMessage id="home.hint" />
          </p>
        </motion.main>
      )}
    </IntlProvider>
  );
};

export default Home;
