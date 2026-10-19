"use client";

import { useEffect, useState } from "react";
import useReducedMotionPreference from "./useReducedMotionPreference";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomLetter() {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
}

function createTiles(text) {
  return text.split("").map((character) => ({
    current: character,
    next: character,
    flipping: false,
    tick: 0,
  }));
}

export default function SplitFlapText({ text, className = "" }) {
  const target = text.toUpperCase();
  const prefersReducedMotion = useReducedMotionPreference();
  const [tileState, setTileState] = useState(() => ({
    text: target,
    tiles: createTiles(target),
  }));
  const tiles =
    tileState.text === target ? tileState.tiles : createTiles(target);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timers = [];
    const flipCount = 5;
    const flipDuration = 95;

    target.split("").forEach((character, index) => {
      for (let step = 0; step <= flipCount; step += 1) {
        const timer = window.setTimeout(() => {
          setTileState((currentState) => {
            const currentTiles =
              currentState.text === target
                ? currentState.tiles
                : createTiles(target);

            return {
              text: target,
              tiles: currentTiles.map((tile, tileIndex) =>
                tileIndex !== index
                  ? tile
                  : {
                    current:
                      step === flipCount
                        ? character
                        : step === 0
                          ? tile.current
                          : tile.next,
                    next: step === flipCount ? character : randomLetter(),
                    flipping: step < flipCount,
                    tick: tile.tick + 1,
                    },
              ),
            };
          });
        }, 300 + index * 45 + step * flipDuration);
        timers.push(timer);
      }
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [prefersReducedMotion, target]);

  return (
    <span
      className={`split-flap-text ${className}`.trim()}
      aria-hidden="true"
      role="presentation"
    >
      {tiles.map((tile, index) => (
        <span className="split-flap-tile" key={index}>
          <span className="split-flap-half split-flap-half-top">
            <span className="split-flap-char">{tile.current}</span>
          </span>
          <span className="split-flap-half split-flap-half-bottom">
            <span className="split-flap-char">{tile.flipping ? tile.next : tile.current}</span>
          </span>
          {tile.flipping ? (
            <>
              <span className="split-flap-flap split-flap-flap-front" key={`front-${tile.tick}`}>
                <span className="split-flap-char">{tile.current}</span>
              </span>
              <span className="split-flap-flap split-flap-flap-back" key={`back-${tile.tick}`}>
                <span className="split-flap-char">{tile.next}</span>
              </span>
            </>
          ) : null}
        </span>
      ))}
    </span>
  );
}
