import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 主线与支线共用一个内容集合，通过 type 在页面层分流。
// 主线使用 date 排序；支线可以没有日期，只出现在 /trivia/ 列表中。
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
    // 草稿不出现在主页、支线列表和详情页，适合放示例或未完成的稿子。
    draft: z.boolean().default(false),
  }),
});

// 首页公告：pinned 为置顶公告，其余按日期倒序只显示最近几条。
const announcements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/announcements' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    pinned: z.boolean().default(false),
  }),
});

export const collections = { events, announcements };
