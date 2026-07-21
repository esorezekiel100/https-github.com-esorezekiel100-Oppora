import React, { useState } from 'react';
import { X, Sparkles, User, Mail, Shield, CheckCircle, Lock, ArrowRight, Eye, EyeOff, Globe, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Undergraduate Student');
  const [field, setField] = useState('Computer Science & Software');
  const [rememberMe, setRememberMe] = useState(true);

  const fields = [
    'Computer Science & Software',
    'Software Engineering & Business',
    'Engineering & Humanities',
    'Business & Entrepreneurship',
    'Leadership & Public Management',
    'Tech & Mobile Development',
    'Telecommunications & Business',
    'Civic Leadership & Business',
  ];

  const handleDemoLogin = () => {
    onLoginSuccess({
      name: 'Ezekiel Oso',
      email: 'esorezekiel100@gmail.com',
      role: 'Postgraduate Researcher',
      preferredCategories: ['Scholarship', 'Grant', 'Job', 'Fellowship', 'Funding'],
      savedOpportunityIds: [],
      notificationsEnabled: true,
      emailDigest: true,
    });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const finalName = name.trim() || email.split('@')[0].replace('.', ' ');

    onLoginSuccess({
      name: finalName,
      email: email,
      role: role,
      preferredCategories: ['Scholarship', 'Grant', 'Job', 'Fellowship', 'Funding'],
      savedOpportunityIds: [],
      notificationsEnabled: true,
      emailDigest: true,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2.5 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200 my-4 max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950 text-white p-6 sm:p-8 text-center relative shrink-0">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all text-slate-400 hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="inline-flex items-center space-x-1.5 text-[11px] font-extrabold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>GLOBAL CITIZEN PORTAL</span>
          </div>

          <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight">
            {authMode === 'login' ? 'Welcome Back' : 'Create Free Account'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1.5 max-w-xs mx-auto">
            {authMode === 'login'
              ? 'Sign in to access bookmarked leads, member resource vault, and email alerts.'
              : 'Join 10,000+ applicants matching verified global scholarships and tech grants.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 bg-slate-800/80 p-1 rounded-2xl border border-slate-700/60 mt-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register Account
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5 text-slate-800">
          {/* Social Sign-In Options */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex items-center justify-center space-x-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex items-center justify-center space-x-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
            >
              <svg className="h-4 w-4 shrink-0 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LinkedIn</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0">
              or use email
            </span>
          </div>

          {/* Main Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required={authMode === 'signup'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ezekiel Oso"
                    className="w-full text-base sm:text-sm border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all text-slate-900 font-medium placeholder-slate-400 min-h-[44px]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. applicant@university.edu"
                  className="w-full text-base sm:text-sm border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all text-slate-900 font-medium placeholder-slate-400 min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-base sm:text-sm border border-slate-200 rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all text-slate-900 font-medium placeholder-slate-400 min-h-[44px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Role & Field Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Academic Status
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-xs font-semibold border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 bg-slate-50 text-slate-800"
                >
                  <option value="Undergraduate Student">Undergraduate Student</option>
                  <option value="Postgraduate Researcher">Postgraduate Researcher</option>
                  <option value="Early Career Professional">Early Career Professional</option>
                  <option value="Aspiring Tech Entrepreneur">Aspiring Tech Entrepreneur</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Interest Discipline
                </label>
                <select
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="w-full text-xs font-semibold border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 bg-slate-50 text-slate-800"
                >
                  {fields.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 text-slate-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 h-4 w-4"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-amber-700 hover:text-amber-800 font-bold hover:underline"
              >
                Forgot passcode?
              </button>
            </div>

            {/* Security Guarantee Badge */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start space-x-2 text-[11px] text-slate-600">
              <Shield className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <p>
                <strong>Secure Authentication:</strong> Your account provides free access to verified scholarship archives, essay downloads, and customized opportunity alerts.
              </p>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-sm py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer border border-slate-800"
              >
                <CheckCircle className="h-4 w-4 text-amber-400" />
                <span>{authMode === 'login' ? 'Sign In to Portal' : 'Create Free Account'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
