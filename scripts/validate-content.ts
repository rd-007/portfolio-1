#!/usr/bin/env tsx
/**
 * Content validation script for Personal Portfolio V1.0
 * Validates all content JSON files against Zod schemas from content/schema.ts
 * Exits with code 0 on success, non-zero on any validation failure.
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { z } from "zod";
import {
  allProjectsSchema,
  allExperiencesSchema,
  allPublicationsSchema,
  profileSchema,
  type Project,
  type Experience,
} from "@/content/schema";

const CONTENT_DIR = resolve(__dirname, "../src/content");

function validate<T>(schema: z.ZodType<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`\n❌ Validation failed for ${label}:`);
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    }
    process.exit(1);
  }
  console.log(`✅ ${label} valid`);
  return result.data;
}

function validateUniqueSlugs(projects: Project[]): void {
  const slugs = projects.map((p) => p.slug);
  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicates.length > 0) {
    console.error(`\n❌ Duplicate project slugs found: ${duplicates.join(", ")}`);
    process.exit(1);
  }
  console.log("✅ All project slugs are unique");
}

function validateHttpsUrls(projects: Project[]): void {
  for (const project of projects) {
    if (!project.githubUrl.startsWith("https://")) {
      console.error(`\n❌ Project "${project.slug}": githubUrl must start with https://`);
      process.exit(1);
    }
    if (project.demoUrl && !project.demoUrl.startsWith("https://")) {
      console.error(`\n❌ Project "${project.slug}": demoUrl must start with https://`);
      process.exit(1);
    }
  }
  console.log("✅ All project URLs use https://");
}

function validateTechStackLength(projects: Project[]): void {
  for (const project of projects) {
    if (project.techStack.length < 1 || project.techStack.length > 8) {
      console.error(
        `\n❌ Project "${project.slug}": techStack must have 1-8 items (has ${project.techStack.length})`
      );
      process.exit(1);
    }
  }
  console.log("✅ All techStack arrays have 1-8 items");
}

function main(): void {
  console.log("🔍 Validating portfolio content...\n");

  // Read and parse JSON files
  const profileRaw = JSON.parse(readFileSync(resolve(CONTENT_DIR, "profile.json"), "utf-8"));
  const experiencesRaw = JSON.parse(readFileSync(resolve(CONTENT_DIR, "experience.json"), "utf-8"));
  const publicationsRaw = JSON.parse(readFileSync(resolve(CONTENT_DIR, "publications.json"), "utf-8"));
  const projectsRaw = JSON.parse(readFileSync(resolve(CONTENT_DIR, "projects.json"), "utf-8"));

  // Validate against schemas
  validate(profileSchema, profileRaw, "Profile");
  const experiences: Experience[] = validate(allExperiencesSchema, experiencesRaw, "Experience[]");
  validate(allPublicationsSchema, publicationsRaw, "Publication[]");
  const projects = validate(allProjectsSchema, projectsRaw, "Project[] (3-5 entries)");

  // Additional cross-field validations
  validateUniqueSlugs(projects);
  validateHttpsUrls(projects);
  validateTechStackLength(projects);

  // Validate experience endDate format
  for (const exp of experiences) {
    if (exp.endDate !== "present" && !/^\d{4}-\d{2}-\d{2}$/.test(exp.endDate)) {
      console.error(`\n❌ Experience "${exp.id}": endDate must be ISO date or "present"`);
      process.exit(1);
    }
  }
  console.log("✅ All experience endDates valid");

  console.log("\n🎉 All content validation passed!");
}

main();