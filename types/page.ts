import { FacebookPage, InstagramAccount } from './api';

export interface PageWithAccounts {
  page: FacebookPage;
  instagramAccounts: InstagramAccount[];
}

export interface PageInsights {
  pageId: string;
  metrics: {
    page_impressions?: number;
    page_reach?: number;
    page_engaged_users?: number;
    page_fans?: number;
  };
  period: 'day' | 'week' | 'month';
  date: string;
}
