"use client";

import { motion, useAnimation, useMotionValue } from "motion/react";
import { useEffect } from "react";
import useReducedMotionPreference from "./useReducedMotionPreference";

export default function CircularText({
  text,
  spinDuration = 34,
  className = "",
}) {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (prefersReducedMotion) {
      controls.stop();
      return;
    }

    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      transition: {
        from: start,
        to: start + 360,
        ease: "linear",
        duration: spinDuration,
        type: "tween",
        repeat: Infinity,
      },
    });

    return () => controls.stop();
  }, [controls, prefersReducedMotion, rotation, spinDuration]);

  return (
    <motion.span
      className={`circular-text ${className}`.trim()}
      style={{ rotate: rotation }}
      initial={false}
      animate={controls}
      aria-hidden="true"
    >
      {letters.map((letter, index) => {
        const angle = (360 / letters.length) * index;
        const offset = (Math.PI / letters.length) * index;
        const transform = `rotateZ(${angle}deg) translate3d(${offset}px, ${offset}px, 0)`;

        return (
          <span key={`${letter}-${index}`} style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        );
      })}
    </motion.span>
  );
}
