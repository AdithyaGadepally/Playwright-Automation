import { test, expect } from '@playwright/test';

test('Register then Login User - Correct Credentials', async ({ page }) => {
  const name = 'TestUser';
  const password = 'Test@1234';
  const email = `testuser${Date.now()}@mail.com`;

  // Navigate to site
  await page.goto('/');
  await expect(page).toHaveURL('https://automationexercise.com/');

  // Register a new user
  await page.locator('a[href="/login"]').click();
  await expect(page.getByText('New User Signup!')).toBeVisible();
  await page.locator('input[data-qa="signup-name"]').fill(name);
  await page.locator('input[data-qa="signup-email"]').fill(email);
  await page.locator('button[data-qa="signup-button"]').click();

  // Fill account information
  await expect(page.getByText('Enter Account Information')).toBeVisible();
  await page.locator('#id_gender1').check();
  await page.locator('#password').fill(password);
  await page.locator('#days').selectOption('10');
  await page.locator('#months').selectOption('5');
  await page.locator('#years').selectOption('1995');
  await page.locator('#newsletter').check();
  await page.locator('#optin').check();
  await page.locator('#first_name').fill(name);
  await page.locator('#last_name').fill('User');
  await page.locator('#company').fill('TestCo');
  await page.locator('#address1').fill('123 Test St');
  await page.locator('#address2').fill('Suite 1');
  await page.locator('#country').selectOption('India');
  await page.locator('#state').fill('State');
  await page.locator('#city').fill('City');
  await page.locator('#zipcode').fill('500001');
  await page.locator('#mobile_number').fill('9000000000');
  await page.locator('button[data-qa="create-account"]').click();

  // Verify account created and continue
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();

  // Logout so we can test login
  await page.locator('a[href="/logout"]').click();

  // Now perform login with the created credentials
  await page.locator('a[href="/login"]').click();
  await expect(page.getByText('Login to your account')).toBeVisible();
  await page.locator('input[data-qa="login-email"]').fill(email);
  await page.locator('input[data-qa="login-password"]').fill(password);
  await page.locator('button[data-qa="login-button"]').click();

  // Verify login succeeded
  await expect(page.getByText(new RegExp(`Logged in as ${name}`))).toBeVisible();

  // Clean up: delete account
  await page.locator('a[href="/delete_account"]').click();
  await expect(page.getByText(/Account Deleted!|ACCOUNT DELETED!/i)).toBeVisible();
});