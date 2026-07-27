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
  // The markdown body of each book file is its "key takeaways", shown in a
  // modal when the book is clicked on /bookshelf.
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
