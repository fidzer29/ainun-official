"use client";

import { gsap } from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import useReducedMotionPreference from "./useReducedMotionPreference";

export default function TextType({
  text,
  as: Component = "span",
  typingSpeed = 85,
  initialDelay = 500,
  pauseDuration = 2800,
  deletingSpeed = 38,
  loop = true,
  className = "",
  showCursor = true,
  cursorCharacter = "|",
  startOnVisible = false,
  ...props
}) {
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const [displayedText, setDisplayedText] = useState(textArray[0] ?? "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (prefersReducedMotion || !isVisible) return;

    const currentText = textArray[currentTextIndex] ?? "";
    const isComplete = displayedText === currentText;
    const delay =
      displayedText === "" && !isDeleting && currentTextIndex === 0
        ? initialDelay
        : isDeleting
          ? deletingSpeed
          : isComplete
            ? pauseDuration
            : typingSpeed;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && !isComplete) {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      } else if (!isDeleting && loop) {
        setIsDeleting(true);
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(displayedText.slice(0, -1));
      } else if (isDeleting) {
        setIsDeleting(false);
        setCurrentTextIndex((index) => (index + 1) % textArray.length);
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    currentTextIndex,
    deletingSpeed,
    displayedText,
    initialDelay,
    isDeleting,
    isVisible,
    loop,
    pauseDuration,
    prefersReducedMotion,
    textArray,
    typingSpeed,
  ]);

  useEffect(() => {
    if (!showCursor || prefersReducedMotion || !cursorRef.current) return;

    const cursor = cursorRef.current;
    gsap.set(cursor, { opacity: 1 });
    const animation = gsap.to(cursor, {
      opacity: 0,
      duration: 0.7,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => animation.kill();
  }, [prefersReducedMotion, showCursor]);

  const TextElement = Component;
  return (
    <TextElement
      ref={containerRef}
      className={`text-type ${className}`.trim()}
      {...props}
    >
      <span className="text-type-content">{displayedText}</span>
      {showCursor ? (
        <span className="text-type-cursor" ref={cursorRef} aria-hidden="true">
          {cursorCharacter}
        </span>
      ) : null}
    </TextElement>
  );
}
