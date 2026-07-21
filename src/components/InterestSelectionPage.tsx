import React, { useState } from 'react';
import { Check, Sparkles, Award, Briefcase, GraduationCap, DollarSign, Globe, ArrowRight, Layers, HeartHandshake } from 'lucide-react';
import { UserProfile, Opportunity, OpportunityType } from '../types';

interface InterestSelectionPageProps {
  user: UserProfile;
  opportunities: Opportunity[];
  onSavePreferences: (updatedCategories: OpportunityType[]) => void;
  onSkip?: () => void;
}

interface CategoryOption {
  id: OpportunityType;
  title: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  colorClass: string;
  borderClass: string;
}

export default function InterestSelectionPage({
  user,
  opportunities,
  onSavePreferences,
  onSkip,
}: InterestSelectionPageProps) {
  // Pre-fill selected with user's preferredCategories or defaults
  const [selectedCategories, setSelectedCategories] = useState<OpportunityType[]>(() => {
    if (user.preferredCategories && user.preferredCategories.length > 0) {
      return user.preferredCategories;
    }
    return ['Scholarship', 'Grant', 'Job', 'Fellowship', 'Funding'];
  });

  const categoryOptions: CategoryOption[] = [
    {
      id: 'Grant',
      title: 'Grants',
      badge: '💸 Research & Innovation',
      icon: DollarSign,
      description: 'Non-repayable funding for projects, scientific research, civic initiatives, and artistic creations.',
      colorClass: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      borderClass: 'border-emerald-500',
    },
    {
      id: 'Job',
      title: 'Jobs',
      badge: '💼 Tech & Career Roles',
      icon: Briefcase,
      description: 'Full-time software engineering, research positions, remote tech roles, and early-career hires.',
      colorClass: 'bg-blue-50 text-blue-900 border-blue-200',
      borderClass: 'border-blue-500',
    },
    {
      id: 'Scholarship',
      title: 'Scholarships',
      badge: '🎓 Fully-Funded Tuition',
      icon: GraduationCap,
      description: 'Full-tuition and stipend coverage for Undergraduate, Master’s, and PhD degree programs worldwide.',
      colorClass: 'bg-amber-50 text-amber-950 border-amber-200',
      borderClass: 'border-amber-500',
    },
    {
      id: 'Funding',
      title: 'Funding',
      badge: '🚀 Startup Capital',
      icon: Sparkles,
      description: 'Seed capital, venture pitch grants, incubation funds, and business growth support.',
      colorClass: 'bg-purple-50 text-purple-900 border-purple-200',
      borderClass: 'border-purple-500',
    },
    {
      id: 'Fellowship',
      title: 'Fellowships',
      badge: '🌟 Global Leadership',
      icon: Award,
      description: 'Prestigious short-term residencies, leadership academies, policy labs, and international exchanges.',
      colorClass: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      borderClass: 'border-indigo-500',
    },
    {
      id: 'Internship',
      title: 'Internships',
      badge: '⚡ Practical Experience',
      icon: Globe,
      description: 'Paid summer internships, virtual global apprenticeships, and university placement programs.',
      colorClass: 'bg-teal-50 text-teal-900 border-teal-200',
      borderClass: 'border-teal-500',
    },
  ];

  const toggleCategory = (catId: OpportunityType) => {
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length === 1) return; // Keep at least one
      setSelectedCategories(selectedCategories.filter((c) => c !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const handleSelectAll = () => {
    setSelectedCategories(['Grant', 'Job', 'Scholarship', 'Funding', 'Fellowship', 'Internship']);
  };

  const countMatchingOpps = opportunities.filter((opp) =>
    selectedCategories.includes(opp.type)
  ).length;

  const handleSave = () => {
    onSavePreferences(selectedCategories);
  };

  return (
    <div className="min-h-[85vh] bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header Title Section */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 max-w-xl z-10">
            <div className="inline-flex items-center space-x-1.5 text-[11px] font-extrabold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>STEP 2: FEED PERSONALIZATION</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-sans tracking-tight">
              Select Your Interest Categories
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Choose the opportunity types you are interested in. We will curate your personalized <strong className="text-amber-400">"For You"</strong> feed based on these selections.
            </p>
          </div>

          <div className="z-10 shrink-0 bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl text-center min-w-[180px]">
            <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Matching Listings</p>
            <p className="text-3xl font-black text-amber-400 font-sans my-1">{countMatchingOpps}</p>
            <p className="text-[11px] text-slate-300 font-medium">Verified opportunities</p>
          </div>
        </div>

        {/* Selection Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
            <Layers className="h-4 w-4 text-amber-500" />
            <span>Selected Categories: {selectedCategories.length} of {categoryOptions.length}</span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-bold">
            <button
              onClick={handleSelectAll}
              className="text-amber-700 hover:text-amber-800 hover:underline cursor-pointer"
            >
              Select All
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setSelectedCategories(['Scholarship', 'Grant'])}
              className="text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Reset Defaults
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryOptions.map((cat) => {
            const isSelected = selectedCategories.includes(cat.id);
            const Icon = cat.icon;
            const matchingCount = opportunities.filter((o) => o.type === cat.id).length;

            return (
              <div
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`relative rounded-2xl p-5 border-2 transition-all cursor-pointer select-none flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {/* Top Badge & Checkbox */}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border ${cat.colorClass}`}>
                    {cat.badge}
                  </span>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-200 text-transparent'
                    }`}
                  >
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-50 text-amber-600' : 'bg-slate-200/80 text-slate-600'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 font-sans tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-400">
                        {matchingCount} Available Openings
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {cat.description}
                  </p>
                </div>

                {/* Footer status */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                  <span className={isSelected ? 'text-amber-700' : 'text-slate-400'}>
                    {isSelected ? '✓ Included in For You Feed' : '+ Click to include'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Save Action */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 border border-amber-200/60 shrink-0">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 font-sans">
                Ready to explore customized opportunities?
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                You can update or change these categories anytime from your profile modal.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {onSkip && (
              <button
                onClick={onSkip}
                className="px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-2xl transition-all cursor-pointer"
              >
                Skip for now
              </button>
            )}
            
            <button
              onClick={handleSave}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer border border-slate-800"
            >
              <span>Save & View "For You" Feed</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
