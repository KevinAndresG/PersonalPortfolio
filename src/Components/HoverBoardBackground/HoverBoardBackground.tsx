import { useState } from "react";
import "./HoverBoardBackground.scss";

const HoverBoardBackground = () => {
  const [bgColor, setBgColor] = useState("rgb(29, 29, 29)");
  const colors: string[] = [
    "rgb(28, 140, 215)",
    "rgb(52, 152, 219)",
    "rgb(28, 110, 164)",
    "rgb(71, 173, 241)",
    "rgb(96, 169, 219)",
    "rgb(0, 103, 171)",
  ];
  let squares = new Array(500);
  squares.fill(0);
  const [hovered, setHovered] = useState(-1);
  const onMouseEnter = (i: number) => {
    let rand = colors[Math.floor(Math.random() * colors.length)];
    setHovered(i);
    setBgColor(rand);
  };
  const onMouseLeave = () => {
    setHovered(-1);
    setBgColor("rgb(29, 29, 29)");
  };

  return (
    <div className="Hoverboard--box">
      <div className="hover-cont">
        {squares.map((square, i) => (
          <div
            key={square + i}
            style={{
              backgroundColor: i === hovered ? bgColor : "rgb(29, 29, 29)",
              boxShadow: i === hovered ? "0 0 10px 2px " + bgColor : "",
              transition: i !== hovered ? "all 0.3s ease" : "",
            }}
            className="each"
            onMouseEnter={() => onMouseEnter(i)}
            onMouseLeave={onMouseLeave}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HoverBoardBackground;
