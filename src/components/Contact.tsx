import React, { useState } from 'react';
import { Mail, ShieldCheck, CheckCircle, HelpCircle, MapPin, MessageSquare, ArrowRight, BookOpen, Globe, Info } from 'lucide-react';

interface Ticket {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  date: string;
  status: 'Open' | 'Investigating' | 'Resolved';
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Submit an Opportunity',
    message: ''
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<Ticket | null>(null);

  const faqs = [
    {
      question: 'How are opportunities on Oppora verified?',
      answer: 'Our dedicated curation team manually processes every listing. We confirm the active status of application portals, audit eligibility conditions directly with host university or foundation websites, and ensure that there are zero hidden referral charges or scam redirections before publishing. We strictly do not use automated scrapers.'
    },
    {
      question: 'Can I submit a scholarship or fellowship to be listed?',
      answer: 'Yes! We welcome submissions from students, universities, foundation administrators, and community leaders. Use our contact form and select "Submit an Opportunity". Please include the official program link, eligibility requirements, and the deadline. Our curation team will review and verify it within 48 hours.'
    },
    {
      question: 'Is Oppora completely free to use?',
      answer: 'Yes, 100%. We believe that accessing information on life-changing global opportunities should never be locked behind a paywall. There are no fees to view database listings, download essay guides, participate in peer review, or join our community discussions.'
    },
    {
      question: 'How can I receive real-time email alerts for my field of study?',
      answer: 'Simply click "Join Oppora" to create your free Citizen Profile. In your profile dashboard, you can define your specialized field of interest (such as STEM, Social Sciences, etc.) and toggle on email notifications or digest preferences.'
    }
  ];

