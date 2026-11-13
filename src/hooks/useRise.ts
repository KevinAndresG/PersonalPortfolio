import { RefObject, useEffect } from "react";
import { gsap } from "gsap";

/** One entrance per page: everything marked `.rise` surfaces in sequence. */
export const useRise = (scope: RefObject<HTMLElement | null>, ready: string) => {
  useEffect(() => {
    if (!ready || document.documentElement.dataset.motion === "off") return;
    const ctx = gsap.context(() => {
      gsap.from(".rise", {
        y: 30,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.9,
        stagger: { amount: 0.5 },
        ease: "power3.out",
        delay: 0.2,
        clearProps: "all",
      });
    }, scope);
    return () => ctx.revert();
  }, [scope, ready]);
};
