import React, { useState } from 'react';
import { X, Calendar, MapPin, Tag, ShieldCheck, CheckCircle2, Award, ClipboardCheck, ArrowUpRight, Share2, Eye, Link2, Bookmark } from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityDetailModalProps {
  opp: Opportunity;
  isSaved: boolean;
  onSaveToggle: (oppId: string) => void;
  onClose: () => void;
  onApplyClick: (oppId: string, applyUrl: string) => void;
}

export default function OpportunityDetailModal({
  opp,
  isSaved,
  onSaveToggle,
  onClose,
  onApplyClick,
}: OpportunityDetailModalProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    // Generate a beautiful shareable text link
    const text = `Check out this verified opportunity on Oppora:\n\n${opp.title} by ${opp.provider}\nDeadline: ${opp.deadline}\n\nDiscover more on Oppora: ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2.5 sm:p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-900 text-white flex justify-between items-center shrink-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] sm:text-xs bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              {opp.type}
            </span>
            <span className="text-[10px] sm:text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-slate-700">
              {opp.category}
            </span>
            {opp.verified && (
              <span className="text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold flex items-center space-x-1">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden xs:inline">Verified Listing</span>
                <span className="xs:hidden">Verified</span>
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl transition-all text-slate-300 hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6 flex-grow">
          {/* Main Title Block */}
          <div>
            <p className="text-xs font-bold text-city-blue uppercase tracking-wider">{opp.provider}</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-city-deep mt-1 leading-tight">
              {opp.title}
            </h2>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-500 font-semibold border-b border-slate-100 pb-5">
              <span className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{opp.region}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Deadline: {opp.deadline}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Tag className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{opp.field}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{opp.viewsCount} views</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-2 font-sans flex items-center space-x-2">
              <Award className="h-4 w-4 text-city-blue shrink-0" />
              <span>Program Overview</span>
            </h4>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {opp.description}
            </p>
          </div>

          {/* Eligibility Requirements */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3 font-sans flex items-center space-x-2">
              <ClipboardCheck className="h-4 w-4 text-city-blue shrink-0" />
              <span>Eligibility Requirements</span>
            </h4>
            <ul className="space-y-2.5">
              {opp.eligibility.map((el, index) => (
                <li key={index} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span>{el}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3 font-sans flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Funding & Scholar Benefits</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {opp.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-emerald-50/40 rounded-xl border border-emerald-100/50 text-xs text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Disclaimer */}
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/60 text-xs text-slate-500 flex items-start space-x-3">
            <ShieldCheck className="h-5 w-5 text-city-blue shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-700">Oppora Authenticity Guarantee</p>
              <p className="mt-1 leading-relaxed">
                This opportunity has been manually reviewed and verified with the primary provider. We track external applications to keep our registry accurate. Apply using our official exit portal below.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
            {/* Save toggle */}
            <button
              onClick={() => onSaveToggle(opp.id)}
              className={`flex-1 sm:flex-none px-4 py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-2 min-h-[44px] cursor-pointer ${
                isSaved
                  ? 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-rose-500' : ''}`} />
              <span>{isSaved ? 'Bookmarked' : 'Bookmark Lead'}</span>
            </button>

            {/* Share action */}
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all flex items-center justify-center space-x-2 min-h-[44px] cursor-pointer"
            >
              <Share2 className="h-4 w-4 text-slate-400" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Apply button */}
          <button
            onClick={() => onApplyClick(opp.id, opp.applyUrl)}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
          >
            <span>Apply on Official Host Portal</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
