import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useEffect, useState } from "react";
import MobileHeader from "../MobileHeader/MobileHeader";

const Header = () => {
  const navItems = ["HOME", "ABOUT", "WORK", "KNOWLEDGE"];
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const navigate = useNavigate();
  const navigationMenu = (item: String) => {
    navigate(`/${item.toLowerCase()}`);
  };

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
    <header>
      {screenWidth <= 760 ? (
        <MobileHeader navItems={navItems} />
      ) : (
        <>
          <Link to={"/"} className="go-home">
            <h1 className="header-name">Kevin Garcia</h1>
          </Link>
          <div id="Header">
            {navItems.map((item) => (
              <button
                key={item}
                className={`button ${
                  window.location.href
                    .toLowerCase()
                    .includes(item.toLowerCase())
                    ? "active"
                    : "inactive"
                }`}
                onClick={() => {
                  navigationMenu(item);
                }}
              >
                <span className="actual-text">&nbsp;{item}&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;{item}&nbsp;
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
