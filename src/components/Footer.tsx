
import React from 'react';
import { cn } from '@/lib/utils';
import Logo from '@/assets/logo';
import { Twitter, Facebook, Instagram, Linkedin, Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  // Bill Cipher animation in SVG
  const BillCipher = () => (
    <div className="absolute bottom-20 right-10 w-48 h-48 opacity-5 pointer-events-none animate-float">
      <svg viewBox="0 0 100 100" className="w-full h-full text-gravity-gold">
        <polygon points="50,10 90,90 10,90" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="50" cy="40" r="10" fill="currentColor" fillOpacity="0.2" />
        <line x1="30" y1="70" x2="70" y2="70" stroke="currentColor" strokeWidth="1" />
        <line x1="40" y1="60" x2="35" y2="70" stroke="currentColor" strokeWidth="1" />
        <line x1="60" y1="60" x2="65" y2="70" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );

  return (
    <footer className="relative pt-20 pb-10 bg-gravity-darker border-t border-gravity-purple/20 overflow-hidden">
      <div className="absolute inset-0 pine-pattern opacity-5 z-0"></div>
      <BillCipher />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-1">
            <Logo glowing={true} size="md" />
            <p className="mt-4 text-white/60 text-sm">
              The most enigmatic hackathon of the summer, where coding meets mystery in the spirit of Gravity Falls.
            </p>
            <div className="mt-6 flex space-x-4">
              {[
                { icon: <Twitter size={18} />, label: "Twitter", href: "#" },
                { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
                { icon: <Instagram size={18} />, label: "Instagram", href: "#" },
                { icon: <Github size={18} />, label: "GitHub", href: "#" }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-gravity-navy/50 flex items-center justify-center text-white/60 hover:text-gravity-gold hover:bg-gravity-navy transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-gravity-gold font-mystery text-lg mb-4">Sitemap</h3>
            <ul className="space-y-2">
              {[
                { label: "About", id: "about" },
                { label: "Themes", id: "themes" },
                { label: "Prizes", id: "prizes" },
                { label: "Schedule", id: "schedule" },
                { label: "Register", id: "register" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/70 hover:text-gravity-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-gravity-gold font-mystery text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              {[
                { label: "Sponsors", id: "sponsors" },
                { label: "Collaboration", id: "collaboration" },
                { label: "Speakers & Judges", id: "speakers-judges" },
                { label: "Feedback", id: "feedback" },
                { label: "FAQ", id: "faq" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/70 hover:text-gravity-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-gravity-gold font-mystery text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-white/70 text-sm">
                <span className="block text-white/90 mb-1">Email:</span>
                <a href="mailto:info@gravityhack.com" className="hover:text-gravity-gold transition-colors">
                  info@gravityhack.com
                </a>
              </li>
              <li className="text-white/70 text-sm">
                <span className="block text-white/90 mb-1">Location:</span>
                Mystery Shack Convention Center<br />
                618 Gopher Road<br />
                Gravity Falls, OR
              </li>
              <li className="text-white/70 text-sm">
                <span className="block text-white/90 mb-1">Dates:</span>
                June 15-17, 2024
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gravity-purple/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} GravityHack. All secrets reserved.
          </p>
          <p className="text-white/50 text-sm mt-2 md:mt-0 flex items-center">
            Made with <Heart size={14} className="text-red-500 mx-1" /> in the Mystery Shack
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
