import React, { useState } from 'react';
import { X, Bookmark, Edit2, Calendar, CheckCircle, ArrowRight, User, Mail, Sparkles, BookOpen, Trash, Bell, Send, Zap, Sliders, Check, ShieldCheck } from 'lucide-react';
import { UserProfile, Opportunity } from '../types';

interface ProfileModalProps {
  user: UserProfile;
  opportunities: Opportunity[];
  onUpdateProfile: (updated: UserProfile) => void;
  onClose: () => void;
  onViewOpp: (opp: Opportunity) => void;
  onUnsaveOpp: (oppId: string) => void;
  onOpenInterestSelection?: () => void;
}

export default function ProfileModal({
  user,
  opportunities,
  onUpdateProfile,
  onClose,
  onViewOpp,
  onUnsaveOpp,
  onOpenInterestSelection,
}: ProfileModalProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  
  // Alerts configuration state
  const [notificationsEnabled, setNotificationsEnabled] = useState(user.notificationsEnabled ?? true);
  const [emailDigest, setEmailDigest] = useState(user.emailDigest ?? true);
  const [testAlertSent, setTestAlertSent] = useState(false);
  const [successSaved, setSuccessSaved] = useState(false);

  const categoriesList = user.preferredCategories && user.preferredCategories.length > 0
    ? user.preferredCategories
    : ['Scholarship', 'Grant', 'Job', 'Fellowship', 'Funding'];

  // Fetch all bookmarked opportunities
  const savedOpps = opportunities.filter((opp) => user.savedOpportunityIds.includes(opp.id));

  // Count active matching opportunities for user's selected categories
  const matchingOppsCount = opportunities.filter((opp) =>
    categoriesList.includes(opp.type)
  ).length;

  const handleToggleNotifications = (newValue: boolean) => {
    setNotificationsEnabled(newValue);
    onUpdateProfile({
      ...user,
      notificationsEnabled: newValue,
      emailDigest,
    });
    setSuccessSaved(true);
    setTimeout(() => setSuccessSaved(false), 2500);
  };

  const handleToggleDigest = (newValue: boolean) => {
    setEmailDigest(newValue);
    onUpdateProfile({
      ...user,
      notificationsEnabled,
      emailDigest: newValue,
    });
    setSuccessSaved(true);
    setTimeout(() => setSuccessSaved(false), 2500);
  };

  const handleSendTestAlert = () => {
    setTestAlertSent(true);
    setTimeout(() => setTestAlertSent(false), 5000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    onUpdateProfile({
      ...user,
      name,
      email,
      role,
      notificationsEnabled,
      emailDigest,
    });

    setEditing(false);
    setSuccessSaved(true);
    setTimeout(() => setSuccessSaved(false), 3000);
  };

  // Helper to calculate days remaining until deadline
  const getDaysRemaining = (deadlineStr: string) => {
    const today = new Date('2026-07-21'); // system date
    const deadlineDate = new Date(deadlineStr);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const fields = [
    'Engineering & Humanities',
    'Software Engineering & Business',
    'Business & Entrepreneurship',
    'Computer Science & Software',
    'Leadership & Public Management',
    'Tech & Mobile Development',
    'Telecommunications & Business',
    'Civic Leadership & Business',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] sm:max-h-[92vh] animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        {/* Mobile Pull Handle */}
        <div className="sm:hidden w-full flex justify-center py-2 bg-slate-900 shrink-0">
          <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-900 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-amber-400" />
            <span className="font-sans text-base sm:text-lg font-bold">Your Citizen Dashboard</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-xl transition-all text-slate-300 hover:text-white cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Close profile dashboard"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 flex-grow pb-16 sm:pb-8">
          {successSaved && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-xl text-xs flex items-center space-x-2 animate-in fade-in duration-200">
              <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Your profile & alert preferences have been successfully updated!</span>
            </div>
          )}

          {/* User Bio Card */}
          <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-slate-950 text-2xl font-black shadow-md shadow-amber-500/10 shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{user.name}</h3>
                <p className="text-xs text-slate-500 font-semibold flex items-center space-x-1">
                  <Mail className="h-3 w-3 shrink-0 text-slate-400" />
                  <span>{user.email}</span>
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded-full font-extrabold">
                    {user.role}
                  </span>
                  {categoriesList.map((cat) => (
                    <span key={cat} className="text-[10px] bg-amber-100/80 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-full font-extrabold">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {onOpenInterestSelection && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenInterestSelection();
                  }}
                  className="px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  <span>Customize Categories</span>
                </button>
              )}

              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <Edit2 className="h-3.5 w-3.5 text-slate-400" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Edit Form */}
          {editing && (
            <form onSubmit={handleSave} className="space-y-4 border border-slate-100 p-5 rounded-2xl bg-white animate-in slide-in-from-top-1 duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Academic / Professional Title</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Postgraduate Researcher"
                  className="w-full text-sm border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 text-xs font-bold border border-slate-200 hover:bg-slate-50 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-city-blue hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
                >
                  Save Profile Info
                </button>
              </div>
            </form>
          )}

          {/* Alerts & Notifications Configuration Section */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 font-sans tracking-tight">
                    Opportunity Email Alerts
                  </h4>
                  <p className="text-xs text-slate-500">
                    Get notified when new listings match your preferred fields
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                {notificationsEnabled ? (
                  <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Alerts Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 bg-slate-200/80 text-slate-600 border border-slate-300 px-2.5 py-1 rounded-full text-[11px] font-bold">
                    <span>Alerts Paused</span>
                  </span>
                )}
              </div>
            </div>

            {/* Toggle 1: Instant Alerts */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-start justify-between gap-4 shadow-2xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-amber-500" />
                  <span className="font-bold text-xs sm:text-sm text-slate-800">
                    Instant Field Matching Alerts
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Send email notifications to <strong className="text-slate-700">{user.email}</strong> as soon as a new scholarship, job, or fellowship is posted in your target area.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleToggleNotifications(!notificationsEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notificationsEnabled ? 'bg-amber-500' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={notificationsEnabled}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Preferred Field Selection for Alerts */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-3 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sliders className="h-3.5 w-3.5 text-amber-500" />
                  <span>Alert Category Preferences</span>
                </label>
                <div className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60 w-fit">
                  ⚡ {matchingOppsCount} Listings match your selected categories
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {categoriesList.map((cat) => (
                    <span key={cat} className="text-xs bg-white text-slate-800 font-extrabold border border-slate-200 px-2.5 py-1 rounded-lg">
                      {cat}
                    </span>
                  ))}
                </div>

                {onOpenInterestSelection && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenInterestSelection();
                    }}
                    className="text-xs font-extrabold text-amber-700 hover:text-amber-800 hover:underline cursor-pointer"
                  >
                    Change Categories
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                You will only be alerted for new verified listings matching your selected category choices.
              </p>
            </div>

            {/* Toggle 2: Weekly Digest */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-start justify-between gap-4 shadow-2xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <span className="font-bold text-xs sm:text-sm text-slate-800">
                    Weekly Opportunity Digest
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Receive a curated email summary every Monday morning highlighting upcoming closing deadlines.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleToggleDigest(!emailDigest)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  emailDigest ? 'bg-blue-600' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={emailDigest}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    emailDigest ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Test Alert Button & Preview Banner */}
            <div className="pt-1 flex flex-col items-end space-y-3">
              <button
                type="button"
                onClick={handleSendTestAlert}
                className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Test Alert to {user.email}</span>
              </button>

              {testAlertSent && (
                <div className="w-full bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-xs space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between border-b border-amber-200/60 pb-1.5 font-bold">
                    <span className="flex items-center space-x-1.5">
                      <Mail className="h-4 w-4 text-amber-600" />
                      <span>Simulated Email Delivery</span>
                    </span>
                    <span className="text-[10px] bg-amber-200/60 px-2 py-0.5 rounded text-amber-800">Just Now</span>
                  </div>
                  <p className="font-semibold">
                    To: <span className="underline">{user.email}</span>
                  </p>
                  <p className="font-extrabold text-slate-900">
                    Subject: 🌟 New Verified Opportunity Matching {categoriesList[0]}!
                  </p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    "A new fully-funded opportunity matching your alert preferences ({categoriesList.join(', ')}) was just verified and published on Oppora."
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bookmarked / Saved Opportunities */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3 font-sans flex items-center space-x-2">
              <Bookmark className="h-4.5 w-4.5 text-city-blue shrink-0" />
              <span>Saved Opportunities ({savedOpps.length})</span>
            </h4>

            {savedOpps.length === 0 ? (
              <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400">
                <Bookmark className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                <p className="font-semibold text-slate-600 text-sm">No bookmarks yet</p>
                <p className="text-xs mt-1">Explore our database and click the heart icon to save listings.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedOpps.map((opp) => {
                  const daysLeft = getDaysRemaining(opp.deadline);
                  return (
                    <div
                      key={opp.id}
                      className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl transition-all"
                    >
                      <div className="flex-grow pr-4 cursor-pointer" onClick={() => onViewOpp(opp)}>
                        <h5 className="font-bold text-slate-800 text-sm leading-snug hover:text-city-blue">
                          {opp.title}
                        </h5>
                        <div className="flex items-center space-x-4 mt-1 text-[11px] text-slate-400">
                          <span>{opp.provider}</span>
                          <span className="flex items-center space-x-1 text-slate-400">
                            <Calendar className="h-3 w-3" />
                            <span className={daysLeft > 0 && daysLeft <= 30 ? 'text-amber-600 font-bold' : ''}>
                              {daysLeft > 0 ? `Closing in ${daysLeft} days` : `Expired (${opp.deadline})`}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => onViewOpp(opp)}
                          className="p-1.5 hover:bg-blue-50 text-city-blue rounded-lg transition-all cursor-pointer"
                          title="Open details"
                        >
                          <ArrowRight className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={() => onUnsaveOpp(opp.id)}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all cursor-pointer"
                          title="Remove bookmark"
                        >
                          <Trash className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Interactive recommended skills panel */}
          {user.skills.length > 0 && (
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/60 text-xs text-slate-500">
              <p className="font-bold text-slate-700 flex items-center space-x-1">
                <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Smart Match Activated</span>
              </p>
              <p className="mt-1 leading-relaxed">
                Based on your skills (<strong>{user.skills.join(', ')}</strong>), we suggest sorting our primary listings by <strong>{user.fieldOfInterest}</strong> for the highest conversion results!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

