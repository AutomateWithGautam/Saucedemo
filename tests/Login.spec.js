import {test , expect} from '@playwright/test';

test('has title', async ({page}) => {

  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/)

});

test.only('Check if login works', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator("#user-name").fill('standard_user');
  
  await page.click('#password');
  await page.keyboard.type('secret_sauce')

  const submitButton = await page.locator('#login-button');
  await expect(submitButton).toBeVisible();

  await page.click('#login-button');

  await page.waitForTimeout(5000); 
})