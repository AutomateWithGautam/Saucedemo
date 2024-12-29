import {test, expect} from '@playwright/test';

test.describe('Cart creation flow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.click('#login-button');
    });

    const addProductsToCart = async (page) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
    };

    test('login to page', async ({page}) => {
        await expect(page).toHaveTitle('Swag Labs');
    });

    test('add product to cart', async ({page}) => {
        await addProductsToCart(page);
        const cartBadge = await page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('2');
        await page.waitForTimeout(5000); 
    });

    test('remove product from cart', async ({page}) => {
        await addProductsToCart(page);
        
        // Remove products from the cart
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
        const cartBadge = await page.locator('.shopping_cart_badge');
        await expect(cartBadge).toBeHidden(); // Ensure the cart badge is hidden or has 0 items

        await page.waitForTimeout(5000);
    });
});
