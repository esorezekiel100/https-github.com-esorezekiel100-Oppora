import React, { useState, useEffect } from 'react';
import { Bell, Compass, Award, Users, Menu, X, Bookmark, User, LogOut, CheckCircle, Info, Home, FileText, Mail, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { UserProfile, Opportunity, OpportunityType } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export type NavTab = 'home' | 'about' | 'opportunities' | 'city' | 'resources' | 'contact' | 'auth' | 'signin' | 'signup' | 'select-interests';

interface HeaderProps {
  user: UserProfile | null;
  onLogout: () => void;
  onNavigateToSignIn: () => void;
  onNavigateToSignUp: () => void;
  onOpenProfile: () => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  opportunities: Opportunity[];
  selectedType?: OpportunityType | 'All';
  onSelectOpportunityType?: (type: OpportunityType | 'All') => void;
}

export default function Header({
  user,
  onLogout,
  onNavigateToSignIn,
  onNavigateToSignUp,
  onOpenProfile,
  activeTab,
  setActiveTab,
  opportunities,
  selectedType = 'All',
  onSelectOpportunityType,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [oppDropdownOpen, setOppDropdownOpen] = useState(false);
  const [mobileOppOpen, setMobileOppOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && activeTab === 'opportunities') {
      setMobileOppOpen(true);
    }
  }, [mobileMenuOpen, activeTab]);

  const opportunityMenuOptions = [
    { label: 'All Opportunities', value: 'All' as const },
    { label: 'Job', value: 'Job' as const },
    { label: 'Scholarship', value: 'Scholarship' as const },
    { label: 'Grant', value: 'Grant' as const },
    { label: 'Fellowship', value: 'Fellowship' as const },
    { label: 'Internship', value: 'Internship' as const },
    { label: 'Funding', value: 'Funding' as const },
  ];

  // Generate real-time alerts for opportunities with upcoming deadlines (within 90 days)
  const getDeadlineAlerts = () => {
    const today = new Date('2026-07-21'); // Current time mock based on metadata
    return opportunities
      .filter((opp) => {
        const deadlineDate = new Date(opp.deadline);
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 && diffDays <= 60; // Show deadlines in the next 60 days
      })
      .map((opp) => {
        const deadlineDate = new Date(opp.deadline);
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return {
          id: opp.id,
          title: `Deadline Alert: ${opp.title}`,
          desc: `Closing in ${diffDays} days (${opp.deadline}). Apply soon!`,
          type: opp.type,
        };
      });
  };

  const alerts = getDeadlineAlerts();

  const handleTabClick = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Guarantee scroll to top even after view layouts switch or adjust
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-lg border-b border-slate-200/60 shadow-md'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}>
          {/* Logo */}
          <div id="header-logo-container" className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabClick('home')}>
            <div id="header-logo-icon" className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
              <div id="header-logo-diamond" className="w-4 h-4 border-2 border-amber-500 rotate-45"></div>
            </div>
             <div>
              <span id="header-site-name" className="font-sans text-xl font-black tracking-tight text-slate-900">
                Oppora<span id="header-site-name-highlight" className="text-amber-500">.</span>
              </span>
              <p id="header-site-tagline" className="text-[9px] text-slate-400 tracking-wider uppercase font-semibold leading-none">
                Transformative Opportunities
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1.5 lg:space-x-2.5 items-center">
            {/* Home Tab */}
            <button
              onClick={() => handleTabClick('home')}
              onMouseEnter={() => setHoveredTab('home')}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative px-3 py-1.5 text-xs lg:text-sm font-bold flex items-center space-x-1.5 transition-colors duration-200 rounded-full select-none ${
                activeTab === 'home' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Home className="h-4 w-4 z-10" />
              <span className="z-10">Home</span>
              
              {/* Hover background capsule */}
              <AnimatePresence>
                {hoveredTab === 'home' && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 bg-slate-100/70 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                  />
                )}
              </AnimatePresence>
              
              {/* Active Tab Underline */}
              {activeTab === 'home' && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-[-2px] left-3 right-3 h-0.5 bg-amber-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                />
              )}
            </button>

            {/* About Tab */}
            <button
              onClick={() => handleTabClick('about')}
              onMouseEnter={() => setHoveredTab('about')}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative px-3 py-1.5 text-xs lg:text-sm font-bold flex items-center space-x-1.5 transition-colors duration-200 rounded-full select-none ${
                activeTab === 'about' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Info className="h-4 w-4 z-10" />
              <span className="z-10">About</span>

              <AnimatePresence>
                {hoveredTab === 'about' && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 bg-slate-100/70 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                  />
                )}
              </AnimatePresence>

              {activeTab === 'about' && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-[-2px] left-3 right-3 h-0.5 bg-amber-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                />
              )}
            </button>

            {/* Opportunities Dropdown Tab */}
            <div
              className="relative"
              onMouseEnter={() => {
                setOppDropdownOpen(true);
                setHoveredTab('opportunities');
              }}
              onMouseLeave={() => {
                setOppDropdownOpen(false);
                setHoveredTab(null);
              }}
            >
              <button
                onClick={() => {
                  handleTabClick('opportunities');
                  setOppDropdownOpen(!oppDropdownOpen);
                }}
                className={`relative px-3 py-1.5 text-xs lg:text-sm font-bold flex items-center space-x-1 transition-colors duration-200 rounded-full select-none ${
                  activeTab === 'opportunities' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Compass className="h-4 w-4 z-10" />
                <span className="z-10">Opportunities</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 z-10 ${oppDropdownOpen ? 'rotate-180' : ''}`} />

                <AnimatePresence>
                  {hoveredTab === 'opportunities' && (
                    <motion.span
                      layoutId="navHoverPill"
                      className="absolute inset-0 bg-slate-100/70 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                    />
                  )}
                </AnimatePresence>

                {activeTab === 'opportunities' && (
                  <motion.span
                    layoutId="activeTabUnderline"
                    className="absolute bottom-[-2px] left-3 right-3 h-0.5 bg-amber-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {oppDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-0 mt-1.5 w-48 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2 z-50 origin-top-left"
                  >
                    {opportunityMenuOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          if (onSelectOpportunityType) {
                            onSelectOpportunityType(opt.value);
                          } else {
                            handleTabClick('opportunities');
                          }
                          setOppDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-amber-50/60 hover:text-amber-600 transition-colors flex items-center justify-between"
                      >
                        <span className={selectedType === opt.value && activeTab === 'opportunities' ? 'text-amber-600 font-bold' : 'text-slate-700'}>
                          {opt.label}
                        </span>
                        {selectedType === opt.value && activeTab === 'opportunities' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* City Tab */}
            <button
              onClick={() => handleTabClick('city')}
              onMouseEnter={() => setHoveredTab('city')}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative px-3 py-1.5 text-xs lg:text-sm font-bold flex items-center space-x-1.5 transition-colors duration-200 rounded-full select-none ${
                activeTab === 'city' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Users className="h-4 w-4 z-10" />
              <span className="z-10">City</span>

              <AnimatePresence>
                {hoveredTab === 'city' && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 bg-slate-100/70 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                  />
                )}
              </AnimatePresence>

              {activeTab === 'city' && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-[-2px] left-3 right-3 h-0.5 bg-amber-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                />
              )}
            </button>

            {/* Resources Tab */}
            <button
              onClick={() => handleTabClick('resources')}
              onMouseEnter={() => setHoveredTab('resources')}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative px-3 py-1.5 text-xs lg:text-sm font-bold flex items-center space-x-1.5 transition-colors duration-200 rounded-full select-none ${
                activeTab === 'resources' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileText className="h-4 w-4 z-10" />
              <span className="z-10">Resources</span>

              <AnimatePresence>
                {hoveredTab === 'resources' && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 bg-slate-100/70 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                  />
                )}
              </AnimatePresence>

              {activeTab === 'resources' && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-[-2px] left-3 right-3 h-0.5 bg-amber-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                />
              )}
            </button>

            {/* Contact Tab */}
            <button
              onClick={() => handleTabClick('contact')}
              onMouseEnter={() => setHoveredTab('contact')}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative px-3 py-1.5 text-xs lg:text-sm font-bold flex items-center space-x-1.5 transition-colors duration-200 rounded-full select-none ${
                activeTab === 'contact' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Mail className="h-4 w-4 z-10" />
              <span className="z-10">Contact</span>

              <AnimatePresence>
                {hoveredTab === 'contact' && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 bg-slate-100/70 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                  />
                )}
              </AnimatePresence>

              {activeTab === 'contact' && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-[-2px] left-3 right-3 h-0.5 bg-amber-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                />
              )}
            </button>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notification Icon */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all relative"
                aria-label="View alerts"
              >
                <Bell className="h-5 w-5" />
                {alerts.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 origin-top-right"
                  >
                    <div className="px-4 pb-2 border-b border-slate-100 flex justify-between items-center">
                      <h4 className="font-semibold text-slate-800 text-sm">Deadline Alerts</h4>
                      <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                        {alerts.length} active
                      </span>
                    </div>
                    <div className="max-h-64 overflow-y-auto px-2 py-1">
                      {alerts.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-6">No urgent deadlines approaching.</p>
                      ) : (
                        alerts.map((alert) => (
                          <div
                            key={alert.id}
                            className="p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer border-b border-slate-50 last:border-0"
                            onClick={() => {
                              handleTabClick('opportunities');
                              setNotificationsOpen(false);
                            }}
                          >
                            <div className="flex items-start space-x-2">
                              <span className="inline-block mt-0.5 w-1.5 h-1.5 bg-yellow-500 rounded-full shrink-0" />
                              <div>
                                <p className="text-xs font-bold text-slate-800 leading-tight">{alert.title}</p>
                                <p className="text-[11px] text-slate-500 mt-1">{alert.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
                <button
                  onClick={onOpenProfile}
                  className="flex items-center space-x-2 hover:bg-slate-50 p-1.5 pr-3 rounded-xl transition-all group text-left"
                >
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-amber-600 leading-tight">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {user.savedOpportunityIds.length} Saved
                    </p>
                  </div>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onNavigateToSignIn}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    activeTab === 'signin'
                      ? 'bg-amber-500/10 text-amber-700 font-extrabold border border-amber-300'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={onNavigateToSignUp}
                  className="bg-slate-900 hover:bg-slate-800 text-amber-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold shadow-md transition-all duration-150 flex items-center space-x-1.5 cursor-pointer border border-slate-800"
                >
                  <UserPlus className="h-4 w-4 text-amber-400" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            {/* Notification alert for mobile */}
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setMobileMenuOpen(false);
              }}
              className="p-2 text-slate-500 hover:text-city-blue rounded-xl relative"
            >
              <Bell className="h-5 w-5" />
              {alerts.length > 0 && (
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setNotificationsOpen(false);
              }}
              className="p-2 text-slate-500 hover:text-amber-600 rounded-xl flex flex-col items-center justify-center w-10 h-10 transition-colors relative focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-slate-600 rounded transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : '-translate-y-[3px]'}`} />
              <span className={`block w-5 h-0.5 bg-slate-600 rounded transition-all duration-300 ease-in-out my-0.5 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
              <span className={`block w-5 h-0.5 bg-slate-600 rounded transition-all duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : 'translate-y-[3px]'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Notification Dropdown */}
      <AnimatePresence>
        {notificationsOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-white"
          >
            {classNameAdjustedMobileAlerts(alerts, handleTabClick, setNotificationsOpen)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Slide-In Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Slide-In Side Drawer */}
            <motion.div
              id="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="absolute right-0 top-0 bottom-0 h-full w-[280px] max-w-[85vw] bg-white shadow-2xl border-l border-slate-100 flex flex-col focus:outline-none"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 bg-slate-900 rounded flex items-center justify-center">
                    <span className="text-amber-400 text-[13px] font-black">O</span>
                  </div>
                  <span className="font-bold text-slate-800 text-sm">Oppora</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Drawer Navigation Content */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
                <div className="space-y-1.5">
                  <p id="mobile-menu-nav-title" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Main Menu</p>
                  
                  <button
                    id="mobile-nav-home"
                    onClick={() => {
                      handleTabClick('home');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-semibold flex items-center space-x-3 transition-all min-h-[44px] cursor-pointer ${
                      activeTab === 'home' ? 'bg-amber-500/10 text-amber-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Home className="h-5 w-5 shrink-0" />
                    <span>Home</span>
                  </button>
                  
                  <button
                    id="mobile-nav-about"
                    onClick={() => {
                      handleTabClick('about');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-semibold flex items-center space-x-3 transition-all min-h-[44px] cursor-pointer ${
                      activeTab === 'about' ? 'bg-amber-500/10 text-amber-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Info className="h-5 w-5 shrink-0" />
                    <span>About</span>
                  </button>
                  
                  <div id="mobile-nav-opps-group" className="space-y-1">
                    <button
                      id="mobile-nav-opps-trigger"
                      onClick={() => setMobileOppOpen(!mobileOppOpen)}
                      className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-all min-h-[44px] cursor-pointer ${
                        activeTab === 'opportunities' ? 'bg-amber-500/10 text-amber-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Compass className="h-5 w-5 shrink-0" />
                        <span>Opportunities</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileOppOpen ? 'rotate-180 text-amber-600' : 'text-slate-400'}`} />
                    </button>
                    
                    <AnimatePresence>
                      {mobileOppOpen && (
                        <motion.div
                          id="mobile-nav-opps-dropdown"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-7 pr-1 py-1 space-y-1 border-l-2 border-slate-100 ml-5 overflow-hidden"
                        >
                          {opportunityMenuOptions.map((opt, idx) => (
                            <button
                              id={`mobile-nav-opp-opt-${idx}`}
                              key={opt.value}
                              onClick={() => {
                                if (onSelectOpportunityType) {
                                  onSelectOpportunityType(opt.value);
                                } else {
                                  handleTabClick('opportunities');
                                }
                                setMobileMenuOpen(false);
                              }}
                              className={`w-full text-left py-2.5 px-3 rounded-lg text-xs font-semibold block transition-all min-h-[40px] cursor-pointer ${
                                selectedType === opt.value && activeTab === 'opportunities'
                                  ? 'text-amber-600 bg-amber-50/70 font-extrabold'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{opt.label}</span>
                                {selectedType === opt.value && activeTab === 'opportunities' && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                )}
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <button
                    id="mobile-nav-city"
                    onClick={() => {
                      handleTabClick('city');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-semibold flex items-center space-x-3 transition-all min-h-[44px] cursor-pointer ${
                      activeTab === 'city' ? 'bg-amber-500/10 text-amber-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Users className="h-5 w-5 shrink-0" />
                    <span>City</span>
                  </button>
                  
                  <button
                    id="mobile-nav-resources"
                    onClick={() => {
                      handleTabClick('resources');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-semibold flex items-center space-x-3 transition-all min-h-[44px] cursor-pointer ${
                      activeTab === 'resources' ? 'bg-amber-500/10 text-amber-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <FileText className="h-5 w-5 shrink-0" />
                    <span>Resources</span>
                  </button>
                  
                  <button
                    id="mobile-nav-contact"
                    onClick={() => {
                      handleTabClick('contact');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-semibold flex items-center space-x-3 transition-all min-h-[44px] cursor-pointer ${
                      activeTab === 'contact' ? 'bg-amber-500/10 text-amber-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Mail className="h-5 w-5 shrink-0" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>

              {/* Bottom Auth / User Panel */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
                {user ? (
                  <div id="mobile-menu-user-group" className="space-y-1.5">
                    <p id="mobile-menu-user-title" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">Account Space</p>
                    <button
                      id="mobile-nav-profile"
                      onClick={() => {
                        onOpenProfile();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center space-x-2.5 transition-all"
                    >
                      <div id="mobile-nav-avatar" className="h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <span className="truncate">Profile ({user.name})</span>
                    </button>
                    <button
                      id="mobile-nav-signout"
                      onClick={() => {
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center space-x-2.5 transition-all"
                    >
                      <LogOut className="h-4.5 w-4.5 shrink-0" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div id="mobile-menu-auth-group" className="grid grid-cols-2 gap-2">
                    <button
                      id="mobile-nav-signin"
                      onClick={() => {
                        onNavigateToSignIn();
                        setMobileMenuOpen(false);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                    >
                      <LogIn className="h-4 w-4 shrink-0" />
                      <span>Sign In</span>
                    </button>

                    <button
                      id="mobile-nav-signup"
                      onClick={() => {
                        onNavigateToSignUp();
                        setMobileMenuOpen(false);
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-amber-400 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition-all cursor-pointer border border-slate-800"
                    >
                      <UserPlus className="h-4 w-4 shrink-0 text-amber-400" />
                      <span>Sign Up</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

function classNameAdjustedMobileAlerts(
  alerts: any[],
  setActiveTab: (tab: any) => void,
  setNotificationsOpen: (open: boolean) => void
) {
  return (
    <div className="md:hidden bg-white border-b border-slate-100 px-4 py-2 max-h-56 overflow-y-auto">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Upcoming Deadlines</p>
      {alerts.length === 0 ? (
        <p className="text-xs text-slate-400 py-2">No urgent deadlines approaching.</p>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-2 hover:bg-slate-50 rounded-lg text-xs flex items-start space-x-2 border-b border-slate-50 last:border-0"
            onClick={() => {
              setActiveTab('opportunities');
              setNotificationsOpen(false);
            }}
          >
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800">{alert.title}</p>
              <p className="text-[11px] text-slate-500">{alert.desc}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
