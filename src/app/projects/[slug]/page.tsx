import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav, Footer } from "@/components";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Rajit Dakhane`,
    description: project.problem,
    openGraph: {
      title: project.title,
      description: project.problem,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <Nav />
      <main id="main-content" className="flex-1 pt-16">
        <article className="max-w-[var(--layout-max-width)] mx-auto px-[var(--space-4)] py-[var(--space-16)]">
          <header className="mb-[var(--space-12)]">
            <div className="flex flex-wrap gap-[var(--space-2)] mb-[var(--space-4)]">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-tag inline-flex items-center font-medium rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] text-[var(--text-mono-tag)] font-[var(--font-mono)] px-[var(--space-3)] py-[var(--space-1)]">
                  {tech}
                </span>
              ))}
            </div>
            <h1 className="text-display text-[var(--text-primary)] mb-[var(--space-4)]">{project.title}</h1>
            <p className="text-h2 text-[var(--text-secondary)] max-w-2xl">{project.problem}</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-[var(--space-12)]">
            <div className="lg:col-span-2 space-y-[var(--space-10)]">
              <section>
                <h2 className="text-h2 text-[var(--text-primary)] mb-[var(--space-4)]">Problem</h2>
                <p className="text-[var(--text-body)] text-[var(--text-primary)] leading-relaxed">{project.problem}</p>
              </section>

              <section>
                <h2 className="text-h2 text-[var(--text-primary)] mb-[var(--space-4)]">My Role</h2>
                <p className="text-[var(--text-body)] text-[var(--text-primary)] leading-relaxed">{project.role}</p>
              </section>

              <section>
                <h2 className="text-h2 text-[var(--text-primary)] mb-[var(--space-4)]">Outcome</h2>
                <p className="text-[var(--text-body)] text-[var(--text-primary)] font-medium leading-relaxed">{project.outcome}</p>
              </section>

              <section>
                <h2 className="text-h2 text-[var(--text-primary)] mb-[var(--space-4)]">Tech Stack</h2>
                <div className="flex flex-wrap gap-[var(--space-2)]">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag inline-flex items-center font-medium rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] text-[var(--text-mono-tag)] font-[var(--font-mono)] px-[var(--space-3)] py-[var(--space-1)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1">
              <div className="card rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] p-[var(--space-6)] sticky top-24">
                <h3 className="text-h2 text-[var(--text-primary)] mb-[var(--space-4)]">Links</h3>
                <div className="space-y-[var(--space-3)]">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-external inline-flex items-center gap-2 text-[var(--text-body)] font-medium hover:text-[var(--accent)] transition-colors duration-150 focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-sm)] px-[var(--space-3)] py-[var(--space-2)]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}