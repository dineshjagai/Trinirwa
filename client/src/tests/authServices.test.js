import React from 'react';
import { 
    getCurrentUsername, 
    isLogged, 
    logout, 
    getCurrentReceiver }from '../auth/authServices';

test('test current username', () => {
    expect(getCurrentUsername()).toBe(null);
});

test('test is logged', () => {
    expect(isLogged()).toBe(false);
});

test('test logout', () => {
    logout();
});

test('test get receiver', () => {
    console.log(getCurrentReceiver());
});


