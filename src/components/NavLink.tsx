"use client";

import Link from "next/link";
import { type AnchorHTMLAttributes } from "react";

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

export function NavLink({ isActive = false, className = "", href, children, ...props }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`relative inline-flex items-center font-medium transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-sm)] px-[var(--space-3)] py-[var(--space-2)]
        ${isActive
          ? "text-[var(--accent)]"
          : "text-[var(--text-secondary)] hover:text-[var(--accent)]"}
        ${className}`}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-[var(--space-3)] right-[var(--space-3)] h-0.5 bg-[var(--accent)]" aria-hidden="true" />
      )}
    </Link>
  );
}