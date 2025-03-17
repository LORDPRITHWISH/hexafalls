import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScheduleEventProps {
  time: string;
  title: string;
  description: string;
  location: string;
  day: number;
  isVisible: boolean;
  delay: number;
}

const ScheduleEvent: React.FC<ScheduleEventProps> = ({
  time,
  title,
  description,
  location,
  isVisible,
  delay,
}) => {
  return (
    <div
      className={cn(
        "group relative pl-10 mb-10",
        "transform transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-gravity-gold/10 border border-gravity-gold/30 group-hover:bg-gravity-gold/20 transition-colors">
        <div className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-gravity-gold transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="absolute left-3 top-10 h-full w-px bg-gravity-gold/20 group-last:hidden"></div>

      <div className="bg-gravity-navy/40 rounded-xl p-6 border border-white/5 hover:border-gravity-gold/20 transition-all shadow-lg group-hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
          <span className="text-gravity-gold font-code text-sm mb-2 md:mb-0">
            {time}
          </span>
          <span className="text-white/60 text-sm font-medium bg-gravity-dark/50 py-1 px-3 rounded-full">
            {location}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </div>
  );
};

const Schedule: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeDay, setActiveDay] = useState(1);

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

  const schedule = {
    1: [
      {
        time: "10:00 AM - 11:00 AM",
        title: "Registration & Welcome",
        description:
          "Check-in, get your badge, and prepare for the mysterious journey ahead.",
        location: "Main Hall",
      },
      {
        time: "11:00 AM - 12:00 PM",
        title: "Opening Ceremony",
        description:
          "Meet the organizers, learn the rules, and discover this year's secret theme.",
        location: "Mystery Theater",
      },
      {
        time: "12:00 PM - 1:30 PM",
        title: "Lunch & Team Formation",
        description:
          "Find your fellow investigators and form your coding detective squad.",
        location: "Cafeteria",
      },
      {
        time: "1:30 PM - 3:00 PM",
        title: "Workshop: Cryptography Basics",
        description:
          "Learn the art of encoding and decoding messages in your applications.",
        location: "Workshop Room A",
      },
      {
        time: "3:30 PM - 5:00 PM",
        title: "Workshop: API Mysteries",
        description:
          "Discover the hidden powers of APIs and how to integrate them into your project.",
        location: "Workshop Room B",
      },
      {
        time: "5:00 PM - Late",
        title: "Hacking Begins",
        description:
          "Your team's journey into the unknown starts now. May the code be with you!",
        location: "Hacking Spaces",
      },
    ],
    2: [
      {
        time: "8:00 AM - 9:00 AM",
        title: "Breakfast",
        description:
          "Fuel up for another day of innovative coding and problem-solving.",
        location: "Cafeteria",
      },
      {
        time: "10:00 AM - 11:30 AM",
        title: "Workshop: UI Dark Arts",
        description:
          "Master the mystical techniques of creating captivating user interfaces.",
        location: "Workshop Room A",
      },
      {
        time: "12:00 PM - 1:30 PM",
        title: "Lunch & Mentor Matching",
        description:
          "Connect with industry experts who can guide your project to success.",
        location: "Cafeteria & Lounge",
      },
      {
        time: "2:00 PM - 3:30 PM",
        title: "Mid-Hackathon Challenge",
        description:
          "A surprise coding challenge with bonus prizes for the quickest solvers.",
        location: "Mystery Theater",
      },
      {
        time: "4:00 PM - 5:00 PM",
        title: "Tech Talk: Future of AI",
        description:
          "Explore the enigmatic potential of artificial intelligence in tomorrow's world.",
        location: "Lecture Hall",
      },
      {
        time: "6:00 PM - 7:30 PM",
        title: "Dinner & Networking",
        description:
          "Share your progress while enjoying a meal with fellow hackers and sponsors.",
        location: "Cafeteria",
      },
    ],
    3: [
      {
        time: "8:00 AM - 9:00 AM",
        title: "Breakfast",
        description:
          "The final countdown begins. Grab some food and prepare for submission.",
        location: "Cafeteria",
      },
      {
        time: "11:00 AM - 12:00 PM",
        title: "Submission Deadline",
        description:
          "All projects must be submitted by this time. No exceptions!",
        location: "Online Platform",
      },
      {
        time: "12:00 PM - 1:30 PM",
        title: "Lunch & Presentation Prep",
        description:
          "Finalize your demo and practice your pitch while enjoying lunch.",
        location: "Cafeteria & Team Spaces",
      },
      {
        time: "2:00 PM - 4:00 PM",
        title: "Project Showcase",
        description:
          "Present your mysterious creation to judges and fellow participants.",
        location: "Exhibition Hall",
      },
      {
        time: "4:30 PM - 5:30 PM",
        title: "Closing Ceremony & Awards",
        description:
          "Discover which teams unraveled the mysteries most effectively and win prizes!",
        location: "Mystery Theater",
      },
    ],
  };

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-10 "
    >
      {/* Background Effects */}
      <div className="absolute inset-0 b backdrop-blur-[120px] z-0"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gravity-gold/20 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gravity-gold/20 to-transparent"></div>

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
            The Mysterious Timeline
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
            Three days of coding, workshops, and uncovering the secrets of
            technology
          </p>
        </div>

        <div
          className={cn(
            "flex justify-center space-x-4 mb-12",
            "transform transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {[1, 2, 3].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={cn(
                "py-3 px-6 rounded-lg font-medium transition-all",
                activeDay === day
                  ? "bg-gravity-gold text-gravity-darker shadow-[0_0_15px_rgba(249,183,43,0.5)]"
                  : "bg-gravity-navy/50 text-white/80 hover:bg-gravity-gold/20"
              )}
            >
              Day {day}
            </button>
          ))}
        </div>

        <div className="relative pl-4">
          {Object.entries(schedule).map(([day, events]) => (
            <div
              key={day}
              className={cn(
                "transition-all duration-500",
                parseInt(day) === activeDay ? "block" : "hidden"
              )}
            >
              {events.map((event, index) => (
                <ScheduleEvent
                  key={index}
                  {...event}
                  day={parseInt(day)}
                  isVisible={isVisible && parseInt(day) === activeDay}
                  delay={300 + index * 150}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
