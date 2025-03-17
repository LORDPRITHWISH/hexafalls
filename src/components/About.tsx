
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Lightbulb, Code, Users } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
}> = ({ icon, title, description, delay, isVisible }) => {
  return (
    <div 
      className={cn(
        'glass p-6 rounded-xl transition-all duration-700',
        'transform opacity-0 translate-y-8',
        isVisible ? 'opacity-100 translate-y-0' : '',
        `transition-delay-${delay}`
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-gravity-gold/10 w-14 h-14 rounded-lg flex items-center justify-center mb-5">
        <div className="text-gravity-gold">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

const About: React.FC = () => {
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
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-10 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pine-pattern opacity-5 z-0"></div>
      <div className="absolute -left-10 -bottom-20 w-64 h-64 bg-gravity-purple/20 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -right-10 top-20 w-72 h-72 bg-gravity-blue/20 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 
            className={cn(
              'font-mystery text-3xl md:text-4xl lg:text-5xl text-white mb-4 gold-glow',
              'transform transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Decode The Mystery
          </h2>
          <p 
            className={cn(
              'text-lg md:text-xl text-white/70 max-w-2xl mx-auto',
              'transform transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            GravityHack is more than just a hackathon—it's an immersive journey into the unknown 
            where coding meets mystery and innovation collides with the supernatural.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Lightbulb size={28} />}
            title="Enigmatic Challenges"
            description="Tackle coding mysteries and puzzles that will test your problem-solving skills in ways you never expected."
            delay={300}
            isVisible={isVisible}
          />
          <FeatureCard 
            icon={<Code size={28} />}
            title="Cryptic Coding"
            description="Learn to code with ciphers and develop solutions to unravel the secrets hidden within the digital realm."
            delay={500}
            isVisible={isVisible}
          />
          <FeatureCard 
            icon={<Users size={28} />}
            title="Mysterious Networking"
            description="Connect with fellow investigators and mentors who will guide you through the fog of technological uncertainty."
            delay={700}
            isVisible={isVisible}
          />
        </div>

        <div 
          className={cn(
            'mt-16 p-8 md:p-10 journal-paper rounded-xl relative',
            'shadow-journal transform transition-all duration-700 delay-800',
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        >
          <div className="absolute top-3 right-4 text-gravity-gold/80 font-code text-sm">
            JOURNAL ENTRY #618
          </div>
          <h3 className="font-mystery text-gravity-gold text-2xl md:text-3xl mb-4">
            Why Join GravityHack?
          </h3>
          <div className="space-y-4 text-white/80">
            <p>
              In the mysterious town of DigitalFalls, where the veil between technology and the supernatural is thin, 
              we invite courageous developers to join us for a weekend of coding, cryptography, and uncanny creativity.
            </p>
            <p>
              Whether you're a seasoned developer or just beginning your coding journey, 
              GravityHack offers a unique chance to push the boundaries of what's possible when imagination meets innovation.
            </p>
            <p>
              With $10,000 in prizes, workshops led by industry experts, and networking opportunities with leading tech companies, 
              this is your chance to make your mark in the unexplored territories of the digital dimension.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
