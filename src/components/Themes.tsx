import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Lightbulb, Book, Skull, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface ThemeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
  image: string;
  link?: string;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  icon,
  title,
  description,
  delay,
  isVisible,
  image,
  link,
}) => {
  const CardWrapper = link ? Link : "div";
  return (
    <CardWrapper
      to={link}
      className={cn(
        "relative rounded-xl overflow-hidden transition-all duration-700 h-96",
        "transform opacity-0 translate-y-8 group",
        isVisible ? "opacity-100 translate-y-0" : "",
        link ? "cursor-pointer" : ""
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0  transition-all duration-300"></div>
      <img src={image} alt={title} className="w-full h-full object-cover" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gravity-darker via-gravity-darker/80 to-transparent">
        <div className="bg-gravity-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <div className="text-gravity-gold">{icon}</div>
        </div>
        <h3 className="text-2xl font-mystery text-gravity-gold mb-2">
          {title}
        </h3>
        <p className="text-white/70 text-sm">{description}</p>

        {link && (
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-gravity-gold text-sm flex items-center gap-1">
              Explore <Eye size={14} />
            </span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

const Themes: React.FC = () => {
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

  const themes = [
    {
      icon: <Lightbulb size={24} />,
      title: "Anomalies & Algorithms",
      description:
        "Build projects that detect, analyze, or simulate paranormal activity using data algorithms and machine learning.",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      icon: <Book size={24} />,
      title: "Journal Projects",
      description:
        "Create digital interactive journals, encryption systems, or knowledge repositories inspired by the journals from Gravity Falls.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    },
    {
      icon: <Skull size={24} />,
      title: "Supernatural Systems",
      description:
        "Develop applications that bridge the gap between technology and the supernatural, like ghost detectors, creature catalogs, or parallel world simulators.",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      icon: <Star size={24} />,
      title: "Bill Cipher Explorer",
      description:
        "Interact with our 3D Bill Cipher model. Click, drag, and zoom to discover the secrets of the dream demon himself!",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      link: "/bill-cipher",
    },
  ];

  return (
    <section
      id="themes"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-10 overflow-hidden "
    >
      <div className="absolute inset-0 pine-pattern opacity-5 z-0"></div>

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
            02. Hack The Mystery
          </h2>
          <p
            className={cn(
              "text-lg md:text-xl text-white/70 max-w-2xl mx-auto",
              "transform transition-all duration-700 delay-200",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            Choose your paranormal path with our enigmatic themes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme, index) => (
            <ThemeCard
              key={theme.title}
              icon={theme.icon}
              title={theme.title}
              description={theme.description}
              delay={300 + index * 100}
              isVisible={isVisible}
              image={theme.image}
              link={theme.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Themes;
