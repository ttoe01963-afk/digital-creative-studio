import { defineConfig } from "@playwright/test";
const production = process.env.TEST_PRODUCTION === "1";
const port = production ? 4173 : 5173;
const baseURL = `http://127.0.0.1:${port}`;
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL,
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
          args: ["--no-sandbox"],
        }
      : undefined,
  },
  webServer: {
    command: production
      ? "npm run preview -- --port 4173"
      : "npm run dev -- --port 5173",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
