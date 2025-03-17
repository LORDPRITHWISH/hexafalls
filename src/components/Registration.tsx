
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Registration: React.FC = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    experience: '',
    interests: '',
    teamStatus: 'solo',
    agreedToTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState((prev) => ({ ...prev, [name]: checked }));
    
    // Clear error when user checks
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formState.experience) {
      newErrors.experience = 'Experience level is required';
    }
    
    if (!formState.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulating submission success
      toast({
        title: "Registration Successful!",
        description: "Get ready for a mysterious coding adventure.",
        duration: 5000,
      });
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        experience: '',
        interests: '',
        teamStatus: 'solo',
        agreedToTerms: false
      });
    }
  };

  return (
    <section
      id="register"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-10 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gravity-purple/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gravity-blue/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 
            className={cn(
              'font-mystery text-3xl md:text-4xl lg:text-5xl text-white mb-4 gold-glow',
              'transform transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Join The Adventure
          </h2>
          <p 
            className={cn(
              'text-lg md:text-xl text-white/70 max-w-2xl mx-auto',
              'transform transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Enter your details below to secure your spot in this extraordinary hackathon
          </p>
        </div>

        <div 
          className={cn(
            'max-w-3xl mx-auto glass rounded-xl p-6 md:p-10 shadow-xl',
            'transform transition-all duration-700 delay-300',
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-white/90 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  className={cn(
                    'w-full bg-white/5 border rounded-lg p-3 text-white placeholder-white/40',
                    'focus:ring-2 focus:ring-gravity-gold/50 focus:outline-none transition-all',
                    errors.name ? 'border-gravity-red' : 'border-white/10'
                  )}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-gravity-red text-sm mt-1 flex items-center">
                    <Info size={14} className="mr-1" /> {errors.name}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-white/90 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className={cn(
                    'w-full bg-white/5 border rounded-lg p-3 text-white placeholder-white/40',
                    'focus:ring-2 focus:ring-gravity-gold/50 focus:outline-none transition-all',
                    errors.email ? 'border-gravity-red' : 'border-white/10'
                  )}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-gravity-red text-sm mt-1 flex items-center">
                    <Info size={14} className="mr-1" /> {errors.email}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="experience" className="block text-white/90 font-medium">
                Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                value={formState.experience}
                onChange={handleInputChange}
                className={cn(
                  'w-full bg-white/5 border rounded-lg p-3 text-white',
                  'focus:ring-2 focus:ring-gravity-gold/50 focus:outline-none transition-all',
                  'appearance-none bg-no-repeat bg-right pr-10',
                  errors.experience ? 'border-gravity-red' : 'border-white/10'
                )}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                <option value="" disabled selected hidden>Select your experience level</option>
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="advanced">Advanced (3+ years)</option>
                <option value="expert">Expert (5+ years)</option>
              </select>
              {errors.experience && (
                <p className="text-gravity-red text-sm mt-1 flex items-center">
                  <Info size={14} className="mr-1" /> {errors.experience}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="interests" className="block text-white/90 font-medium">
                Areas of Interest
              </label>
              <textarea
                id="interests"
                name="interests"
                value={formState.interests}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/40 focus:ring-2 focus:ring-gravity-gold/50 focus:outline-none transition-all"
                placeholder="What technologies or areas are you most interested in? (AI, Web Dev, Mobile, etc.)"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-white/90 font-medium mb-2">Team Status</label>
              <div className="flex flex-col sm:flex-row gap-4">
                {['solo', 'have-team', 'looking-for-team'].map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="teamStatus"
                      value={option}
                      checked={formState.teamStatus === option}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border transition-all flex items-center justify-center',
                        formState.teamStatus === option
                          ? 'border-gravity-gold bg-gravity-gold/20'
                          : 'border-white/30 bg-white/5'
                      )}
                    >
                      {formState.teamStatus === option && (
                        <div className="w-2.5 h-2.5 rounded-full bg-gravity-gold"></div>
                      )}
                    </div>
                    <span className="text-white/80">
                      {option === 'solo' && 'Hacking Solo'}
                      {option === 'have-team' && 'Have a Team'}
                      {option === 'looking-for-team' && 'Looking for Team'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formState.agreedToTerms}
                    onChange={handleCheckboxChange}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      'w-5 h-5 rounded border transition-all flex items-center justify-center',
                      formState.agreedToTerms
                        ? 'border-gravity-gold bg-gravity-gold/20'
                        : errors.agreedToTerms
                        ? 'border-gravity-red'
                        : 'border-white/30 bg-white/5'
                    )}
                  >
                    {formState.agreedToTerms && (
                      <CheckCircle size={14} className="text-gravity-gold" />
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-white/80 text-sm">
                    I agree to the <a href="#" className="text-gravity-gold underline">Terms & Conditions</a> and 
                    acknowledge that I may encounter strange and unexplained phenomena during this hackathon.
                  </span>
                  {errors.agreedToTerms && (
                    <p className="text-gravity-red text-sm mt-1 flex items-center">
                      <Info size={14} className="mr-1" /> {errors.agreedToTerms}
                    </p>
                  )}
                </div>
              </label>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className={cn(
                  'w-full py-3 px-6 rounded-lg font-medium text-lg transition-all',
                  'bg-gravity-gold text-gravity-darker hover:bg-gravity-yellow',
                  'shadow-[0_0_15px_rgba(249,183,43,0.3)] hover:shadow-[0_0_20px_rgba(249,183,43,0.5)]',
                  'transform hover:-translate-y-1'
                )}
              >
                Secure Your Spot
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registration;
