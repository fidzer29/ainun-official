"use client";

import { useRef } from "react";
import useReducedMotionPreference from "./useReducedMotionPreference";

export default function SpotlightCard({ className = "", children }) {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotionPreference();

  function handlePointerMove(event) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;

    cardRef.current.style.setProperty(
      "--spotlight-x",
      `${event.clientX - bounds.left}px`,
    );
    cardRef.current.style.setProperty(
      "--spotlight-y",
      `${event.clientY - bounds.top}px`,
    );
  }

  return (
    <div
      className={`spotlight-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
      ref={cardRef}
    >
      {children}
    </div>
  );
}
