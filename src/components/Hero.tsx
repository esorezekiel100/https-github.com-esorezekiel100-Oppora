import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, ShieldCheck, Award, GraduationCap, Briefcase, DollarSign, ChevronLeft, ChevronRight, Sparkles, Globe, Compass, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OpportunityType } from '../types';

interface HeroProps {
  onSearch: (query: string) => void;
  onSelectType: (type: OpportunityType | 'All') => void;
  onNavigateToTab: (tab: 'home' | 'about' | 'opportunities' | 'city' | 'resources' | 'contact') => void;
  totalOpportunities: number;
}

export default function Hero({ onSearch, onSelectType, onNavigateToTab, totalOpportunities }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const slides = [
    {
      id: 'slide-1',
      badge: 'GLOBAL OPPORTUNITY HUB • 2026 EDITION',
      badgeIcon: Sparkles,
      badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      title: 'Your Gateway to Fully-Funded Global Opportunities',
      titleHighlight: 'Global Opportunities',
      subtitle: 'Discover 100% verified Scholarships, Fellowships, Grants, Internships, High-Impact Tech Jobs & Venture Seed Capital created for global achievers.',
      primaryActionText: 'Explore Opportunity Registry',
      primaryActionType: 'All' as const,
      secondaryActionText: 'View Grants & Venture Funding',
      secondaryActionType: 'Funding' as const,
      bgGradient: 'from-slate-900 via-slate-800 to-slate-900',
      accentGlow: 'bg-amber-500/15',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
      highlights: [
        { label: 'Verified Opportunities', value: `${totalOpportunities}+ Active` },
        { label: 'Community Citizens', value: '12,450+' },
        { label: 'Funding Value', value: '$25M+' },
      ]
    },
    {
      id: 'slide-2',
      badge: 'POSTGRADUATE & FELLOWSHIP PIPELINE',
      badgeIcon: GraduationCap,
      badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      title: 'Master’s, PhDs & Prestigious Global Fellowships',
      titleHighlight: 'Global Fellowships',
      subtitle: 'Access Chevening, Rhodes, Commonwealth, and Ivy League postgraduate programs with 100% tuition coverage, living stipends, and international flights.',
      primaryActionText: 'Browse Scholarships & Fellowships',
      primaryActionType: 'Scholarship' as const,
      secondaryActionText: 'Explore Fellowships',
      secondaryActionType: 'Fellowship' as const,
      bgGradient: 'from-slate-900 via-indigo-950 to-slate-900',
      accentGlow: 'bg-indigo-500/15',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
      highlights: [
        { label: 'Top Universities', value: '500+ Institutions' },
        { label: 'Full Funding Rate', value: '100% Covered' },
        { label: 'Global Acceptance', value: '42+ Countries' },
      ]
    },
    {
      id: 'slide-3',
      badge: 'TECH CAREERS & VENTURE FUNDING',
      badgeIcon: Briefcase,
      badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      title: 'Tech Jobs, Paid Internships & Seed Startup Capital',
      titleHighlight: 'Seed Startup Capital',
      subtitle: 'Connect with software engineering roles at Google & Microsoft, land paid fintech internships, or secure up to $500k Y-Combinator & Google seed accelerator funding.',
      primaryActionText: 'Discover Jobs & Tech Roles',
      primaryActionType: 'Job' as const,
      secondaryActionText: 'Explore Accelerator Grants',
      secondaryActionType: 'Grant' as const,
      bgGradient: 'from-slate-900 via-emerald-950 to-slate-900',
      accentGlow: 'bg-emerald-500/15',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
      highlights: [
        { label: 'Tech & Fintech Roles', value: 'Direct Links' },
        { label: 'Seed Accelerator Grants', value: 'Up to $500K' },
        { label: 'Placement Support', value: 'Verified Alumni' },
      ]
    }
  ];

  // Auto slide interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
    onNavigateToTab('opportunities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeSlide = slides[currentSlide];

  return (
    <section 
      className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-slate-800 my-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Main Slide Animated Banner */}
      <div className="relative min-h-[420px] sm:min-h-[460px] md:min-h-[500px] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10 md:p-12 lg:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center z-10"
          >
            {/* Slide Content Column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border bg-slate-900/80 backdrop-blur-md shadow-xs max-w-full">
                {React.createElement(activeSlide.badgeIcon, { className: 'h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 shrink-0' })}
                <span className="text-amber-400 font-extrabold truncate">{activeSlide.badge}</span>
              </div>

              {/* Title */}
              <h1 className="font-sans text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.2] sm:leading-[1.15]">
                {activeSlide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal max-w-2xl">
                {activeSlide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onSelectType(activeSlide.primaryActionType);
                    onNavigateToTab('opportunities');
                  }}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[48px]"
                >
                  <span className="text-center">{activeSlide.primaryActionText}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>

                <button
                  onClick={() => {
                    onSelectType(activeSlide.secondaryActionType);
                    onNavigateToTab('opportunities');
                  }}
                  className="w-full sm:w-auto bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold px-5 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm transition-all hover:text-white cursor-pointer min-h-[48px] text-center flex items-center justify-center active:scale-95"
                >
                  {activeSlide.secondaryActionText}
                </button>
              </div>

              {/* Slide Highlights row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-800/80">
                {activeSlide.highlights.map((h, i) => (
                  <div key={i} className="space-y-0.5">
                    <p className="text-sm sm:text-lg font-black text-amber-400 font-sans tracking-tight leading-tight">{h.value}</p>
                    <p className="text-[9px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider line-clamp-1">{h.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Visual Card Column */}
            <div className="lg:col-span-5 hidden lg:block relative">
              <div className="relative mx-auto rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl group">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Floating Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 p-4 rounded-2xl flex items-center space-x-3">
                  <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white">100% Manually Verified Leads</h4>
                    <p className="text-[10px] text-slate-400">Direct host application portals with zero scam risks</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls & Indicators Bar */}
      <div className="bg-slate-900/90 border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Navigation Arrows & Dots */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Slide Dots */}
          <div className="flex items-center space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-amber-500' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-bold text-slate-400 hidden md:inline-block">
            0{currentSlide + 1} / 0{slides.length}
          </span>
        </div>

        {/* Quick Launch Search Input inside Hero */}
        <form onSubmit={handleSearchSubmit} className="w-full sm:w-auto flex items-center space-x-2">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search jobs, grants, scholarships..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-base sm:text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors min-h-[40px]"
            />
          </div>
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shrink-0 cursor-pointer min-h-[40px]"
          >
            Search
          </button>
        </form>
      </div>

      {/* Quick Launch Opportunity Type Launchpad */}
      <div className="bg-slate-900 border-t border-slate-800/80 px-6 py-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-max gap-3 text-xs font-bold text-slate-300">
          <span className="text-slate-400 uppercase tracking-widest text-[10px] font-extrabold pr-2 border-r border-slate-800">
            Quick Launch Category:
          </span>
          <div className="flex items-center space-x-2">
            {[
              { label: 'Scholarships', type: 'Scholarship' as const, icon: GraduationCap },
              { label: 'Jobs', type: 'Job' as const, icon: Briefcase },
              { label: 'Grants', type: 'Grant' as const, icon: DollarSign },
              { label: 'Fellowships', type: 'Fellowship' as const, icon: Award },
              { label: 'Internships', type: 'Internship' as const, icon: Users },
              { label: 'Venture Funding', type: 'Funding' as const, icon: Globe },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => {
                  onSelectType(item.type);
                  onNavigateToTab('opportunities');
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-all border border-slate-700/60 cursor-pointer"
              >
                {React.createElement(item.icon, { className: 'h-3.5 w-3.5' })}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
