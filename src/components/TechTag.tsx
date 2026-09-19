import { type HTMLAttributes } from "react";

interface TechTagProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function TechTag({ children, className = "", ...props }: TechTagProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] text-[var(--text-mono-tag)] font-[var(--font-mono)] px-[var(--space-3)] py-[var(--space-1)] ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}