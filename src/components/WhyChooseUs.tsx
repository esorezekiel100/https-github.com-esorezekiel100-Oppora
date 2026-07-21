import React from 'react';
import { ShieldCheck, Target, CalendarDays } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      id: 'pillar-verified',
      icon: ShieldCheck,
      title: '100% Manually Verified',
      description: 'We rigorously cross-reference each scholarship, grant, and fellowship with official host sites. No broken links or misleading stubs.',
      badge: 'Unrivaled Trust',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      iconBg: 'bg-emerald-100 text-emerald-600',
    },
    {
      id: 'pillar-focused',
      icon: Target,
      title: 'Africa-Focused Selection',
      description: 'Tailored specifically for African youth, tech enthusiasts, and founders to bridge regional funding disparities and global opportunities.',
      badge: 'Highly Curated',
      color: 'bg-slate-50 text-slate-800 border-slate-200',
      iconBg: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'pillar-updates',
      icon: CalendarDays,
      title: 'Daily Refresh Strategy',
      description: 'Our team and active community share fresh opportunities daily. Set deadline triggers and never miss a life-changing closing date.',
      badge: 'Active Feed',
      color: 'bg-amber-50 text-amber-800 border-amber-100',
      iconBg: 'bg-amber-100 text-amber-600',
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 px-4 sm:px-8 shadow-xs my-6 sm:my-8">
      <div className="max-w-3xl">
        <span className="text-[10px] sm:text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-50 border border-amber-100 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
          The Pillars of Trust
        </span>
        <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-3 sm:mt-4">
          Why Ambitious Talent Chooses <span className="text-amber-500">Oppora</span>
        </h2>
        <p className="text-slate-500 mt-2 sm:mt-3 text-xs sm:text-lg leading-relaxed max-w-2xl font-medium">
          Navigating global applications can feel overwhelming and crowded with spam. We curate a refined space so you can focus entirely on your craft.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-12">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.id}
              className="flex flex-col p-5 sm:p-6 rounded-2xl border border-slate-200/80 hover:border-amber-500 hover:shadow-xs transition-all duration-200 bg-slate-50/50"
            >
              <div className="flex justify-between items-start">
                <div className={`p-2.5 sm:p-3 rounded-xl flex items-center justify-center shrink-0 ${pillar.iconBg}`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 sm:py-1 rounded-full border ${pillar.color}`}>
                  {pillar.badge}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800 mt-4 sm:mt-6 font-sans">
                {pillar.title}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed font-medium">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
