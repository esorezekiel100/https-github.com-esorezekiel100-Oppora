import React, { useState } from 'react';
import { Mail, CheckCircle, Gift, Sparkles, BookOpen } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Simulate lead capture
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-10 my-8 shadow-xl text-white overflow-hidden relative">
      {/* Decorative accent background star/glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-4">
          <div className="flex items-center space-x-2 bg-slate-800 w-fit px-3 py-1 rounded-full text-xs text-amber-500 font-bold border border-slate-700">
            <Gift className="h-3.5 w-3.5 shrink-0" />
            <span>Bonus: Free Opportunity Playbook PDF</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            Get Weekly Hand-Picked, <span className="text-amber-500">Verified</span> Opportunities
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Join 12,000+ ambitious African students and founders. We send a digest of upcoming scholarships, fellowships, and grants straight to your inbox, completely free.
          </p>
        </div>

        <div className="w-full lg:max-w-md bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 shadow-lg">
          {submitted ? (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="mx-auto h-12 w-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-sans text-base font-bold text-white">Welcome to the City Digest!</h3>
                <p className="text-slate-400 text-xs mt-1">We've sent your welcome email and the <strong>Opportunity Playbook PDF</strong> to your inbox.</p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-amber-500 hover:underline"
              >
                Sign up another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your primary email"
                  className="w-full bg-slate-900/60 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm border border-slate-700 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 py-3 rounded-xl text-sm font-extrabold shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center space-x-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Join & Get Opportunity Playbook</span>
              </button>

              <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                Zero spam. Unsubscribe at any time. We protect your professional records.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
