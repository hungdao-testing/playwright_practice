import { test, expect } from '@playwright/test';


test.describe("Table @table", () => {


    test("Angular table - verify header @angular-table", async ({ page }) => {
        const url = "https://material.angular.io/components/table/overview#table-basic"

        const tableMapping = {
            "col1": "No.",
            "col2": "Name",
            "col3": "Weight",
            "col4": "Symbol"
        }

        await page.goto(url);
        await page.locator("#table-basic").waitFor();
        const tabelLocator = page.locator("table-basic-example");
        await tabelLocator.waitFor();

        const headers = tabelLocator.getByRole('columnheader');
        const counts = await headers.count()

        const headerTexts = await headers.allInnerTexts();
        expect(counts).toBe(4);
        for (let i = 0; i < counts; i++) {
            expect(headerTexts[i]).toBe(tableMapping[`col${i + 1}`])
        }

    })

    test("Angular table - filter data @vue-table", async ({ page }) => {
        await page.goto("https://material.angular.io/components/table/examples");
        await page.locator("#table-http").waitFor();
        const httpTableSection = page.locator("#table-http");
        await httpTableSection.scrollIntoViewIfNeeded()
        const row = httpTableSection.getByRole("row").filter({ hasText: "Jul 25, 2023" }).filter({ hasText: "closed" });
        const text = await row.getByRole("cell").nth(2).innerText();
        expect(text).toBe("27509")
    })
})