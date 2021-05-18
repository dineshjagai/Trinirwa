import React from 'react';
import { isValidEmail, isValidUsername }from '../components/authentication';
import isValidPassword from '../components/authentication';

test('test valid password', () => {
    expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test valid email', () => {
    expect(isValidEmail('a@gmail.com')).toBe(true);
});

test('test valid username', () => {
    expect(isValidUsername('isimbib')).toBe(true);
});