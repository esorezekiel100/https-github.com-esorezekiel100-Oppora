import React from 'react';
import { Sparkles, MessageSquare, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';

interface VibrancyTickerProps {
  onNavigateToTab: (tab: any) => void;
}

export default function VibrancyTicker({ onNavigateToTab }: VibrancyTickerProps) {
  const activities = [
    {
      id: 'act-1',
      type: 'verify',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      message: '50+ New Fellowships verified & added today',
      time: 'Just now',
      actionLabel: 'Browse',
      tab: 'opportunities' as const,
    },
    {
      id: 'act-2',
      type: 'community',
      icon: MessageSquare,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-100',
      user: {
        name: 'Ebenezer Gyamfi',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
      },
      message: 'posted: "MTN is recruiting graduates with Python..."',
      time: '15m ago',
      actionLabel: 'Join Chat',
      tab: 'community' as const,
    },
    {
      id: 'act-3',
      type: 'story',
      icon: Award,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-100',
      user: {
        name: 'Chinedu Okafor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      },
      message: 'celebrated landing a Nairobi fintech internship!',
      time: '1h ago',
      actionLabel: 'Read Story',
      tab: 'stories' as const,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 md:p-6 shadow-xs relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-amber-500/10 text-amber-700 rounded-xl">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              City Vibrancy Feed
            </h4>
            <p className="text-xs text-slate-400 font-medium">
              Real-time updates, achievements, and hand-checked alerts
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">
            Live Updates Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
            >
              {act.user ? (
                <img
                  src={act.user.avatar}
                  alt={act.user.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0 shadow-xs"
                />
              ) : (
                <div className={`p-2 rounded-xl border shrink-0 ${act.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {act.user ? act.user.name : 'ALERT'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{act.time}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700 mt-0.5 line-clamp-2 leading-relaxed">
                  {act.message}
                </p>
                <button
                  onClick={() => {
                    if (act.tab === 'community' || act.tab === 'stories') {
                      onNavigateToTab('city');
                    } else {
                      onNavigateToTab(act.tab);
                    }
                  }}
                  className="mt-1.5 inline-flex items-center space-x-1 text-[10px] font-extrabold text-amber-600 hover:text-amber-700 transition-all"
                >
                  <span>{act.actionLabel}</span>
                  <ArrowUpRight className="h-2.5 w-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
