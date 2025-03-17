
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Twitter, Linkedin, Globe, ExternalLink } from 'lucide-react';

interface SpeakerCardProps {
  name: string;
  role: string;
  company: string;
  image: string;
  description: string;
  socialLinks: { twitter?: string; linkedin?: string; website?: string; };
  delay: number;
  isVisible: boolean;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ 
  name, role, company, image, description, socialLinks, delay, isVisible 
}) => {
  return (
    <div 
      className={cn(
        ' border border-white/10 rounded-xl overflow-hidden transition-all duration-700',
        'hover:border-gravity-gold/30 hover:bg-gravity-navy/40 group',
        'transform opacity-0 translate-y-8',
        isVisible ? 'opacity-100 translate-y-0' : ''
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-gravity-darker via-gravity-darker/60 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-semibold text-white mb-1 leading-tight group-hover:text-gravity-gold transition-colors">{name}</h3>
            <p className="text-gravity-gold text-sm font-medium">{role}</p>
            <p className="text-white/70 text-xs">{company}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-white/70 text-sm mb-4">{description}</p>
        
        <div className="flex space-x-3">
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} className="text-white/60 hover:text-gravity-gold transition-colors" aria-label={`${name}'s Twitter`}>
              <Twitter size={18} />
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} className="text-white/60 hover:text-gravity-gold transition-colors" aria-label={`${name}'s LinkedIn`}>
              <Linkedin size={18} />
            </a>
          )}
          {socialLinks.website && (
            <a href={socialLinks.website} className="text-white/60 hover:text-gravity-gold transition-colors" aria-label={`${name}'s Website`}>
              <Globe size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const SpeakersJudges: React.FC = () => {
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

  const speakers = [
    {
      name: "Stanford Pines",
      role: "Keynote Speaker",
      company: "Gravity Falls Institute of Oddology",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Six-fingered author of the journals and interdimensional traveler. Expert in quantum computing and paranormal programming paradigms.",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        website: "#"
      }
    },
    {
      name: "Fiddleford McGucket",
      role: "Workshop Leader",
      company: "McGucket Labs",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      description: "Eccentric inventor and robotics genius. Will be leading our hardware hacking workshop and sharing insights on building anomaly detection devices.",
      socialLinks: {
        twitter: "#",
        website: "#"
      }
    },
    {
      name: "Mabel Pines",
      role: "UX/UI Workshop",
      company: "Sweater Weather Designs",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      description: "Creative design expert specializing in colorful, user-friendly interfaces. Will teach you how to make your projects pop with personality.",
      socialLinks: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Dipper Pines",
      role: "Workshop Leader",
      company: "Mystery Hunters Alliance",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Researcher and problem solver extraordinaire. Will be leading sessions on logical thinking, debugging, and methodical approaches to coding mysteries.",
      socialLinks: {
        twitter: "#",
        website: "#"
      }
    }
  ];

  const judges = [
    {
      name: "Wendy Corduroy",
      role: "Judge",
      company: "Gravity Coders Collective",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
      description: "Cool-headed tech lead with a sharp eye for practical solutions and real-world applications. Looking for projects with both style and substance.",
      socialLinks: {
        linkedin: "#",
        website: "#"
      }
    },
    {
      name: "Soos Ramirez",
      role: "Judge",
      company: "Ramirez Repair & Tech",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      description: "Handyman extraordinaire with a passion for gaming and fixing complex systems. Appreciates technical creativity and unconventional approaches.",
      socialLinks: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Bill Cipher",
      role: "Mystery Judge",
      company: "Interdimensional Affairs",
      image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2077&q=80",
      description: "Interdimensional being with an eye for detail. Criteria for judging remain shrouded in mystery. Approach with caution and don't make any deals!",
      socialLinks: {
        website: "#"
      }
    },
    {
      name: "Pacifica Northwest",
      role: "Judge",
      company: "Northwest Ventures",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80",
      description: "Venture capital representative with high standards for polish and presentation. Looking for projects with commercial potential and refined user experience.",
      socialLinks: {
        twitter: "#",
        linkedin: "#"
      }
    }
  ];

  return (
    <section
      id="speakers-judges"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-10 overflow-hidden"
    >
      <div className="absolute inset-0 pine-pattern opacity-5 z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 
            className={cn(
              'font-mystery text-3xl md:text-4xl lg:text-5xl text-white mb-4 gold-glow',
              'transform transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Mysterious Minds
          </h2>
          <p 
            className={cn(
              'text-lg md:text-xl text-white/70 max-w-2xl mx-auto',
              'transform transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Meet the enigmatic experts who will guide and judge your paranormal projects
          </p>
        </div>

        <div className="space-y-16">
          <div>
            <h3 
              className={cn(
                "font-mystery text-2xl md:text-3xl text-gravity-gold mb-8 text-center",
                'transform transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              Featured Speakers
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {speakers.map((speaker, index) => (
                <SpeakerCard
                  key={speaker.name}
                  name={speaker.name}
                  role={speaker.role}
                  company={speaker.company}
                  image={speaker.image}
                  description={speaker.description}
                  socialLinks={speaker.socialLinks}
                  delay={400 + index * 100}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 
              className={cn(
                "font-mystery text-2xl md:text-3xl text-gravity-gold mb-8 text-center",
                'transform transition-all duration-700 delay-800',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              Distinguished Judges
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {judges.map((judge, index) => (
                <SpeakerCard
                  key={judge.name}
                  name={judge.name}
                  role={judge.role}
                  company={judge.company}
                  image={judge.image}
                  description={judge.description}
                  socialLinks={judge.socialLinks}
                  delay={900 + index * 100}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div 
          className={cn(
            'mt-16 text-center',
            'transform transition-all duration-700 delay-1300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <a
            href="#"
            className={cn(
              'inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium tracking-wide transition-all',
              'bg-transparent text-white hover:text-gravity-gold',
              'border border-white/20 hover:border-gravity-gold/50'
            )}
          >
            <span>View Full Speaker Schedule</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SpeakersJudges;
