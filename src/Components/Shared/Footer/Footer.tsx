import { FormattedMessage, IntlProvider } from "react-intl";
import "./Footer.scss";
import { LanguageContext } from "../../../Contexts/LanguageSelector/Context";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { state } = useContext(LanguageContext);
  const { pathname } = useLocation();
  if (!state.text || pathname === "/home") return null;

  return (
    <IntlProvider locale="En" messages={state.messages}>
      <footer className="site-footer">
        <span>Kevin Andrés García Vélez</span>
        <span>
          <FormattedMessage id="home.role" />
        </span>
      </footer>
    </IntlProvider>
  );
};

export default Footer;
