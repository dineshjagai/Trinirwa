// const { test } = require('@jest/globals');
// const tweetapi = require('./tweetapi');
// const userapi = require('./userapi');


// /**
//  * Valid Tweet */
// test('validating tweet: invalid tweet length', ()=> { 
//     expect(tweetapi.isValidTweet("")).toBe(false);
// });

// test('validating tweet: tweet length', ()=> { 
//     expect(tweetapi.isValidTweet("tthis is a test:Somebody once told me the world is gonna roll me I ain't the sharpest tool in the shed She was looking kind of dumb with her finger and her thumb In the shape of an L on her forehead Well the years start coming and they don't stop coming Fed to the rules and I")).toBe(true);
// });

// test('validating tweet: valid tweet length', ()=> { 
//     expect(tweetapi.isValidTweet("hi")).toBe(true);
// });


// test('validating posted tweet : successful tweet post', ()=> { 
//     expect(tweetapi.isPosted(tweetapi.fetchRandomTweet())).toBe(true);
// });

// test('validating posted tweet : non-successful tweet post', ()=> { 
//     expect(tweetapi.isPosted(tweetapi.fetchRandomTweet() + tweetapi.getTime())).toBe(false);
// });

// // Add read test cases

// /**
//  * User userapi
//  */

// test('validating usercreation : checks valid UserCreation', ()=> { 
//     expect(userapi.checkPostRequestForUser("dinesh97@seas.upenn.edu")).toBe(true);
// });

// test('validating userdeletion : checks invalid UserDeletion', ()=> { 
//     expect(userapi.checkPostRequestDeletionForUser("dinesh97@seas.upenn.edu")).toBe(false);
// });