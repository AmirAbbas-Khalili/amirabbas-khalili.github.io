import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    journal: z.string().optional(),
    authors: z.array(z.union([z.string(), z.object({name: z.string(), url: z.string().url().optional()})])).default([]),
    abstract: z.string().optional(),
    role: z.string().optional(),
    contribution: z.string().optional(),
    detailPage: z.boolean().default(true),
    keywords: z.array(z.string()).default([]),
    conference: z.string().optional(),
    affiliation: z.string().optional(),
    year: z.number().int().optional(),
    presentationFormat: z.string().optional(),
    presentationStatus: z.string().optional(),
    paperId: z.string().optional(),
    venue: z.string().optional(),
    location: z.string().optional(),
    images: z.array(z.object({src: z.string(), alt: z.string(), caption: z.string().optional()})).default([]),
    summary: z.string().optional(),
    order: z.number().default(99),
    status: z.enum(['published', 'coming-soon']).default('coming-soon'),
    date: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    pdf: z.string().optional(),
    externalUrl: z.string().url().optional(),
    externalLabel: z.string().optional(),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    category: z.string().default('Course'),
    summary: z.string(),
    order: z.number().default(99),
    status: z.enum(['published', 'complete', 'in-progress', 'coming-soon']).default('coming-soon'),
    publicationDate: z.coerce.date().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    files: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    cover: z.string().optional(),
  }),
});

const participations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/participations' }),
  schema: z.object({
    title: z.string(),
    kind: z.string().default('Participation'),
    summary: z.string(),
    showGallery: z.boolean().default(true),
    subItems: z.array(z.object({title: z.string(), description: z.string()})).default([]),
    order: z.number().default(99),
    status: z.enum(['published', 'coming-soon']).default('coming-soon'),
    year: z.string().optional(),
    location: z.string().optional(),
    images: z.array(z.string()).default([]),
    files: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    externalUrl: z.string().url().optional(),
  }),
});

export const collections = { articles, courses, participations };
