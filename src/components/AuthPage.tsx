import React, { useState } from 'react';
import { Sparkles, Mail, Lock, Eye, EyeOff, Shield, ArrowRight, CheckCircle, UserCheck, User, UserPlus, AlertCircle, Key } from 'lucide-react';
import { UserProfile, OpportunityType } from '../types';

interface AuthPageProps {
  initialMode?: 'signin' | 'signup';
  onLoginSuccess: (user: UserProfile) => void;
  onNavigateHome: () => void;
}

// Storage key for registered local users simulation
const REGISTERED_USERS_KEY = 'city_registered_users';

interface StoredUser {
  name: string;
  email: string;
  passwordHash: string; // simulated password store
  role: string;
  preferredCategories: OpportunityType[];
}

export default function AuthPage({
  initialMode = 'signin',
  onLoginSuccess,
  onNavigateHome,
}: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Undergraduate Student');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Auth Feedback State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const defaultCategories: OpportunityType[] = ['Scholarship', 'Grant', 'Job', 'Fellowship', 'Funding'];

  // Helper to retrieve registered users from localStorage
  const getRegisteredUsers = (): StoredUser[] => {
    try {
      const stored = localStorage.getItem(REGISTERED_USERS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse registered users', e);
    }
    // Default pre-registered demo user
    return [
      {
        name: 'Ezekiel Oso',
        email: 'esorezekiel100@gmail.com',
        passwordHash: 'password123',
        role: 'Postgraduate Researcher',
        preferredCategories: defaultCategories,
      },
    ];
  };

  // Helper to save registered user
  const saveRegisteredUser = (newUser: StoredUser) => {
    const existing = getRegisteredUsers();
    const updated = [...existing.filter((u) => u.email.toLowerCase() !== newUser.email.toLowerCase()), newUser];
    try {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save registered user', e);
    }
  };

  const handleDemoLogin = () => {
    setErrorMessage(null);
    setSuccessMessage('Successfully authenticated as Ezekiel Oso!');
    setIsAuthenticating(true);

    setTimeout(() => {
      onLoginSuccess({
        name: 'Ezekiel Oso',
        email: 'esorezekiel100@gmail.com',
        role: 'Postgraduate Researcher',
        preferredCategories: defaultCategories,
        savedOpportunityIds: [],
        notificationsEnabled: true,
        emailDigest: true,
      });
    }, 600);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Basic Validations
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!cleanPassword) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    if (cleanPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      const registeredUsers = getRegisteredUsers();
      const existingUser = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

      if (existingUser) {
        // Authenticate password match
        if (existingUser.passwordHash && existingUser.passwordHash !== cleanPassword) {
          setIsAuthenticating(false);
          setErrorMessage('Invalid password for this account. Please try again.');
          return;
        }

        setSuccessMessage(`Authentication successful! Welcome back, ${existingUser.name}.`);
        onLoginSuccess({
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          preferredCategories: existingUser.preferredCategories || defaultCategories,
          savedOpportunityIds: [],
          notificationsEnabled: true,
          emailDigest: true,
        });
      } else {
        // Automatically authenticate and create profile for new valid email sign-ins
        const derivedName = cleanEmail.split('@')[0].replace(/[\._]/g, ' ');
        const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

        const newUserRecord: StoredUser = {
          name: formattedName,
          email: cleanEmail,
          passwordHash: cleanPassword,
          role: 'Global Applicant',
          preferredCategories: defaultCategories,
        };

        saveRegisteredUser(newUserRecord);

        setSuccessMessage(`Authenticated successfully as new user ${formattedName}!`);
        onLoginSuccess({
          name: formattedName,
          email: cleanEmail,
          role: 'Global Applicant',
          preferredCategories: defaultCategories,
          savedOpportunityIds: [],
          notificationsEnabled: true,
          emailDigest: true,
        });
      }
    }, 500);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!cleanPassword || cleanPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the registration terms to continue.');
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      const registeredUsers = getRegisteredUsers();
      const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

      if (existing) {
        setErrorMessage('An account with this email already exists. Switching to Sign In...');
        setIsAuthenticating(false);
        setMode('signin');
        setPassword(cleanPassword);
        return;
      }

      const newUserRecord: StoredUser = {
        name: cleanName,
        email: cleanEmail,
        passwordHash: cleanPassword,
        role: role,
        preferredCategories: defaultCategories,
      };

      saveRegisteredUser(newUserRecord);

      setSuccessMessage(`Account created successfully! Logging you in as ${cleanName}...`);

      onLoginSuccess({
        name: cleanName,
        email: cleanEmail,
        role: role,
        preferredCategories: defaultCategories,
        savedOpportunityIds: [],
        notificationsEnabled: true,
        emailDigest: true,
      });
    }, 500);
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        
        {/* Top return bar */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <button
            onClick={onNavigateHome}
            className="hover:text-slate-900 flex items-center space-x-1 cursor-pointer"
          >
            <span>← Back to Home</span>
          </button>
          
          <span className="text-slate-400">Oppora Global Opportunity Portal</span>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950 text-white p-7 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center space-x-1.5 text-[11px] font-extrabold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AUTHENTICATION & ACCESS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
              {mode === 'signin' ? 'Welcome Back' : 'Join Oppora'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1.5 max-w-xs mx-auto leading-relaxed">
              {mode === 'signin'
                ? 'Sign in to access your saved opportunity bookmarks & customized alerts.'
                : 'Create your free account to match verified scholarships, grants & internships.'}
            </p>

            {/* Mode Switcher Tabs */}
            <div className="mt-6 p-1 bg-slate-800/90 border border-slate-700/80 rounded-2xl grid grid-cols-2 gap-1 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2 px-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  mode === 'signin'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <LogInIcon className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2 px-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  mode === 'signup'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Register</span>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 space-y-5">

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start space-x-2.5 text-rose-900 text-xs font-medium animate-in fade-in duration-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message Alert */}
            {successMessage && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start space-x-2.5 text-emerald-900 text-xs font-medium animate-in fade-in duration-200">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Social Logins */}
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
                or continue with credentials
              </span>
            </div>

            {/* FORM: Sign In or Sign Up */}
            <form onSubmit={mode === 'signin' ? handleSignInSubmit : handleSignUpSubmit} className="space-y-4">
              
              {/* Full Name field (Only shown in SignUp mode) */}
              {mode === 'signup' && (
                <div className="animate-in fade-in duration-150">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ezekiel Oso"
                      className="w-full text-sm border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all text-slate-900 font-medium placeholder-slate-400"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
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
                    placeholder="applicant@university.edu"
                    className="w-full text-sm border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all text-slate-900 font-medium placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
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
                    className="w-full text-sm border border-slate-200 rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all text-slate-900 font-medium placeholder-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Role Select (Only in SignUp Mode) */}
              {mode === 'signup' && (
                <div className="animate-in fade-in duration-150">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Academic / Career Status
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full text-xs sm:text-sm font-semibold border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500 bg-slate-50 text-slate-800 cursor-pointer"
                  >
                    <option value="Undergraduate Student">Undergraduate Student</option>
                    <option value="Postgraduate Researcher">Postgraduate Researcher</option>
                    <option value="Early Career Professional">Early Career Professional</option>
                    <option value="Aspiring Tech Entrepreneur">Aspiring Tech Entrepreneur</option>
                    <option value="High School Scholar">High School Scholar</option>
                  </select>
                </div>
              )}

              {/* Checkboxes */}
              {mode === 'signin' ? (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center space-x-2 text-slate-600 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 h-4 w-4 cursor-pointer"
                    />
                    <span>Remember session</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="text-amber-700 hover:text-amber-800 font-bold hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              ) : (
                <div className="pt-1">
                  <label className="flex items-center space-x-2 text-xs text-slate-600 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 h-4 w-4 cursor-pointer"
                    />
                    <span>I accept Oppora terms & opportunity alert updates</span>
                  </label>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start space-x-2 text-[11px] text-slate-600">
                <Shield className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <p>
                  <strong>Next Step:</strong> Following authentication, you will customize your interest categories (Grants, Scholarships, Jobs, Fellowships) to populate your feed!
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-sm py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer border border-slate-800 mt-2 disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating Credentials...</span>
                  </span>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span>{mode === 'signin' ? 'Sign In & Access Feed' : 'Create Account & Continue'}</span>
                  </>
                )}
              </button>
            </form>

            {/* Bottom Toggle switch hint */}
            <div className="text-center pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                {mode === 'signin' ? "Don't have an account yet? " : "Already registered? "}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === 'signin' ? 'signup' : 'signin');
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="text-amber-600 font-extrabold hover:underline cursor-pointer"
                >
                  {mode === 'signin' ? 'Create a Free Account' : 'Sign In Now'}
                </button>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

function LogInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}
