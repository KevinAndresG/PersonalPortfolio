import { useRef } from "react";
import { gsap } from "gsap";

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}

const MagneticCard = ({ children, strength = 0.38, className = "", style }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.2, ease: "power2.out" });
  };

  const onEnter = () => {
    // squish → elastic expand = "liquid bounce"
    gsap.fromTo(
      ref.current,
      { scaleX: 1.12, scaleY: 0.88 },
      { scaleX: 1, scaleY: 1, duration: 1.0, ease: "elastic.out(1.1, 0.32)" }
    );
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0, y: 0, scaleX: 1, scaleY: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.28)",
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-block", willChange: "transform", ...style }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
};

export default MagneticCard;
