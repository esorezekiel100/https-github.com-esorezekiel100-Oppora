export type OpportunityType = 'Scholarship' | 'Fellowship' | 'Grant' | 'Internship' | 'Job' | 'Funding' | 'Tech Role';
export type OpportunityCategory = 'STEM' | 'Arts' | 'Humanities' | 'Social Sciences';

export interface Opportunity {
  id: string;
  title: string;
  provider: string;
  type: OpportunityType;
  category: OpportunityCategory;
  field: string;
  region: string;
  deadline: string; // ISO date format e.g. "2026-09-15"
  description: string;
  eligibility: string[];
  benefits: string[];
  applyUrl: string;
  verified: boolean;
  viewsCount: number;
  clicksCount: number;
  postedDate: string;
  imageUrl?: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  story: string;
  opportunityName: string;
  year: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  likes: number;
  hasLiked?: boolean;
  comments: Comment[];
  timestamp: string;
  tags: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  fieldOfInterest?: string;
  preferredCategories: OpportunityType[];
  skills?: string[];
  savedOpportunityIds: string[];
  notificationsEnabled: boolean;
  emailDigest: boolean;
}
