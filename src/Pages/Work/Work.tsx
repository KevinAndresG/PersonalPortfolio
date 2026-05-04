import { FormattedMessage, IntlProvider } from "react-intl";
import WorkCard from "../../Components/WorkCard/WorkCard";
import "./Work.scss";
import { motion } from "framer-motion";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import { useContext } from "react";
import HoverBoardBackground from "../../Components/HoverBoardBackground/HoverBoardBackground";

const Work = () => {
  const { state } = useContext(LanguageContext);

  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <motion.div
          id="work-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <HoverBoardBackground />
          <span className="page-eyebrow">Portfolio</span>
          <h1 className="personal-projects">
            <FormattedMessage id="work.title" />
          </h1>
          <p className="projects-subtitle">
            A selection of things I&apos;ve built.
          </p>
          <WorkCard />
        </motion.div>
      )}
    </IntlProvider>
  );
};

export default Work;
