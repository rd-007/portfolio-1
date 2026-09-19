"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "./NavLink";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-sm border-b border-[var(--border)]" aria-label="Main navigation">
      <div className="max-w-[var(--layout-max-width)] mx-auto px-[var(--space-4)]">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-150" aria-label="Rajit Dakhane — Home">
            Rajit Dakhane
          </Link>
          <div className="flex items-center gap-[var(--space-6)]">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href="/resume/resume.pdf"
              download
              className="btn-primary bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-hover)] focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-sm)] px-[var(--space-4)] py-[var(--space-2)] text-[var(--text-body)] font-semibold transition-colors duration-150"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}