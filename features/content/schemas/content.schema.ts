import { z } from 'zod';

export const createDraftSchema = z.object({
  pageId: z.string().min(1, 'Page is required'),
  postType: z.enum(['TEXT', 'IMAGE', 'VIDEO', 'CAROUSEL']),
  content: z.string().min(1, 'Content is required'),
  mediaUrls: z.array(z.string().url()).optional(),
  hashtags: z.array(z.string()).optional(),
});

export const schedulePostSchema = z.object({
  pageId: z.string().min(1, 'Page is required'),
  scheduledAt: z.string().datetime(),
  timezone: z.string().default('UTC'),
});

export type CreateDraftFormData = z.infer<typeof createDraftSchema>;
export type SchedulePostFormData = z.infer<typeof schedulePostSchema>;
