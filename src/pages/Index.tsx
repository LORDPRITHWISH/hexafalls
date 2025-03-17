
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Themes from '@/components/Themes';
import Prizes from '@/components/Prizes';
import Schedule from '@/components/Schedule';
import Registration from '@/components/Registration';
import Sponsors from '@/components/Sponsors';
import Collaboration from '@/components/Collaboration';
import SpeakersJudges from '@/components/SpeakersJudges';
import Feedback from '@/components/Feedback';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = 'HexaFalls - Mystery Coding Hackathon';
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            targetEl.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gravity-dark">
      <Navbar />
      <main className="page-transition">
        <Hero />
        <About />
        <Themes />
        <Prizes />
        <Schedule />
        <Registration />
        <Sponsors />
        <Collaboration />
        <SpeakersJudges />
        <Feedback />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
