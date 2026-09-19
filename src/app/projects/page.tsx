import { Metadata } from "next";
import { Nav, Footer } from "@/components";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects | Rajit Dakhane",
  description: "Browse all projects — AI assistants, RAG systems, task prioritizers, and more.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Nav />
      <main id="main-content" className="flex-1 pt-16">
        <section className="max-w-[var(--layout-max-width)] mx-auto px-[var(--space-4)] py-[var(--space-16)]">
          <header className="mb-[var(--space-12)]">
            <h1 className="text-display text-[var(--text-primary)] mb-[var(--space-4)]">Projects</h1>
            <p className="text-h2 text-[var(--text-secondary)] max-w-2xl">
              A selection of things I&apos;ve built — from AI-powered productivity tools to backend systems.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-6)]">
            {projects.map((project) => (
              <article key={project.slug}>
                <a href={`/projects/${project.slug}`} className="block">
                  <div className="card group rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] p-[var(--space-6)] transition-colors duration-150 ease-out hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]">
                    <div className="flex flex-wrap gap-[var(--space-2)] mb-[var(--space-3)]">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="tech-tag inline-flex items-center font-medium rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] text-[var(--text-mono-tag)] font-[var(--font-mono)] px-[var(--space-3)] py-[var(--space-1)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-h2 font-semibold text-[var(--text-primary)] mb-[var(--space-2)] group-hover:text-[var(--accent)] transition-colors duration-150">
                      {project.title}
                    </h2>
                    <p className="text-[var(--text-body)] text-[var(--text-secondary)] mb-[var(--space-4)] line-clamp-2">
                      {project.problem}
                    </p>
                    <p className="text-[var(--text-small)] text-[var(--text-primary)] font-medium">
                      {project.outcome}
                    </p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}