"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
// import "@fontsource/rubik-glitch";

const cipherMap: Record<string, string> = {
  A: "3",
  B: "⊃",
  C: "Ш",
  D: "ᗡ",
  E: "Ǝ",
  F: "Ⅎ",
  G: "⅁",
  H: "I",
  I: "⋀",
  J: "X",
  K: "⋏",
  L: "⅂",
  M: "⨇",
  N: "ᴎ",
  O: "O",
  P: "Ԁ",
  Q: "Ό",
  R: "⋊",
  S: "⩍",
  T: "⊥",
  U: "∩",
  V: "⋁",
  W: "M",
  X: "X",
  Y: "⅄",
  Z: "Z",
  " ": " ",
};

interface GlitchHeadingProps {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  glitchInterval?: number;
}

const GlitchHeading: React.FC<GlitchHeadingProps> = ({ children, className = "", as: Tag = "h1", glitchInterval = 5000 }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(children);
  const originalText = useRef(children);
  const cipherSet = Object.values(cipherMap);

  const convertToCipher = (text: string) => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => (Math.random() > 0.5 ? cipherMap[char] || char : char))
      .join("");
  };

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setDisplayText(
        originalText.current
          .split("")
          .map(() => cipherSet[Math.floor(Math.random() * cipherSet.length)])
          .join("")
      );
      setTimeout(() => {
        setDisplayText(originalText.current);
        setIsGlitching(false);
      }, 800);
    };

    const interval = setInterval(triggerGlitch, glitchInterval);
    return () => clearInterval(interval);
  }, [glitchInterval]);

  return (
    <motion.div className={`relative inline-block font-["Rubik Glitch"] ${className}`}>
      <Tag className={`relative z-10 glitch-text ${isGlitching ? "glitch-active" : ""}`}>{displayText}</Tag>
      <style jsx global>{`
        .glitch-text {
          font-family: "Rubik Glitch", sans-serif;
          color: white;
          text-shadow: 0 0 10px #00ffff;
          transition: transform 0.2s ease-in-out, text-shadow 0.2s ease-in-out;
        }
        .glitch-active {
          text-shadow: 0 0 20px #ff0000, 0 0 30px #00ffff;
          transform: scale(2);
        }
      `}</style>
    </motion.div>
  );
};

export default GlitchHeading;
