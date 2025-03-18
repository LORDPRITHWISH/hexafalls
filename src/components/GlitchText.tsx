"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GlitchTextProps {
  text: string;
  crypticDuration?: number;
  revealDuration?: number;
  glitchIntensity?: number;
  color?: string;
  hoverReveal?: boolean;
  className?: string;
  fontSize?: string;
  autoReveal?: boolean;
  revealInterval?: number;
  symbolSet?: string;
}

export default function GlitchText({
  text,
  crypticDuration = 4000,
  revealDuration = 2000,
  glitchIntensity = 0.4,
  color = "#FFD700",
  hoverReveal = false,
  className = "",
  fontSize = "1.5rem",
  autoReveal = true,
  revealInterval = 5000,
  symbolSet = "ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰᛱᛲᛳᛴᛵᛶᛷᛸ",
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const [staticOpacity, setStaticOpacity] = useState(0.1);
  const [rgbShift, setRgbShift] = useState({ r: 0, g: 0, b: 0 });
  const [scanlineOffset, setScanlineOffset] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const revealTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoRevealIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Convert text to array for character-by-character manipulation
  const textArray = text.split("");

  // Generate a random symbol from the symbol set
  const getRandomSymbol = () => {
    return symbolSet[Math.floor(Math.random() * symbolSet.length)];
  };

  // Generate random text of the same length as the input text
  const generateRandomText = () => {
    return textArray.map(() => getRandomSymbol());
  };

  // Initialize with random text
  useEffect(() => {
    setDisplayText(generateRandomText());

    // Set up auto-reveal interval if enabled
    if (autoReveal) {
      setupAutoReveal();
    }

    return () => {
      clearAllTimers();
    };
  }, [text, autoReveal]);

  const clearAllTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    if (autoRevealIntervalRef.current) clearInterval(autoRevealIntervalRef.current);
  };

  const setupAutoReveal = () => {
    // Clear any existing intervals
    if (autoRevealIntervalRef.current) clearInterval(autoRevealIntervalRef.current);

    // Set up new interval for auto-revealing
    autoRevealIntervalRef.current = setInterval(() => {
      revealText();
    }, revealInterval);
  };

  const revealText = () => {
    setIsRevealed(true);

    // Set timeout to hide the text again after revealDuration
    revealTimeoutRef.current = setTimeout(() => {
      setIsRevealed(false);
      startCrypticAnimation();
    }, revealDuration);
  };

  const startCrypticAnimation = () => {
    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Create a copy of the text array to track which characters are encrypted
    const encryptedIndices = new Set<number>();

    // Set interval for the glitchy animation
    intervalRef.current = setInterval(() => {
      // Update glitch effects
      updateGlitchEffects();

      setDisplayText((prev) => {
        return prev.map((char, index) => {
          // If we're revealed, show the actual text
          if (isRevealed || isHovering) {
            return textArray[index];
          }

          // Randomly decide if we should encrypt this character
          const shouldEncrypt = Math.random() < (encryptedIndices.size / textArray.length) * 2;

          if (shouldEncrypt) {
            encryptedIndices.add(index);
          }

          // If this character is already encrypted or should be encrypted, show a random symbol
          if (encryptedIndices.has(index) || Math.random() < glitchIntensity) {
            return getRandomSymbol();
          }

          return char;
        });
      });
    }, 100);
  };

  const updateGlitchEffects = () => {
    // Random glitch offset
    if (Math.random() < 0.2) {
      setGlitchOffset({
        x: Math.random() < 0.5 ? Math.random() * 4 : 0,
        y: Math.random() < 0.5 ? Math.random() * 2 : 0,
      });
    } else {
      setGlitchOffset({ x: 0, y: 0 });
    }

    // Random RGB shift
    if (Math.random() < 0.1) {
      setRgbShift({
        r: Math.random() * 4 - 2,
        g: Math.random() * 4 - 2,
        b: Math.random() * 4 - 2,
      });
    } else {
      setRgbShift({ r: 0, g: 0, b: 0 });
    }

    // Random static opacity
    setStaticOpacity(0.05 + Math.random() * 0.1);

    // Random scanline offset
    setScanlineOffset(Math.random() * 100);
  };

  useEffect(() => {
    startCrypticAnimation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRevealed, isHovering]);

  const handleMouseEnter = () => {
    if (hoverReveal) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverReveal) {
      setIsHovering(false);
    }
  };

  const handleClick = () => {
    // Toggle revealed state on click
    if (isRevealed) {
      setIsRevealed(false);
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    } else {
      revealText();
    }
  };

  return (
    <motion.div
      className={`relative cursor-pointer select-none ${className}`}
      style={{ fontSize }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden">
        {/* Main text with glitch effects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isRevealed || isHovering ? "revealed" : "cryptic"}
            className="relative z-10"
            style={{
              textShadow: `0 0 5px ${color}, 0 0 10px ${color}80, 0 0 15px ${color}40`,
              color: color,
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* RGB Shift Effect */}
            <div
              className="absolute top-0 left-0 w-full h-full mix-blend-screen opacity-70"
              style={{
                color: "rgb(255,0,0)",
                transform: `translate(${rgbShift.r}px, 0)`,
                clipPath: Math.random() < 0.05 ? "inset(0% 0% 0% 0%)" : `inset(${Math.random() * 100}% 0% ${Math.random() * 100}% 0%)`,
              }}
            >
              {isRevealed || isHovering ? textArray.join("") : displayText.join("")}
            </div>

            <div
              className="absolute top-0 left-0 w-full h-full mix-blend-screen opacity-70"
              style={{
                color: "rgb(0,255,0)",
                transform: `translate(${rgbShift.g}px, 0)`,
                clipPath: Math.random() < 0.05 ? "inset(0% 0% 0% 0%)" : `inset(${Math.random() * 100}% 0% ${Math.random() * 100}% 0%)`,
              }}
            >
              {isRevealed || isHovering ? textArray.join("") : displayText.join("")}
            </div>

            <div
              className="absolute top-0 left-0 w-full h-full mix-blend-screen opacity-70"
              style={{
                color: "rgb(0,0,255)",
                transform: `translate(${rgbShift.b}px, 0)`,
                clipPath: Math.random() < 0.05 ? "inset(0% 0% 0% 0%)" : `inset(${Math.random() * 100}% 0% ${Math.random() * 100}% 0%)`,
              }}
            >
              {isRevealed || isHovering ? textArray.join("") : displayText.join("")}
            </div>

            {/* Main text */}
            {isRevealed || isHovering ? textArray.join("") : displayText.join("")}
          </motion.div>
        </AnimatePresence>

        {/* Scanlines effect */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.2),
              rgba(0, 0, 0, 0.2) 1px,
              transparent 1px,
              transparent 2px
            )`,
            backgroundSize: "100% 4px",
            backgroundPosition: `0 ${scanlineOffset}px`,
          }}
        />

        {/* Static/noise effect overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full mix-blend-overlay pointer-events-none z-30"
          style={{
            backgroundImage:
              "url('data:image/png;base64,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')",
            opacity: staticOpacity,
          }}
        />

        {/* Flicker effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-white pointer-events-none z-40"
          animate={{
            opacity: [0, 0, 0, 0, 0, 0.2, 0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0.1, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            times: [0, 0.1, 0.2, 0.3, 0.4, 0.41, 0.42, 0.5, 0.51, 0.52, 0.6, 0.7, 0.8, 0.9, 0.91, 0.92, 0.93, 1],
          }}
        />
      </div>
    </motion.div>
  );
}
