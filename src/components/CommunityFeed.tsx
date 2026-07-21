import React, { useState } from 'react';
import { MessageSquare, Heart, Send, Sparkles, Filter, Bookmark, HelpCircle, Users, CheckCircle, Search } from 'lucide-react';
import { CommunityPost, UserProfile, Comment } from '../types';

interface CommunityFeedProps {
  user: UserProfile | null;
  posts: CommunityPost[];
  onAddPost: (post: Omit<CommunityPost, 'id' | 'likes' | 'comments' | 'timestamp'>) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export default function CommunityFeed({
  user,
  posts,
  onAddPost,
  onLikePost,
  onAddComment
}: CommunityFeedProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [postSearchQuery, setPostSearchQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [commentStates, setCommentStates] = useState<{ [postId: string]: string }>({});
  const [successPost, setSuccessPost] = useState(false);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  );

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const tagsArray = newPostTags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onAddPost({
      authorName: user ? user.name : 'Guest Pioneer',
      authorRole: user ? user.role : 'Aspiring Leader',
      authorAvatar: user
        ? `https://images.unsplash.com/photo-${1500000000000 + user.name.charCodeAt(0) * 1000000}?auto=format&fit=crop&q=80&w=150`
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      content: newPostContent,
      tags: tagsArray.length > 0 ? tagsArray : ['Community Share'],
    });

    setNewPostContent('');
    setNewPostTags('');
    setSuccessPost(true);
    setTimeout(() => setSuccessPost(false), 3000);
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentStates[postId];
    if (!text || !text.trim()) return;

    onAddComment(postId, text);
    setCommentStates((prev) => ({ ...prev, [postId]: '' }));
  };

