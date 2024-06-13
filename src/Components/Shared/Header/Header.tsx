import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import MobileHeader from "../MobileHeader/MobileHeader";
import { LanguageContext } from "../../../Contexts/LanguageSelector/Context";
import { FormattedMessage, IntlProvider } from "react-intl";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const Header = () => {
  const scrollStyles = {
    backgroundColor: "#3131313d",
    backdropFilter: "blur(10px)",
    padding: "0 0 0 30px",
  };
  const { state } = useContext(LanguageContext);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [y, setY] = useState(window.scrollY);

  const handleScroll = () => {
    setY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => handleScroll());

    return () => {
      window.removeEventListener("scroll", () => handleScroll());
    };
  }, [y]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.screen.width);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <header style={y > 100 ? scrollStyles : {}}>
          {screenWidth <= 760 ? (
            <MobileHeader />
          ) : (
            <>
              <Link to={"/"} className="go-home">
                <h1 className="header-name">Kevin Garcia</h1>
              </Link>
              <div id="Header">
                <button className={`button`}>
                  <NavLink to={"/home"}>
                    <span className="actual-text">
                      &nbsp;{<FormattedMessage id="navBar.home" />}&nbsp;
                    </span>
                    <span aria-hidden="true" className="hover-text">
                      &nbsp;{<FormattedMessage id="navBar.home" />}&nbsp;
                    </span>
                  </NavLink>
                </button>
                <button className={`button`}>
                  <NavLink to={"/about"}>
                    <span className="actual-text">
                      &nbsp;{<FormattedMessage id="navBar.about" />}&nbsp;
                    </span>
                    <span aria-hidden="true" className="hover-text">
                      &nbsp;{<FormattedMessage id="navBar.about" />}&nbsp;
                    </span>
                  </NavLink>
                </button>
                <button className={`button`}>
                  <NavLink to={"/work"}>
                    <span className="actual-text">
                      &nbsp;{<FormattedMessage id="navBar.work" />}&nbsp;
                    </span>
                    <span aria-hidden="true" className="hover-text">
                      &nbsp;{<FormattedMessage id="navBar.work" />}&nbsp;
                    </span>
                  </NavLink>
                </button>
                <button className={`button`}>
                  <NavLink to={"/knowledge"}>
                    <span className="actual-text">
                      &nbsp;{<FormattedMessage id="navBar.knowledge" />}&nbsp;
                    </span>
                    <span aria-hidden="true" className="hover-text">
                      &nbsp;{<FormattedMessage id="navBar.knowledge" />}&nbsp;
                    </span>
                  </NavLink>
                </button>
                <LanguageSelector />
              </div>
            </>
          )}
        </header>
      )}
    </IntlProvider>
  );
};

export default Header;
