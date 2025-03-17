
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Users, Link, Lightbulb, Code } from 'lucide-react';

const Collaboration: React.FC = () => {
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
        rootMargin: '0px',
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
      id="collaboration"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-10 overflow-hidden bg-gravity-darker/50"
    >
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gravity-purple/10 via-transparent to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2">
            <h2 
              className={cn(
                'font-mystery text-3xl md:text-4xl lg:text-5xl text-white mb-4 gold-glow',
                'transform transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              Join Forces
            </h2>
            <p 
              className={cn(
                'text-lg text-white/70 mb-6',
                'transform transition-all duration-700 delay-200',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              GravityHack thrives on collaboration. Connect with teammates, mentors, and industry experts to create something truly magical.
            </p>
            
            <div 
              className={cn(
                'mb-8 space-y-4',
                'transform transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              {[
                { icon: <Users size={20} />, text: "Form teams of up to 4 investigators" },
                { icon: <Link size={20} />, text: "Connect with mentors and industry pros" },
                { icon: <Lightbulb size={20} />, text: "Brainstorm on mysterious challenges" },
                { icon: <Code size={20} />, text: "Code together to unravel the unknown" }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gravity-purple/20 flex items-center justify-center mr-3 text-gravity-gold">
                    {item.icon}
                  </div>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
            
            <a
              href="#register"
              className={cn(
                'inline-block px-8 py-3 rounded-lg font-medium tracking-wide transition-all',
                'bg-gravity-gold text-gravity-darker hover:bg-gravity-yellow',
                'shadow-[0_0_15px_rgba(249,183,43,0.5)] hover:shadow-[0_0_20px_rgba(249,183,43,0.7)]',
                'transform hover:-translate-y-1',
                'transition-all duration-700 delay-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              Register Your Team
            </a>
          </div>
          
          <div className="lg:col-span-3">
            <div 
              className={cn(
                'relative rounded-xl overflow-hidden',
                'transform transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Hackers collaborating" 
                className="w-full h-auto rounded-xl"
              />
              
              {/* Mystery Shack Map Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gravity-darker via-gravity-darker/40 to-transparent flex flex-col justify-end p-6">
                <div className="bg-gravity-dark/70 backdrop-blur-sm p-4 rounded-lg border border-gravity-gold/30 shadow-lg max-w-md transform -rotate-2">
                  <h3 className="font-mystery text-gravity-gold text-xl mb-2">Mystery Shack Floor Plan</h3>
                  <p className="text-white/80 text-sm mb-3">
                    Explore the collaboration zones at our venue, each themed after different locations from Gravity Falls.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gravity-navy/50 p-2 rounded border border-white/10">
                      <p className="text-gravity-gold">Mystery Shack</p>
                      <p className="text-white/60">Main Hacking Area</p>
                    </div>
                    <div className="bg-gravity-navy/50 p-2 rounded border border-white/10">
                      <p className="text-gravity-gold">Greasy's Diner</p>
                      <p className="text-white/60">Dining & Refreshments</p>
                    </div>
                    <div className="bg-gravity-navy/50 p-2 rounded border border-white/10">
                      <p className="text-gravity-gold">Bottomless Pit</p>
                      <p className="text-white/60">Relaxation Zone</p>
                    </div>
                    <div className="bg-gravity-navy/50 p-2 rounded border border-white/10">
                      <p className="text-gravity-gold">Bunker</p>
                      <p className="text-white/60">Presentation Area</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
