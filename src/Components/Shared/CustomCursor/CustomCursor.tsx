import { useEffect, useRef } from "react";
import "./CustomCursor.scss";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.x}px`;
        dotRef.current.style.top = `${mouse.y}px`;
      }
    };

    const onMouseDown = () => {
      dotRef.current?.classList.add("clicking");
      ringRef.current?.classList.add("clicking");
    };
    const onMouseUp = () => {
      dotRef.current?.classList.remove("clicking");
      ringRef.current?.classList.remove("clicking");
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      ring.x = lerp(ring.x, mouse.x, 0.12);
      ring.y = lerp(ring.y, mouse.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.x}px`;
        ringRef.current.style.top = `${ring.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
