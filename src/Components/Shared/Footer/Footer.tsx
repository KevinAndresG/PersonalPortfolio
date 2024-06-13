import { FormattedMessage, IntlProvider } from "react-intl";
import "./Footer.scss";
import { LanguageContext } from "../../../Contexts/LanguageSelector/Context";
import { useContext } from "react";

const Footer = () => {
  const { state } = useContext(LanguageContext);
  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && !window.location.href.toLowerCase().includes("home") && (
        <footer>
          <p className="name">
            <code>Kevin Andres Garcia velez</code>
          </p>
          <p className="front">
            <code>
              <FormattedMessage id="general.front.end" />{" "}
              <FormattedMessage id="general.developer" />
            </code>
          </p>
        </footer>
      )}
    </IntlProvider>
  );
};

export default Footer;
