"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { LiaDiscord } from "react-icons/lia";
import { FaQuestionCircle } from "react-icons/fa";
import RadicalGlitchTitle from "./RadicalGlitchTitle";
import GlitchText from "./GlitchText";
import GlitchHeading from "./GlitchHeading";
import Newglitch from "./Newglitch";
import GlichTitle from "./GlichTitle";

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showCipherGuide, setShowCipherGuide] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glitchTextRef = useRef<HTMLDivElement>(null);
  const staticFrameRef = useRef<number | NodeJS.Timeout>();
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Bill Cipher alphabet mapping
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

  // Convert text to Bill Cipher
  const convertToCipher = (text: string) => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => cipherMap[char] || char)
      .join("");
  };

  useEffect(() => {
    setIsLoaded(true);

    // TV static effect - minimal version
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas dimensions but with greatly reduced size for performance
    const resizeCanvas = () => {
      // Use a very small canvas for the static effect
      const scale = 0.15; // Only 15% resolution for static
      canvas.width = Math.floor(window.innerWidth * scale);
      canvas.height = Math.floor(window.innerHeight * scale);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    };
    window.addEventListener("resize", handleResize);

    // Lightweight static effect
    const renderStatic = () => {
      if (!ctx) return;

      // Semi-transparent clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Very minimal static - just enough for effect
      const dotsCount = Math.floor(canvas.width * canvas.height * 0.005);
      for (let i = 0; i < dotsCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const grayValue = Math.random() * 255;
        ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, 0.05)`;
        ctx.fillRect(x, y, 1, 1);
      }

      // Very rare glitch lines (only 1% chance)
      if (Math.random() > 0.99) {
        const y = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(0, 255, 255, 0.1)`;
        ctx.fillRect(0, y, canvas.width, 2);
      }

      // Limit to ~10 FPS for the static effect
      staticFrameRef.current = setTimeout(() => {
        staticFrameRef.current = requestAnimationFrame(renderStatic);
      }, 100); // 10 FPS
    };

    // Only start the static animation once the background has loaded
    if (bgLoaded) {
      staticFrameRef.current = requestAnimationFrame(renderStatic);
    }

    // Simplified glitch text effect - much less frequent
    const glitchText = () => {
      if (!glitchTextRef.current) return;

      const element = glitchTextRef.current;
      const originalText = "HexaFalls";
      const cipherText = convertToCipher("HexaFalls");

      // Very rare glitch (10% chance every 5 seconds)
      if (Math.random() > 0.9) {
        element.classList.add("glitching");
        element.textContent = Math.random() > 0.5 ? originalText : cipherText;

        setTimeout(() => {
          element.classList.remove("glitching");
          element.textContent = originalText;
        }, 100);
      }
    };

    // Much less frequent glitch interval
    glitchIntervalRef.current = setInterval(glitchText, 5000);

    return () => {
      setIsLoaded(false);
      if (typeof staticFrameRef.current === "number") {
        cancelAnimationFrame(staticFrameRef.current);
      } else if (staticFrameRef.current) {
        clearTimeout(staticFrameRef.current);
      }
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [bgLoaded]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background GIF */}
      <div className="absolute inset-0 z-0">
        <img
          src="/GF/the-mystery-shack-gravity-falls-moewalls-com.gif"
          alt="Mystery Shack from Gravity Falls"
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => setBgLoaded(true)}
          loading="eager"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* TV Static Canvas - reduced opacity and only shown when background loaded */}
      {bgLoaded && <canvas ref={canvasRef} className="absolute inset-0 z-10 opacity-10 pointer-events-none" />}

      {/* Minimal floating elements - just one */}
      <div className={cn("absolute w-40 h-40 top-10 right-10 opacity-0 transition-opacity duration-1000 delay-700", isLoaded ? "opacity-30 animate-pulse-slow" : "")}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
          <path d="M50 10 L90 80 L10 80 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="50" cy="40" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="container relative z-20 px-4 md:px-6 mx-auto flex flex-col items-center justify-center text-center">
        <div className={cn("transform transition-all duration-1000 opacity-0 scale-95", isLoaded ? "opacity-100 scale-100" : "translate-y-4")}>
          <div className="inline-block mb-6">
            <span className="cipher-text text-sm sm:text-base py-1 px-3 rounded-full border border-green-500/20 bg-green-500/5 text-white">
              <GlitchText
                text="APRIL 26-27, 2024"
                color="#FFD700"
                fontSize="1rem"
                autoReveal={true}
                revealInterval={6000}
                revealDuration={5000}
                className="tracking-widest font-mono"
                hoverReveal={true}
              />
            </span>
          </div>

          {/* <h1 ref={glitchTextRef} className="text-4xl md:text-6xl lg:text-8xl text-white mb-4 tracking-wide green-glow rubik-glitch-regular">
            HexaFalls
          </h1> */}

          {/* <Newglitch /> */}
          <GlichTitle text="HexaFalls" />

          {/* <GlitchHeading text="HexaFalls" className="rubik-glitch-regular" /> */}
          {/* <GlitchHeading
            text="HexaFalls"
            className="my-8 rubik-glitch-regular"
            fontSize="8rem"
            depth={30}
            primaryColor="#00FFFB"
            secondaryColor="#FF00A8"
            shadowColor="rgba(0,0,0,0.6)"
          /> */}

          {/* <GlitchHeading as="h1" className="text-6xl font-bold mb-8" glitchInterval={3000}>
            HexaFalls
          </GlitchHeading> */}

          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center items-center",
              "transform transition-all duration-1000 delay-300 opacity-0",
              isLoaded ? "opacity-100" : "translate-y-4"
            )}
          >
            <a
              href="#register"
              className={cn(
                " rounded-lg font-medium tracking-wide transition-all",
                "bg-green-500 text-green-950 hover:bg-green-400",
                "shadow-[0_0_15px_rgba(72,187,120,0.5)]",
                "transform hover:-translate-y-1"
              )}
            >
              <RadicalGlitchTitle
                text="Join the Mystery"
                // crypticText="ᚺᛖᚲᛊᚨᚠᚨᛚᛚᛊ"
                primaryColor="#00FFFF"
                secondaryColor="#FF00FF"
                fontSize="1rem"
                freakOutInterval={4000}
                freakOutDuration={800}
                className="tracking-wider"
                padclassName="py-3 px-6"
              />
            </a>
            <a
              href="#discord"
              className={cn(
                "px-8 py-3 rounded-lg font-medium tracking-wide transition-all",
                "bg-transparent text-white hover:text-green-500",
                "border border-white/20 hover:border-green-500/50 flex items-center"
              )}
            >
              <LiaDiscord className="w-6 h-6 mr-2" />
              Discord
            </a>
          </div>
        </div>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 font-medium cipher-message mt-5">
          <GlitchText
            text="Join the Mystery"
            color="#FFD700"
            fontSize="2rem"
            autoReveal={true}
            revealInterval={6000}
            revealDuration={3000}
            className="tracking-widest font-mono"
            hoverReveal={true}
          />
        </p>
      </div>

      {/* Cipher Guide Modal - only render when needed */}
      {showCipherGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-black/90 p-8 rounded-lg border border-green-500/20 max-w-2xl">
            <h2 className="text-2xl font-bold text-green-500 mb-4">Bill Cipher Alphabet Guide</h2>
            <div className="grid grid-cols-5 gap-4">
              {Object.entries(cipherMap).map(([letter, symbol]) => (
                <div key={letter} className="flex flex-col items-center">
                  <span className="text-green-400 text-xl">{symbol}</span>
                  <span className="text-white/70 text-sm">{letter}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowCipherGuide(false)} className="mt-6 px-4 py-2 bg-green-500 text-green-950 rounded-lg hover:bg-green-400 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.2; }
        }

        @keyframes glitch {
          0% { transform: translate(0); text-shadow: 0 0 5px #52F2E8; }
          50% { transform: translate(-1px, 1px); text-shadow: 1px 0 3px #ff00ff; }
          100% { transform: translate(0); text-shadow: 0 0 5px #52F2E8; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .glitching {
          animation: glitch 0.2s linear forwards;
        }

        .glitch-text {
          text-shadow: 0 0 8px rgba(82, 242, 232, 0.6);
        }

        .green-glow {
          text-shadow: 0 0 10px rgba(82, 242, 232, 0.6);
        }

        .cipher-text {
          font-family: monospace;
          letter-spacing: 2px;
        }

        .cipher-message {
          font-family: monospace;
          letter-spacing: 3px;
        }
      `}</style>
    </section>
  );
};

export default Hero;
