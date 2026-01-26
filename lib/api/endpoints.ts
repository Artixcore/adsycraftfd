// API Endpoint definitions

export const endpoints = {
  // Auth
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  // Workspaces
  workspaces: {
    list: '/workspaces',
    switch: '/workspaces/switch',
  },
  // Meta OAuth
  meta: {
    loginUrl: '/meta/login',
    callback: '/meta/callback',
    pages: '/meta/pages',
    connectPage: (pageId: string) => `/meta/pages/${pageId}/connect`,
    disconnectPage: (pageId: string) => `/meta/pages/${pageId}`,
    updateAutomationMode: (pageId: string) => `/meta/pages/${pageId}/automation-mode`,
    pageInsights: (pageId: string) => `/meta/pages/${pageId}/insights`,
  },
  // Content
  posts: {
    list: '/posts',
    create: '/posts',
    generate: '/posts/generate',
    schedule: (postId: string) => `/posts/${postId}/schedule`,
    publish: (postId: string) => `/posts/${postId}/publish`,
    history: '/posts/history',
  },
  // Inbox
  inbox: {
    conversations: '/inbox/conversations',
    conversationMessages: (conversationId: string) => `/inbox/conversations/${conversationId}/messages`,
    reply: '/inbox/reply',
    markAsRead: (conversationId: string) => `/inbox/conversations/${conversationId}/read`,
  },
  // Ads
  ads: {
    accounts: '/ads/accounts',
    campaigns: '/ads/campaigns',
    adsets: '/ads/adsets',
    ads: '/ads/ads',
    reports: '/ads/reports',
  },
  // Settings
  settings: {
    auditLogs: '/audit-logs',
  },
  // Activity
  activity: {
    list: '/activity',
  },
  // Research
  research: {
    research: (pageId: string) => `/research/${pageId}`,
    getResults: (pageId: string) => `/research/${pageId}`,
  },
  // Brand Voice
  brandVoice: {
    list: '/brand-voice',
    get: (pageId: string) => `/brand-voice/page/${pageId}`,
    create: '/brand-voice',
    update: (id: string) => `/brand-voice/${id}`,
    delete: (id: string) => `/brand-voice/${id}`,
  },
} as const;
