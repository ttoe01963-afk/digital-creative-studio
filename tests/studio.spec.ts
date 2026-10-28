import { test, expect } from "@playwright/test";
test("all concepts open, deep links refresh, modal traps focus and closes", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/STUDIO NAME/);
  await expect(page.locator(".project-card")).toHaveCount(10);
  for (let i = 0; i < 10; i++) {
    await page.locator(".project-card").nth(i).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator("#project-title")).not.toBeEmpty();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
  await page.goto("/#project-06");
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "Made to move you." }),
  ).toBeVisible();
  await expect(page.locator(".storyboard-grid>div")).toHaveCount(3);
  await page.reload();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Next project" }).click();
  await expect(page.locator("#project-title")).toHaveText(
    "The everyday, elevated.",
  );
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        document.querySelector("dialog")?.contains(document.activeElement),
      ),
    ).toBeTruthy();
  }
  await page.getByRole("button", { name: "Close project" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("category filters, lighting styles, comparison and services work", async ({
  page,
}) => {
  await page.goto("/");
  const filters = page.getByRole("group", { name: "Filter portfolio" });
  for (const [name, count] of [
    ["Image editing", 1],
    ["Product visuals", 2],
    ["Catalogs", 1],
    ["Advertising", 1],
    ["Motion concepts", 2],
    ["Social & campaigns", 3],
    ["All work", 10],
  ] as const) {
    await filters.getByRole("button", { name, exact: false }).click();
    await expect(page.locator(".project-card")).toHaveCount(count);
    await expect(
      filters.getByRole("button", { name, exact: false }),
    ).toHaveAttribute("aria-pressed", "true");
  }
  await page.getByRole("button", { name: /Graphite/ }).click();
  await expect(page.locator(".showcase-art")).toHaveClass(/graphite/);
  await expect(page.locator(".art-caption")).toContainText(
    "Less light. More drama.",
  );
  const range = page.getByRole("slider");
  await range.focus();
  await page.keyboard.press("ArrowRight");
  await expect(range).toHaveValue("51");
  await page.keyboard.press("Home");
  await expect(range).toHaveValue("0");
  await page.keyboard.press("End");
  await expect(range).toHaveValue("100");
  await page.getByRole("button", { name: "03 Product advertising" }).click();
  await expect(page.locator("#service-2")).toBeVisible();
  await page
    .locator("#service-2")
    .getByRole("button", { name: "Explore work" })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(1);
});
test("inquiry validates and downloads a brief without claiming delivery", async ({
  page,
}) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Save my project brief" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(
    page.getByText("Please enter a valid email address."),
  ).toBeVisible();
  await page.getByLabel("Your name").fill("Alex Test");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page
    .getByLabel("Interested service")
    .selectOption("Product image editing");
  await page
    .getByLabel("A little about your project")
    .fill("A product image editing project for a new collection.");
  await page.getByLabel("Reference links").fill("javascript:alert(1)");
  await page.getByRole("button", { name: "Save my project brief" }).click();
  await expect(
    page.getByText("Use complete http or https links", { exact: false }),
  ).toBeVisible();
  await page
    .getByLabel("Reference links")
    .fill("https://example.com/reference");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Save my project brief" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("studio-project-brief.txt");
  await expect(page.locator(".form-status")).toContainText(
    "It has not been sent",
  );
});
for (const width of [320, 375, 430, 768, 1280, 1440, 1920]) {
  test(`responsive layout ${width}px has no overflow or asset errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toBeVisible();
    for (const id of ["work", "services", "about", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
    }
    // Scroll each image into view so lazy loading is exercised, then wait for decoding.
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      await expect
        .poll(() =>
          image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    }
    expect(
      await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs
            .filter((i) => !i.complete || i.naturalWidth === 0)
            .map((i) => i.src),
        ),
    ).toEqual([]);
    expect(errors).toEqual([]);
    if (width < 701) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(page.getByRole("navigation")).toBeVisible();
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "About" })
        .click();
      await expect(
        page.getByRole("button", { name: "Open menu" }),
      ).toHaveAttribute("aria-expanded", "false");
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Open menu" }),
      ).toHaveAttribute("aria-expanded", "false");
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: width === 1440 || width === 375,
    });
  });
}
test("reduced motion keeps content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(page.locator(".section-heading").first()).toHaveCSS(
    "opacity",
    "1",
  );
});
test("comparison supports mouse and touch positioning", async ({
  page,
  browser,
}) => {
  await page.goto("/");
  const slider = page.getByRole("slider");
  await slider.scrollIntoViewIfNeeded();
  const box = (await slider.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.5);
  await page.mouse.up();
  expect(Number(await slider.inputValue())).toBeGreaterThan(65);
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
  });
  const phone = await context.newPage();
  await phone.goto("/");
  const touch = phone.getByRole("slider");
  await touch.scrollIntoViewIfNeeded();
  const t = (await touch.boundingBox())!;
  await phone.touchscreen.tap(t.x + t.width * 0.25, t.y + t.height * 0.5);
  expect(Number(await touch.inputValue())).toBeLessThan(35);
  await context.close();
});
