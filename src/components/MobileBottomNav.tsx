import React from 'react';
import { Home, Compass, Users, FileText, User } from 'lucide-react';
import { NavTab } from './Header';
import { UserProfile } from '../types';

interface MobileBottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  user: UserProfile | null;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
}

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  user,
  onOpenProfile,
  onOpenAuth,
}: MobileBottomNavProps) {
  const handleTabClick = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedCount = user ? user.savedOpportunityIds.length : 0;

  return (
    <div
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-safe"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all rounded-xl cursor-pointer ${
            activeTab === 'home'
              ? 'text-amber-600 font-black'
              : 'text-slate-400 hover:text-slate-700 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'home' ? 'bg-amber-50 text-amber-600' : ''}`}>
            <Home className="h-5 w-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
        </button>

        {/* Opportunities */}
        <button
          onClick={() => handleTabClick('opportunities')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all rounded-xl cursor-pointer ${
            activeTab === 'opportunities'
              ? 'text-amber-600 font-black'
              : 'text-slate-400 hover:text-slate-700 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'opportunities' ? 'bg-amber-50 text-amber-600' : ''}`}>
            <Compass className="h-5 w-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Explore</span>
        </button>

        {/* City Community */}
        <button
          onClick={() => handleTabClick('city')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all rounded-xl cursor-pointer ${
            activeTab === 'city'
              ? 'text-amber-600 font-black'
              : 'text-slate-400 hover:text-slate-700 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'city' ? 'bg-amber-50 text-amber-600' : ''}`}>
            <Users className="h-5 w-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">City</span>
        </button>

        {/* Resources */}
        <button
          onClick={() => handleTabClick('resources')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all rounded-xl cursor-pointer ${
            activeTab === 'resources'
              ? 'text-amber-600 font-black'
              : 'text-slate-400 hover:text-slate-700 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'resources' ? 'bg-amber-50 text-amber-600' : ''}`}>
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Vault</span>
        </button>

        {/* Profile / Account */}
        <button
          onClick={() => {
            if (user) {
              onOpenProfile();
            } else {
              onOpenAuth();
            }
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all rounded-xl cursor-pointer text-slate-400 hover:text-slate-700 font-medium relative"
        >
          <div className="p-1 rounded-xl relative">
            {user ? (
              <div className="h-5 w-5 rounded-full bg-slate-900 text-amber-400 text-[10px] font-bold flex items-center justify-center border border-slate-700">
                {user.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <User className="h-5 w-5" />
            )}
            {user && savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">{user ? 'Account' : 'Sign In'}</span>
        </button>
      </div>
    </div>
  );
}
