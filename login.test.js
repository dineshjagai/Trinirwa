const { test } = require('@jest/globals');
const log = require('./login');
const db = require('./database')



// Valid credentials
test('validating username: no username entered', ()=> { 
    expect(log.isValidUsername("")).toBe(false);
});

test('validating password: no password entered', ()=> { 
    expect(log.isValidPassWord("")).toBe(false);
});

test('validating password: wrong pass', ()=> { 
    expect(log.isValidPassWord("Rasabe")).toBe(false);
});

test('validating username: wrong username', ()=> { 
    expect(log.isValidUsername("ana")).toBe(false);
});

test('validating password: correct pass', ()=> { 
    expect(log.isValidPassWord("!Dragon@907")).toBe(true);
});


test('validating username: correct username', ()=> { 
    expect(log.isValidUsername("anaick")).toBe(true);
});

// Go to login page
test('validating user :', ()=> { 
    expect(db.validateUser("anaick", "!Dragon@907")).toBe(true);
});


