
const authen = require('./authentication.js');

/**
 * Sign up
 */
test('validating password: checks lengths', () => {
  expect(authen.isValidPassword('!ajajd')).toBe(false);
});

test('validating password: strong password', () => {
  expect(authen.isValidPassword('!QuiBeneCantat89')).toBe(true);
});

test('validating username : wrong username', () => {
  expect(authen.isValidUsername('!ajajd')).toBe(false);
});

test('validating username : correct username', () => {
  expect(authen.isValidUsername('Kamali23')).toBe(true);
});

test('validating password: checks lengths', () => {
  expect(authen.isValidEmail('igiti@gmil.cod')).toBe(true);
});
