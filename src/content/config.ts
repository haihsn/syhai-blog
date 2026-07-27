import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:          z.string(),
    description:    z.string(),
    pubDate:        z.coerce.date(),
    category:       z.string(),
    readTime:       z.number(),
    cover:          z.string().optional(),
    tags:           z.array(z.string()).optional(),
    draft:          z.boolean().optional().default(false),
  }),
});

const books = defineCollection({
  type: 'content',
  // Books, research, reports — anything read. The markdown body of each file
  // is its "key takeaways", shown in a modal when clicked on /read.
  schema: z.object({
    title:    z.string(),
    author:   z.string(),
    cover:    z.string().optional(),
    category: z.string(),
    status:   z.enum(['reading', 'up-next', 'read']),
    progress: z.number().min(0).max(100).optional(),
    favorite: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    // 'apps' = software, 'doors' = physical/traditional businesses.
    kind:        z.enum(['apps', 'doors']),
    url:         z.string().optional(),
    description: z.string().optional(),
    // Small square logo/favicon, e.g. "/images/brewing/my-app.png"
    logo:        z.string().optional(),
    status:      z.enum(['active', 'shipped', 'paused']).optional(),
  }),
});

export const collections = { blog, books, projects };
