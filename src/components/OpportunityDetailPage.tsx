import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, Tag, ShieldCheck, CheckCircle2, Award, ClipboardCheck, ArrowUpRight, Share2, Eye, Bookmark } from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityDetailPageProps {
  opp: Opportunity;
  isSaved: boolean;
  onSaveToggle: (oppId: string) => void;
  onBack: () => void;
  onApplyClick: (oppId: string, applyUrl: string) => void;
}

export default function OpportunityDetailPage({
  opp,
  isSaved,
  onSaveToggle,
  onBack,
  onApplyClick,
}: OpportunityDetailPageProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Scroll to top of the page on render
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [opp.id]);

  const handleShare = () => {
    const text = `Check out this verified ${opp.type} on Oppora:\n\n${opp.title} by ${opp.provider}\nDeadline: ${opp.deadline}\n\nLink to apply: ${window.location.origin}/#opportunity-${opp.id}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTypeStyles = () => {
    switch (opp.type) {
      case 'Scholarship':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Fellowship':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Grant':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Internship':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Job':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Funding':
        return 'bg-cyan-50 text-cyan-700 border-cyan-100';
      case 'Tech Role':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getCategoryStyles = () => {
    switch (opp.category) {
      case 'STEM':
        return 'bg-teal-50 text-teal-700 border-teal-100';
      case 'Arts':
        return 'bg-pink-50 text-pink-700 border-pink-100';
      case 'Humanities':
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Social Sciences':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div id={`opp-detail-page-${opp.id}`} className="space-y-6 max-w-5xl mx-auto py-4 animate-in fade-in duration-300">
      {/* Back Breadcrumb navigation */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-slate-500 hover:text-amber-600 transition-colors duration-200 group text-xs sm:text-sm font-bold bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs self-start"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to registry database</span>
      </button>

      {/* Main Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Primary Details) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
            {opp.imageUrl && (
              <div className="h-56 md:h-64 w-full relative overflow-hidden bg-slate-900">
                <img
                  src={opp.imageUrl}
                  alt={opp.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <p className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider drop-shadow-sm">{opp.provider}</p>
                </div>
              </div>
            )}

            <div className="p-6 md:p-8 space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${getTypeStyles()}`}>
                  {opp.type}
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${getCategoryStyles()}`}>
                  {opp.category}
                </span>
                {opp.verified && (
                  <span className="text-xs bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-2.5 py-1 rounded-md font-semibold flex items-center space-x-1">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                    <span>Verified Listing</span>
                  </span>
                )}
              </div>

              <div>
                {!opp.imageUrl && <p className="text-xs sm:text-sm font-bold text-amber-600 uppercase tracking-wider">{opp.provider}</p>}
                <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-1 leading-tight tracking-tight">
                  {opp.title}
                </h1>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500 font-semibold">
                <div className="space-y-1 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-extrabold">Region</span>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="text-slate-700 truncate">{opp.region}</span>
                  </div>
                </div>
                <div className="space-y-1 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-extrabold">Field of Study</span>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <Tag className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="text-slate-700 truncate">{opp.field}</span>
                  </div>
                </div>
                <div className="space-y-1 bg-slate-50/60 p-3 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-extrabold">Deadline</span>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <Calendar className="h-4 w-4 text-amber-500 shrink-0" />
                    <span className="text-slate-700">{opp.deadline}</span>
                  </div>
                </div>
                <div className="space-y-1 bg-slate-50/60 p-3 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-extrabold">Views Counter</span>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <Eye className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="text-slate-700">{opp.viewsCount} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Block */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider font-sans flex items-center space-x-2 pb-2 border-b border-slate-100">
              <Award className="h-5 w-5 text-amber-500 shrink-0" />
              <span>Full Description & Overview</span>
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
              {opp.description}
            </p>
          </div>

          {/* Eligibility Requirements */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider font-sans flex items-center space-x-2 pb-2 border-b border-slate-100">
              <ClipboardCheck className="h-5 w-5 text-amber-500 shrink-0" />
              <span>Eligibility & Requirements</span>
            </h3>
            <ul className="space-y-3.5">
              {opp.eligibility.map((requirement, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Block */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider font-sans flex items-center space-x-2 pb-2 border-b border-slate-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>What is Offered / Benefits</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opp.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 bg-emerald-50/20 rounded-2xl border border-emerald-100/40 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Actions & Highlights Sidebar) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          {/* Action Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h4 className="font-sans text-sm font-bold text-slate-800">Application Status Open</h4>
            
            <div className="space-y-3">
              <button
                onClick={() => onApplyClick(opp.id, opp.applyUrl)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-500 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 border border-slate-800"
              >
                <span>Apply on Official Host Portal</span>
                <ArrowUpRight className="h-4.5 w-4.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSaveToggle(opp.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                    isSaved
                      ? 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                  <span>{isSaved ? 'Unsave Lead' : 'Pin/Save Lead'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                >
                  <Share2 className="h-4 w-4 text-slate-400" />
                  <span>{copied ? 'Copied Link' : 'Share Lead'}</span>
                </button>
              </div>
            </div>

            {/* Quick stats snippet */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-500 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Provider Type</span>
                <span className="font-bold text-slate-700">{opp.provider.split('/')[0].trim()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Verification Status</span>
                <span className="font-bold text-emerald-600 flex items-center space-x-0.5">
                  <ShieldCheck className="h-3.5 w-3.5 inline shrink-0" />
                  <span>Vetted</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Interest Category</span>
                <span className="font-bold text-slate-700">{opp.category}</span>
              </div>
            </div>
          </div>

          {/* Authenticity Guarantee info */}
          <div className="bg-blue-50/50 rounded-2xl border border-blue-100/50 p-5 text-xs text-slate-500 space-y-2">
            <div className="flex items-center space-x-1.5 text-slate-800 font-bold">
              <ShieldCheck className="h-4 w-4 text-amber-500" />
              <span>Legitimate & Vetted Promise</span>
            </div>
            <p className="leading-relaxed">
              Every opportunity listed is vetted manually by our team to guarantee original official URLs, authentic providers, and live deadline accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
