import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Themes from "@/components/Themes";
import Prizes from "@/components/Prizes";
import Schedule from "@/components/Schedule";
import Registration from "@/components/Registration";
import Sponsors from "@/components/Sponsors";
import Collaboration from "@/components/Collaboration";
import SpeakersJudges from "@/components/SpeakersJudges";
import Feedback from "@/components/Feedback";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SpaceBackground from "@/components/SpaceBackground";
import { Particles } from "@/components/magicui/particles";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "HexaFalls - Mystery Coding Hackathon";

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        if (href) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            targetEl.scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="page-transition">
        <Hero />
        <div className="matrix-bg">
          <About />
          <Themes />
          <Prizes />
          <Schedule />
          <Sponsors />
          <SpeakersJudges />
          <FAQ />
        </div>
        <Particles
        className="absolute inset-0 z-0"
        quantity={500}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
