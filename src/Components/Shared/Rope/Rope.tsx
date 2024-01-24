import { useRef, useState, useEffect } from "react";
import "./Rope.scss"; // Asegúrate de tener un archivo de estilos CSS
import "./Rope.scss"; // Asegúrate de tener un archivo de estilos CSS

const Rope = () => {
  const objectRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 360 });

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const object: HTMLBRElement = objectRef.current!;

      if (object) {
        const objectRect = object.getBoundingClientRect();
        const objectX = Math.floor(objectRect.left + objectRect.width / 2);
        const objectY = Math.floor(objectRect.top + objectRect.height / 2);

        const distance = Math.sqrt(
          (mouseX - objectX) ** 2 + (mouseY - objectY) ** 2
        );
        const deltaY = ((mouseY - objectY) / distance) * 2;
        if (distance <= 150) {
          // console.log("position adentro:", position);
          setPosition({
            x: position.x,
            y: position.y + deltaY,
          });
        }
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [position]);

  return (
    <div
      id="line"
      ref={objectRef}
      style={{ left: position.x, top: position.y }}
    ></div>
  );
};

export default Rope;
