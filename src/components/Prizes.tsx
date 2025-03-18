import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Trophy, Award, Medal, Lightbulb } from "lucide-react";
import { GlareCard } from "./ui/glare-card";

interface PrizeCardProps {
  rank: number;
  title: string;
  totalPrize: string;
  cashPrize: string;
  color: string;
  medalColor: string;
}

export function PrizeCard({
  rank,
  title,
  totalPrize,
  cashPrize,
  color,
  medalColor,
}: PrizeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <GlareCard className="flex flex-col items-center justify-center">
      <div
        className={cn(
          "relative h-80 w-full max-w-xs mx-auto rounded-lg overflow-hidden transition-all duration-500 ease-out transform",
          isHovered ? "scale-105 shadow-lg" : "shadow-md"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Binary code background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 opacity-20 binary-animation">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="binary-row">
                {Array.from({ length: 20 }).map((_, j) => (
                  <span
                    key={j}
                    className="text-[8px] text-green-500 opacity-40"
                  >
                    {Math.round(Math.random())}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Card border */}
        <div
          className={cn(
            "absolute inset-0 border-2 rounded-lg transition-all duration-300",
            isHovered ? "border-opacity-100" : "border-opacity-60",
            color
          )}
        >
          {/* Animated corners */}
          <div
            className={cn(
              "absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-all duration-300",
              color,
              isHovered ? "w-5 h-5" : ""
            )}
          ></div>
          <div
            className={cn(
              "absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-all duration-300",
              color,
              isHovered ? "w-5 h-5" : ""
            )}
          ></div>
          <div
            className={cn(
              "absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-all duration-300",
              color,
              isHovered ? "w-5 h-5" : ""
            )}
          ></div>
          <div
            className={cn(
              "absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-all duration-300",
              color,
              isHovered ? "w-5 h-5" : ""
            )}
          ></div>
        </div>

        <div
          className={cn(
            "absolute top-4 right-0 px-4 py-1 transition-all duration-300",
            color,
            isHovered ? "right-[-5px]" : ""
          )}
        >
          <div className={`${medalColor} font-mono font-bold tracking-wider`}>
            {title}
          </div>
        </div>

        <div
          className={cn(
            "absolute top-16 left-1/2 transform -translate-x-1/2 transition-all duration-500",
            isHovered ? "scale-110 rotate-12" : "rotate-0"
          )}
        >
          <div className="relative">
            <Medal
              size={80}
              className={cn("transition-all duration-300", medalColor)}
              strokeWidth={1.5}
              fill={isHovered ? medalColor : "transparent"}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
              {rank}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div
            className={cn(
              "mb-4 transition-all duration-300",
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-90"
            )}
          >
            <div className={cn("text-sm font-mono", color)}>Total Prize</div>
            <div className={cn("text-2xl font-bold font-mono", color)}>
              {totalPrize}
            </div>
          </div>

          <div
            className={cn(
              "transition-all duration-300",
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-90"
            )}
          >
            <div className={cn("text-sm font-mono", color)}>Cash Prize</div>
            <div className={cn("text-2xl font-bold font-mono", color)}>
              {cashPrize}
            </div>
          </div>

          <div
            className={cn(
              "absolute bottom-4 right-4 font-mono text-2xl transition-all duration-300",
              color,
              isHovered ? "opacity-100" : "opacity-60"
            )}
          >
            {`{}`}
          </div>
        </div>

        <div
          className={cn(
            "absolute left-0 right-0 h-[2px] bg-green-400 opacity-70 transition-all duration-1000 ease-in-out",
            isHovered ? "animate-scan-line" : "top-0"
          )}
        ></div>
      </div>
    </GlareCard>
  );
}

const Prizes: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-gravity-gold/10 border border-green-400/30 group-hover:bg-green-400/20 transition-colors">
        <div className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-green-400 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="absolute left-3 top-10 h-full w-px bg-green-400/20 group-last:hidden"></div>

      <section
        id="prizes"
        ref={sectionRef}
        className="relative py-20 md:py-28 px-4 md:px-10 overflow-hidden"
      >
        {/* 3D Bill Cipher Animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-5 z-0">
          <div className="w-full h-full animate-rotate">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <polygon
                points="50,10 90,90 10,90"
                stroke="#F9B72B"
                strokeWidth="0.5"
                fill="#F9B72B"
                fillOpacity="0.3"
              />
              <circle cx="50" cy="40" r="5" fill="white" fillOpacity="0.5" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <h2
              className={cn(
                " text-4xl md:text-6xl font-bold text-green-400 retro-text glow-text jolly-lodger-regular",
                "transform transition-all duration-700 jolly-lodger-regular",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              03. Paranormal Prizes
            </h2>
            <p
              className={cn(
                "text-lg md:text-xl mt-4 text-white/70 max-w-2xl",
                "transform transition-all duration-700 delay-200 TrajanPro",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              Unlock extraordinary rewards for your extraordinary creations
            </p>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <PrizeCard
            icon={<Trophy size={28} />}
            title="First Place"
            amount="$5,000"
            description="The grand prize for the most innovative, technically impressive, and thematically aligned project."
            color="gold"
            delay={300}
            isVisible={isVisible}
          />
          <PrizeCard
            icon={<Award size={28} />}
            title="Second Place"
            amount="$3,000"
            description="For the runner-up project that demonstrates exceptional creativity and technical merit."
            color="silver"
            delay={400}
            isVisible={isVisible}
          />
          <PrizeCard
            icon={<Medal size={28} />}
            title="Third Place"
            amount="$1,500"
            description="Awarded to the third-place team for their outstanding contribution to the hackathon."
            color="bronze"
            delay={500}
            isVisible={isVisible}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
            {
              icon: <Lightbulb size={22} />,
              title: "Most Innovative",
              amount: "$500",
              description:
              "For the project that thinks outside the box with a truly unique approach.",
            },
            {
              icon: <Award size={22} />,
              title: "Best UI/UX",
              amount: "$500",
              description:
              "For the most visually stunning and user-friendly project.",
              },
            {
              icon: <Trophy size={22} />,
              title: "Best Rookie Team",
              amount: "$500",
              description:
              "For the most impressive project by first-time hackathon participants.",
            },
            {
              icon: <Medal size={22} />,
              title: "Mystery Choice",
              amount: "???",
              description:
                "A special prize with mysterious criteria, revealed during the event.",
            },
          ].map((prize, index) => (
            <PrizeCard
              key={prize.title}
              icon={prize.icon}
              title={prize.title}
              amount={prize.amount}
              description={prize.description}
              color="bronze"
              delay={600 + index * 100}
              isVisible={isVisible}
            />
          ))}
        </div> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto p-8">
            {prizes.map((prize) => (
              <PrizeCard
                key={prize.rank}
                rank={prize.rank}
                title={prize.title}
                totalPrize={prize.totalPrize}
                cashPrize={prize.cashPrize}
                color={prize.color}
                medalColor={prize.medalColor}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const prizes = [
  {
    rank: 1,
    title: "1st Prize",
    totalPrize: "30k",
    cashPrize: "25k",
    color: "text-green-500 border-green-500",
    medalColor: "text-yellow-500",
  },
  {
    rank: 2,
    title: "2nd Prize",
    totalPrize: "20k",
    cashPrize: "15k",
    color: "text-green-500 border-green-500",
    medalColor: "text-gray-300",
  },
  {
    rank: 3,
    title: "3rd Prize",
    totalPrize: "15k",
    cashPrize: "10k",
    color: "text-green-500 border-green-500",
    medalColor: "text-amber-700",
  },
];

export default Prizes;
