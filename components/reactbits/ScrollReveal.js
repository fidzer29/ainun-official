"use client";

import { useEffect, useRef } from "react";
import useReducedMotionPreference from "./useReducedMotionPreference";

export default function ScrollReveal({
  as: Component = "div",
  className = "",
  delay = 0,
  children,
  ...props
}) {
  const revealRef = useRef(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const element = revealRef.current;
    if (!element || prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    element.dataset.scrollRevealReady = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.scrollRevealVisible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <Component
      {...props}
      className={`scroll-reveal ${className}`.trim()}
      data-scroll-reveal
      ref={revealRef}
      style={{ "--scroll-reveal-delay": `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
