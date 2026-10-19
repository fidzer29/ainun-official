"use client";

import { useRef } from "react";
import useReducedMotionPreference from "./useReducedMotionPreference";

export default function TiltedCard({
  as: Component = "div",
  className = "",
  children,
}) {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotionPreference();

  function handlePointerMove(event) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const inner = card.firstElementChild;

    inner.style.setProperty("--tilt-x", `${(x - 0.5) * 4}deg`);
    inner.style.setProperty("--tilt-y", `${(0.5 - y) * 4}deg`);
    inner.style.setProperty("--tilt-scale", "1.01");
  }

  function handlePointerLeave() {
    const inner = cardRef.current?.firstElementChild;
    if (!inner) return;

    inner.style.removeProperty("--tilt-x");
    inner.style.removeProperty("--tilt-y");
    inner.style.removeProperty("--tilt-scale");
  }

  return (
    <Component
      className={`tilted-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      ref={cardRef}
    >
      <div className="tilted-card-inner">{children}</div>
    </Component>
  );
}
