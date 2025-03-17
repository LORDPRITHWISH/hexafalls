"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { LiaDiscord } from "react-icons/lia";
import { FaQuestionCircle } from "react-icons/fa"; // Importing a question mark icon

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showCipherGuide, setShowCipherGuide] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glitchTextRef = useRef<HTMLDivElement>(null);

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
      .map((char) => {
        return cipherMap[char] || char;
      })
      .join("");
  };

  useEffect(() => {
    setIsLoaded(true);

    // TV static effect
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create TV static animation
    let animationFrameId: number;
    const renderStatic = () => {
      if (!ctx) return;

      // Semi-transparent black overlay to make the static subtle
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw static noise
      for (let i = 0; i < canvas.width * canvas.height * 0.05; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const grayValue = Math.random() * 255;
        const alpha = Math.random() * 0.05 + 0.05; // Keep it subtle

        ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${alpha})`;
        ctx.fillRect(x, y, 2, 2);
      }

      // Occasional glitch lines
      if (Math.random() > 0.95) {
        const y = Math.random() * canvas.height;
        const height = Math.random() * 10 + 2;
        ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.2})`;
        ctx.fillRect(0, y, canvas.width, height);
      }

      animationFrameId = requestAnimationFrame(renderStatic);
    };

    renderStatic();

    // Glitch text effect
    const glitchText = () => {
      if (!glitchTextRef.current) return;

      const element = glitchTextRef.current;
      const originalText = "HexaFalls";
      const cipherText = convertToCipher("HexaFalls");

      // Random glitch effect
      if (Math.random() > 0.7) {
        element.classList.add("glitching");
        element.textContent = Math.random() > 0.5 ? originalText : cipherText;

        setTimeout(() => {
          element.classList.remove("glitching");
          element.textContent = originalText;
        }, Math.random() * 200 + 50);
      }
    };

    const glitchInterval = setInterval(glitchText, 2000);

    return () => {
      setIsLoaded(false);
      cancelAnimationFrame(animationFrameId);
      clearInterval(glitchInterval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* TV Static Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 opacity-30 pointer-events-none"
      />

      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* <img
          src="/GF/the-mystery-shack-gravity-falls-moewalls-com.gif"
          alt="Mystery Shack from Gravity Falls"
          className="absolute inset-0 w-full h-full object-cover"
        /> */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Floating Elements */}
      <div
        className={cn(
          "absolute w-20 h-20 top-1/4 left-1/4 opacity-0 transition-opacity duration-1000",
          isLoaded ? "opacity-20 animate-float" : ""
        )}
      >
        <div className="w-full h-full rounded-full border border-green-500/30 rotate-45"></div>
      </div>

      <div
        className={cn(
          "absolute w-32 h-32 bottom-1/4 right-1/3 opacity-0 transition-opacity duration-1000 delay-300",
          isLoaded ? "opacity-10 animate-float" : ""
        )}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-400/30">
          <path
            d="M50 10 L90 50 L50 90 L10 50 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div
        className={cn(
          "absolute w-24 h-24 top-1/3 right-1/4 opacity-0 transition-opacity duration-1000 delay-500",
          isLoaded ? "opacity-15 animate-float" : ""
        )}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-300/20">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Bill Cipher Symbol */}
      <div
        className={cn(
          "absolute w-40 h-40 top-10 right-10 opacity-0 transition-opacity duration-1000 delay-700",
          isLoaded ? "opacity-30 animate-pulse" : ""
        )}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
          <path
            d="M50 10 L90 80 L10 80 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="50"
            cy="40"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="container relative z-20 px-4 md:px-6 mx-auto flex flex-col items-center justify-center text-center">
        <div
          className={cn(
            "transform transition-all duration-1000 opacity-0 scale-95",
            isLoaded ? "opacity-100 scale-100" : "translate-y-4"
          )}
        >
          <div className="inline-block mb-6">
            <span className="cipher-text text-sm sm:text-base py-1 px-3 rounded-full border border-green-500/20 bg-green-500/5 text-white">
              {convertToCipher("APRIL 26-27, 2024")}
            </span>
          </div>

          {/* <h1
            ref={glitchTextRef}
            className="text-4xl md:text-6xl lg:text-8xl text-white mb-4 tracking-wide green-glow glitch-text rubik-glitch-regular"
          >
            HexaFalls
          </h1> */}

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
                "px-8 py-3 rounded-lg font-medium tracking-wide transition-all",
                "bg-green-500 text-green-950 hover:bg-green-400",
                "shadow-[0_0_15px_rgba(72,187,120,0.5)] hover:shadow-[0_0_20px_rgba(72,187,120,0.7)]",
                "transform hover:-translate-y-1"
              )}
            >
              Join the Mystery
            </a>

            <a
              href="#discord"
              className={cn(
                "px-8 py-3 rounded-lg font-medium tracking-wide transition-all",
                "bg-transparent text-white hover:text-green-500",
                "border border-white/20 hover:border-green-500/50 flex items-center space-x-3"
              )}
            >
              <LiaDiscord className="w-6 h-6 mr-2" />
              Discord
            </a>
          </div>
        </div>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 font-medium cipher-message mt-5">
          <span
            className="text-yellow-400 cursor-pointer relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? convertToCipher("I AM WATCHING") : "I AM WATCHING"}
            <FaQuestionCircle
              className="inline-block ml-2 cursor-pointer"
              onClick={() => {
                console.log("Cipher guide icon clicked"); // Debugging
                setShowCipherGuide(true);
              }}
            />
          </span>
        </p>
      </div>
      {/* Cipher Guide Modal */}
      {showCipherGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-black/90 p-8 rounded-lg border border-green-500/20 max-w-2xl">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              Bill Cipher Alphabet Guide
            </h2>
            <div className="grid grid-cols-5 gap-4">
              {Object.entries(cipherMap).map(([letter, symbol]) => (
                <div key={letter} className="flex flex-col items-center">
                  <span className="text-green-400 text-xl">{symbol}</span>
                  <span className="text-white/70 text-sm">{letter}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                console.log("Close button clicked");
                setShowCipherGuide(false);
              }}
              className="mt-6 px-4 py-2 bg-green-500 text-green-950 rounded-lg hover:bg-green-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            text-shadow: 0 0 5px #52F2E8, 0 0 10px #52F2E8;
          }
          20% {
            transform: translate(-2px, 2px);
            text-shadow: 2px 0 5px #ff00ff, -2px 0 10px #00ffff;
          }
          40% {
            transform: translate(-2px, -2px);
            text-shadow: 2px 0 5px #00ffff, -2px 0 10px #ff00ff;
          }
          60% {
            transform: translate(2px, 2px);
            text-shadow: 2px 0 5px #ff00ff, -2px 0 10px #00ffff;
          }
          80% {
            transform: translate(2px, -2px);
            text-shadow: 2px 0 5px #00ffff, -2px 0 10px #ff00ff;
          }
          100% {
            transform: translate(0);
            text-shadow: 0 0 5px #52F2E8, 0 0 10px #52F2E8;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .glitching {
          animation: glitch 0.3s linear infinite;
        }

        .glitch-text {
          text-shadow: 0 0 10px rgba(82, 242, 232, 0.7), 0 0 20px rgba(82, 242, 232, 0.5);
          position: relative;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: 'HexaFalls';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }

        .glitch-text::before {
          color: #ff00ff;
          z-index: -1;
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
          animation-delay: 0.1s;
        }

        .glitch-text::after {
          color: #00ffff;
          z-index: -2;
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
          animation-delay: 0.2s;
        }

        .green-glow {
          text-shadow: 0 0 10px rgba(82, 242, 232, 0.7), 0 0 20px rgba(82, 242, 232, 0.5), 0 0 30px rgba(82, 242, 232, 0.3);
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
