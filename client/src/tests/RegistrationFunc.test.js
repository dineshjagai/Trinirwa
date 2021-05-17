const { Builder, By, Key, until } = require('selenium-webdriver');

require('chromedriver');

let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
});

afterAll(async () => {
  await driver.quit();
});

// tests successful registration
async function mockUserSuccessfulRegistration() {
  driver.wait(until.urlIs('http://localhost:3000'));
  await driver.get('http://localhost:3000');
  const username = await driver.wait(until.elementLocated(By.id('new-username-form')), 10000);
  await username.sendKeys('anaick', Key.RETURN);
  
  const email = await driver.wait(until.elementLocated(By.id('exampleInputEmail1')), 10000);
  await email.sendKeys('bizimana@gmail.com', Key.RETURN);

  const firstName = await driver.wait(until.elementLocated(By.id('new-first-name-form')), 10000);
  await firstName.sendKeys('Anaick', Key.RETURN);

  const lastName = await driver.wait(until.elementLocated(By.id('new-last-name-form')), 10000);
  await lastName.sendKeys('Bizimana', Key.RETURN);

  const password = await driver.wait(until.elementLocated(By.id('new-password-form')), 10000);
  await password.sendKeys('Blue@0799', Key.RETURN);

  const confirm = await driver.wait(until.elementLocated(By.id('new-password-two-form')), 10000);
  await confirm.sendKeys('Blue@0799', Key.RETURN);

  await driver.findElement(By.id('registration')).click();
  // sign up page
  await driver.get('http://localhost:3000/signup');
  await driver.findElement(By.id('complete')).click();
  await driver.switchTo().alert().accept();

  // back to login page 
  return driver.wait(until.elementLocated(By.id('login page')), 10000);
}

it('test registering in Successfully', async () => {
  const element = await mockUserSuccessfulRegistration();
  const returnedText = await element.getText();
  expect(element).not.toBeNull();
  expect(returnedText).toContain('Log In');
});

// test for unsuccessful registration with no password
async function mockUserUnSuccessfulNoPassword() {
  driver.wait(until.urlIs('http://localhost:3000'));
  await driver.get('http://localhost:3000');
  const username = await driver.wait(until.elementLocated(By.id('new-username-form')), 10000);
  await username.sendKeys('anaick', Key.RETURN);
  
  const email = await driver.wait(until.elementLocated(By.id('exampleInputEmail1')), 10000);
  await email.sendKeys('bizimana@gmail.com', Key.RETURN);

  const firstName = await driver.wait(until.elementLocated(By.id('new-first-name-form')), 10000);
  await firstName.sendKeys('Anaick', Key.RETURN);

  const lastName = await driver.wait(until.elementLocated(By.id('new-last-name-form')), 10000);
  await lastName.sendKeys('Bizimana', Key.RETURN);

  await driver.findElement(By.id('registration')).click();
  const alert = await driver.switchTo().alert().getText();

  return alert;
}

it('test invalid password alert', async () => {
  const returnedText = await mockUserUnSuccessfulNoPassword();
  expect(returnedText).toContain('Invalid password, password must have a minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
  await driver.switchTo().alert().accept();
});

async function mockUserUnSuccessfulNoConfirm() {
  driver.wait(until.urlIs('http://localhost:3000'));
  await driver.get('http://localhost:3000');
  const username = await driver.wait(until.elementLocated(By.id('new-username-form')), 10000);
  await username.sendKeys('anaick', Key.RETURN);
  
  const email = await driver.wait(until.elementLocated(By.id('exampleInputEmail1')), 10000);
  await email.sendKeys('bizimana@gmail.com', Key.RETURN);

  const firstName = await driver.wait(until.elementLocated(By.id('new-first-name-form')), 10000);
  await firstName.sendKeys('Anaick', Key.RETURN);

  const lastName = await driver.wait(until.elementLocated(By.id('new-last-name-form')), 10000);
  await lastName.sendKeys('Bizimana', Key.RETURN);

  const password = await driver.wait(until.elementLocated(By.id('new-password-form')), 10000);
  await password.sendKeys('Blue@0799', Key.RETURN);

  const confirm = await driver.wait(until.elementLocated(By.id('new-password-two-form')), 10000);
  await confirm.sendKeys('Blue@0794', Key.RETURN);

  await driver.findElement(By.id('registration')).click();
  const alert = await driver.switchTo().alert().getText();

  return alert;
}

it('test password not matching alert', async () => {
  const returnedText = await mockUserUnSuccessfulNoConfirm();
  expect(returnedText).toContain('Passwords do not match, please re-enter');
  await driver.switchTo().alert().accept();
});


async function mockUserUnSuccessfulInvalidUsername() {
  driver.wait(until.urlIs('http://localhost:3000'));
  await driver.get('http://localhost:3000');

  const username = await driver.wait(until.elementLocated(By.id('new-username-form')), 10000);
  await username.sendKeys(')', Key.RETURN);
  
  const email = await driver.wait(until.elementLocated(By.id('exampleInputEmail1')), 10000);
  await email.sendKeys('bizimana@gmail.com', Key.RETURN);

  const firstName = await driver.wait(until.elementLocated(By.id('new-first-name-form')), 10000);
  await firstName.sendKeys('Anaick', Key.RETURN);

  const lastName = await driver.wait(until.elementLocated(By.id('new-last-name-form')), 10000);
  await lastName.sendKeys('Bizimana', Key.RETURN);

  const password = await driver.wait(until.elementLocated(By.id('new-password-form')), 10000);
  await password.sendKeys('Blue@0799', Key.RETURN);

  const confirm = await driver.wait(until.elementLocated(By.id('new-password-two-form')), 10000);
  await confirm.sendKeys('Blue@0799', Key.RETURN);

  await driver.findElement(By.id('registration')).click();
  const alert = await driver.switchTo().alert().getText();

  return alert;
}

it('test invalid username alert', async () => {
  const returnedText = await mockUserUnSuccessfulInvalidUsername();
  expect(returnedText).toContain('Invalid User Name');
  await driver.switchTo().alert().accept();
});

async function mockUserUnSuccessfulInvalidEmail() {
  driver.wait(until.urlIs('http://localhost:3000'));
  await driver.get('http://localhost:3000');

  const username = await driver.wait(until.elementLocated(By.id('new-username-form')), 10000);
  await username.sendKeys('anaick', Key.RETURN);
  
  const email = await driver.wait(until.elementLocated(By.id('exampleInputEmail1')), 10000);
  await email.sendKeys('bizi', Key.RETURN);

  const firstName = await driver.wait(until.elementLocated(By.id('new-first-name-form')), 10000);
  await firstName.sendKeys('Anaick', Key.RETURN);

  const lastName = await driver.wait(until.elementLocated(By.id('new-last-name-form')), 10000);
  await lastName.sendKeys('Bizimana', Key.RETURN);

  const password = await driver.wait(until.elementLocated(By.id('new-password-form')), 10000);
  await password.sendKeys('Blue@0799', Key.RETURN);

  const confirm = await driver.wait(until.elementLocated(By.id('new-password-two-form')), 10000);
  await confirm.sendKeys('Blue@0799', Key.RETURN);

  await driver.findElement(By.id('registration')).click();
  const alert = await driver.switchTo().alert().getText();

  return alert;
}

it('test invalid email alert', async () => {
  const returnedText = await mockUserUnSuccessfulInvalidEmail();
  expect(returnedText).toContain('Invalid email, please re-enter');
  await driver.switchTo().alert().accept();
});





