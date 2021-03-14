const { test } = require('@jest/globals');
const authen = require('./authentication');

/**
 * Sign up 
 */
test('validating password: checks lengths', ()=> { 
    expect(authentication.isValidPassWord("!ajajd")).toBe(false);
});

test('validating password: strong password', ()=> { 
    expect(authentication.isValidPassWord("!QuiBeneCantat89")).toBe(true);
});

test('validating username : wrong username', ()=> { 
    expect(authentication.isValidUsername("!ajajd")).toBe(false);
});

test('validating username : correct username', ()=> { 
    expect(authentication.isValidUsername("Kamali23")).toBe(true);
});

test('validating password: checks lengths', ()=> { 
    expect(authentication.isValidEmail("igiti@gmil.cod")).toBe(false);
});

/**
 * Login authentication
 */

test('validating user : checks valide username', ()=> { 
    expect(authentication.userExists("igiti@gmail.com", "!Urhah")).toBe(false);
});

