const { Builder, By, Key, until } = require('selenium-webdriver');

require('chromedriver');

let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
});

afterAll(async () => {
  await driver.quit();
});

async function mockUserSuccessfulLogin() {
  driver.wait(until.urlIs('http://localhost:3000/login'));
  await driver.get('http://localhost:3000/login');
  const textbox = await driver.wait(until.elementLocated(By.id('new-username-form')), 10000);
  await textbox.sendKeys('isimbi', Key.RETURN);
  const pass = await driver.wait(until.elementLocated(By.id('new-password-form')), 10000);
  await pass.sendKeys('Anaick@123', Key.RETURN);
  await driver.findElement(By.id('login')).click();
  return driver.wait(until.elementLocated(By.id('home')), 10000);
}

it('Logs in Successfully', async () => {
  const element = await mockUserSuccessfulLogin();
  const returnedText = await element.getText();
  expect(element).not.toBeNull();
  expect(returnedText).toContain('Trinirwa Microblog');
});

async function mockUserUnsuccessfulLogin() {
  driver.wait(until.urlIs('http://localhost:3000/login'));
  await driver.get('http://localhost:3000/login');
  const textbox = await driver.wait(until.elementLocated(By.id('new-username-form')), 10000);
  await textbox.sendKeys('isimbi', Key.RETURN);
  const pass = await driver.wait(until.elementLocated(By.id('new-password-form')), 10000);
  await pass.sendKeys('isimbi', Key.RETURN);
  await driver.findElement(By.id('login')).click();
  return driver.wait(until.elementLocated(By.id('new-username-form')), 10000);
}

it('Login Unsuccessful', async () => {
  const element = await mockUserUnsuccessfulLogin();
  const returnedText = await element.getText();
  expect(element).not.toBeNull();
  expect(returnedText).toContain('');
});
