import "./About.scss";
import { motion } from "framer-motion";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useContext, useRef } from "react";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import { pageFade, useRise } from "../../hooks/useRise";

const STEPS = ["analyze", "destructure", "solve", "bind"];

const About = () => {
  const { state } = useContext(LanguageContext);
  const ref = useRef<HTMLElement>(null);
  useRise(ref, state.text);

  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <motion.main
          ref={ref}
          className="page about"
          {...pageFade}
        >
          <h1 className="page-title">
            <span data-water>
              <FormattedMessage id="about.title" />
            </span>
          </h1>

          <div className="about-text">
            <p className="about-lead rise">
              <FormattedMessage id="about.im" />
            </p>
            <p className="muted rise">
              <FormattedMessage id="about.description.two" />
            </p>
          </div>

          <section className="flow">
            <h2 className="rise">
              <FormattedMessage id="about.logical.think" />
            </h2>
            <ol>
              {STEPS.map((s) => (
                <li key={s} className="rise">
                  <span className="flow-drop" aria-hidden="true" />
                  <h3>
                    <FormattedMessage id={`about.card.title.${s}`} />
                  </h3>
                  <p className="muted">
                    <FormattedMessage id={`about.card.text.${s}`} />
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </motion.main>
      )}
    </IntlProvider>
  );
};

export default About;
