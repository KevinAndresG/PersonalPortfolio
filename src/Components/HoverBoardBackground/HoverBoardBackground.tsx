import { useState, useCallback } from "react";
import "./HoverBoardBackground.scss";

const COLS = 22;
const ROWS = 22;
const TOTAL = COLS * ROWS;

const COLORS = [
  "rgb(0, 212, 255)",
  "rgb(139, 92, 246)",
  "rgb(16, 185, 129)",
  "rgb(245, 158, 11)",
  "rgb(99, 102, 241)",
  "rgb(236, 72, 153)",
  "rgb(59, 130, 246)",
  "rgb(20, 184, 166)",
];

const HoverBoardBackground = () => {
  const [hovered, setHovered] = useState(-1);
  const [color, setColor] = useState("");

  const getOpacity = useCallback(
    (i: number): number => {
      if (hovered < 0) return 0;
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const hRow = Math.floor(hovered / COLS);
      const hCol = hovered % COLS;
      const dist = Math.abs(row - hRow) + Math.abs(col - hCol);
      if (dist === 0) return 1;
      if (dist === 1) return 0.4;
      if (dist === 2) return 0.15;
      return 0;
    },
    [hovered],
  );

  const onEnter = useCallback((i: number) => {
    setHovered(i);
    setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }, []);

  const onLeave = useCallback(() => setHovered(-1), []);

  return (
    <div className="Hoverboard--box">
      <div
        className="hover-cont"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {Array.from({ length: TOTAL }, (_, i) => {
          const opacity = getOpacity(i);
          return (
            <div
              key={i}
              className="each"
              style={
                opacity > 0
                  ? {
                      backgroundColor: color,
                      opacity,
                      boxShadow:
                        i === hovered ? `0 0 10px 2px ${color}` : "none",
                      transition: i === hovered ? "none" : "all 0.5s ease",
                    }
                  : {
                      transition:
                        "background-color 0.6s ease, opacity 0.6s ease",
                    }
              }
              onMouseEnter={() => onEnter(i)}
              onMouseLeave={onLeave}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HoverBoardBackground;
