

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const cipherMap = {
  A: "3",
  B: "⊃",
  C: "Ш",
  D: "ᗡ",
  E: "ƎƎ",
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
};

const Newglitch = ({ children }) => {
  const cipherSet = Object.values(cipherMap).filter((v, i, a) => a.indexOf(v) === i);
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) return;

    let iterations = 0;
    const originalText = children;
    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((_, index) => {
            if (index < iterations) return originalText[index];
            return cipherSet[Math.floor(Math.random() * cipherSet.length)];
          })
          .join("")
      );

      if (iterations >= originalText.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, children, cipherSet]);

  return (
    <motion.span onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="inline-block cursor-help">
      {displayText.split(" ").map((char, index) => (
        <motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }} className="inline-block min-w-[0.5em]">
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default Newglitch;
