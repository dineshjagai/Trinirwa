const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'database-1.cmkrry719kkl.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'XQJYs10aUBLqQm5R2Skq',
    database: 'TRINIWA',
  },
  useNullAsDefault: true,
});
const request = require('supertest');
const webapp = require('./server');

// cleanup the database after each test
const cleanDatabase = async () => {
  await knex('BLOCKED_USERS_1').where('user_one', 'isimbib').del();
  await knex('TWEETS_1').where('user', 'isimbib').del();
  await knex('INTERESTS_1').where('user', 'isimbib').del();
  await knex('FOLLOWERS_1').where('user_one', 'isimbib').del();
  await knex('USERS').where('username', 'isimbib').del();
  await knex('USERS').where('username', 'berwa').del();
};

afterEach(async () => {
  await cleanDatabase();
});


// come back later
describe('User registration', () => {
  test('successful registration', () => request(webapp).post('/register').send({
    username: 'isimbib',
    password: '1234',
    first_name: 'Anaick',
    last_name: 'Bizimana',
    email: 'anaick@gmail.com',
  }).expect(200)
    .then((response) => {
      expect(JSON.parse(response.text).message).toBe('success');
    }));

  test('Error during registration', () => request(webapp).post('/register').send()
    .expect(500));
});

describe('/userUid testing', () => {
  test('success /userUid', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });
    const response = await request(webapp).post('/userUid').send({
      username: 'isimbib',
    });
    expect(JSON.parse(response.text).message).toBe('success');
  });

  test('Error /userUid', () => request(webapp).post('/userUid').send({ username: 'b' })
    .expect(200));
});

describe('/login testing', () => {
  test('Wrong username/password', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });
    const response = await request(webapp).post('/login').send({
      username: 'isimbib', password: '1235',
    });
    expect(JSON.parse(response.text).message).toBe('Wrong username/password combination!');
  });

  test('User does not exist', async () => {
    const response = await request(webapp).post('/login').send({
      username: 'b',
      password: 'c',
    });
    expect(JSON.parse(response.text).message).toBe("User doesn't exist");
  });
});

describe('/profile/:username test', () => {
  test('Error getting profile info', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });
    request(webapp).get('/profile/isimbib').send().expect(404);
  });

  test('successful profile info', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('USERS').insert({
      username: 'berwa',
      password: '1234',
      first_name: 'Berwa',
      last_name: 'Bizimana',
      email: 'ber@gmail.com',
    });

    await knex('INTERESTS_1').insert({
      user: 'isimbib',
      interest: 'me',
    });

    await knex('FOLLOWERS_1').insert({
      user_one: 'isimbib',
      user_two: 'berwa',
    });
    const response = await request(webapp).get('/profile/isimbib').send();
    expect(JSON.parse(response.text).message).toBe('200');
  });
});

describe('/profile/tweet/:username test', () => {
  test('Error getting tweets', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });
    request(webapp).get('/profile/tweet/isimbib').send().expect(404);
  });

  test('successful retrieving of tweets', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('TWEETS_1').insert({
      user: 'isimbib',
      tweet_id: '1',
      type: 'text',
      content: 'Hello',
    });
    const response = await request(webapp).get('/profile/tweet/isimbib').send();
    expect(JSON.parse(response.text).message).toBe('200');
  });
});

describe('/profile/tweets/:username test', () => {
  test('Error getting tweets', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });
    request(webapp).get('/profile/tweets/isimbib').send().expect(405);
  });

  test('successful retrieving of tweets', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('TWEETS_1').insert({
      user: 'isimbib',
      tweet_id: '1',
      type: 'text',
      content: 'Hello',
    });
    const response = await request(webapp).get('/profile/tweets/isimbib').send();
    expect(JSON.parse(response.text).message).toBe('200');
  });
});

describe('/profile/interest/:username testing', () => {
  test('Sucessful creating interest', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    const response = await request(webapp).post('/profile/interest/isimbib').send({
      interest: 'me',
    });
    expect(JSON.parse(response.text).message).toBe('Interest successfully added');
  });

  test('Error creating interest', () => request(webapp).post('/profile/interest/isimbib').send().expect(405));
});

describe('/profile/delete/interest/:username testing', () => {
  test('Sucessful deleting interest', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('INTERESTS_1').insert({
      user: 'isimbib',
      interest: 'me',
    });

    const response = await request(webapp).delete('/profile/delete/interest/isimbib').send({
      interest: 'me',
    });
    expect(JSON.parse(response.text).message).toBe('Interest successfully deleted');
  });

  // test('Error delete interest', () => request(webapp).delete('/profile/delete/interest/b').send().expect(405));
});

