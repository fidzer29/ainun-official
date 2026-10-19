"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useReducedMotionPreference from "./useReducedMotionPreference";

export default function TrueFocus({
  sentence = "Gaya Anggun",
  separator = " ",
  animationDuration = 0.65,
  pauseBetweenAnimations = 2.4,
}) {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(Math.min(1, words.length - 1));
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => window.clearInterval(interval);
  }, [animationDuration, pauseBetweenAnimations, prefersReducedMotion, words.length]);

  useEffect(() => {
    const measureFocus = () => {
      const container = containerRef.current;
      const activeWord = wordRefs.current[currentIndex];
      if (!container || !activeWord) return;

      const parentRect = container.getBoundingClientRect();
      const wordRect = activeWord.getBoundingClientRect();
      setFocusRect({
        x: wordRect.left - parentRect.left,
        y: wordRect.top - parentRect.top,
        width: wordRect.width,
        height: wordRect.height,
      });
    };

    measureFocus();
    window.addEventListener("resize", measureFocus);
    return () => window.removeEventListener("resize", measureFocus);
  }, [currentIndex, words.length]);

  return (
    <span className="focus-container" ref={containerRef} aria-hidden="true">
      {words.map((word, index) => (
        <span
          className="focus-word"
          key={`${word}-${index}`}
          ref={(element) => {
            wordRefs.current[index] = element;
          }}
          style={{
            filter: index === currentIndex ? "blur(0px)" : "blur(1px)",
            transition: `filter ${animationDuration}s ease`,
          }}
        >
          {word}
        </span>
      ))}
      <motion.span
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : animationDuration,
        }}
      >
        <span className="focus-corner focus-corner-top-left" />
        <span className="focus-corner focus-corner-top-right" />
        <span className="focus-corner focus-corner-bottom-left" />
        <span className="focus-corner focus-corner-bottom-right" />
      </motion.span>
    </span>
  );
}
