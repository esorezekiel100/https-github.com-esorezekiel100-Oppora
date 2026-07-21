import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowRight, ExternalLink, Globe, Sparkles, CheckCircle, Linkedin, Twitter, MessageCircle } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'about' | 'opportunities' | 'city' | 'resources' | 'contact') => void;
  activeTab: string;
}

export default function Footer({ setActiveTab, activeTab }: FooterProps) {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const handleTabClick = (tab: 'home' | 'about' | 'opportunities' | 'city' | 'resources' | 'contact') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribedEmail || !subscribedEmail.includes('@')) return;
    setSubscribeSuccess(true);
    setTimeout(() => {
      setSubscribedEmail('');
      setSubscribeSuccess(false);
    }, 4000);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Bio (md:col-span-4) */}
          <div className="sm:col-span-2 md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabClick('home')}>
              <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-xl flex items-center justify-center shadow-md shadow-amber-500/10">
                <div className="w-4 h-4 border-2 border-slate-950 rotate-45"></div>
              </div>
              <span className="font-sans text-xl font-black tracking-tight text-white">
                Oppora<span className="text-amber-400">.</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Oppora connects ambitious scholars, founders, researchers, and professionals with life-transforming global opportunities in education, careers, business, and innovation.
            </p>

            {/* Verification Badge */}
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-start space-x-3 text-xs text-slate-300 max-w-sm">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">100% Manually Verified</span>
                <span className="text-[11px] text-slate-400 leading-snug">Zero spam or scam listings. All opportunities are audited prior to publication.</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (md:col-span-2) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-400">Navigation</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <button
                  onClick={() => handleTabClick('home')}
                  className={`hover:text-amber-400 transition-colors cursor-pointer py-1 block ${activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                >
                  Home Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('about')}
                  className={`hover:text-amber-400 transition-colors cursor-pointer py-1 block ${activeTab === 'about' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                >
                  About Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('opportunities')}
                  className={`hover:text-amber-400 transition-colors cursor-pointer py-1 block ${activeTab === 'opportunities' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                >
                  Explore Listings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('city')}
                  className={`hover:text-amber-400 transition-colors cursor-pointer py-1 block ${activeTab === 'city' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                >
                  City Community
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('resources')}
                  className={`hover:text-amber-400 transition-colors cursor-pointer py-1 block ${activeTab === 'resources' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                >
                  Applicant Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('contact')}
                  className={`hover:text-amber-400 transition-colors cursor-pointer py-1 block ${activeTab === 'contact' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories (md:col-span-2) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-400">Opportunity Types</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <button
                  onClick={() => handleTabClick('opportunities')}
                  className="hover:text-amber-400 transition-colors cursor-pointer py-1 text-slate-400 block"
                >
                  🎓 Scholarships
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('opportunities')}
                  className="hover:text-amber-400 transition-colors cursor-pointer py-1 text-slate-400 block"
                >
                  💰 Research Grants
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('opportunities')}
                  className="hover:text-amber-400 transition-colors cursor-pointer py-1 text-slate-400 block"
                >
                  🚀 Tech & Global Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('opportunities')}
                  className="hover:text-amber-400 transition-colors cursor-pointer py-1 text-slate-400 block"
                >
                  🏛️ Global Fellowships
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('opportunities')}
                  className="hover:text-amber-400 transition-colors cursor-pointer py-1 text-slate-400 block"
                >
                  💡 Startup Seed Funding
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact (md:col-span-4) */}
          <div className="sm:col-span-2 md:col-span-4 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-400">Weekly Opportunities Digest</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get curated fully-funded scholarships and verified global leads delivered to your inbox every Monday.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={subscribedEmail}
                  onChange={(e) => setSubscribedEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-3.5 pr-24 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors font-medium min-h-[44px]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 rounded-lg text-xs font-extrabold transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <span>Join</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </button>
              </div>

              {subscribeSuccess && (
                <div className="p-2.5 bg-emerald-950/80 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in duration-200">
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Subscribed! You will receive weekly opportunity alerts.</span>
                </div>
              )}
            </form>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-900">
              <span className="font-semibold text-slate-300">Support Desk:</span>
              <a
                href="mailto:support@oppora.org"
                className="hover:text-amber-400 transition-colors underline flex items-center space-x-1"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>support@oppora.org</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Community Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-center md:text-left">
            <p>© {new Date().getFullYear()} Oppora Platform Inc. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <button onClick={() => handleTabClick('about')} className="hover:text-slate-200 transition-colors cursor-pointer">
                Privacy
              </button>
              <span>•</span>
              <button onClick={() => handleTabClick('about')} className="hover:text-slate-200 transition-colors cursor-pointer">
                Terms of Service
              </button>
              <span>•</span>
              <button onClick={() => handleTabClick('contact')} className="hover:text-slate-200 transition-colors cursor-pointer">
                Verification Guidelines
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 rounded-xl transition-all border border-slate-800"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 rounded-xl transition-all border border-slate-800"
              aria-label="Twitter / X"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 rounded-xl transition-all border border-slate-800"
              aria-label="Telegram Community"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>

        </div>

        {/* Responsive Sticky Mini-Footer Status Bar */}
        <div className="bg-slate-900/90 border border-slate-800 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-8 rounded-2xl gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-6 gap-y-1">
            <span className="flex items-center space-x-1">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>100% Verified Listings</span>
            </span>
            <span className="hidden xs:inline">•</span>
            <span>Daily Updates</span>
            <span className="hidden xs:inline">•</span>
            <span>Global Coverage</span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-slate-300">System Status: Operational</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          </div>
        </div>

      </div>
    </footer>
  );
}

