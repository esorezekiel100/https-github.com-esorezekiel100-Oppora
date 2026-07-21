import React, { useState } from 'react';
import { Award, Sparkles, Send, CheckCircle2, UserCheck, Quote, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { SuccessStory } from '../types';

interface SuccessStoriesProps {
  stories: SuccessStory[];
  onAddStory: (story: Omit<SuccessStory, 'id'>) => void;
}

export default function SuccessStories({ stories, onAddStory }: SuccessStoriesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [storyText, setStoryText] = useState('');
  const [opportunityName, setOpportunityName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !storyText || !opportunityName) return;

    // Fallback beautiful unsplash avatar if no photo provided
    const finalPhoto = photoUrl.trim() || `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 9999999)}?auto=format&fit=crop&q=80&w=200`;

    onAddStory({
      name,
      role,
      story: storyText,
      opportunityName,
      photoUrl: finalPhoto,
      year: `Class of ${new Date().getFullYear()}`,
    });

    // Reset Form
    setName('');
    setRole('');
    setStoryText('');
    setOpportunityName('');
    setPhotoUrl('');
    setSuccessMsg(true);
    setFormOpen(false);

    // Automatically scroll to the new story (appended at end)
    setTimeout(() => {
      setActiveIndex(stories.length); // Next index will be the new story
      setSuccessMsg(false);
    }, 4000);
  };

  const current = stories[activeIndex];

  return (
    <section className="py-12 md:py-16 my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Testimonial showcase */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
              Community Wins
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-city-deep mt-4">
              Inspiring Stories of <span className="text-city-blue">Impact</span> & Growth
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              See how verified members leveraged Oppora resources to win world-class programs.
            </p>
          </div>

          {/* Testimonial Active Display Card */}
          {current && (
            <div className="relative bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8 transition-all duration-300">
              <span className="absolute top-6 right-8 text-slate-100 shrink-0">
                <Quote className="h-24 w-24 transform rotate-180 opacity-50" />
              </span>

              <div className="relative space-y-6">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic">
                  "{current.story}"
                </p>

                <div className="flex items-center space-x-4 border-t border-slate-50 pt-5">
                  <img
                    src={current.photoUrl}
                    alt={current.name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-amber-500/30 shadow-md referrerPolicy='no-referrer'"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150';
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">{current.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">{current.role}</p>
                    <p className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full inline-block mt-1 font-semibold">
                      Via {current.opportunityName} ({current.year})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation sliders */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 shadow-xs transition-all"
                aria-label="Previous story"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 shadow-xs transition-all"
                aria-label="Next story"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="text-xs text-slate-400 font-bold">
              Story {activeIndex + 1} of {stories.length}
            </div>
          </div>
        </div>

        {/* Right Column: Submit Story Form Trigger */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col justify-between h-full">
          <div>
            <div className="bg-amber-500 text-slate-950 p-3 rounded-2xl w-fit flex items-center justify-center shadow-lg">
              <Sparkles className="h-6 w-6 text-slate-950" />
            </div>
            <h3 className="font-serif text-2xl font-bold mt-6">
              Share Your Triumph!
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Did you land a fellowship, win a scholarship, or score a tech role through our site? Share your story and inspire thousands of peers across Africa.
            </p>
          </div>

          {successMsg && (
            <div className="my-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl text-xs flex items-center space-x-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <p className="font-bold">Story Submitted Successfully!</p>
                <p className="mt-0.5">Thank you for empowering our community. Your story is now live in our rotation!</p>
              </div>
            </div>
          )}

          {!formOpen ? (
            <button
              onClick={() => setFormOpen(true)}
              className="mt-8 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded-xl text-sm font-bold shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center space-x-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Submit My Testimonial</span>
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-6 text-slate-800 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amina Bello"
                  className="w-full text-white bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Your Role / Job Title</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="w-full text-white bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Program Won</label>
                  <input
                    type="text"
                    required
                    value={opportunityName}
                    onChange={(e) => setOpportunityName(e.target.value)}
                    placeholder="e.g. Mastercard Scholar"
                    className="w-full text-white bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Journey / Testimonial</label>
                <textarea
                  required
                  rows={3}
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="Tell us how Oppora assisted you, and what tips you'd give others applying..."
                  className="w-full text-white bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Profile Photo URL (Optional)</label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Paste an image URL, or leave blank"
                  className="w-full text-white bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-semibold border border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-amber-500 hover:bg-amber-600 text-slate-950 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-amber-500/10 flex items-center justify-center space-x-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Post Story</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Grid of All Success Stories (The Victory Wall) */}
      <div className="mt-16 pt-16 border-t border-slate-200 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
              The Victory Wall
            </span>
            <h3 className="font-sans text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
              Browse All Vetted Testimonials
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Discover real journeys of African leaders across diverse programs.
            </p>
          </div>

          {/* Search box for stories */}
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search by program, name..."
              id="story-search"
              className="w-full text-xs text-slate-800 placeholder-slate-400 bg-white border border-slate-200 focus:outline-none focus:border-amber-500 rounded-xl px-4 py-2.5 pl-10"
              onChange={(e) => {
                const query = e.target.value.toLowerCase();
                const storyCards = document.querySelectorAll('.story-grid-card');
                storyCards.forEach((card) => {
                  const nameText = card.querySelector('.story-card-name')?.textContent?.toLowerCase() || '';
                  const roleText = card.querySelector('.story-card-role')?.textContent?.toLowerCase() || '';
                  const oppText = card.querySelector('.story-card-opp')?.textContent?.toLowerCase() || '';
                  const storyTextContent = card.querySelector('.story-card-text')?.textContent?.toLowerCase() || '';
                  
                  if (nameText.includes(query) || roleText.includes(query) || oppText.includes(query) || storyTextContent.includes(query)) {
                    card.classList.remove('hidden');
                  } else {
                    card.classList.add('hidden');
                  }
                });
              }}
            />
            <span className="absolute left-3.5 top-3 text-slate-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="story-grid-card bg-white border border-slate-200 hover:border-amber-300 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={story.photoUrl}
                    alt={story.name}
                    className="h-10 w-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150';
                    }}
                  />
                  <div>
                    <h4 className="story-card-name font-bold text-slate-800 text-sm leading-tight">
                      {story.name}
                    </h4>
                    <p className="story-card-role text-[11px] text-slate-400 font-medium">
                      {story.role}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="h-6 w-6 text-slate-100 absolute -top-2 -left-2 transform rotate-180 -z-0" />
                  <p className="story-card-text text-slate-600 text-xs sm:text-sm leading-relaxed italic relative z-10 pl-3">
                    "{story.story}"
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="story-card-opp text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 uppercase tracking-wide">
                  {story.opportunityName}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">
                  {story.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
