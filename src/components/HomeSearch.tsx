import React, { useState } from 'react';
import { Search, Filter, MapPin, Tag, ArrowRight, Sparkles, X, Check, Globe, GraduationCap, ChevronDown } from 'lucide-react';
import { Opportunity, OpportunityType, OpportunityCategory } from '../types';

interface HomeSearchProps {
  opportunities: Opportunity[];
  searchQuery: string;
  selectedType: OpportunityType | 'All';
  selectedRegion: string;
  selectedCategory: OpportunityCategory | 'All';
  onSearchChange: (query: string) => void;
  onTypeChange: (type: OpportunityType | 'All') => void;
  onRegionChange: (region: string) => void;
  onCategoryChange: (category: OpportunityCategory | 'All') => void;
  onExecuteSearch: () => void;
  regions: string[];
}

export default function HomeSearch({
  opportunities,
  searchQuery,
  selectedType,
  selectedRegion,
  selectedCategory,
  onSearchChange,
  onTypeChange,
  onRegionChange,
  onCategoryChange,
  onExecuteSearch,
  regions,
}: HomeSearchProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Quick search suggestions
  const quickSearches = [
    { label: 'Chevening 2026', query: 'Chevening' },
    { label: 'Google Engineering', query: 'Google' },
    { label: 'Fully Funded Master’s', query: 'Scholarship' },
    { label: 'Y Combinator Seed', query: 'Y Combinator' },
    { label: 'Europe Fellowships', query: 'Europe' },
    { label: 'Paid Internships', query: 'Internship' },
  ];

  // Calculate matching count in real time
  const matchingCount = opportunities.filter((opp) => {
    const q = localQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      opp.title.toLowerCase().includes(q) ||
      opp.provider.toLowerCase().includes(q) ||
      opp.description.toLowerCase().includes(q) ||
      opp.field.toLowerCase().includes(q) ||
      opp.region.toLowerCase().includes(q);

    const matchesType = selectedType === 'All' || opp.type === selectedType;
    const matchesRegion = selectedRegion === 'All' || opp.region === selectedRegion;
    const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory;

    return matchesSearch && matchesType && matchesRegion && matchesCategory;
  }).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localQuery);
    onExecuteSearch();
  };

  const handleQuickTagClick = (tagQuery: string) => {
    setLocalQuery(tagQuery);
    onSearchChange(tagQuery);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>GLOBAL REGISTRY SEARCH ENGINE</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Search 100% Verified Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Filter through verified scholarships, jobs, grants, and international fellowships in real time.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 self-start sm:self-auto">
          <Globe className="h-4 w-4 text-amber-500 shrink-0" />
          <span>{matchingCount} Opportunities Found</span>
        </div>
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              onSearchChange(e.target.value);
            }}
            placeholder="Search by keywords, provider (e.g. Chevening, Google, Oxford), country..."
            className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl pl-12 pr-10 py-3.5 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium shadow-2xs min-h-[48px]"
          />
          {localQuery && (
            <button
              type="button"
              onClick={() => {
                setLocalQuery('');
                onSearchChange('');
              }}
              className="absolute right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Opportunity Type */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Filter className="h-4 w-4" />
            </div>
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value as OpportunityType | 'All')}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 py-3 text-base sm:text-xs font-semibold text-slate-700 focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer min-h-[44px]"
            >
              <option value="All">All Opportunity Types</option>
              <option value="Scholarship">Scholarships</option>
              <option value="Fellowship">Fellowships</option>
              <option value="Grant">Grants</option>
              <option value="Internship">Internships</option>
              <option value="Job">Jobs</option>
              <option value="Funding">Funding</option>
              <option value="Tech Role">Tech Roles</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Region */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <MapPin className="h-4 w-4" />
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => onRegionChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 py-3 text-base sm:text-xs font-semibold text-slate-700 focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer min-h-[44px]"
            >
              <option value="All">All Global Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Category */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Tag className="h-4 w-4" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value as OpportunityCategory | 'All')}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 py-3 text-base sm:text-xs font-semibold text-slate-700 focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer min-h-[44px]"
            >
              <option value="All">All Study/Work Categories</option>
              <option value="STEM">STEM</option>
              <option value="Arts">Arts</option>
              <option value="Humanities">Humanities</option>
              <option value="Social Sciences">Social Sciences</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Action Button & Quick Searches */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          {/* Quick Tags */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mr-1">Popular Search:</span>
            {quickSearches.map((qs, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickTagClick(qs.query)}
                className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer text-xs font-bold ${
                  localQuery.toLowerCase().includes(qs.query.toLowerCase())
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {qs.label}
              </button>
            ))}
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-amber-500 font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 border border-slate-800 shrink-0 cursor-pointer"
          >
            <span>Explore {matchingCount} Matching Opportunities</span>
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
