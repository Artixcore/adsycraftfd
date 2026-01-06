// API Response Types

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  workspaceId: string;
  workspace?: Workspace;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
  subscriptionStatus: 'active' | 'cancelled' | 'expired';
  subscriptionExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MetaAccount {
  id: string;
  workspaceId: string;
  userId: string;
  metaUserId: string;
  metaUserName?: string;
  metaUserEmail?: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'EXPIRED';
  connectedAt: string;
  lastSyncedAt?: string;
}

export interface FacebookPage {
  id: string;
  workspaceId: string;
  metaAccountId: string;
  pageId: string;
  name: string;
  category?: string;
  picture?: string;
  accessToken: string;
  automationMode: 'MANUAL' | 'SUGGEST_ONLY' | 'AUTO';
  connectedAt: string;
  lastSyncedAt?: string;
}

export interface InstagramAccount {
  id: string;
  workspaceId: string;
  pageId: string;
  igAccountId: string;
  username: string;
  profilePicture?: string;
  connectedAt: string;
}

export interface PostDraft {
  id: string;
  workspaceId: string;
  pageId?: string;
  postType: 'TEXT' | 'IMAGE' | 'VIDEO' | 'CAROUSEL';
  content: string;
  mediaUrls?: string[];
  hashtags?: string[];
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED';
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostSchedule {
  id: string;
  draftId: string;
  pageId: string;
  scheduledAt: string;
  timezone: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
}

export interface Conversation {
  id: string;
  workspaceId: string;
  pageId?: string;
  igAccountId?: string;
  participantId: string;
  participantName: string;
  participantPicture?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: 'USER' | 'PAGE' | 'INSTAGRAM';
  content: string;
  messageType: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO';
  mediaUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Campaign {
  id: string;
  workspaceId: string;
  adAccountId: string;
  campaignId: string;
  name: string;
  objective: 'TRAFFIC' | 'LEADS' | 'MESSAGES' | 'ENGAGEMENT';
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  budgetCap?: number;
  dailyBudget?: number;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignReport {
  campaignId: string;
  date: string;
  impressions: number;
  reach: number;
  clicks: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversions?: number;
}

export interface AuditLog {
  id: string;
  workspaceId: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  workspaceId: string;
  type: 'POST_PUBLISHED' | 'POST_SCHEDULED' | 'REPLY_SENT' | 'CAMPAIGN_CREATED' | 'PAGE_CONNECTED';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  details?: Record<string, any>;
  createdAt: string;
  completedAt?: string;
}