  const hubs = [
    {
      city: 'Lagos Hub',
      address: '24 Alara Tech Quarter, Yaba, Lagos, Nigeria',
      email: 'lagos@oppora.org',
      country: '🇳🇬 West Africa'
    },
    {
      city: 'Nairobi Hub',
      address: 'The Gearbox, Kilimani Road, Nairobi, Kenya',
      email: 'nairobi@oppora.org',
      country: '🇰🇪 East Africa'
    },
    {
      city: 'Cape Town Hub',
      address: 'Bandwidth Barn, Woodstock, Cape Town, South Africa',
      email: 'capetown@oppora.org',
      country: '🇿🇦 Southern Africa'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Create a realistic ticket
    const ticketId = `OPP-TKT-${Math.floor(Math.random() * 90000) + 10000}`;
    const newTicket: Ticket = {
      id: ticketId,
      name: formData.name,
      email: formData.email,
      topic: formData.topic,
      message: formData.message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Open'
    };

    setSubmittedTicket(newTicket);
    setFormData({ name: '', email: '', topic: 'Submit an Opportunity', message: '' });
  };

  return (
    <div className="space-y-16 py-4 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
          Support Desk
        </span>
        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Connect With Our <span className="text-amber-600">Curation Team</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Need assistance verifying an opportunity, reporting a dead link, submitting a new scholarship, or seeking community partnership? We are here to support.
        </p>
      </section>

      {/* Main Grid: Form vs. Coordinates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Form & Ticket success */}
        <div className="lg:col-span-7 space-y-8">
          
          {submittedTicket ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 md:p-8 space-y-6 text-slate-900 animate-in zoom-in-95 duration-200">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/10">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-sans text-lg font-extrabold text-slate-900">
                    Ticket Logged Successfully!
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold font-mono">
                    ID Reference: {submittedTicket.id}
                  </p>
                </div>
              </div>

              <div className="space-y-3 bg-white/70 border border-emerald-100/60 rounded-2xl p-4 text-xs font-medium text-slate-600">
                <p><strong>Citizen Name:</strong> {submittedTicket.name}</p>
                <p><strong>Reply Channel:</strong> {submittedTicket.email}</p>
                <p><strong>Inquiry Topic:</strong> {submittedTicket.topic}</p>
                <div className="border-t border-emerald-100 pt-3">
                  <p className="text-slate-500 italic">"{submittedTicket.message}"</p>
                </div>
              </div>

              <div className="text-xs text-emerald-800 space-y-1 leading-relaxed">
                <p className="font-extrabold">🚨 Estimated Curation Team Response time: 14 hours.</p>
                <p className="text-[11px] text-emerald-700 font-medium">A certified manual auditor has queued this request for database alignment. We will reach out to you via your provided email channel.</p>
              </div>

              <button
                onClick={() => setSubmittedTicket(null)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-xl transition-all text-xs"
              >
                Log Another Inquiry
              </button>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="font-sans text-lg font-extrabold text-slate-900 tracking-tight">
                  Log a Verified Support Ticket
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in details below. Our hand-auditors evaluate messages periodically.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Ade"
                      className="w-full text-xs text-slate-800 bg-slate-50/50 border border-slate-200 focus:outline-none focus:border-amber-500 focus:bg-white rounded-xl px-4 py-3"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sam@example.com"
                      className="w-full text-xs text-slate-800 bg-slate-50/50 border border-slate-200 focus:outline-none focus:border-amber-500 focus:bg-white rounded-xl px-4 py-3"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Inquiry Topic
                  </label>
                  <select
                    className="w-full text-xs text-slate-800 bg-slate-50/50 border border-slate-200 focus:outline-none focus:border-amber-500 focus:bg-white rounded-xl px-3 py-3"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  >
                    <option value="Submit an Opportunity">Submit an Opportunity for Verification</option>
                    <option value="Report dead link">Report a Dead Portal / Old Link</option>
                    <option value="Community Partnership">Become a Mentor / Community Partner</option>
                    <option value="General Feedback">Platform Feedback / Bug Report</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Message Body
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide specific links, references, or details so we can assist you efficiently..."
                    className="w-full text-xs text-slate-800 bg-slate-50/50 border border-slate-200 focus:outline-none focus:border-amber-500 focus:bg-white rounded-xl px-4 py-3 leading-relaxed"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl transition-all text-xs tracking-wide flex items-center justify-center space-x-1.5"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Submit Ticket to Curation Queue</span>
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Right: Hub Coordinates */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Hubs */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-lg space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Physical Network
              </span>
              <h3 className="font-sans text-base font-extrabold text-white tracking-tight">
                Our Regional Hubs
              </h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                Oppora maintains coordination hubs in major tech and education ecosystems across the region.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {hubs.map((hub, idx) => (
                <div key={idx} className="border-b border-slate-800 pb-3 last:border-none last:pb-0 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <h5 className="font-extrabold text-slate-100">{hub.city}</h5>
                    <span className="text-[10px] text-slate-400 font-bold bg-slate-800 px-2 py-0.5 rounded">
                      {hub.country}
                    </span>
                  </div>
                  <div className="flex items-start space-x-1.5 text-[11px] text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{hub.address}</span>
                  </div>
                  <p className="text-[10px] text-amber-500 font-semibold pl-5">
                    📨 {hub.email}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt banner */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex items-center space-x-3">
            <ShieldCheck className="h-10 w-10 text-emerald-500 shrink-0 bg-emerald-50 p-2 rounded-2xl" />
            <div className="text-xs">
              <h4 className="font-bold text-slate-800">100% Curation Audit</h4>
              <p className="text-[11px] text-slate-400 leading-normal font-medium mt-0.5">
                We never partner with third-party advertisers or share citizen profile emails. Trust is our absolute priority.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Accordion FAQ Section */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="font-sans text-2xl font-extrabold text-slate-900 tracking-tight">
            Curious Citizens Ask Us
          </h2>
          <p className="text-slate-500 text-sm">Clear, direct answers about verification and application mentorship.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-slate-300 transition-colors rounded-2xl overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center font-sans text-slate-800 hover:text-amber-600 font-extrabold text-xs sm:text-sm tracking-wide gap-4"
                >
                  <span>{faq.question}</span>
                  <span className="text-slate-400 font-bold text-base shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-500 leading-relaxed font-medium border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
