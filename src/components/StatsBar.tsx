import React from 'react';
import { Globe, Users, ShieldCheck } from 'lucide-react';

interface StatsBarProps {
  totalOpportunities: number;
}

export default function StatsBar({ totalOpportunities }: StatsBarProps) {
  const stats = [
    {
      id: 'stat-countries',
      value: '42+',
      label: 'African Nations Represented',
      icon: Globe,
      iconColor: 'text-blue-400',
    },
    {
      id: 'stat-members',
      value: '12,450+',
      label: 'Ambitious Community Members',
      icon: Users,
      iconColor: 'text-amber-400',
    },
    {
      id: 'stat-verified',
      value: `${totalOpportunities} Active`,
      label: '100% Manually Verified Leads',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
    }
  ];

  return (
    <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-800/80 my-4 sm:my-8">
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-center space-x-3.5 pt-4 sm:pt-0 sm:pl-6 md:pl-8 first:pt-0 first:pl-0"
              >
                <div className="p-2.5 sm:p-3 bg-slate-800/90 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border border-slate-700/50">
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-white leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

