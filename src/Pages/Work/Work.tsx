import { FormattedMessage, IntlProvider } from "react-intl";
import WorkCard from "../../Components/WorkCard/WorkCard";
import { motion } from "framer-motion";
import { LanguageContext } from "../../Contexts/LanguageSelector/Context";
import { useContext, useRef } from "react";
import { useRise } from "../../hooks/useRise";

const Work = () => {
  const { state } = useContext(LanguageContext);
  const ref = useRef<HTMLElement>(null);
  useRise(ref, state.text);

  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <motion.main
          ref={ref}
          className="page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          <h1 className="page-title">
            <span data-water>
              <FormattedMessage id="work.title" />
            </span>
          </h1>
          <p className="page-sub muted rise">
            <FormattedMessage id="work.subtitle" />
          </p>
          <WorkCard />
        </motion.main>
      )}
    </IntlProvider>
  );
};

export default Work;
