import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const navItems = ["HOME", "ABOUT", "WORK", "KNOWLEDGE"];
  const navigate = useNavigate();
  const navigationMenu = (item: String) => {
    navigate(`/${item.toLowerCase()}`);
  };
  return (
    <header>
      <Link to={"/"}>
        <h1 className="header-name">Kevin Garcia</h1>
      </Link>
      <div id="Header">
        {navItems.map((item) => (
          <button
            key={item}
            className={`button ${
              window.location.href.toLowerCase().includes(item.toLowerCase())
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
    </header>
  );
};

export default Header;