  const filteredPosts = posts
    .filter((post) => {
      const matchTag = selectedTag ? post.tags.includes(selectedTag) : true;
      const matchSearch = postSearchQuery.trim() === '' ? true : (
        post.content.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
        post.authorName.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(postSearchQuery.toLowerCase()))
      );
      return matchTag && matchSearch;
    });

  return (
    <section className="py-8 my-4">
      {/* Community Alert Ribbon */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl px-6 py-4 border border-blue-800 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className="p-2 bg-blue-800/80 rounded-xl text-yellow-400 shrink-0">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base">New Community Activity Detected</h4>
            <p className="text-xs text-blue-200 mt-0.5">50+ New Fellowships & Tips shared by vetted members today!</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">1,240 Members Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filter & Post Trigger */}
        <div className="lg:col-span-4 space-y-6">
          {/* Write Post Panel */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-800 mb-4 font-sans flex items-center space-x-2">
              <Users className="h-5 w-5 text-city-blue" />
              <span>Share an Opportunity</span>
            </h3>

            {successPost && (
              <div className="mb-4 bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-xl text-xs flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Posted to community successfully!</span>
              </div>
            )}

            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div>
                <textarea
                  required
                  rows={4}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder={user ? `What lead or advice do you have today, ${user.name}?` : "Share a lead, application tip, or question..."}
                  className="w-full text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:bg-white focus:border-city-blue focus:ring-1 focus:ring-city-blue rounded-xl p-3 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                  placeholder="e.g. CV Tips, ALX Africa, Ghana"
                  className="w-full text-slate-800 bg-slate-50 border border-slate-200 focus:bg-white focus:border-city-blue rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-city-blue hover:bg-blue-800 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Broadcast Lead</span>
              </button>
            </form>
          </div>

          {/* Tag Filter Sidebar */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center space-x-1.5">
              <Filter className="h-4 w-4 text-slate-400" />
              <span>Browse by Topic</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedTag === null
                    ? 'bg-city-blue text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Show All ({posts.length})
              </button>
              {allTags.map((tag) => {
                const count = posts.filter((p) => p.tags.includes(tag)).length;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedTag === tag
                        ? 'bg-city-blue text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    #{tag} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Citizens List Widget */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200/60 p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center space-x-1.5">
              <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
              <span>Active Citizens</span>
            </h4>
            
            <div className="space-y-3">
              {[
                { name: 'Dr. Chinedu Okafor', role: 'Rhodes Scholar Mentor', points: '142 Shares', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
                { name: 'Fatoumata Diallo', role: 'Mastercard Alum', points: '98 Tips', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' },
                { name: 'Ebenezer Kwesi', role: 'YALI Fellow', points: '76 Leads', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' }
              ].map((cit, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-200/40 pb-2.5 last:border-none last:pb-0">
                  <div className="flex items-center space-x-2.5">
                    <img src={cit.avatar} alt={cit.name} className="w-8 h-8 rounded-full object-cover border border-white" referrerPolicy="no-referrer" />
                    <div>
                      <h5 className="font-bold text-slate-800 leading-tight">{cit.name}</h5>
                      <p className="text-[10px] text-slate-400 font-medium">{cit.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-city-blue bg-blue-50 px-2 py-0.5 rounded-full shrink-0">
                    {cit.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines Widget */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              ⚖️ City Guidelines
            </h4>
            <ul className="text-[11px] text-slate-500 space-y-2 list-disc pl-4 font-medium leading-relaxed">
              <li>Only share active, verified educational or professional leads.</li>
              <li>Respect every applicant. Offer supportive, constructive essay reviews.</li>
              <li>Tag accurately by region or scholarship provider.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Feed Stream */}
        <div className="lg:col-span-8 space-y-6">
          {/* Feed Search Bar */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center justify-between gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search community posts (e.g., CV, fellowship, ALX)..."
                className="w-full text-xs text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:outline-none focus:border-city-blue focus:bg-white rounded-xl px-4 py-2.5 pl-10 transition-all"
                value={postSearchQuery}
                onChange={(e) => setPostSearchQuery(e.target.value)}
              />
              <span className="absolute left-3.5 top-3.5 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
            </div>
            {postSearchQuery && (
              <button
                onClick={() => setPostSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold underline shrink-0"
              >
                Reset
              </button>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-400 shadow-sm">
              <HelpCircle className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <p className="font-semibold text-slate-600">No community updates for this topic yet.</p>
              <p className="text-xs mt-1">Be the first to broadcast a lead under #{selectedTag}!</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:border-slate-200 transition-all duration-150"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="h-10 w-10 rounded-full object-cover border border-slate-100 referrerPolicy='no-referrer'"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150';
                      }}
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm leading-tight">{post.authorName}</h4>
                      <p className="text-xs text-slate-400 font-medium">{post.authorRole}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{post.timestamp}</span>
                </div>

                {/* Content */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="text-[11px] font-semibold text-city-blue bg-blue-50/80 px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Interaction Actions */}
                <div className="flex items-center space-x-6 mt-5 pt-4 border-t border-slate-50 text-xs text-slate-500 font-semibold">
                  <button
                    onClick={() => onLikePost(post.id)}
                    className={`flex items-center space-x-1.5 transition-all ${
                      post.hasLiked ? 'text-rose-600' : 'hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`h-4.5 w-4.5 ${post.hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{post.likes} Likes</span>
                  </button>

                  <span className="flex items-center space-x-1.5 text-slate-500">
                    <MessageSquare className="h-4.5 w-4.5" />
                    <span>{post.comments.length} Comments</span>
                  </span>
                </div>

                {/* Comments Section */}
                <div className="mt-5 pt-4 border-t border-slate-50 space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="h-7 w-7 rounded-full object-cover shrink-0 mt-0.5 referrerPolicy='no-referrer'"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150';
                        }}
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-slate-800">{comment.author}</span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(comment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-600 mt-1 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  ))}

                  {/* Add Comment Input */}
                  <form
                    onSubmit={(e) => handleCommentSubmit(post.id, e)}
                    className="flex space-x-2 mt-2"
                  >
                    <input
                      type="text"
                      required
                      value={commentStates[post.id] || ''}
                      onChange={(e) =>
                        setCommentStates((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      placeholder="Write a supportive reply..."
                      className="flex-grow bg-slate-50/80 border border-slate-200 focus:bg-white focus:border-city-blue focus:ring-1 focus:ring-city-blue rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-800"
                    />
                    <button
                      type="submit"
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-xl transition-all"
                      title="Send comment"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
