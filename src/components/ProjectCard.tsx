"use client";

import { type AnchorHTMLAttributes } from "react";
import { TechTag } from "./TechTag";
import { type Project } from "@/content/schema";

interface ProjectCardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  project: Project;
}

export function ProjectCard({ project, className = "", children, ...props }: ProjectCardProps) {
  return (
    <a
      href={`/projects/${project.slug}`}
      className={`group block rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] p-[var(--space-6)] transition-colors duration-150 ease-out hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${className}`}
      {...props}
    >
      <div className="flex flex-wrap gap-[var(--space-2)] mb-[var(--space-3)]">
        {project.techStack.map((tech) => (
          <TechTag key={tech}>{tech}</TechTag>
        ))}
      </div>
      <h3 className="text-[var(--text-h2)] font-semibold text-[var(--text-primary)] mb-[var(--space-2)] group-hover:text-[var(--accent)] transition-colors duration-150">
        {project.title}
      </h3>
      <p className="text-[var(--text-body)] text-[var(--text-secondary)] mb-[var(--space-4)] line-clamp-2">
        {project.problem}
      </p>
      <p className="text-[var(--text-small)] text-[var(--text-primary)] font-medium">
        {project.outcome}
      </p>
      {children}
    </a>
  );
}