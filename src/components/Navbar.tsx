import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        isScrolled
          ? "bg-gravity-darker/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo glowing={isScrolled} size="md" />

        <div className="hidden md:flex items-center space-x-8">
          {[
            "About",
            "Themes",
            "Prizes",
            "sponsors",
            "speakers",
            "feedback",
            "faq",
          ].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={cn(
                "text-white/80 hover:text-gravity-gold transition-all capitalize",
                "font-medium text-sm tracking-wide py-2 px-1 border-b-2 border-transparent",
                "hover:border-gravity-gold/50 focus:outline-none"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white p-2 rounded-md focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gravity-gold" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-gravity-navy/95 backdrop-blur-lg z-40 transition-all duration-300 flex flex-col pt-24 px-8",
            "transform md:hidden",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col space-y-6">
            {["about", "schedule", "register", "sponsors", "faq"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={cn(
                    "text-white text-xl font-mystery py-3 text-left capitalize tracking-wide",
                    "border-b border-gravity-purple/30 hover:text-gravity-gold hover:border-gravity-gold/50",
                    "transition-all focus:outline-none"
                  )}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
