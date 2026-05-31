import { test, expect } from '@playwright/test';

test('Register User - Without POM', async ({ page }) => {

  // 1. Launch browser & 2. Navigate to URL
  await page.goto('https://automationexercise.com');

  // 3. Verify home page is visible
  await expect(page).toHaveURL('https://automationexercise.com/');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();

  // 4. Click Signup/Login
  await page.locator('a[href="/login"]').click();

  // 5. Verify 'New User Signup!' is visible
  await expect(page.getByText('New User Signup!')).toBeVisible();

  // 6. Enter name and email
  await page.locator('input[data-qa="signup-name"]').fill('Adithya');
  await page.locator('input[data-qa="signup-email"]').fill(`adithya${Date.now()}@mail.com`);

  // 7. Click Signup button
  await page.locator('button[data-qa="signup-button"]').click();

  // 8. Verify 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.getByText('Enter Account Information')).toBeVisible();

  // 9. Fill account details
  await page.locator('#id_gender1').check();
  await page.locator('#password').fill('Test@123');
  await page.locator('#days').selectOption('10');
  await page.locator('#months').selectOption('5');
  await page.locator('#years').selectOption('1995');

  // 10. Select newsletter checkbox
  await page.locator('#newsletter').check();

  // 11. Select offers checkbox
  await page.locator('#optin').check();

  // 12. Fill address details
  await page.locator('#first_name').fill('Adithya');
  await page.locator('#last_name').fill('G');
  await page.locator('#company').fill('Test Company');
  await page.locator('#address1').fill('123 Test Street');
  await page.locator('#address2').fill('Apt 4B');
  await page.locator('#country').selectOption('India');
  await page.locator('#state').fill('Telangana');
  await page.locator('#city').fill('Hyderabad');
  await page.locator('#zipcode').fill('500001');
  await page.locator('#mobile_number').fill('9876543210');

  // 13. Click Create Account
  await page.locator('button[data-qa="create-account"]').click();

  // 14. Verify 'ACCOUNT CREATED!' is visible
  await expect(page.getByText('Account Created!')).toBeVisible();

  // 15. Click Continue
  await page.locator('a[data-qa="continue-button"]').click();

  // 16. Verify 'Logged in as username'
  await expect(page.getByText('Logged in as Adithya')).toBeVisible();

  // 17. Click Delete Account
  await page.locator('a[href="/delete_account"]').click();

  // 18. Verify 'ACCOUNT DELETED!' is visible
  await expect(page.getByText('Account Deleted!')).toBeVisible();

  // Click Continue
  await page.locator('a[data-qa="continue-button"]').click();
});
