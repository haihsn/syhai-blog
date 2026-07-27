import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:          z.string(),
    titleVN:        z.string().optional(),
    description:    z.string(),
    descriptionVN:  z.string().optional(),
    pubDate:        z.coerce.date(),
    category:       z.string(),
    readTime:       z.number(),
    cover:          z.string().optional(),
    tags:           z.array(z.string()).optional(),
    tagsVN:         z.array(z.string()).optional(),
    draft:          z.boolean().optional().default(false),
    bodyVN:         z.string().optional(),
  }),
});

const books = defineCollection({
  type: 'content',
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
    url:         z.string().optional(),
    description: z.string(),
    status:      z.enum(['active', 'shipped', 'paused']).optional(),
  }),
});

export const collections = { blog, books, projects };
