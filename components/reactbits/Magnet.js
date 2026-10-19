"use client";

import { useRef } from "react";
import useReducedMotionPreference from "./useReducedMotionPreference";

export default function Magnet({ children }) {
  const magnetRef = useRef(null);
  const prefersReducedMotion = useReducedMotionPreference();

  function handlePointerMove(event) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const magnet = magnetRef.current;
    if (!magnet) return;

    const bounds = magnet.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    magnet.style.setProperty("--magnet-x", `${x * 0.12}px`);
    magnet.style.setProperty("--magnet-y", `${y * 0.12}px`);
  }

  function handlePointerLeave() {
    magnetRef.current?.style.removeProperty("--magnet-x");
    magnetRef.current?.style.removeProperty("--magnet-y");
  }

  return (
    <span
      className="magnet"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      ref={magnetRef}
    >
      {children}
    </span>
  );
}
