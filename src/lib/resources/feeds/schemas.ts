import { z } from 'zod';

export const FeedDetailsSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  icon: z.string()
});

export const FeedSourcesSchema = z.record(z.array(FeedDetailsSchema));