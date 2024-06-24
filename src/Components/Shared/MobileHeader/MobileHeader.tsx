import { useState } from "react";
import "./MobileHeader.scss";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div id="mobile-menu">
      <div className={`items-panel ${isOpen && "open"}`}>
        <div id="Header-mobile">
          <button className={`button`} onClick={openMenu}>
            <NavLink to={"/home"}>
              <span className="actual-text">
                &nbsp;{<FormattedMessage id="navBar.home" />}&nbsp;
              </span>
              <span aria-hidden="true" className="hover-text">
                &nbsp;{<FormattedMessage id="navBar.home" />}&nbsp;
              </span>
            </NavLink>
          </button>
          <button className={`button`} onClick={openMenu}>
            <NavLink to={"/about"}>
              <span className="actual-text">
                &nbsp;{<FormattedMessage id="navBar.about" />}&nbsp;
              </span>
              <span aria-hidden="true" className="hover-text">
                &nbsp;{<FormattedMessage id="navBar.about" />}&nbsp;
              </span>
            </NavLink>
          </button>
          <button className={`button`} onClick={openMenu}>
            <NavLink to={"/work"}>
              <span className="actual-text">
                &nbsp;{<FormattedMessage id="navBar.work" />}&nbsp;
              </span>
              <span aria-hidden="true" className="hover-text">
                &nbsp;{<FormattedMessage id="navBar.work" />}&nbsp;
              </span>
            </NavLink>
          </button>
          <button className={`button`} onClick={openMenu}>
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
      </div>
      <div className="hamburguer-button" onClick={openMenu}>
        <span className={`menu-line ${isOpen && "open"}`}></span>
        <span className={`menu-line ${isOpen && "open"}`}></span>
        <span className={`menu-line ${isOpen && "open"}`}></span>
      </div>
    </div>
  );
};

export default MobileHeader;
