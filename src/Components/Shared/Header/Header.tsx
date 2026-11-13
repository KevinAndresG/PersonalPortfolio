import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../Contexts/LanguageSelector/Context";
import { FormattedMessage, IntlProvider, useIntl } from "react-intl";
import { motion } from "framer-motion";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import KG from "../../../assets/kgLogo.png";

const LINKS = [
  { to: "/home", id: "navBar.home" },
  { to: "/about", id: "navBar.about" },
  { to: "/work", id: "navBar.work" },
  { to: "/knowledge", id: "navBar.knowledge" },
];

// Motion is the user's choice here, not the OS setting: on by default.
const MotionToggle = () => {
  const intl = useIntl();
  const [on, setOn] = useState(localStorage.getItem("motion") !== "off");

  useEffect(() => {
    document.documentElement.dataset.motion = on ? "on" : "off";
    localStorage.setItem("motion", on ? "on" : "off");
  }, [on]);

  const label = intl.formatMessage({ id: on ? "nav.motion.pause" : "nav.motion.play" });
  return (
    <button className="motion-toggle" onClick={() => setOn(!on)} aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        {on ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5l11 7-11 7z" />}
      </svg>
    </button>
  );
};

const Header = () => {
  const { state } = useContext(LanguageContext);
  // each link is a small vessel: the drop pours in from where the cursor
  // entered and drains out where it left (origin set on enter and leave)
  const pour = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    // set at the edges only: the fill then animates on the compositor alone
    e.currentTarget.style.setProperty("--fo", `${e.clientX - r.left}px ${e.clientY - r.top}px`);
  };

  return (
    <IntlProvider locale="En" messages={state.messages}>
      {state.text && (
        <header className="nav">
          <Link to="/home" className="nav-logo glass" aria-label="Kevin Garcia">
            <img src={KG} alt="" />
          </Link>

          <nav className="nav-links glass" aria-label="Main">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} data-pour onPointerEnter={pour} onPointerLeave={pour}>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-lens"
                        className="nav-lens"
                        transition={{ type: "spring", stiffness: 340, damping: 28 }}
                      />
                    )}
                    <span className="nav-pour" aria-hidden="true" />
                    <span className="nav-label">
                      <FormattedMessage id={l.id} />
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="nav-tools glass">
            <LanguageSelector />
            <MotionToggle />
          </div>
        </header>
      )}
    </IntlProvider>
  );
};

export default Header;
