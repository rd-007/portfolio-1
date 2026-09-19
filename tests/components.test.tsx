import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/Button";
import { TechTag } from "@/components/TechTag";
import { NavLink } from "@/components/NavLink";

describe("Button Component", () => {
  it("renders primary button correctly", () => {
    render(<Button variant="primary">Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn-primary");
  });

  it("renders secondary button correctly", () => {
    render(<Button variant="secondary">View Project</Button>);
    const button = screen.getByRole("button", { name: "View Project" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn-secondary");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Clickable" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("supports disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });
});

describe("TechTag Component", () => {
  it("renders tech tag with monospace font", () => {
    render(<TechTag>React</TechTag>);
    const tag = screen.getByText("React");
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass("font-[var(--font-mono)]");
  });
});

describe("NavLink Component", () => {
  it("renders nav link with active indicator when isActive is true", () => {
    render(<NavLink href="/projects" isActive>Projects</NavLink>);
    const link = screen.getByRole("link", { name: "Projects" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("renders normal nav link when isActive is false", () => {
    render(<NavLink href="/projects" isActive={false}>Projects</NavLink>);
    const link = screen.getByRole("link", { name: "Projects" });
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute("aria-current");
  });
});