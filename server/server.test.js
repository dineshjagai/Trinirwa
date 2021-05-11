const request = require('supertest');
const webapp = require('./server');

// describe('Test  /home endpoint', () => {
//   test('/home endpoint response number of rows & status code', () => request(webapp).get('/home').expect(200).then((response) => {
//     expect(JSON.parse(response.text).data.length).toBe(4);
//   }));

//   test('Test /createTweet/ endpoint response content', () => {
//     const expectedResponse = [{
//       uid: 2, tweet_id: 1, type: 'N/A', content: 'Hello here!', tweet_date: '2008-7-04', tweet_likes: 0,
//     }];
//     return request(webapp).get('/createTweet/').expect(404).then((response) => {
//       console.log(`${response.text} This is the response text`);
//       expect(JSON.parse(response.text).data).toEqual(expect.arrayContaining(expectedResponse));
//     });
//   });
// });

describe('Test endpoints', () => {
  const testUser = {
    username: 'isimbib',
    password: '$2a$10$hQkNkoXrybrLjNPa.uS3nuXooPS8PW9NMv8Wm0WZZrT2/xUhaP082',
    first_name: 'Anaick',
    last_name: 'Bizimana',
    email: 'anaick@gmail.com',
    profile_picture: '1620664693587--default_pic.jpg',
    follower_count: 0,
    is_loggedIn: null,
    tweets_count: 0,
    location: 'Kigali',
    is_live: 0,
    date: '2021-05-10',
    isDeactivated: 0,
    number_failed_logins: 0,
  };

  test('/register endpoint test', () => request(webapp).get('/register')
    .send({
      username: 'isimbib',
      password: '1234',
    })
    .expect(200)
    .then((response) => {
      expect(JSON.parse(response.text).user).toStrictEqual(testUser);
    }));
});
