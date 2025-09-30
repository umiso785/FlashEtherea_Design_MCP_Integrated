import { test, expect } from "@playwright/test";

test("Editor page basic render", async ({ page }) => {
  await page.goto("http://localhost:5173/editor");
  await expect(page.locator("text=실행")).toBeVisible();
});