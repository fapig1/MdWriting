import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    type: z.enum(['main', 'trivia']),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    location: z.string().optional(),
    accent: z.enum(['coral', 'blue', 'gold', 'green']).default('blue'),
    cover: z.string().optional(),
  }),
});

export const collections = { events };
