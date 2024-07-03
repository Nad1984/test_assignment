const { test, expect } = require("@playwright/test");
import { dragAndDropFile } from "./utils/dragAndDropFile";

test("@e2e", async ({ page }) => {
  // open the page
  await page.goto("https://js-55fbfg.stackblitz.io");

  await page.getByText("Run this project").click();
  await page.locator(".btn.btn-primary").click();

  // upload certificate
  await dragAndDropFile(
    page,
    ".dropbox.ng-isolate-scope",
    "certificate_test_data/Нестеренко_Володимир_Борисович_(Тест)-8101916.cer",
    "cert1"
  );

  // check info box fields names and values:
  await expect(page.locator("th").nth(0)).toHaveText("Common Name:");
  await expect(page.locator("td.ng-binding").nth(0)).toHaveText(
    "Нестеренко Володимир Борисович (Тест)"
  );

  await expect(page.locator("th").nth(1)).toHaveText("Issuer CN:");
  await expect(page.locator("td.ng-binding").nth(1)).toHaveText(
    "КНЕДП - ІДД ДПС"
  );

  await expect(page.locator("th").nth(2)).toHaveText("Valid From:");
  await expect(page.locator("td.ng-binding").nth(2)).toHaveText(
    "2019-11-20 22:00:00 UTC"
  );

  await expect(page.locator("th").nth(3)).toHaveText("Valid To:");
  await expect(page.locator("td.ng-binding").nth(3)).toHaveText(
    "2021-11-20 22:00:00 UTC"
  );

  // table data check:
  await expect(page.locator("a.list-group-item.active")).toHaveText(
    " Володимир Борисович (Тест) "
  );
  await page.pause();
});

test("@e2e will pass but not valid", async ({ page }) => {
  // open the page
  await page.goto("https://js-55fbfg.stackblitz.io");

  await page.getByText("Run this project").click();
  await page.locator(".btn.btn-primary").click();

  // upload certificate
  await dragAndDropFile(
    page,
    ".dropbox.ng-isolate-scope",
    "certificate_test_data/Нестеренко_Володимир_Борисович_(Тест)-8101916.cer",
    "cert1"
  );

  // check data in info pannel and in the list

  await expect(page.locator("th").nth(0)).toHaveText("SubjectCN:");
  await expect(page.locator("th").nth(1)).toHaveText("IssuerCN:");
  await expect(page.locator("th").nth(2)).toHaveText("ValidFrom:");
  await expect(page.locator("th").nth(3)).toHaveText("ValidTill:");
  await expect(page.locator("td.ng-binding").nth(0)).toHaveText(
    "Володимир Борисович (Тест)"
  );
  await expect(page.locator("td.ng-binding").nth(1)).toHaveText(
    "UA-43174711-2019"
  );
  await expect(page.locator("td.ng-binding").nth(2)).toHaveText(
    "2019-11-20 22:00:00 UTC"
  );
  await expect(page.locator("td.ng-binding").nth(3)).toHaveText(
    "2021-11-20 22:00:00 UTC"
  );
  await expect(page.locator("a.list-group-item.active")).toHaveText(
    " Володимир Борисович (Тест) "
  );
  await page.pause();
});
