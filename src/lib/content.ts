import { readFileSync } from "fs";
import { resolve } from "path";
import { type Project, type Experience, type Publication, type Profile } from "@/content/schema";

const CONTENT_DIR = resolve(process.cwd(), "src/content");

function readJson<T>(filename: string): T {
  const filePath = resolve(CONTENT_DIR, filename);
  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

export async function getProfile(): Promise<Profile> {
  return readJson("profile.json");
}

export async function getExperiences(): Promise<Experience[]> {
  return readJson("experience.json");
}

export async function getPublications(): Promise<Publication[]> {
  return readJson("publications.json");
}

export async function getProjects(): Promise<Project[]> {
  const projects = readJson<Project[]>("projects.json");
  return projects.sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((p) => p.slug);
}