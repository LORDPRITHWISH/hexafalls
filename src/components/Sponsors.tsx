import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SponsorLogoProps {
  name: string;
  level: "gold" | "silver" | "bronze";
  delay: number;
  isVisible: boolean;
}

const SponsorLogo: React.FC<SponsorLogoProps> = ({
  name,
  level,
  delay,
  isVisible,
}) => {
  const levelClasses = {
    gold: "border-gravity-gold/30 bg-gravity-gold/5 hover:bg-gravity-gold/10 hover:border-gravity-gold/50",
    silver:
      "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30",
    bronze:
      "border-amber-700/20 bg-amber-700/5 hover:bg-amber-700/10 hover:border-amber-700/30",
  };

  const levelSizes = {
    gold: "h-24 md:h-28",
    silver: "h-20 md:h-24",
    bronze: "h-16 md:h-20",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center border rounded-xl transition-all p-6",
        levelClasses[level],
        levelSizes[level],
        "transform opacity-0 translate-y-8",
        isVisible ? "opacity-100 translate-y-0" : ""
      )}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: "700ms" }}
    >
      <div
        className={cn(
          "font-code tracking-wide text-center",
          level === "gold"
            ? "text-gravity-gold text-xl"
            : level === "silver"
            ? "text-white/90 text-lg"
            : "text-amber-700/90 text-base"
        )}
      >
        {name}
      </div>
    </div>
  );
};

const Sponsors: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const goldSponsors = ["Cipher Systems", "Mystery Tech", "Enigma Labs"];

  const silverSponsors = [
    "Cryptic Cloud",
    "Quantum Code",
    "Arcane AI",
    "Northwest Technologies",
  ];

  const bronzeSponsors = [
    "Mindscape",
    "Rune Digital",
    "Pine Software",
    "Journal Frameworks",
    "Triangle Solutions",
    "Eye Security",
  ];

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-10 "
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gravity-gold/5 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className=" mb-16">
          <h2
            className={cn(
              " text-4xl md:text-6xl font-bold text-green-400 retro-text glow-text jolly-lodger-regular",
              "transform transition-all duration-700 jolly-lodger-regular",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            05. Our Mysterious Backers
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
            These enigmatic organizations have emerged from the shadows to
            support our hackathon
          </p>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <h3
              className={cn(
                "text-center font-mystery text-2xl md:text-3xl text-gravity-gold mb-6",
                "transform transition-all duration-700 delay-300 jolly-lodger-regular",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              Gold Sponsors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {goldSponsors.map((sponsor, index) => (
                <SponsorLogo
                  key={sponsor}
                  name={sponsor}
                  level="gold"
                  delay={400 + index * 100}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3
              className={cn(
                "text-center font-medium text-xl md:text-2xl text-white mb-6",
                "transform transition-all duration-700 delay-700 ",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              Silver Sponsors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {silverSponsors.map((sponsor, index) => (
                <SponsorLogo
                  key={sponsor}
                  name={sponsor}
                  level="silver"
                  delay={800 + index * 100}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3
              className={cn(
                "text-center font-medium text-lg md:text-xl text-amber-700 mb-6",
                "transform transition-all duration-700 delay-1200",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              Bronze Sponsors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {bronzeSponsors.map((sponsor, index) => (
                <SponsorLogo
                  key={sponsor}
                  name={sponsor}
                  level="bronze"
                  delay={1300 + index * 100}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mt-16 text-center",
            "transform transition-all duration-700 delay-1800",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h3 className="text-xl md:text-2xl text-white mb-4">
            Interested in Sponsoring?
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-6">
            Join our league of mysterious backers and support the next
            generation of coding detectives.
          </p>
          <a
            href="#"
            className={cn(
              "inline-block px-8 py-3 rounded-lg font-medium tracking-wide transition-all",
              "bg-transparent text-white hover:text-green-400",
              "border border-white/20 hover:border-green-400/50"
            )}
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
