/* eslint-disable no-undef */
const { test } = require('@jest/globals');
const log = require('./authentication');

// Valid credentials
test('validating username: no username entered', () => {
  expect(log.isValidUsername('')).toBe(false);
});

test('validating password: no password entered', () => {
  expect(log.isValidPassword('')).toBe(false);
});

test('validating password: wrong password', () => {
  expect(log.isValidPassword('Rasabe')).toBe(false);
});

test('validating username: wrong username', () => {
  expect(log.isValidUsername('ana@')).toBe(false);
});

test('validating username: wrong username', () => {
  expect(log.isValidUsername('ana')).toBe(true);
});

test('validating password: correct pass', () => {
  expect(log.isValidPassword('!Dragon@907')).toBe(true);
});

test('validating username: correct username', () => {
  expect(log.isValidUsername('anaick')).toBe(true);
});

test('validating password: correct passwords', () => {
  expect(log.isSamePassword('StrongPasswordJk@1999', 'StrongPasswordJk@1999')).toBe(true);
});

test('validating password: Incorrect passwords', () => {
  expect(log.isSamePassword('StrongJk@1999', 'StrongPasswordJk@1999')).toBe(true);
});
