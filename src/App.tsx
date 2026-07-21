import React, { useState, useEffect } from 'react';
import { Compass, Search, Filter, CalendarDays, ShieldCheck, HelpCircle, ArrowRight, BookOpen, Heart, Globe, Award, Sparkles, Building, Info, FileText, Bookmark } from 'lucide-react';
import Header, { NavTab } from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';
import Hero from './components/Hero';
import HomeSearch from './components/HomeSearch';
import StatsBar from './components/StatsBar';
import VibrancyTicker from './components/VibrancyTicker';
import WhyChooseUs from './components/WhyChooseUs';
import OpportunityCard from './components/OpportunityCard';
import OpportunityDetailModal from './components/OpportunityDetailModal';
import OpportunityDetailPage from './components/OpportunityDetailPage';
import SuccessStories from './components/SuccessStories';
import CommunityFeed from './components/CommunityFeed';
import AboutUs from './components/AboutUs';
import Resources from './components/Resources';
import Contact from './components/Contact';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import AuthPage from './components/AuthPage';
import InterestSelectionPage from './components/InterestSelectionPage';

import { mockOpportunities, mockSuccessStories, mockCommunityPosts } from './data/mockData';
import { Opportunity, SuccessStory, CommunityPost, UserProfile, OpportunityType, OpportunityCategory } from './types';

