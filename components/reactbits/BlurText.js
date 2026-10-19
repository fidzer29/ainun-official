"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import useReducedMotionPreference from "./useReducedMotionPreference";

export default function BlurText({
  text = "",
  as = "span",
  delay = 120,
  className = "",
  threshold = 0.15,
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const MotionElement = motion[as] ?? motion.span;
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold]);

  return (
    <MotionElement
      ref={ref}
      className={`blur-text ${className}`.trim()}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span className="blur-text-word" aria-hidden="true" key={`${word}-${index}`}>
          <motion.span
            initial={false}
            animate={
              inView
                ? prefersReducedMotion
                  ? { opacity: 1, filter: "blur(0px)", y: 0 }
                  : {
                      opacity: [0, 0.55, 1],
                      filter: ["blur(8px)", "blur(3px)", "blur(0px)"],
                      y: [8, 0],
                    }
                : undefined
            }
            transition={{
              duration: 0.65,
              delay: prefersReducedMotion ? 0 : (index * delay) / 1000,
              ease: "easeOut",
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </MotionElement>
  );
}
