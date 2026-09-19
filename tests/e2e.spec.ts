import { test, expect } from "@playwright/test";

test.describe("Core User Flows (US-1 through US-7)", () => {
  test("US-1: Homepage loads and hero is visible above fold", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Hero section visible
    await expect(page.locator("h1")).toContainText("Rajit Dakhane");
    await expect(page.locator("text=Software Engineer")).toBeVisible();

    // CTAs present
    await expect(page.locator('a:has-text("Download Resume")')).toBeVisible();
    await expect(page.locator('a:has-text("View Projects")')).toBeVisible();

    // LCP element check - hero should render quickly
    const hero = page.locator("h1").first();
    await expect(hero).toBeVisible();
  });

  test("US-2: Projects section displays 3 project cards with required fields", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll to projects section
    await page.locator("text=Featured Projects").scrollIntoViewIfNeeded();

    // Check 3 project cards exist
    const projectCards = page.locator("article a.block").filter({ hasText: /RAG|AI Assistant|Smart Task/ });
    await expect(projectCards).toHaveCount(3);

    // Each card should have title, tags, outcome
    for (const card of await projectCards.all()) {
      await expect(card.locator("h3")).toBeVisible();
      await expect(card.locator(".tech-tag")).toHaveCount(1, { minimum: 1 });
      await expect(card.locator("text=/outcome|achieved|reduced|deployed|enabled/i")).toBeVisible();
    }
  });

  test("US-3: Project detail view shows GitHub link opening in new tab", async ({ page }) => {
    await page.goto("/projects/rag-bot");
    await page.waitForLoadState("networkidle");

    // GitHub link exists
    const githubLink = page.locator('a[href*="github.com"]');
    await expect(githubLink).toBeVisible();

    // Check target="_blank" and rel="noopener noreferrer"
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    // Click opens in new tab (we verify the attribute, actual navigation tested separately)
  });

  test("US-4: Resume download CTA works", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Resume link in nav
    const navResumeLink = page.locator('nav a[href="/resume/resume.pdf"]');
    await expect(navResumeLink).toBeVisible();
    await expect(navResumeLink).toHaveAttribute("download");

    // Resume link in hero
    const heroResumeLink = page.locator('a:has-text("Download Resume")');
    await expect(heroResumeLink).toBeVisible();
    await expect(heroResumeLink).toHaveAttribute("download");
  });

  test("US-5: About section shows current role, education, timeline", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.locator("text=About").scrollIntoViewIfNeeded();

    // Experience entries
    await expect(page.locator("text=Spring Boot Development Intern")).toBeVisible();
    await expect(page.locator("text=Innox IT Solutions")).toBeVisible();
    await expect(page.locator("text=Bachelor of Engineering")).toBeVisible();
    await expect(page.locator("text=Sinhgad Institute")).toBeVisible();

    // Highlights visible
    await expect(page.locator("text=RESTful APIs")).toBeVisible();
    await expect(page.locator("text=Spring Data JPA")).toBeVisible();
  });

  test("US-6: Project tech tags visible and scannable", async ({ page }) => {
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");

    // All project cards have tech tags
    const techTags = page.locator(".tech-tag");
    await expect(techTags.first()).toBeVisible();

    // Tags use monospace font (visual check via class)
    const firstTag = techTags.first();
    await expect(firstTag).toHaveClass(/font-\[var\(--font-mono\)\]/);
  });

  test("US-7: Contact links (email, LinkedIn, GitHub) work correctly", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Footer contact links
    const emailLink = page.locator('footer a[href^="mailto:"]');
    const linkedinLink = page.locator('footer a[href*="linkedin.com"]');
    const githubLink = page.locator('footer a[href*="github.com"]');

    await expect(emailLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();
    await expect(githubLink).toBeVisible();

    // Check hrefs
    await expect(emailLink).toHaveAttribute("href", /^mailto:rajitdakhane007@zohomail\.in$/);
    await expect(linkedinLink).toHaveAttribute("href", /linkedin\.com\/in\/rajit0311/);
    await expect(githubLink).toHaveAttribute("href", /github\.com\/rd-007/);

    // External link attributes
    await expect(linkedinLink).toHaveAttribute("target", "_blank");
    await expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("US-8: Site loads without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Filter out expected non-critical errors (like favicon, etc.)
    const criticalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("chrome-extension")
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test("US-9: Publication linked with context on About section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.locator("text=Publications").scrollIntoViewIfNeeded();

    await expect(page.locator("text=Algorithmic Diplomacy")).toBeVisible();
    await expect(page.locator("text=IDEAL Journal")).toBeVisible();
    await expect(page.locator("text=reshaping global diplomacy")).toBeVisible();

    // Link to Drive PDF
    const pubLink = page.locator('a[href*="drive.google.com"]');
    await expect(pubLink).toBeVisible();
    await expect(pubLink).toHaveAttribute("target", "_blank");
  });

  test("US-10: Keyboard navigation - focus order is logical", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Skip link should be first focusable
    await page.keyboard.press("Tab");
    await expect(page.locator(".skip-link")).toBeFocused();

    // Tab through nav
    await page.keyboard.press("Tab"); // Logo
    await page.keyboard.press("Tab"); // Home
    await page.keyboard.press("Tab"); // Projects
    await page.keyboard.press("Tab"); // Resume CTA

    // All should have visible focus rings
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();
  });
});