describe('/profile/followers/:username test', () => {
  test('Error getting followers', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });
    request(webapp).get('/profile/followers/isimbib').send().expect(405);
  });

  test('successful retrieving of followers', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('USERS').insert({
      username: 'berwa',
      password: '1234',
      first_name: 'Berwa',
      last_name: 'Bizimana',
      email: 'ber@gmail.com',
    });

    await knex('FOLLOWERS_1').insert({
      user_one: 'isimbib',
      user_two: 'berwa',
    });
    const response = await request(webapp).get('/profile/followers/isimbib').send();
    expect(JSON.parse(response.text).message).toBe('200');
  });
});

describe('/profile/friends/:username test', () => {
  test('Error getting friends', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });
    request(webapp).get('/profile/friends/isimbib').send().expect(405);
  });

  test('successful retrieving of friends', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('USERS').insert({
      username: 'berwa',
      password: '1234',
      first_name: 'Berwa',
      last_name: 'Bizimana',
      email: 'ber@gmail.com',
    });

    await knex('FOLLOWERS_1').insert({
      user_one: 'isimbib',
      user_two: 'berwa',
    });

    await knex('FOLLOWERS_1').insert({
      user_one: 'berwa',
      user_two: 'isimbib',
    });
    const response = await request(webapp).get('/profile/friends/isimbib').send();
    expect(JSON.parse(response.text).message).toBe('200');
  });
});

describe('/profile/avatar/:username test', () => {
  test('Error getting avatar', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });
    request(webapp).get('/profile/avatar/isimbib').send().expect(405);
  });

  test('successful retrieving avatar', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
      profile_picture: 'woman.png',
    });

    const response = await request(webapp).get('/profile/avatar/isimbib').send();
    expect(JSON.parse(response.text).message).toBe('Profile retrieved successfully!');
  });
});

describe('/block/:username test', () => {
  test('Error blocking user', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    request(webapp).post('/block/isimbib').send().expect(405);
  });

  test('successful blocking user', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('USERS').insert({
      username: 'berwa',
      password: '1234',
      first_name: 'Berwa',
      last_name: 'Bizimana',
      email: 'ber@gmail.com',
    });

    const response = await request(webapp).post('/block/isimbib').send({
      follower: 'berwa',
    });
    expect(JSON.parse(response.text).message).toBe('user successfully blocked');
  });
});

describe('/follow/:username test', () => {
  test('Error following user', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    request(webapp).post('/follow/isimbib').send().expect(405);
  });

  test('successful following user', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('USERS').insert({
      username: 'berwa',
      password: '1234',
      first_name: 'Berwa',
      last_name: 'Bizimana',
      email: 'ber@gmail.com',
    });

    const response = await request(webapp).post('/follow/isimbib').send({
      follower: 'berwa',
    });
    expect(JSON.parse(response.text).message).toBe('user successfully followed');
  });
});

describe('/unfollow/:username test', () => {
  test('Error unfollowing user', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    request(webapp).put('/unfollow/isimbib').send().expect(405);
  });

  test('successful unfollowing user', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('USERS').insert({
      username: 'berwa',
      password: '1234',
      first_name: 'Berwa',
      last_name: 'Bizimana',
      email: 'ber@gmail.com',
    });

    await knex('FOLLOWERS_1').insert({
      user_one: 'isimbib',
      user_two: 'berwa',
    });

    const response = await request(webapp).put('/unfollow/isimbib').send({
      follower: 'berwa',
    });
    expect(JSON.parse(response.text).message).toBe('user successfully unfollowed');
  });
});

describe('/unblock/:username test', () => {
  test('Error unblock user', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    request(webapp).put('/unblock/isimbib').send().expect(405);
  });

  test('successful unblocking user', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('USERS').insert({
      username: 'berwa',
      password: '1234',
      first_name: 'Berwa',
      last_name: 'Bizimana',
      email: 'ber@gmail.com',
    });

    await knex('BLOCKED_USERS_1').insert({
      user_one: 'isimbib',
      user_two: 'berwa',
    });

    const response = await request(webapp).put('/unblock/isimbib').send({
      follower: 'berwa',
    });
    expect(JSON.parse(response.text).message).toBe('user successfully unblocked');
  });
});

describe('/blocked/:username test', () => {
  test('Error getting blocked users', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    request(webapp).get('/blocked/isimbib').send().expect(405);
  });

  test('successful getting blocked users', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('USERS').insert({
      username: 'berwa',
      password: '1234',
      first_name: 'Berwa',
      last_name: 'Bizimana',
      email: 'ber@gmail.com',
    });

    await knex('BLOCKED_USERS_1').insert({
      user_one: 'isimbib',
      user_two: 'berwa',
    });

    const response = await request(webapp).get('/blocked/isimbib').send();
    expect(JSON.parse(response.text).message).toBe('200');
  });
});

describe('/createTweet/:username test', () => {
  test('Error creating tweet', () => request(webapp).post('/createTweet/isimbib')
    .send()
    .expect(405));

  test('successful creation of tweet', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    const response = await request(webapp).post('/createTweet/isimbib').send({
      tweetId: '1',
      type: 'text',
      content: 'Hello',
      tweet_date: '2021-08-07',
    });
    expect(JSON.parse(response.text).message).toBe('Tweet successfully added');
  });
});

