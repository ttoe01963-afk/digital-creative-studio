import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("page and project dialog meet automated WCAG AA checks", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const target of [
    "#home",
    "#showcase-start",
    "#work",
    "#services",
    "#contact",
  ]) {
    await page.locator(target).scrollIntoViewIfNeeded();
    await page.waitForTimeout(750);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  }
  await page.goto("/#project-06");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".dialog-inner")).toHaveCSS("opacity", "1");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
});
