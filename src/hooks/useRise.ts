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

/**
 * Page fade shared by every route. The no-op onUpdate keeps framer-motion off WAAPI:
 * its WAAPI path writes the final opacity a frame late, so the outgoing page flashed
 * back to full opacity for one frame right before unmounting.
 */
export const pageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
  onUpdate: () => {},
};
