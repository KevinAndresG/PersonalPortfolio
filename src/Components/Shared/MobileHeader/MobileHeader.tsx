import { useState } from "react";
import "./MobileHeader.scss";
import { useNavigate } from "react-router-dom";
const MobileHeader = ({ navItems }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const navigationMenu = (item: String) => {
    navigate(`/${item.toLowerCase()}`);
  };
  return (
    <div id="mobile-menu">
      <div className={`items-panel ${isOpen && "open"}`}>
        <div id="Header-mobile">
          {navItems.map((item: string) => (
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
