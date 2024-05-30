import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useEffect, useState } from "react";
import MobileHeader from "../MobileHeader/MobileHeader";

const Header = () => {
  const navItems = ["HOME", "ABOUT", "WORK", "KNOWLEDGE"];
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [y, setY] = useState(window.scrollY);
  const scrollStyles = {
    backgroundColor: "#3131313d",
    backdropFilter: "blur(10px)",
    padding: "0 0 0 30px",
  };
  const navigate = useNavigate();
  const navigationMenu = (item: String) => {
    navigate(`/${item.toLowerCase()}`);
  };

  const handleScroll = () => {
    setY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => handleScroll());

    return () => {
      // return a cleanup function to unregister our function since it will run multiple times
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
    <header style={y > 100 ? scrollStyles : {}}>
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
