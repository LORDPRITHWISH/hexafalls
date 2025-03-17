import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Trophy, Award, Medal, Lightbulb } from "lucide-react";

const PrizeCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  amount: string;
  description: string;
  color: string;
  delay: number;
  isVisible: boolean;
}> = ({ icon, title, amount, description, color, delay, isVisible }) => {
  return (
    <div
      className={cn(
        "relative p-6 rounded-xl overflow-hidden transition-all duration-700",
        "transform opacity-0 translate-y-8",
        isVisible ? "opacity-100 translate-y-0" : "",
        color === "gold"
          ? "bg-gradient-to-br from-gravity-gold/20 to-yellow-900/20 border border-gravity-gold/30"
          : color === "silver"
          ? "bg-gradient-to-br from-white/10 to-gray-700/10 border border-white/20"
          : "bg-gradient-to-br from-amber-700/10 to-amber-900/10 border border-amber-700/20"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0,0 L100,0 L100,100 Z"
            fill={
              color === "gold"
                ? "#F9B72B"
                : color === "silver"
                ? "#C0C0C0"
                : "#CD7F32"
            }
          />
        </svg>
      </div>

      <div
        className={cn(
          "w-14 h-14 rounded-lg flex items-center justify-center mb-5",
          color === "gold"
            ? "bg-gravity-gold/20 text-gravity-gold"
            : color === "silver"
            ? "bg-white/10 text-white"
            : "bg-amber-700/20 text-amber-700"
        )}
      >
        {icon}
      </div>

      <h3
        className={cn(
          "text-xl font-semibold mb-1",
          color === "gold"
            ? "text-gravity-gold"
            : color === "silver"
            ? "text-white"
            : "text-amber-700"
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          "text-2xl font-mystery mb-3",
          color === "gold"
            ? "text-gravity-gold"
            : color === "silver"
            ? "text-white/90"
            : "text-amber-700/90"
        )}
      >
        {amount}
      </p>

      <p className="text-white/70 text-sm">{description}</p>
    </div>
  );
};

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
            Paranormal Prizes
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
        </div>
      </div>
    </section>
  );
};

export default Prizes;
