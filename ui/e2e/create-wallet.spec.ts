import { test, expect } from '@playwright/test';
const { Chance } = require('chance');
const chance = new Chance();

const timeOutsForDemo = 500;

test.describe.configure({ mode: 'serial' });

test.describe('Creates a wallet', async () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/');
  })
  test('Has title', async ({ page }) => {
    await expect(page).toHaveTitle('Wallet Assignment - HighLevel');
  });

  test('Create a wallet', async ({ page }) => {
    const amount = chance.floating({ min: 0, max: 100, fixed: 4 });

    const description = chance.word({ length: 4 })

    await page.getByPlaceholder('Enter balance').click();

    await page.getByPlaceholder('Enter balance').fill(String(amount));

    await page.waitForTimeout(timeOutsForDemo);

    await page.getByPlaceholder('Enter name').click();

    await page.getByPlaceholder('Enter name').fill(chance.name());

    await page.waitForTimeout(timeOutsForDemo);

    await page.locator('id=createWalletButton').click();

    const balOnPage = await page.locator('id=walletBalance').innerText();

    await page.getByLabel('Description:').click();

    await page.getByLabel('Description:').fill(description);

    await page.waitForTimeout(timeOutsForDemo);

    expect(parseFloat(balOnPage)).toBe(parseFloat(amount));

    await page.waitForTimeout(timeOutsForDemo);

    await page.getByRole('link', { name: 'Transactions' }).click();

    await expect(page).toHaveURL(/.*transactions/);

    await page.waitForTimeout(timeOutsForDemo);

  });


})
