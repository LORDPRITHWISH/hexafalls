
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
}

const Feedback: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const testimonials: TestimonialProps[] = [
    {
      quote: "GravityHack was unlike any hackathon I've ever attended. The mysterious themes pushed our creativity to new dimensions, and the atmosphere was electric with innovation!",
      name: "Alex Chen",
      role: "Software Developer",
      company: "Tech Anomalies Inc.",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
    },
    {
      quote: "The mentors were incredible - they guided us through the toughest challenges without giving away the solutions. I learned more in 48 hours than I would in months of regular coding.",
      name: "Jordan Taylor",
      role: "CS Student",
      company: "Backupsmore University",
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
    },
    {
      quote: "The paranormal themes were a refreshing change from typical hackathons. Our team built a cryptography system inspired by the journals that actually caught the attention of a major tech company!",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "Cipher Systems",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
    },
    {
      quote: "I came to GravityHack knowing nothing about AR development. Thanks to the amazing workshops and collaborative environment, our team created an augmented reality monster detector that won third place!",
      name: "Miguel Hernandez",
      role: "Game Developer",
      company: "Reality Benders",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="feedback"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-10 overflow-hidden bg-gravity-darker/50"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gravity-purple/5 via-transparent to-transparent"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 
            className={cn(
              'font-mystery text-3xl md:text-4xl lg:text-5xl text-white mb-4 gold-glow',
              'transform transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Echoes from the Mystery
          </h2>
          <p 
            className={cn(
              'text-lg md:text-xl text-white/70 max-w-2xl mx-auto',
              'transform transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Hear from past participants who ventured into our coding enigma
          </p>
        </div>

        <div 
          className={cn(
            'relative',
            'transform transition-all duration-700 delay-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="relative bg-gravity-navy/30 rounded-xl p-8 md:p-10 border border-white/10">
            <div className="absolute top-10 left-10 text-gravity-gold opacity-20">
              <Quote size={60} />
            </div>
            
            <div className="relative z-10">
              <blockquote className="text-lg md:text-xl text-white/90 mb-8 italic">
                {testimonials[activeIndex].quote}
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonials[activeIndex].name}</div>
                  <div className="text-gravity-gold text-sm">{testimonials[activeIndex].role}</div>
                  <div className="text-white/60 text-xs">{testimonials[activeIndex].company}</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-5 right-10 flex space-x-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-gravity-navy flex items-center justify-center text-white/80 hover:text-gravity-gold hover:bg-gravity-navy/80 transition-colors border border-white/10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-gravity-navy flex items-center justify-center text-white/80 hover:text-gravity-gold hover:bg-gravity-navy/80 transition-colors border border-white/10"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === activeIndex 
                    ? 'bg-gravity-gold w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
