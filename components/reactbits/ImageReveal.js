"use client";

import { useEffect, useRef } from "react";
import useReducedMotionPreference from "./useReducedMotionPreference";

export default function ImageReveal({ className = "", children }) {
  const revealRef = useRef(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const element = revealRef.current;
    if (!element || prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    element.dataset.imageRevealReady = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.imageRevealVisible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div className={`image-reveal ${className}`.trim()} ref={revealRef}>
      {children}
    </div>
  );
}
