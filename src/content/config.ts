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
  }),
});

export const collections = { blog };
