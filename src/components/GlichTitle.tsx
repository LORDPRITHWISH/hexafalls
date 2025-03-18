"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const cipherMap: Record<string, string> = {
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

const convertToCipher = (text: string) => {
  return text
    .toUpperCase()
    .split("")
    .map((char) => cipherMap[char] || char)
    .join("");
};

const GlitchText: React.FC<{ text: string }> = ({ text }) => {
  const glitchTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glitchEffect = () => {
      if (!glitchTextRef.current) return;
      const element = glitchTextRef.current;
      const cipherText = convertToCipher(text);
      if (Math.random() > 0.7) {
        element.classList.add("glitching");
        element.textContent = Math.random() > 0.5 ? text : cipherText;
        setTimeout(() => {
          element.classList.remove("glitching");
          element.textContent = text;
        }, Math.random() * 1000 + 100);
      }
    };
    const interval = setInterval(glitchEffect, 500);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 ref={glitchTextRef} className="glitch-text text-4xl md:text-6xl lg:text-8xl text-white mb-4 tracking-wide">
      {text}
    </h1>
  );
};
const symbolSet = "ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰᛱᛲᛳᛴᛵᛶᛷᛸ";

const TVStatic: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderStatic = () => {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < canvas.width * canvas.height * 0.2; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const grayValue = Math.random() * 255;
        ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${Math.random() * 0.05 + 0.05})`;
        ctx.fillRect(x, y, 2, 2);
      }

      if (Math.random() > 0.95) {
        const y = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.2})`;
        ctx.fillRect(0, y, canvas.width, Math.random() * 10 + 2);
      }
      requestAnimationFrame(renderStatic);
    };

    resizeCanvas();

    renderStatic();
  }, []);
  window.addEventListener("resize", resizeCanvas);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 opacity-30 pointer-events-none" />;
};

interface GlichTitleProps {
  text?: string;
}

const GlichTitle: React.FC<GlichTitleProps> = ({ text = "HexaFalls" }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [stopGlitch, setStopGlitch] = useState(false);
    const [displayText, setDisplayText] = useState<string[]>(text.split(""));

    const actualCrypticText = text
        .split("")
        .map(() => symbolSet[Math.floor(Math.random() * symbolSet.length)])
        .join("");

    const updateGlitchEffects = () => {
        setDisplayText(
            text.split("").map((char, i) => {
                if (stopGlitch) return char;
                if (isLoaded && Math.random() < 0.25) {
                    return actualCrypticText[i] || char;
                }
                if (Math.random() < 0.005) {
                    const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";
                    return pool[Math.floor(Math.random() * pool.length)];
                }
                if (Math.random() < 0.008) {
                    return symbolSet[Math.floor(Math.random() * symbolSet.length)];
                }
                return char;
            })
        );
    };

    useEffect(() => {
        setIsLoaded(true);
        const timer = setTimeout(() => setStopGlitch(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = window.setInterval(updateGlitchEffects, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative flex items-center justify-center overflow-hidden pt-20 rubik-glitch-regular font-thin">
            <TVStatic />
            <div className="container relative z-20 px-4 md:px-6 mx-auto flex flex-col items-center justify-center text-center">
                <div className={cn("transform transition-all duration-1000 opacity-0 scale-95", isLoaded ? "opacity-100 scale-100" : "translate-y-4")}>
                    <GlitchText text={displayText.join("")} />
                </div>
            </div>
            <style>{`
                @keyframes glitch {
                    0% { transform: translate(0); text-shadow: 0 0 8px #52F2E8, 0 0 20px #52F2E8; }
                    20% { transform: translate(-10px, 10px); text-shadow: 2px 0 8px #ff00ff, -2px 0 16px #00ffff; }
                    40% { transform: translate(-10px, -10px); text-shadow: 2px 0 8px #00ffff, -2px 0 16px #ff00ff; }
                    60% { transform: translate(10px, 10px); text-shadow: 2px 0 8px #ff00ff, -2px 0 16px #00ffff; }
                    80% { transform: translate(10px, -10px); text-shadow: 2px 0 8px #00ffff, -2px 0 16px #ff00ff; }
                    100% { transform: translate(0); text-shadow: 0 0 8px #52F2E8, 0 0 20px #52F2E8; }
                }
                .glitching {
                    animation: glitch 0.3s linear infinite;
                }
                .glitch-text {
                    text-shadow: 0 0 12px rgba(82, 242, 232, 0.9), 0 0 25px rgba(82, 242, 232, 0.7);
                    position: relative;
                }
                .glitch-text::before,
                .glitch-text::after {
                    content: '${displayText.join("")}';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0.9;
                }
                .glitch-text::before {
                    color: #ff00ff;
                    z-index: -1;
                    animation: glitch 0.3s ease both infinite;
                    animation-delay: 0.1s;
                }
                .glitch-text::after {
                    color: #00ffff;
                    z-index: -2;
                    animation: glitch 0.3s reverse both infinite;
                    animation-delay: 0.2s;
                }
            `}</style>
        </section>
    );
};

export default GlichTitle;
