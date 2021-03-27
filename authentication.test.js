
const authen = require('./authentication.js');

/**
 * Sign up
 */
test('validating password: checks lengths', () => {
  expect(authentication.isValidPassWord('!ajajd')).toBe(false);
});

test('validating password: strong password', () => {
  expect(authentication.isValidPassWord('!QuiBeneCantat89')).toBe(true);
});

test('validating username : wrong username', () => {
  expect(authentication.isValidUsername('!ajajd')).toBe(false);
});

test('validating username : correct username', () => {
  expect(authentication.isValidUsername('Kamali23')).toBe(true);
});

test('validating password: checks lengths', () => {
  expect(authentication.isValidEmail('igiti@gmil.cod')).toBe(false);
});

test('checks if the username already exists', () => {
  expect(authentication.isUniqueUserName('Arluad')).toBe(true);
});

test('checks if the username already exists', () => {
  expect(authentication.isUniqueEmail('kagina@gmail.com')).toBe(true);
});

/**
 * Login authentication
 */

test('validating user : checks valid username', () => {
  expect(authentication.userExists('igiti@gmail.com', '!Urhah')).toBe(false);
});