export default function App() {
  // Tabs: NavTab
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [citySubTab, setCitySubTab] = useState<'forum' | 'honor-roll'>('forum');

  // Persistence keys
  const USER_KEY = 'oppora_user_profile';
  const OPPS_KEY = 'oppora_opportunities';
  const STORIES_KEY = 'oppora_stories';
  const POSTS_KEY = 'oppora_posts';

  // Core States
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem(OPPS_KEY);
    return saved ? JSON.parse(saved) : mockOpportunities;
  });

  const [stories, setStories] = useState<SuccessStory[]>(() => {
    const saved = localStorage.getItem(STORIES_KEY);
    return saved ? JSON.parse(saved) : mockSuccessStories;
  });

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem(POSTS_KEY);
    return saved ? JSON.parse(saved) : mockCommunityPosts;
  });

  // Sync to localStorage
  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(OPPS_KEY, JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }, [posts]);

  // Modal Controllers
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [viewingOppId, setViewingOppId] = useState<string | null>(null);

  // Sync with hash-routing for different pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#opportunity-')) {
        const id = hash.replace('#opportunity-', '');
        setViewingOppId(id);
        setActiveTab('opportunities');
      } else {
        setViewingOppId(null);
      }
    };

    // Run on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBackToRegistry = () => {
    window.location.hash = '';
    setViewingOppId(null);
  };

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<OpportunityType | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'All'>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedField, setSelectedField] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'deadline' | 'popularity'>('deadline');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [forYouOnly, setForYouOnly] = useState(false);

  // Unique fields and regions for filter dropdowns
  const fieldsOfStudy: string[] = Array.from(new Set<string>(opportunities.map((o) => o.field)));
  const regions: string[] = Array.from(new Set<string>(opportunities.map((o) => o.region)));

  // Handlers
  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    setAuthModalOpen(false);
    setActiveTab('select-interests');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
  };

  // Toggle Bookmark
  const handleSaveToggle = (oppId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // prevent card click
    
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const savedIds = user.savedOpportunityIds.includes(oppId)
      ? user.savedOpportunityIds.filter((id) => id !== oppId)
      : [...user.savedOpportunityIds, oppId];

    setUser({
      ...user,
      savedOpportunityIds: savedIds,
    });
  };

  // View Details (Tracks views)
  const handleViewDetails = (opp: Opportunity) => {
    const updated = opportunities.map((o) =>
      o.id === opp.id ? { ...o, viewsCount: o.viewsCount + 1 } : o
    );
    setOpportunities(updated);
    window.location.hash = `#opportunity-${opp.id}`;
  };

  // Click tracker for official source exit portal
  const handleApplyClick = (oppId: string, applyUrl: string) => {
    const updated = opportunities.map((o) =>
      o.id === oppId ? { ...o, clicksCount: o.clicksCount + 1 } : o
    );
    setOpportunities(updated);
    if (selectedOpp && selectedOpp.id === oppId) {
      setSelectedOpp({ ...selectedOpp, clicksCount: selectedOpp.clicksCount + 1 });
    }
    // Open in separate window/tab
    window.open(applyUrl, '_blank', 'referrer');
  };

  // Add Success Story Testimonial
  const handleAddStory = (newStory: Omit<SuccessStory, 'id'>) => {
    const story: SuccessStory = {
      ...newStory,
      id: `story-${Date.now()}`,
    };
    setStories([story, ...stories]);
  };

  // Add Community Post
  const handleAddPost = (newPost: Omit<CommunityPost, 'id' | 'likes' | 'comments' | 'timestamp'>) => {
    const post: CommunityPost = {
      ...newPost,
      id: `post-${Date.now()}`,
      likes: 0,
      hasLiked: false,
      comments: [],
      timestamp: 'Just now',
    };
    setPosts([post, ...posts]);
  };

  // Like Community Post
  const handleLikePost = (postId: string) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        const liked = !post.hasLiked;
        return {
          ...post,
          hasLiked: liked,
          likes: liked ? post.likes + 1 : post.likes - 1,
        };
      }
      return post;
    });
    setPosts(updated);
  };

  // Comment on Community Post
  const handleAddComment = (postId: string, commentText: string) => {
    const commentItem = {
      id: `comment-${Date.now()}`,
      author: user ? user.name : 'Anonymous Pioneer',
      avatar: user
        ? `https://images.unsplash.com/photo-${1500000000000 + user.name.charCodeAt(0) * 1000000}?auto=format&fit=crop&q=80&w=150`
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      content: commentText,
      date: new Date().toISOString(),
    };

    const updated = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, commentItem],
        };
      }
      return post;
    });
    setPosts(updated);
  };

  const handleNavigateFromTicker = (tab: 'opportunities' | 'stories' | 'community' | 'about') => {
    if (tab === 'community') {
      setActiveTab('city');
      setCitySubTab('forum');
    } else if (tab === 'stories') {
      setActiveTab('city');
      setCitySubTab('honor-roll');
    } else if (tab === 'opportunities') {
      setActiveTab('opportunities');
    } else {
      setActiveTab('about');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Opportunity Filtering Logic
  const preferredCategoriesList = user?.preferredCategories && user.preferredCategories.length > 0
    ? user.preferredCategories
    : ['Scholarship', 'Grant', 'Job', 'Fellowship', 'Funding'];

  const filteredOpportunities = opportunities
    .filter((opp) => {
      const matchSearch =
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.field.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === 'All' ? true : opp.type === selectedType;
      const matchCategory = selectedCategory === 'All' ? true : opp.category === selectedCategory;
      const matchRegion = selectedRegion === 'All' ? true : opp.region === selectedRegion;
      const matchField = selectedField === 'All' ? true : opp.field === selectedField;
      const matchBookmarks = !showBookmarksOnly ? true : (user && user.savedOpportunityIds.includes(opp.id));
      const matchForYou = !forYouOnly ? true : preferredCategoriesList.includes(opp.type);

      return matchSearch && matchType && matchCategory && matchRegion && matchField && matchBookmarks && matchForYou;
    })
    .sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else {
        return b.viewsCount - a.viewsCount;
      }
    });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-yellow-100 selection:text-slate-900">
      {/* Platform Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        onNavigateToSignIn={() => {
          setActiveTab('signin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToSignUp={() => {
          setActiveTab('signup');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenProfile={() => setProfileModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        opportunities={opportunities}
        selectedType={selectedType}
        onSelectOpportunityType={(type) => {
          setSelectedType(type);
          setActiveTab('opportunities');
          setTimeout(() => {
            const elem = document.getElementById('search-panel');
            if (elem) {
              elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 100);
        }}
      />

      {/* Hero Section */}
      {activeTab === 'home' && (
        <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden border-b border-slate-800 shrink-0 animate-in fade-in duration-300">
          {/* Abstract vector dots & elements representing professional connectivity */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 absolute"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-200">Welcome to Oppora — Discover Opportunity</span>
              </div>
              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Connecting Ambition to <span className="text-amber-500">Global Success.</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Oppora aggregates verified scholarships, funding, fellowships, and global opportunities into one trusted hub. Discover life-changing pathways to transform your education, career, business, and future.
              </p>

              <div className="pt-4 flex flex-wrap justify-center items-center gap-6">
                <button
                  onClick={() => {
                    setActiveTab('opportunities');
                    const elem = document.getElementById('search-panel');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/15 transition-all flex items-center space-x-1.5"
                >
                  <Compass className="h-4.5 w-4.5" />
                  <span>Explore Opportunities</span>
                </button>
                {!user && (
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl border border-slate-700 transition-all"
                  >
                    Join the City
                  </button>
                )}
                <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px]">🇳🇬</div>
                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-600 flex items-center justify-center text-[10px]">🇰🇪</div>
                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-500 flex items-center justify-center text-[10px]">🇿🇦</div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-900 bg-amber-500 text-[10px] font-bold text-slate-900">+12k</div>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-white font-extrabold">Trusted by 12,000+ Students & Founders</p>
                    <p className="text-[10px] text-slate-400">across 🇳🇬, 🇰🇪, 🇿🇦, 🇬🇭, 🇷🇼 and 40+ other African nations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Panel Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 md:pb-8 flex-grow">
        {activeTab === 'opportunities' && (
          viewingOppId ? (
            (() => {
              const opp = opportunities.find((o) => o.id === viewingOppId);
              return opp ? (
                <OpportunityDetailPage
                  opp={opp}
                  isSaved={user?.savedOpportunityIds.includes(opp.id) || false}
                  onSaveToggle={(id) => handleSaveToggle(id)}
                  onBack={handleBackToRegistry}
                  onApplyClick={handleApplyClick}
                />
              ) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
                  <p className="text-slate-500 font-medium">Opportunity not found or might have been removed.</p>
                  <button onClick={handleBackToRegistry} className="mt-4 text-amber-600 font-bold hover:underline">
                    Return to Registry Database
                  </button>
                </div>
              );
            })()
          ) : (
            <div className="space-y-8 animate-in fade-in duration-200">
            {/* Stats Bar */}
            <StatsBar totalOpportunities={opportunities.length} />

            {/* Real-time Ticker of City Vibrancy */}
            <VibrancyTicker onNavigateToTab={setActiveTab} />

            {/* Search and Advanced Filters Box */}
            <div id="search-panel" className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search query input */}
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by keywords (e.g., UCT, Python, Entrepreneurship)..."
                    className="w-full text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-2xl pl-10 pr-4 py-3.5 text-sm focus:outline-none transition-all"
                  />
                </div>

                {/* Clear search */}
                {(searchQuery || selectedType !== 'All' || selectedCategory !== 'All' || selectedRegion !== 'All' || selectedField !== 'All' || showBookmarksOnly) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedType('All');
                      setSelectedCategory('All');
                      setSelectedRegion('All');
                      setSelectedField('All');
                      setShowBookmarksOnly(false);
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-amber-600 underline shrink-0 whitespace-nowrap"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Advanced filters selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2 border-t border-slate-100 text-xs sm:text-sm">
                {/* Type Filter */}
                <div>
                  <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as OpportunityType | 'All')}
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white text-slate-700 font-medium text-base sm:text-xs focus:outline-none focus:border-amber-500 min-h-[44px] cursor-pointer"
                  >
                    <option value="All">All Types</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Fellowship">Fellowship</option>
                    <option value="Grant">Grant</option>
                    <option value="Internship">Internship</option>
                    <option value="Job">Job</option>
                    <option value="Funding">Funding</option>
                    <option value="Tech Role">Tech Role</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as OpportunityCategory | 'All')}
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white text-slate-700 font-medium text-base sm:text-xs focus:outline-none focus:border-amber-500 min-h-[44px] cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="STEM">STEM</option>
                    <option value="Arts">Arts</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Social Sciences">Social Sciences</option>
                  </select>
                </div>

                {/* Region Filter */}
                <div>
                  <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Region</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white text-slate-700 font-medium text-base sm:text-xs focus:outline-none focus:border-amber-500 min-h-[44px] cursor-pointer"
                  >
                    <option value="All">All Regions</option>
                    {regions.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field of Study Filter */}
                <div>
                  <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Field</label>
                  <select
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white text-slate-700 font-medium text-base sm:text-xs focus:outline-none focus:border-amber-500 min-h-[44px] cursor-pointer"
                  >
                    <option value="All">All Fields</option>
                    {fieldsOfStudy.map((fld) => (
                      <option key={fld} value={fld}>
                        {fld}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Option */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'deadline' | 'popularity')}
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white text-slate-700 font-medium text-base sm:text-xs focus:outline-none focus:border-amber-500 min-h-[44px] cursor-pointer"
                  >
                    <option value="deadline">📅 Upcoming Deadline</option>
                    <option value="popularity">🔥 Most Viewed</option>
                  </select>
                </div>
              </div>

              {/* Bookmark & Citizen Filter Row */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {/* For You Filter Button */}
                  <button
                    onClick={() => {
                      if (!user) {
                        setActiveTab('signin');
                        return;
                      }
                      setForYouOnly(!forYouOnly);
                    }}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 cursor-pointer min-h-[44px] ${
                      forYouOnly
                        ? 'bg-slate-900 text-amber-400 shadow-md shadow-slate-900/10 border border-slate-800 ring-2 ring-amber-400/30'
                        : 'bg-amber-50 border border-amber-200 text-amber-950 hover:bg-amber-100'
                    }`}
                  >
                    <Sparkles className={`h-3.5 w-3.5 shrink-0 ${forYouOnly ? 'text-amber-400' : 'text-amber-600'}`} />
                    <span>{forYouOnly ? '✨ Showing "For You" Feed' : '✨ Filter "For You" Feed'}</span>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => {
                      if (!user) {
                        setActiveTab('signin');
                        return;
                      }
                      setShowBookmarksOnly(!showBookmarksOnly);
                    }}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer min-h-[44px] ${
                      showBookmarksOnly
                        ? 'bg-amber-500 text-slate-900 shadow-md shadow-amber-500/10 border border-transparent'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Bookmark className={`h-3.5 w-3.5 shrink-0 ${showBookmarksOnly ? 'fill-slate-900' : ''}`} />
                    <span>{showBookmarksOnly ? 'Saved Bookmarks' : 'Filter Bookmarks'}</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (user) {
                      setActiveTab('select-interests');
                    } else {
                      setActiveTab('signin');
                    }
                  }}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors flex items-center justify-center sm:justify-start space-x-1.5 cursor-pointer py-1 min-h-[38px]"
                >
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Customize Categories ({preferredCategoriesList.join(', ')})</span>
                </button>
              </div>
            </div>

            {/* Personalized "For You" Active Banner */}
            {forYouOnly && (
              <div className="bg-gradient-to-r from-slate-900 to-amber-950 text-white p-5 rounded-2xl border border-amber-500/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in duration-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20 shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-amber-400 font-sans">
                      Personalized "For You" Opportunity Stream
                    </h4>
                    <p className="text-xs text-slate-300 font-medium">
                      Filtering opportunities matching your selected categories:{' '}
                      <strong className="text-white">{preferredCategoriesList.join(' • ')}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('select-interests')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
                >
                  Change Category Preferences
                </button>
              </div>
            )}

            {/* Opportunities Database Results Grid */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-sans text-xl font-extrabold text-slate-900 tracking-tight">
                  Verified Opportunities ({filteredOpportunities.length})
                </h3>
                {user && (
                  <p className="text-xs text-slate-400 font-semibold">
                    Matching citizen interests: <strong className="text-amber-600">{user.fieldOfInterest}</strong>
                  </p>
                )}
              </div>

              {filteredOpportunities.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center text-slate-400">
                  <HelpCircle className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                  <p className="font-bold text-slate-800 text-lg">No matching verified opportunities found.</p>
                  <p className="text-sm mt-1">Try relaxing your search terms or choosing "All Fields".</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOpportunities.map((opp) => (
                    <OpportunityCard
                      key={opp.id}
                      opp={opp}
                      isSaved={user?.savedOpportunityIds.includes(opp.id) || false}
                      onSaveToggle={handleSaveToggle}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Trust Pillars */}
            <WhyChooseUs />
          </div>
          )
        )}

        {activeTab === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Dynamic 3-Slide Interactive Hero Banner */}
            <Hero
              onSearch={(query) => {
                setSearchQuery(query);
                setActiveTab('opportunities');
              }}
              onSelectType={(type) => {
                setSelectedType(type);
                setActiveTab('opportunities');
              }}
              onNavigateToTab={setActiveTab}
              totalOpportunities={opportunities.length}
            />

            {/* Interactive Search Engine Section */}
            <HomeSearch
              opportunities={opportunities}
              searchQuery={searchQuery}
              selectedType={selectedType}
              selectedRegion={selectedRegion}
              selectedCategory={selectedCategory}
              onSearchChange={setSearchQuery}
              onTypeChange={setSelectedType}
              onRegionChange={setSelectedRegion}
              onCategoryChange={setSelectedCategory}
              onExecuteSearch={() => {
                setActiveTab('opportunities');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              regions={regions}
            />

            {/* Stats Bar */}
            <StatsBar totalOpportunities={opportunities.length} />

            {/* Real-time Ticker of City Vibrancy */}
            <VibrancyTicker onNavigateToTab={setActiveTab} />

            {/* Featured Section */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Hand-Selected
                  </span>
                  <h3 className="font-sans text-2xl font-extrabold text-slate-900 tracking-tight">
                    Featured Global Opportunities
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Highly sought-after, vetted scholarships and programs with approaching application windows.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('opportunities');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center space-x-1 shrink-0"
                >
                  <span>Browse All ({opportunities.length}) Opportunities</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities
                  .sort((a, b) => b.viewsCount - a.viewsCount)
                  .slice(0, 3)
                  .map((opp) => (
                    <OpportunityCard
                      key={opp.id}
                      opp={opp}
                      isSaved={user?.savedOpportunityIds.includes(opp.id) || false}
                      onSaveToggle={handleSaveToggle}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
              </div>
            </div>

            {/* City Spotlight Witness Widget */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center space-x-1.5 text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                    <Sparkles className="h-3 w-3" />
                    <span>Citizen Breakthrough Spotlight</span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    From Lagos to Oxford: How Ebenezer Kwesi Won the Rhodes Scholarship
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium italic">
                    "I was struggling with my Statement of Purpose draft until I joined the Oppora community. A Rhodes Scholar mentor peer-reviewed my essay, offering morphological feedback that totally reframed my computer science research topic. Having access to genuine, winning scholarship essay templates gave me the strategic blueprint I needed to succeed."
                  </p>
                  <div className="flex items-center space-x-3 pt-2">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
                      alt="Ebenezer Kwesi"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs leading-none">Ebenezer Kwesi</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">YALI Fellow & Rhodes Scholar (2025)</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col space-y-3">
                  <button
                    onClick={() => {
                      setActiveTab('city');
                      setCitySubTab('honor-roll');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl transition-all text-xs text-center flex items-center justify-center space-x-1.5"
                  >
                    <span>Read Success Honor Roll</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('city');
                      setCitySubTab('forum');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3.5 rounded-xl border border-slate-200 transition-all text-xs text-center"
                  >
                    Join the Citizen Discussion
                  </button>
                </div>
              </div>
            </div>

            {/* Why Citizens Trust Section */}
            <WhyChooseUs />
          </div>
        )}

        {activeTab === 'city' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Civic Hub Toggle */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-1.5 shadow-xs flex max-w-sm mx-auto">
              <button
                onClick={() => setCitySubTab('forum')}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  citySubTab === 'forum'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                💬 Citizens Forum
              </button>
              <button
                onClick={() => setCitySubTab('honor-roll')}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  citySubTab === 'honor-roll'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                🏆 Success Honor Roll
              </button>
            </div>

            {citySubTab === 'forum' ? (
              <CommunityFeed
                user={user}
                posts={posts}
                onAddPost={handleAddPost}
                onLikePost={handleLikePost}
                onAddComment={handleAddComment}
              />
            ) : (
              <SuccessStories stories={stories} onAddStory={handleAddStory} />
            )}
          </div>
        )}

        {activeTab === 'resources' && (
          <Resources user={user} onOpenAuth={() => setAuthModalOpen(true)} />
        )}

        {activeTab === 'contact' && (
          <Contact />
        )}

        {activeTab === 'about' && (
          <AboutUs onJoinCityClick={() => setAuthModalOpen(true)} user={user} />
        )}

        {(activeTab === 'auth' || activeTab === 'signin' || activeTab === 'signup') && (
          <AuthPage
            initialMode={activeTab === 'signup' ? 'signup' : 'signin'}
            onLoginSuccess={handleLogin}
            onNavigateHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'select-interests' && (
          <InterestSelectionPage
            user={user || {
              name: 'Citizen Applicant',
              email: 'applicant@city.org',
              role: 'Global Applicant',
              preferredCategories: ['Scholarship', 'Grant', 'Job', 'Fellowship', 'Funding'],
              savedOpportunityIds: [],
              notificationsEnabled: true,
              emailDigest: true,
            }}
            opportunities={opportunities}
            onSavePreferences={(updatedCategories) => {
              if (user) {
                setUser({
                  ...user,
                  preferredCategories: updatedCategories,
                });
              }
              setForYouOnly(true);
              setActiveTab('opportunities');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSkip={() => {
              setActiveTab('opportunities');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Lead Capture Newsletter signup */}
        {activeTab !== 'about' && activeTab !== 'contact' && activeTab !== 'signin' && activeTab !== 'signup' && activeTab !== 'select-interests' && <Newsletter />}
      </main>

      {/* Platform Footer */}
      <Footer setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Auth Modal overlay */}
      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={handleLogin}
        />
      )}

      {/* User profile modal overlay */}
      {profileModalOpen && user && (
        <ProfileModal
          user={user}
          opportunities={opportunities}
          onUpdateProfile={handleUpdateProfile}
          onClose={() => setProfileModalOpen(false)}
          onOpenInterestSelection={() => setActiveTab('select-interests')}
          onViewOpp={(opp) => {
            setProfileModalOpen(false);
            handleViewDetails(opp);
          }}
          onUnsaveOpp={(oppId) => handleSaveToggle(oppId)}
        />
      )}

      {/* Opportunity Details overlay */}
      {selectedOpp && (
        <OpportunityDetailModal
          opp={selectedOpp}
          isSaved={user?.savedOpportunityIds.includes(selectedOpp.id) || false}
          onSaveToggle={(id) => handleSaveToggle(id)}
          onClose={() => setSelectedOpp(null)}
          onApplyClick={handleApplyClick}
        />
      )}

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />
    </div>
  );
}
