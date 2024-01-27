import { useRef, useState, useEffect } from "react";
import "./Rope.scss";

const Rope = () => {
  const objectRef = useRef(null);
  const [position, setPosition] = useState(360);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const mouseY = event.clientY;

      const object: HTMLBRElement = objectRef.current!;

      if (object) {
        const objectRect = object.getBoundingClientRect();
        const objectY = objectRect.top + objectRect.height;

        const distance = objectY - mouseY;
        const deltaY = ((mouseY - objectY) / distance) * 2;
        if (distance <= 100 && distance > 0) {
          setPosition(position + deltaY);
        } else if (distance >= -100 && distance < 0) {
          setPosition(position - deltaY);
        }
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [position]);

  return <div id="line" ref={objectRef} style={{ top: position }}></div>;
};

export default Rope;
