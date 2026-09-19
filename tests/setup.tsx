import "@testing-library/jest-dom";
import { vi } from "vitest";
import type { ReactNode } from "react";

// Mock next/navigation for tests
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Mock next/link for tests
vi.mock("next/link", () => {
  return {
    default: function Link({
      children,
      href,
    }: {
      children: ReactNode;
      href: string;
    }) {
      return <a href={href}>{children}</a>;
    },
  };
});