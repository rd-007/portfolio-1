import { z } from "zod";

/**
 * Content schema for Personal Portfolio V1.0
 * Matches TRD Section 6 data model exactly.
 * All validation runs at build time — build fails on any violation.
 */

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  problem: z.string().min(1).max(280),
  techStack: z.array(z.string()).min(1).max(8),
  role: z.string().min(1),
  outcome: z.string().min(1),
  githubUrl: z.string().url().startsWith("https://"),
  demoUrl: z.string().url().startsWith("https://").optional(),
  order: z.number().int().nonnegative(),
});

export const experienceSchema = z.object({
  id: z.string().min(1),
  company: z.string().min(1),
  title: z.string().min(1),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.literal("present")]),
  highlights: z.array(z.string()).min(1),
});

export const publicationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  venue: z.string().min(1),
  url: z.string().url().startsWith("https://"),
  oneLiner: z.string().min(1).max(200),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1).max(500),
  resumeUrl: z.string().min(1),
  githubHandle: z.string().min(1),
  linkedinHandle: z.string().min(1),
  email: z.string().email(),
});

export const allProjectsSchema = z.array(projectSchema).min(3).max(5);
export const allExperiencesSchema = z.array(experienceSchema).min(1);
export const allPublicationsSchema = z.array(publicationSchema).min(1);

// Inferred types
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type Profile = z.infer<typeof profileSchema>;