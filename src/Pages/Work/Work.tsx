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
          animate={{
            opacity: ["0", "100%"],
            transition: { duration: 1 },
          }}
        >
          <HoverBoardBackground />
          <h1 className="personal-projects">
            <FormattedMessage id="work.title" />
          </h1>
          <WorkCard />
        </motion.div>
      )}
    </IntlProvider>
  );
};

export default Work;
