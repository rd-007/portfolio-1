import { Metadata } from "next";
import Link from "next/link";
import { Nav, Footer } from "@/components";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Rajit Dakhane",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content" className="flex-1 pt-16 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-[var(--layout-max-width)] mx-auto px-[var(--space-4)] py-[var(--space-16)] text-center">
          <h1 className="text-display text-[var(--text-primary)] mb-[var(--space-4)]">404</h1>
          <p className="text-h2 text-[var(--text-secondary)] mb-[var(--space-8)] max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-hover)] focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-sm)] px-[var(--space-6)] py-[var(--space-3)] font-semibold transition-colors duration-150"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}