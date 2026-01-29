// Production: use https://api.adsycraft.com/api/v1 when app is on Netlify and API URL not set
const isProductionNetlify =
  typeof process.env.NEXT_PUBLIC_APP_URL === 'string' &&
  process.env.NEXT_PUBLIC_APP_URL.includes('frontendadsy.netlify.app');
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (isProductionNetlify ? 'https://api.adsycraft.com/api/v1' : 'http://localhost:3000/api/v1');
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

export const POST_TYPES = ['TEXT', 'IMAGE', 'VIDEO', 'CAROUSEL'] as const;
export const AUTOMATION_MODES = ['MANUAL', 'SUGGEST_ONLY', 'AUTO'] as const;
export const CAMPAIGN_OBJECTIVES = ['TRAFFIC', 'LEADS', 'MESSAGES', 'ENGAGEMENT'] as const;
export const USER_ROLES = ['OWNER', 'ADMIN', 'MEMBER', 'VIEWER'] as const;

export const TONE_OPTIONS = [
  { value: 'friendly', label: 'Friendly' },
  { value: 'professional', label: 'Professional' },
  { value: 'playful', label: 'Playful' },
  { value: 'casual', label: 'Casual' },
] as const;

export const QUICK_ACTIONS = [
  { value: 'refund_policy', label: 'Refund Policy' },
  { value: 'pricing', label: 'Pricing Information' },
  { value: 'appointment', label: 'Book Appointment' },
  { value: 'order_status', label: 'Order Status' },
] as const;
