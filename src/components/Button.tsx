"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "btn-primary bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-hover)] focus-visible:outline-[var(--focus-ring)]",
      secondary:
        "btn-secondary bg-transparent text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)] focus-visible:outline-[var(--focus-ring)]",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} rounded-[var(--radius-sm)] px-[var(--space-6)] py-[var(--space-3)] ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";