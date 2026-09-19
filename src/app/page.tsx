import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import Link from "next/link";
import { Nav, Footer } from "@/components";
import { getProfile, getProjects, getExperiences, getPublications } from "@/lib/content";
import type { Experience, Publication } from "@/content/schema";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export default async function Home() {
  const [profile, projects, experiences, publications] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperiences(),
    getPublications(),
  ]) as [Awaited<ReturnType<typeof getProfile>>, Awaited<ReturnType<typeof getProjects>>, Experience[], Publication[]];

  const cleanBio = purify.sanitize(profile.bio);
  const cleanRole = purify.sanitize(profile.role);

  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <Nav />
      <main id="main-content" className="flex-1 pt-16">
        {/* Hero */}
        <section className="max-w-[var(--layout-max-width)] mx-auto px-[var(--space-4)] py-[var(--space-16)]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-[var(--space-8)]">
            <div>
              <p className="text-[var(--text-small)] text-[var(--text-secondary)] font-medium uppercase tracking-wider mb-[var(--space-3)]">
                Hey, I&apos;m
              </p>
              <h1 className="text-display text-[var(--text-primary)] mb-[var(--space-4)]">
                {profile.name}
              </h1>
              <p className="text-h2 text-[var(--text-secondary)] max-w-2xl mb-[var(--space-6)]">
                {cleanRole}
              </p>
              <p className="text-[var(--text-body)] text-[var(--text-primary)] max-w-2xl mb-[var(--space-8)]">
                {cleanBio}
              </p>
              <div className="flex flex-wrap gap-[var(--space-4)]">
                <a
                  href={profile.resumeUrl}
                  download
                  className="btn-primary bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-hover)] focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-sm)] px-[var(--space-6)] py-[var(--space-3)] font-semibold transition-colors duration-150"
                >
                  Download Resume
                </a>
                <Link
                  href="/projects"
                  className="btn-secondary bg-transparent text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)] focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-sm)] px-[var(--space-6)] py-[var(--space-3)] font-semibold transition-colors duration-150"
                >
                  View Projects
                </Link>
              </div>
            </div>
            <div className="hidden md:block w-64 h-64 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
              <svg className="w-32 h-32 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="max-w-[var(--layout-max-width)] mx-auto px-[var(--space-4)] py-[var(--space-16)] border-t border-[var(--border)]">
          <h2 className="text-h1 text-[var(--text-primary)] mb-[var(--space-8)]">About</h2>
          <div className="grid md:grid-cols-2 gap-[var(--space-12)]">
            <div>
              <h3 className="text-h2 text-[var(--text-primary)] mb-[var(--space-4)]">Experience</h3>
              <dl className="space-y-[var(--space-6)]">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[var(--accent)] pl-[var(--space-4)]">
                    <dt className="text-[var(--text-body)] font-semibold text-[var(--text-primary)]">
                      {exp.title}
                    </dt>
                    <dd className="text-[var(--text-small)] text-[var(--text-secondary)] mb-[var(--space-2)]">
                      {exp.company} · {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      {exp.endDate !== "present" && ` – ${new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                      {exp.endDate === "present" && " – Present"}
                    </dd>
                    <ul className="list-disc list-inside space-y-1 text-[var(--text-body)] text-[var(--text-secondary)]">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-h2 text-[var(--text-primary)] mb-[var(--space-4)]">Publications</h3>
              <dl className="space-y-[var(--space-6)]">
                {publications.map((pub) => (
                  <div key={pub.id}>
                    <dt className="text-[var(--text-body)] font-semibold text-[var(--text-primary)]">
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="link-external hover:text-[var(--accent)]">
                        {pub.title}
                      </a>
                    </dt>
                    <dd className="text-[var(--text-small)] text-[var(--text-secondary)] mb-1">{pub.venue}</dd>
                    <dd className="text-[var(--text-body)] text-[var(--text-primary)]">{pub.oneLiner}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="max-w-[var(--layout-max-width)] mx-auto px-[var(--space-4)] py-[var(--space-16)] border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-[var(--space-8)]">
            <h2 className="text-h1 text-[var(--text-primary)]">Featured Projects</h2>
            <Link href="/projects" className="link-external text-[var(--text-secondary)] hover:text-[var(--accent)] font-medium text-[var(--text-small)]">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-6)]">
            {featuredProjects.map((project) => (
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
                    <h3 className="text-h2 font-semibold text-[var(--text-primary)] mb-[var(--space-2)] group-hover:text-[var(--accent)] transition-colors duration-150">
                      {project.title}
                    </h3>
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