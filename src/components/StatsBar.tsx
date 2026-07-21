import React from 'react';
import { Globe, Users, CheckCircle, ShieldCheck } from 'lucide-react';

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
      iconColor: 'text-blue-500',
    },
    {
      id: 'stat-members',
      value: '12,450+',
      label: 'Ambitious Community Members',
      icon: Users,
      iconColor: 'text-amber-500',
    },
    {
      id: 'stat-verified',
      value: `${totalOpportunities} Active`,
      label: '100% Manually Verified Leads',
      icon: ShieldCheck,
      iconColor: 'text-emerald-500',
    }
  ];

  return (
    <div className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-xl border border-slate-800 my-8">
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-center space-x-4 pt-6 md:pt-0 md:pl-8 first:pt-0 first:pl-0"
              >
                <div className="p-3 bg-slate-800/80 rounded-2xl flex items-center justify-center shrink-0">
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-3xl font-bold font-sans tracking-tight text-white leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
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