describe('/resetPassword test', () => {
  test('Error resetting password', () => request(webapp).put('/resetPassword')
    .expect(200));

  test('successful creation of tweet', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    const response = await request(webapp).put('/resetPassword').send({
      username: 'isimbib',
      password: '1235',
    });
    expect(JSON.parse(response.text).message).toBe('success');
  });
});

describe('/resetPassword test', () => {
  test('Error resetting password', () => request(webapp).put('/resetPassword')
    .expect(200));

  test('successful restting of password', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    const response = await request(webapp).put('/resetPassword').send({
      username: 'isimbib',
      password: '1235',
    });
    expect(JSON.parse(response.text).message).toBe('success');
  });
});

describe('/uploadProfilePicture test', () => {
  test('Error uploading Picture', () => request(webapp).post('/uploadProfilePicture')
    .expect(200));

  test('successful uploading Profile Picture', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    const response = await request(webapp).post('/uploadProfilePicture').send({
      username: 'isimbib',
      profile_picture: 'hello.png',
    });
    expect(JSON.parse(response.text).message).toBe('success');
  });
});

describe('/updateNumberFailedLogins test', () => {
  test('Error updating failed logins', () => request(webapp).post('/updateNumberFailedLogins')
    .expect(200));

  test('successful updating failed logins', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    const response = await request(webapp).post('/updateNumberFailedLogins').send({
      username: 'isimbib',
      number_failed_logins: 2,
    });
    expect(JSON.parse(response.text).message).toBe('success');
  });
});

describe('/numberFailedLogins/:username test', () => {
  test('Error getting number of failed logins', () => request(webapp).get('/numberFailedLogins/isimbib')
    .expect(200));

  test('successful getting failed logins', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
      number_failed_logins: 1,
    });

    const response = await request(webapp).get('/numberFailedLogins/isimbib').send();
    expect(JSON.parse(response.text).message).toBe('200');
  });
});

describe('/dateUserLastLockedOut/:username test', () => {
  test('Error getting date user last locked out', () => request(webapp).get('/dateUserLastLockedOut/isimbib')
    .expect(200));

  test('successful getting date lockout', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
      number_failed_logins: 1,
    });

    const response = await request(webapp).get('/dateUserLastLockedOut/isimbib').send();
    expect(JSON.parse(response.text).message).toBe('200');
  });
});

describe('/setLockOutTime test', () => {
  test('Error setting lock out time', () => request(webapp).post('/setLockOutTime')
    .expect(200));

  test('successful setting lock out time', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
      number_failed_logins: 1,
    });

    const response = await request(webapp).post('/setLockOutTime').send();
    expect(JSON.parse(response.text).message).toBe('success');
  });
});

describe('/setLockOutTime test', () => {
  test('Error setting lock out time', () => request(webapp).post('/setLockOutTime')
    .expect(200));

  test('successful setting lock out time', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
      number_failed_logins: 1,
    });

    const response = await request(webapp).post('/setLockOutTime').send();
    expect(JSON.parse(response.text).message).toBe('success');
  });
});

describe('/tweets/all/:username test', () => {
  test('Error getting tweets/followers', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });
    request(webapp).get('/tweets/all/isimbib').send().expect(405);
  });

  test('successful retrieving of tweets/followers', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('USERS').insert({
      username: 'berwa',
      password: '1234',
      first_name: 'Berwa',
      last_name: 'Bizimana',
      email: 'ber@gmail.com',
    });

    await knex('FOLLOWERS_1').insert({
      user_one: 'isimbib',
      user_two: 'berwa',
    });

    await knex('FOLLOWERS_1').insert({
      user_one: 'berwa',
      user_two: 'isimbib',
    });
    const response = await request(webapp).get('/tweets/all/isimbib').send();
    expect(JSON.parse(response.text).message).toBe('200');
  });
});

describe('/all/followers/:username test', () => {
  test('Error getting followers', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });
    request(webapp).get('/all/Followers/isimbib').send().expect(405);
  });

  test('successful retrieving of followers', async () => {
    await knex('USERS').insert({
      username: 'isimbib',
      password: '1234',
      first_name: 'Anaick',
      last_name: 'Bizimana',
      email: 'anaick@gmail.com',
    });

    await knex('USERS').insert({
      username: 'berwa',
      password: '1234',
      first_name: 'Berwa',
      last_name: 'Bizimana',
      email: 'ber@gmail.com',
    });

    await knex('FOLLOWERS_1').insert({
      user_one: 'isimbib',
      user_two: 'berwa',
    });

    await knex('FOLLOWERS_1').insert({
      user_one: 'berwa',
      user_two: 'isimbib',
    });
    const response = await request(webapp).get('/all/followers/isimbib').send();
    expect(JSON.parse(response.text).message).toBe('200');
  });
});
