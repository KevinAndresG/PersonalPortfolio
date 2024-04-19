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
      <ul id="Header">
        {navItems.map((item) => (
          <li
            key={item}
            className={
              window.location.href.toLowerCase().includes(item.toLowerCase())
                ? "active"
                : "inactive"
            }
            onClick={() => {
              navigationMenu(item);
            }}
          >
            <>{item}</>
            <span
              className={
                window.location.href.toLowerCase().includes(item.toLowerCase())
                  ? "active"
                  : "inactive"
              }
            ></span>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
