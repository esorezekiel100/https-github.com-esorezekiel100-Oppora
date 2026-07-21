import React from 'react';
import { Calendar, Globe, MapPin, CheckCircle, Heart, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityCardProps {
  opp: Opportunity;
  isSaved: boolean;
  onSaveToggle: (oppId: string, e?: React.MouseEvent) => void;
  onViewDetails: (opp: Opportunity) => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opp, isSaved, onSaveToggle, onViewDetails }) => {
  // Determine if the deadline is urgent (within 30 days)
  const isUrgent = () => {
    const today = new Date('2026-07-21'); // system date
    const deadlineDate = new Date(opp.deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  };

  const defaultImage = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800';

  // Format type colors for a premium badge design
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

  // Format category colors for a premium badge design
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
    <div
      onClick={() => onViewDetails(opp)}
      className="bg-white rounded-2xl border border-slate-200 hover:border-amber-500/80 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:scale-[1.015] transition-all duration-300 flex flex-col h-full cursor-pointer group overflow-hidden transform-gpu"
    >
      {/* Top Banner Image Container */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-100 shrink-0">
        <img
          src={opp.imageUrl || defaultImage}
          alt={opp.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shadow-2xs backdrop-blur-md bg-white/95 ${getTypeStyles()}`}>
              {opp.type}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shadow-2xs backdrop-blur-md bg-white/95 ${getCategoryStyles()}`}>
              {opp.category}
            </span>
          </div>

          {opp.verified && (
            <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-md text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase shadow-2xs">
              <ShieldCheck className="h-3 w-3 shrink-0 text-emerald-600" />
              <span>Verified</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Title & Provider */}
          <h3 className="font-sans text-sm font-bold text-slate-900 leading-tight mb-1 group-hover:text-amber-600 transition-colors">
            {opp.title}
          </h3>
          <p className="text-xs font-semibold text-slate-500">
            {opp.provider}
          </p>

          {/* Description Snippet */}
          <p className="text-slate-500 text-xs mt-2.5 line-clamp-2 leading-relaxed">
            {opp.description}
          </p>
        </div>

        {/* Meta Indicators */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <div className="flex items-center space-x-1.5">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{opp.region}</span>
          </div>
          <div className="flex items-center space-x-1.5 justify-end">
            <Calendar className={`h-3.5 w-3.5 shrink-0 ${isUrgent() ? 'text-amber-500' : 'text-slate-400'}`} />
            <span className={isUrgent() ? 'text-amber-600 font-bold' : ''}>
              Deadline: {opp.deadline}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Details / CTA */}
      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex justify-between items-center shrink-0">
        <div className="flex space-x-4 text-[10px] text-slate-400 font-bold uppercase">
          <span className="flex items-center space-x-1">
            <Eye className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span>{opp.viewsCount} views</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Save Button */}
          <button
            onClick={(e) => onSaveToggle(opp.id, e)}
            className={`p-1.5 rounded-lg border transition-all ${
              isSaved
                ? 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100'
                : 'bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save Opportunity'}
          >
            <Heart className={`h-3.5 w-3.5 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Learn More Action */}
          <span className="text-xs font-bold text-amber-600 group-hover:text-amber-700 flex items-center space-x-1 transition-colors pl-1">
            <span>Details →</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
