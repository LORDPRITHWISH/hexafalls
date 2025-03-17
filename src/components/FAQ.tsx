
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  delay: number;
  isVisible: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, delay, isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={cn(
        'border border-white/10 rounded-xl overflow-hidden bg-gravity-navy/30 transition-all',
        isOpen ? 'shadow-[0_0_20px_rgba(0,0,0,0.3)]' : '',
        'transform opacity-0 translate-y-8',
        isVisible ? 'opacity-100 translate-y-0' : '',
      )}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: '700ms' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <span className="text-gravity-gold ml-4">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      
      <div 
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="p-6 pt-0 text-white/70">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
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

  const faqs = [
    {
      question: "What is GravityHack?",
      answer: "GravityHack is a weekend-long coding event where participants ('hackers') collaborate in teams to build innovative software or hardware projects from scratch. It's inspired by the mysteries and supernatural elements from the town of Gravity Falls, creating a unique, immersive experience beyond traditional hackathons."
    },
    {
      question: "Do I need to be an experienced programmer?",
      answer: "Not at all! GravityHack welcomes participants of all skill levels. Whether you're a coding novice or an experienced developer, there's a place for you here. We offer workshops and mentorship to help beginners get started and provide challenging opportunities for experts."
    },
    {
      question: "What should I bring?",
      answer: "You should bring your laptop, charger, any hardware you plan to work with, a change of clothes, toiletries, and your curiosity! We'll provide food, drinks, snacks, and a mysterious atmosphere conducive to coding and creativity."
    },
    {
      question: "How are teams formed?",
      answer: "You can form a team of up to 4 people before the event or join a team during our team formation activities. Solo participants will have opportunities to meet others and form teams. Remember, the best teams often combine diverse skills and perspectives!"
    },
    {
      question: "Is there a fee to participate?",
      answer: "GravityHack is completely free for all accepted participants! Thanks to our mysterious backers and sponsors, we can provide meals, snacks, swag, and prizes without any registration fees."
    },
    {
      question: "What are the judging criteria?",
      answer: "Projects will be judged on innovation, technical difficulty, design/user experience, and thematic integration with this year's mystery theme (revealed at the opening ceremony). Our panel of judges includes industry experts and representatives from our sponsor companies."
    },
    {
      question: "Can I start working on my project before the hackathon?",
      answer: "All code and design work must be created during the hackathon period. You can come with ideas and plans, but the actual building must start when the hacking period begins. Don't worry—that's part of the challenge and fun!"
    },
    {
      question: "What if I encounter supernatural phenomena during the event?",
      answer: "Document it thoroughly in your journal, avoid making deals with triangular beings, and report any anomalies to our dedicated Mystery Management team. Remember: when in doubt, trust no one and code defensively!"
    }
  ];

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-10 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pine-pattern opacity-5 z-0"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 
            className={cn(
              'font-mystery text-3xl md:text-4xl lg:text-5xl text-white mb-4 gold-glow',
              'transform transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Unraveling the Mysteries
          </h2>
          <p 
            className={cn(
              'text-lg md:text-xl text-white/70 max-w-2xl mx-auto',
              'transform transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Common questions about our enigmatic hackathon
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              delay={300 + index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>
        
        <div 
          className={cn(
            'mt-16 text-center',
            'transform transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0 delay-1200' : 'opacity-0 translate-y-8'
          )}
        >
          <p className="text-white/70 mb-4">
            Still have questions unanswered?
          </p>
          <a
            href="mailto:info@gravityhack.com"
            className={cn(
              'inline-block px-8 py-3 rounded-lg font-medium tracking-wide transition-all',
              'bg-transparent text-white hover:text-gravity-gold',
              'border border-white/20 hover:border-gravity-gold/50'
            )}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
