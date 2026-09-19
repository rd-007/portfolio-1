import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { name: "Homepage", path: "/" },
  { name: "Projects List", path: "/projects" },
  { name: "Project: RAG Bot", path: "/projects/rag-bot" },
  { name: "Project: AI Assistant", path: "/projects/ai-assistant" },
  { name: "Project: Smart Task Prioritizer", path: "/projects/smart-task-prioritizer" },
  { name: "404 Page", path: "/non-existent-page" },
];

for (const page of pages) {
  test(`${page.name} - no critical/serious accessibility violations`, async ({ page: browserPage }) => {
    await browserPage.goto(page.path);
    await browserPage.waitForLoadState("networkidle");

    const accessibilityScanResults = await new AxeBuilder({ page: browserPage })
      .withTags(["wcag2aa", "wcag21aa", "best-practice"])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical"
    );
    const seriousViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "serious"
    );

    expect(criticalViolations, `Critical violations on ${page.name}: ${JSON.stringify(criticalViolations, null, 2)}`).toHaveLength(0);
    expect(seriousViolations, `Serious violations on ${page.name}: ${JSON.stringify(seriousViolations, null, 2)}`).toHaveLength(0);
  });
}