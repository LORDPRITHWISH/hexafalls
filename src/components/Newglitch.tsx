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
        }, Math.random() * 200 + 50);
      }
    };
    const interval = setInterval(glitchEffect, 200);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 ref={glitchTextRef} className="glitch-text text-4xl md:text-6xl lg:text-8xl text-white mb-4 tracking-wide">
      {text}
    </h1>
  );
};

const TVStatic: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderStatic = () => {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < canvas.width * canvas.height * 0.05; i++) {
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
    renderStatic();
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 opacity-30 pointer-events-none" />;
};

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <TVStatic />
      <div className="container relative z-20 px-4 md:px-6 mx-auto flex flex-col items-center justify-center text-center">
        <div className={cn("transform transition-all duration-1000 opacity-0 scale-95", isLoaded ? "opacity-100 scale-100" : "translate-y-4")}>
          <GlitchText text="HexaFalls" />
        </div>
      </div>
      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); text-shadow: 0 0 5px #52F2E8, 0 0 10px #52F2E8; }
          20% { transform: translate(-2px, 2px); text-shadow: 2px 0 5px #ff00ff, -2px 0 10px #00ffff; }
          40% { transform: translate(-2px, -2px); text-shadow: 2px 0 5px #00ffff, -2px 0 10px #ff00ff; }
          60% { transform: translate(2px, 2px); text-shadow: 2px 0 5px #ff00ff, -2px 0 10px #00ffff; }
          80% { transform: translate(2px, -2px); text-shadow: 2px 0 5px #00ffff, -2px 0 10px #ff00ff; }
          100% { transform: translate(0); text-shadow: 0 0 5px #52F2E8, 0 0 10px #52F2E8; }
        }

        .glitching { animation: glitch 0.3s linear infinite; }
        .glitch-text { text-shadow: 0 0 10px rgba(82, 242, 232, 0.7), 0 0 20px rgba(82, 242, 232, 0.5); position: relative; }
        .glitch-text::before, .glitch-text::after { content: 'HexaFalls'; position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; }
        .glitch-text::before { color: #ff00ff; z-index: -1; animation: glitch 0.3s ease both infinite; animation-delay: 0.1s; }
        .glitch-text::after { color: #00ffff; z-index: -2; animation: glitch 0.3s reverse both infinite; animation-delay: 0.2s; }
      `}</style>
    </section>
  );
};

export default Hero;
