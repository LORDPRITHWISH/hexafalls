"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface RadicalGlitchTitleProps {
  text: string;
  crypticText?: string;
  className?: string;
  padclassName?: string;
  fontSize?: string;
  primaryColor?: string;
  secondaryColor?: string;
  freakOutInterval?: number;
  freakOutDuration?: number;
  symbolSet?: string;
}

export default function RadicalGlitchTitle({
  text,
  crypticText,
  className = "",
  padclassName = "",
  fontSize = "5rem",
  primaryColor = "#00FFFF",
  secondaryColor = "#FF00FF",
  freakOutInterval = 5000,
  freakOutDuration = 800,
  symbolSet = "ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰᛱᛲᛳᛴᛵᛶᛷᛸ",
}: RadicalGlitchTitleProps) {
  const [displayText, setDisplayText] = useState<string[]>(text.split(""));
  const [isFreakingOut, setIsFreakingOut] = useState(false);
  const [glitchLevel, setGlitchLevel] = useState(0); // 0-10 scale
  const [sliceOffset, setSliceOffset] = useState({ x: 0, y: 0 });
  const [rgbShift, setRgbShift] = useState({ r: 0, g: 0, b: 0 });
  const [shake, setShake] = useState({ x: 0, y: 0, rotate: 0 });
  const [clips, setClips] = useState<string[]>([]);
  const [noiseOpacity, setNoiseOpacity] = useState(0.2);
  const [scanlineOffset, setScanlineOffset] = useState(0);
  const [slices, setSlices] = useState<{ top: number; height: number; offset: number }[]>([]);

  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const freakOutIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const freakOutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate cryptic text if not provided
  const actualCrypticText =
    crypticText ||
    text
      .split("")
      .map(() => symbolSet[Math.floor(Math.random() * symbolSet.length)])
      .join("");

  // Initialize effects
  useEffect(() => {
    startGlitchEffects();
    setupFreakOutInterval();

    return () => {
      clearAllIntervals();
    };
  }, [text]);

  const clearAllIntervals = () => {
    if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    if (freakOutIntervalRef.current) clearInterval(freakOutIntervalRef.current);
    if (freakOutTimeoutRef.current) clearTimeout(freakOutTimeoutRef.current);
  };

  const setupFreakOutInterval = () => {
    // Clear any existing interval
    if (freakOutIntervalRef.current) clearInterval(freakOutIntervalRef.current);

    // Set up new interval for freak-outs
    freakOutIntervalRef.current = setInterval(() => {
      triggerFreakOut();
    }, freakOutInterval + Math.random() * 2000); // Add some randomness
  };

  const triggerFreakOut = () => {
    setIsFreakingOut(true);
    setGlitchLevel(10); // Max glitch during freak-out

    // Set timeout to end freak-out
    freakOutTimeoutRef.current = setTimeout(() => {
      setIsFreakingOut(false);
      setGlitchLevel(Math.random() * 3); // Return to low glitch
    }, freakOutDuration + Math.random() * 500); // Add some randomness
  };

  const startGlitchEffects = () => {
    // Clear any existing interval
    if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);

    // Set interval for continuous glitch effects
    glitchIntervalRef.current = setInterval(() => {
      updateGlitchEffects();
    }, 50); // Update frequently for smooth effects
  };

  const updateGlitchEffects = () => {
    const intensity = isFreakingOut ? 1 : 0.3;
    const baseGlitchLevel = isFreakingOut ? 10 : glitchLevel;

    // Update text display with random glitches
    setDisplayText(
      text.split("").map((char, index) => {
        // During freak-out, show cryptic text
        if (isFreakingOut && Math.random() < 0.7) {
          return actualCrypticText[index] || symbolSet[Math.floor(Math.random() * symbolSet.length)];
        }

        // Random character replacement even in normal mode
        if (Math.random() < 0.05 * intensity) {
          // 5% chance to replace with a random character
          const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";
          return pool[Math.floor(Math.random() * pool.length)];
        }

        // Random symbol replacement
        if (Math.random() < 0.02 * intensity) {
          return symbolSet[Math.floor(Math.random() * symbolSet.length)];
        }

        return char;
      })
    );

    // RGB shift effect (more extreme during freak-out)
    const maxShift = baseGlitchLevel * 0.5;
    setRgbShift({
      r: (Math.random() * 2 - 1) * maxShift,
      g: (Math.random() * 2 - 1) * maxShift,
      b: (Math.random() * 2 - 1) * maxShift,
    });

    // Screen shake effect (more violent during freak-out)
    const maxShake = baseGlitchLevel * 0.3;
    if (Math.random() < 0.2 * intensity) {
      setShake({
        x: (Math.random() * 2 - 1) * maxShake,
        y: (Math.random() * 2 - 1) * maxShake,
        rotate: (Math.random() * 2 - 1) * maxShake * 0.5,
      });
    } else {
      setShake({ x: 0, y: 0, rotate: 0 });
    }

    // Slice offset effect (horizontal shift of slices)
    if (Math.random() < 0.15 * intensity) {
      setSliceOffset({
        x: (Math.random() * 2 - 1) * baseGlitchLevel * 2,
        y: (Math.random() * 2 - 1) * baseGlitchLevel,
      });
    } else {
      setSliceOffset({ x: 0, y: 0 });
    }

    // Generate clip paths for glitch slices
    if (Math.random() < 0.1 * intensity || isFreakingOut) {
      const numClips = Math.floor(Math.random() * 3) + (isFreakingOut ? 3 : 0);
      const newClips = [];

      for (let i = 0; i < numClips; i++) {
        const x1 = Math.random() * 100;
        const x2 = Math.random() * 100;
        const y1 = Math.random() * 100;
        const y2 = Math.random() * 100;

        newClips.push(`polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`);
      }

      setClips(newClips);
    } else if (Math.random() < 0.7 && !isFreakingOut) {
      setClips([]);
    }

    // Generate horizontal slices
    if (Math.random() < 0.2 * intensity || isFreakingOut) {
      const numSlices = Math.floor(Math.random() * 5) + (isFreakingOut ? 5 : 2);
      const newSlices = [];

      for (let i = 0; i < numSlices; i++) {
        const top = Math.random() * 100;
        const height = Math.random() * 10 + 5;
        const offset = (Math.random() * 2 - 1) * baseGlitchLevel * 3;

        newSlices.push({ top, height, offset });
      }

      setSlices(newSlices);
    } else if (Math.random() < 0.6 && !isFreakingOut) {
      setSlices([]);
    }

    // Update noise and scanline effects
    setNoiseOpacity(0.1 + Math.random() * 0.1 + (isFreakingOut ? 0.2 : 0));
    setScanlineOffset(scanlineOffset + 0.5);
  };

  return (
    <motion.div
      className={`relative overflow-hidden select-none ${className}`}
      style={{
        fontSize,
        transform: `translate(${shake.x}px, ${shake.y}px) rotate(${shake.rotate}deg)`,
      }}
      animate={{
        scale: isFreakingOut ? [1, 1.02, 0.98, 1.01, 0.99, 1] : 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className={`relative overflow-hidden ${padclassName}`}>
        {/* Main text with glitch effects */}
        <div
          className="relative z-10 font-bold "
          style={{
            textShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}80, 0 0 30px ${primaryColor}40`,
            color: "white",
            fontFamily: "monospace",
            letterSpacing: "0.05em",
            filter: `blur(${isFreakingOut ? Math.random() * 2 : 0}px)`,
          }}
        >
          {/* RGB Shift Effect - Red Channel */}
          <div
            className="absolute top-0 left-0 w-full h-full mix-blend-screen opacity-80 "
            style={{
              color: "rgb(255,0,0)",
              transform: `translate(${rgbShift.r}px, 0)`,
              clipPath: clips.length > 0 ? clips[0] : "none",
            }}
          >
            {displayText.join("")}
          </div>

          {/* RGB Shift Effect - Green Channel */}
          <div
            className="absolute top-0 left-0 w-full h-full mix-blend-screen opacity-80"
            style={{
              color: "rgb(0,255,0)",
              transform: `translate(${rgbShift.g}px, 0)`,
              clipPath: clips.length > 1 ? clips[1] : "none",
            }}
          >
            {displayText.join("")}
          </div>

          {/* RGB Shift Effect - Blue Channel */}
          <div
            className="absolute top-0 left-0 w-full h-full mix-blend-screen opacity-80"
            style={{
              color: "rgb(0,0,255)",
              transform: `translate(${rgbShift.b}px, 0)`,
              clipPath: clips.length > 2 ? clips[2] : "none",
            }}
          >
            {displayText.join("")}
          </div>

          {/* Horizontal slices with offset */}
          {slices.map((slice, index) => (
            <div
              key={index}
              className="absolute left-0 w-full overflow-hidden"
              style={{
                top: `${slice.top}%`,
                height: `${slice.height}%`,
                transform: `translateX(${slice.offset}px)`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: `-${slice.top}%`,
                  left: 0,
                  width: "100%",
                }}
              >
                {displayText.join("")}
              </div>
            </div>
          ))}

          {/* Main text */}
          <div className={isFreakingOut ? "opacity-80" : "opacity-100"}>{displayText.join("")}</div>
        </div>

        {/* Scanlines effect */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0.3) 1px,
              transparent 1px,
              transparent 2px
            )`,
            backgroundSize: "100% 4px",
            backgroundPosition: `0 ${scanlineOffset % 4}px`,
          }}
        />

        {/* Static/noise effect overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full mix-blend-overlay pointer-events-none z-30"
          style={{
            backgroundImage:
              "url('data:image/png;base64,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')",
            opacity: noiseOpacity,
          }}
        />

        {/* Digital distortion lines */}
        {isFreakingOut && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-25">
            {Array.from({ length: 5 }).map((_, i) => {
              const top = Math.random() * 100;
              const height = Math.random() * 2 + 1;
              const color = Math.random() > 0.5 ? primaryColor : secondaryColor;

              return (
                <div
                  key={i}
                  className="absolute left-0 w-full"
                  style={{
                    top: `${top}%`,
                    height: `${height}px`,
                    backgroundColor: color,
                    opacity: 0.7,
                    transform: `translateX(${(Math.random() * 2 - 1) * 10}px)`,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Flicker effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-white pointer-events-none z-40"
          animate={{
            opacity: isFreakingOut ? [0, 0.4, 0, 0.3, 0, 0.5, 0, 0.2, 0] : [0, 0, 0, 0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.05, 0, 0],
          }}
          transition={{
            duration: isFreakingOut ? 0.5 : 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />

        {/* Extreme glitch overlay during freak-out */}
        {isFreakingOut && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 mix-blend-overlay"
            style={{
              backgroundImage: `
                linear-gradient(${Math.random() * 360}deg, 
                ${primaryColor}80 0%, 
                transparent 20%, 
                ${secondaryColor}80 40%, 
                transparent 60%, 
                ${primaryColor}80 80%, 
                transparent 100%)
              `,
            }}
            animate={{
              opacity: [0, 0.7, 0, 0.5, 0, 0.8, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
