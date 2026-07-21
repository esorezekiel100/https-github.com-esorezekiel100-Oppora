import React from 'react';
import { ShieldCheck, Users, Award, BookOpen, Heart, Globe, Sparkles, ArrowRight } from 'lucide-react';

interface AboutUsProps {
  onJoinCityClick: () => void;
  user: any;
}

export default function AboutUs({ onJoinCityClick, user }: AboutUsProps) {
  const stats = [
    {
      value: '50k+',
      label: 'Monthly Visitors',
      description: 'Ambitious African youth looking for their next breakthrough.',
      icon: Users,
      iconColor: 'text-amber-500 bg-amber-500/10'
    },
    {
      value: '12k+',
      label: 'Successful Apps',
      description: 'Submitted through Oppora with expert community feedback.',
      icon: Award,
      iconColor: 'text-blue-500 bg-blue-500/10'
    },
    {
      value: '100%',
      label: 'Manually Verified',
      description: 'Every opportunity is curated and checked before publication.',
      icon: ShieldCheck,
      iconColor: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      value: '45+',
      label: 'African Nations',
      description: 'From Cairo to Cape Town, building a unified bridge of talent.',
      icon: Globe,
      iconColor: 'text-indigo-500 bg-indigo-500/10'
    }
  ];

  const values = [
    {
      title: 'Radical Integrity',
      description: 'We manually vet every scholarship and grant. No automatic web scrapers, no dead links, and zero noise. Truth is our foundation.',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      title: 'Community First',
      description: 'Success is not a solitary path. We connect talent, foster peers uplifting peers, sharing essays, CV tips, and celebrating milestones together.',
      icon: Users,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-100'
    },
    {
      title: 'Boundless Empowerment',
      description: 'We dismantle systemic access barriers. Talent is equally distributed across Africa, but access has not been. We change that reality.',
      icon: Sparkles,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      title: 'Inclusive Excellence',
      description: 'We cater to all academic and professional pursuits: STEM, Arts, Humanities, and Social Sciences. Every passion finds its home in our city.',
      icon: BookOpen,
      iconColor: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    }
  ];

  return (
    <div className="space-y-16 py-4 animate-in fade-in duration-300">
      
      {/* 1. Hero / "Our Story" Section */}
      <section id="our-story" className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
        {/* Abstract background decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24 text-center space-y-6">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
            Our Origin Story
          </span>
          
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Empowering African Talent to <span className="text-amber-500">Global Heights</span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            Oppora is derived from the word <strong className="text-white font-bold">Opportunity</strong> combined with a modern, memorable brand identity. It represents the definitive platform where ambitious minds discover verified opportunities that transform lives, elevate careers, scale businesses, and unlock world-class education.
          </p>
          
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Founded in 2026, Oppora was built to eliminate information asymmetry and technical friction. Every listing on Oppora is manually audited by our curation team before publication, providing a safe, verified gateway where candidates access scholarships, grants, tech roles, and global fellowships with complete confidence.
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision Section */}
      <section id="mission-vision" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-sans text-xl font-extrabold text-slate-900 tracking-tight">Our Mission</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To curate, verify, and democratize access to life-changing global academic and professional opportunities for African students and founders. We eliminate information asymmetry and bridge the gap between regional potential and global resources.
            </p>
          </div>
          <div className="border-t border-slate-100 pt-6 mt-6">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
              Access & Integrity
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="font-sans text-xl font-extrabold text-slate-900 tracking-tight">Our Vision</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To establish a connected, highly-empowered continent where geographic and economic boundaries never limit professional and academic excellence. We envision an Africa whose brightest minds are frictionlessly linked to the world's most prestigious institutions.
            </p>
          </div>
          <div className="border-t border-slate-100 pt-6 mt-6">
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full">
              Global Interconnection
            </span>
          </div>
        </div>
      </section>

      {/* 3. "The Impact So Far" Stats Section */}
      <section id="impact" className="bg-slate-50 rounded-3xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="font-sans text-2xl font-extrabold text-slate-900 tracking-tight">The Impact So Far</h2>
          <p className="text-slate-500 text-sm">Empowering communities and backing academic pathways with real metrics.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                  <div className={`p-2 rounded-xl ${stat.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    {stat.label}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Our Core Values Section */}
      <section id="values" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block">
            How We Operate
          </span>
          <h2 className="font-sans text-2xl font-extrabold text-slate-900 tracking-tight">Our Core Values</h2>
          <p className="text-slate-500 text-sm">The pillars of trust we uphold daily for our city citizens.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className={`p-3 rounded-xl border w-fit ${val.iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Final Call-to-Action (CTA) Section */}
      <section id="cta" className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 md:p-12 text-slate-900 text-center relative overflow-hidden shadow-lg">
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
        
        <div className="relative max-w-2xl mx-auto space-y-6">
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="text-slate-900/80 text-sm sm:text-base max-w-lg mx-auto font-medium">
            Join 12,000+ African students and founders who browse verified opportunities, refine their applications, and scale their global impact today.
          </p>
          
          <div className="pt-2 flex justify-center">
            {user ? (
              <div className="bg-white/10 text-slate-900 text-xs font-bold px-4 py-2 rounded-xl border border-slate-900/10">
                ⭐ You are already a registered Citizen of the City!
              </div>
            ) : (
              <button
                onClick={onJoinCityClick}
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center space-x-2"
              >
                <span>Join the City</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
