// create express app
const express = require('express');

const webapp = express();
const pino = require('express-pino-logger')();

// impporting database
const mysql = require('mysql');

const cors = require('cors');

webapp.use(cors());
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const fs = require('fs');
const util = require('util');

const unlinkFile = util.promisify(fs.unlink);
const multer = require('multer');
const auth = require('./authentication.js');

// const upload = multer({ dest: './uploads/' });

const {
  checkKey, uploadFile, readFile, deleteFile,
} = require('./file_upload/s3fileupload.js');

const config = require('./db_connection.js');

// connecting to database
const connection = mysql.createConnection(config);
const saltRounds = 10;

const port = 5000;
webapp.use(bodyParser.urlencoded({
  extended: true,
}));
webapp.use(bodyParser.json());

webapp.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
// webapp.use(express.static(__dirname, 'public'));
webapp.use(express.json());
webapp.use(
  cors({
    origin: [`http://localhost:${port}`],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);

webapp.use(cookieParser());
webapp.use(bodyParser.urlencoded({ extended: true }));

webapp.use(
  session({
    key: 'userId',
    secret: 'subscribe',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  }),
);

/* -------------------------------------------------------------------------- */
/*                                TWILIO ENDPOINTS                            */
/* -------------------------------------------------------------------------- */
const configTwo = require('./config');
const { videoToken } = require('./tokens');

webapp.use(pino);

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    }),
  );
};

webapp.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

webapp.get('/video/token', (req, res) => {
  const { identity } = req.query;
  const { room } = req.query;
  const token = videoToken(identity, room, configTwo);
  sendTokenResponse(token, res);
});
webapp.post('/video/token', (req, res) => {
  console.log(configTwo);
  const { identity } = req.body;
  const { room } = req.body;
  const token = videoToken(identity, room, configTwo);
  sendTokenResponse(token, res);
});

/* -------------------------------------------------------------------------- */
/*                      LOGIN AND REGISTRATION ENDPOINTS                      */
/* -------------------------------------------------------------------------- */

webapp.post('/register', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const { first_name } = req.body;
  const { last_name } = req.body;
  const { email } = req.body;
  // get the current date time in MYSQL format
  const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  // console.log(datetime);
  const followerCount = 0;
  const isLoggedIn = 0;
  const tweetsCount = 0;
  const isLive = 0;

  bcrypt.hash(password, saltRounds, (hasherr, hash) => {
    if (hasherr) {
      console.log(hasherr);
    }
    connection.query(
      'INSERT INTO USERS (username, password, first_name, last_name,email, followers_count, is_logged_in, tweets_count, is_live, date) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [username, hash, first_name, last_name, email, followerCount,
        isLoggedIn, tweetsCount, isLive, datetime], (err) => {
        if (err) {
          const status = err.status || 500;
          res.status(status).json({ error: err.message });
          return;
        }
        res.send({
          message: 'success',
        });
      },
    );
  });
});

webapp.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

webapp.post('/userUid', (req, res) => {
  // console.log('Get the user id');
  const sql = 'select uid from USERS where username = ?';
  const { username } = req.body;
  const params = [username];
  connection.query(sql, params, (err, row) => {
    if (err) {
      const status = err.status || 500;
      res.status(status).json({ error: err.message });
      return;
    }
    res.send({
      message: 'success',
      data: row,
    });
  });
});

webapp.post('/login', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  console.log(`username:${username}`);

  connection.query(
    'SELECT * FROM USERS WHERE username = ?',
    username,
    (err, result) => {
      if ((err) || !(result)) {
        res.send({ err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          console.log(response);
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            console.log(`here ${result}`);
            res.send({ message: 'Wrong username/password combination!' });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    },
  );
});

webapp.put('/resetPassword', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  bcrypt.hash(password, saltRounds, (hasherr, hash) => {
    if (hasherr) {
      console.log(hasherr);
    }
    connection.query(
      'UPDATE USERS SET password = ? WHERE (username = ?)',
      [hash, username], (err) => {
        if (err) {
          const status = err.status || 500;
          res.status(status).json({ error: err.message });
          return;
        }
        res.send({
          message: 'success',
        });
      },
    );
  });
});

webapp.post('/uploadProfilePicture', (req, res) => {
  const { username } = req.body;
  const { profilePicture } = req.body;
  const params = [profilePicture, username];

  connection.query(
    'UPDATE USERS SET profile_picture = ? WHERE username = ?',
    params, (err) => {
      if (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
        return;
      }
      res.send({
        message: 'success',
      });
    },
  );
});

// set the number of failed logins
webapp.post('/updateNumberFailedLogins', (req, res) => {
  const { username } = req.body;
  const { numberOfFailedLogins } = req.body;
  const params = [numberOfFailedLogins, username];
  // console.log(`updateNumberFailedLogins called with numberOfFailedLogins as ${numberOfFailedLogins}`);
  // console.log(params);

  connection.query(
    'UPDATE USERS SET number_failed_logins = ? WHERE username = ?',
    params, (err) => {
      if (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
        return;
      }
      res.send({
        message: 'success',
      });
    },
  );
});
// get the number of failed logins
webapp.get('/numberFailedLogins/:username', (req, res) => {
  const params = [req.params.username];
  // console.log(req.params);

  const sql_select = 'SELECT  number_failed_logins FROM USERS WHERE username = ?';
  connection.query(sql_select, params, (err, row) => {
    // console.log(`numberFailedLogins called with numberFailedLogins, result = }${Array.from(res)}`);
    // console.log();
    // TODO: FIXME
    // if (!row[0]) {
    //   const status = 500;
    //   res.status(status).json({ error: 'invalid username' });
    //   return;
    // }

    if (err) {
      const status = err.status || 500;
      res.status(status).json({ error: err.message });
      return;
    }
    res.json({
      message: '200',
      data: row,
    });
  });
});

// get the number of failed logins
webapp.get('/dateUserLastLockedOut/:username', (req, res) => {
  const params = [req.params.username];
  // console.log(req.params);
  const sql_select = 'SELECT date_last_locked_out FROM USERS WHERE username = ?';
  connection.query(sql_select, params, (err, row) => {
    // console.log(`dateUserLastLockedOut called with dateUserLastLockedOut, result = }${Array.from(res)}`);
    // console.log(req.params);

    if (err) {
      const status = err.status || 500;
      res.status(status).json({ error: err.message });
      return;
    }
    res.json({
      message: '200',
      data: row,
    });
  });
});

// set the number of failed logins
webapp.post('/setLockOutTime', (req, res) => {
  const dateTime = new Date().toISOString();
  const { username } = req.body;
  const params = [dateTime, username];
  // console.log(`dateTime =${dateTime}`);
  // console.log(`username =${username}`);
  connection.query(
    'UPDATE USERS SET date_last_locked_out = ? WHERE username = ?',
    params, (err) => {
      // console.log('setLockOutTime called with setLockOutTime');
      if (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
        return;
      }
      res.send({
        message: 'success',
      });
    },
  );
});

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const upload = multer({ storage: fileStorageEngine });

// Single File Route Handler
webapp.post('/uploadFile', upload.single('image'), (req, res) => {
  // console.log(req.file);
  uploadFile(req.file.filename);
  res.json({
    message: 'success',
    data: req.file.filename,
  });
});

webapp.get('/viewFile/:key', async (req, res) => {
  const b = await checkKey(req.params.key);
  try {
    if (b) {
      // successful, print the message
      const readStream = readFile(req.params.key);
      // console.log(`ress${res[0]}`);
      readStream.pipe(res);
    } else {
      res.send({
        message: 'unsuccessful',
      });
    }
  } catch (e) {
    console.log(e);
  }
});

webapp.get('/readFile', (req, res) => {
  const { fileName } = req.body;
  readFile(fileName);
  res.send({
    message: 'success',
  });
});

/* -------------------------------------------------------------------------- */
/*                        PROFILE AND TWEETS ENDPOINTS                        */
/* -------------------------------------------------------------------------- */

// getting the profile info
webapp.get('/profile/:username', (req, res) => {
  const sql_info = 'SELECT username, first_name, last_name, email, profile_picture, location FROM USERS WHERE username = ?';
  const sql_interest = 'SELECT interest FROM INTERESTS_1 WHERE user= ?';
  const sql_following = 'SELECT uid, username, profile_picture FROM USERS WHERE username IN  (SELECT user_two FROM FOLLOWERS_1 WHERE user_one = ?)';
  const parameters = [req.params.username];
  connection.query(sql_info, parameters, (err, student) => {
    const data = [];
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }
    data.push(student);
    connection.query(sql_interest, parameters, (err, interests) => {
      if (err) {
        res.status(404).json({
          message: 'no interest',
          data,
          error: err.message,
        });
        return;
      }
      data.push(interests);

      connection.query(sql_following, parameters, (err, followers) => {
        if (err) {
          res.status(404).json({
            message: 'no followers',
            data,
            error: err.message,
          });
          return;
        }
        data.push(followers);
        res.json({
          message: '200',
          data: student,
          interests,
          followers,
        });
      });
    });
  });
});

/**
   * Retrieving all tweets of users
   * route to be updated for infinitely scrolling list
   * * */

webapp.get('/profile/tweet/:username', (req, res) => {
  const sql_select = 'SELECT * FROM TWEETS_1 WHERE user=? ORDER BY tweet_date DESC';
  const params = [req.params.username];
  connection.query(sql_select, params, (err, tweets) => {
    if (err) {
      res.status(404).json({
        message: 'no followers',
        error: err.message,
      });
      return;
    }
    res.json({
      message: '200',
      data: tweets,
    });
  });
});

webapp.get('/profile/tweets/:username', (req, res) => {
  const sql_select = 'SELECT USERS.username, TWEETS_1.* FROM TWEETS_1 INNER JOIN USERS ON USERS.username = TWEETS_1.user WHERE TWEETS_1.user = ?';
  const params = [req.params.username];
  connection.query(sql_select, params, (err, tweets) => {
    if (err) {
      res.status(405).json({ error: err.message });
    }
    res.json({
      message: '200',
      tweets,
    });
  });
});

// deactivating profile
webapp.put('/profile/deactivate/:username', (req, res) => {
  const sql_get = 'SELECT password FROM USERS WHERE username=?';
  const sql_deact = 'UPDATE USERS SET isDeactivated = true WHERE username =?';
  const user = req.params.username;
  const { password } = req.body;
  connection.query(sql_get, user, (err, result) => {
    if (err) {
      res.status(401).json({ error: err.message });
      return;
    }
    // console.log(username);
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        // console.log(response);
        if (error) {
          res.status(401).json({ error: err.message });
        } else if (response) {
          connection.query(sql_deact, user,
            function (errr) {
              if (errr) {
                res.status(500).json({ error: errr.message });
                return;
              }
              res.json({ message: 'Account deactivated', changes: this.changes });
            });
        } else {
          res.status(401).json({ message: 'Wrong password input! Try again.' });
        }
      });
    }
  });
});

// reactivating profile
webapp.put('/profile/reactivate/:username', (req, res) => {
  const sql_get = 'SELECT password FROM USERS WHERE username=?';
  const sql_deact = 'UPDATE USERS SET isDeactivated = false WHERE username =?';
  const user = req.params.username;
  const { password } = req.body;
  connection.query(sql_get, user, (err, result) => {
    if (err) {
      res.status(401).json({ error: err.message });
      return;
    }
    // console.log(username);
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.status(401).json({ error });
        } else if (response) {
          connection.query(sql_deact, user,
            function (errr) {
              if (errr) {
                res.status(500).json({ error: errr });
                return;
              }
              res.json({ message: 'Account reactivated', changes: this.changes });
            });
        } else {
          res.status(401).json({ message: 'Wrong password input! Try again.' });
        }
      });
    }
  });
});

// changing username
webapp.put('/profile/username/:uid', (req, res) => {
  const sql_update = 'UPDATE USERS SET username = ? WHERE uid = ?';
  const params = [req.body.username, req.params.uid];
  connection.query(sql_update, params,
    function (err) {
      if (!auth.isValidUsername(params[0])) {
        res.status(400).json({ message: 'invalid username' });
        return;
      } if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'Username updated', changes: this.changes });
    });
});

// updating password
webapp.put('/profile/password/:username', (req, res) => {
  const sql_get = 'SELECT password FROM USERS WHERE username=?';
  const sql_update = 'UPDATE USERS SET password= ? WHERE username= ?';
  const user = req.params.username;
  const newPass = req.body.newPassword;
  const oldPass = req.body.oldPassword;
  connection.query(sql_get, user, (err, result) => {
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }
    if (result.length > 0) {
      bcrypt.compare(oldPass, result[0].password, (error, response) => {
        if (error) {
          res.status(401).json({ error: error.message });
          return;
        }
        if (response) {
          bcrypt.hash(newPass, saltRounds, (hashingError, hash) => {
            if (hashingError) {
              res.json({ error: hashingError.message });
            } else {
              connection.query(sql_update, [hash, user], (err) => {
                if (err) {
                  res.status(500).json({ error: err.message });
                } else {
                  res.status(401).json({ message: 'password successfully updated' });
                }
              });
            }
          });
        } else {
          res.status(401).json({ message: 'Wrong password input! Try again.' });
        }
      });
    }
  });
});

// Adding interest
webapp.post('/profile/interest/:username', (req, res) => {
  const sql_update = 'INSERT INTO INTERESTS_1 (user, interest) VALUES (?, ?)';
  const params = [req.params.username, req.body.interest];
  connection.query(sql_update, params,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'Interest successfully added', changes: this.changes });
    });
});

// delete interest
webapp.delete('/profile/delete/interest/:username', (req, res) => {
  const sql_delete = 'DELETE FROM INTERESTS_1 WHERE user=? AND interest=?';
  const params = [req.params.username, req.body.interest];
  connection.query(sql_delete, params,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'Interest successfully deleted', changes: this.changes });
    });
});

// Getting the followers to display on profile
webapp.get('/profile/followers/:username', (req, res) => {
  // finish the outes correctly
  const { username } = req.params;
  const sql_get = `SELECT profile_picture, username FROM USERS JOIN (SELECT user_one FROM FOLLOWERS_1 WHERE user_two = '${username}' and user_one NOT IN (SELECT user_two FROM BLOCKED_USERS_1 WHERE user_one= '${username}' )) as T ON username = user_one LIMIT 6`;

  connection.query(sql_get,
    (err, followers) => {
      if (err) {
        res.status(405).json({ error: err.message });
      }
      res.json({
        message: '200',
        followers,
      });
    });
});

// Getting the friends to display on profile
webapp.get('/profile/friends/:username', (req, res) => {
  const { username } = req.params;
  // console.log(username);
  const sql_get = `SELECT profile_picture, username FROM USERS JOIN (SELECT user_one FROM FOLLOWERS_1 WHERE user_two= '${username}' AND user_one in (SELECT user_two FROM FOLLOWERS_1 WHERE user_one= '${username}') AND user_one NOT IN (SELECT user_two FROM BLOCKED_USERS_1 WHERE user_one= '${username}')) AS T ON username = user_one`;

  connection.query(sql_get,
    (err, friends) => {
      if (err) {
        res.status(405).json({ error: err.message });
      }
      res.json({
        message: '200',
        friends,
      });
    });
});

// Getting the friends to display on profile
webapp.get('/search/:username/:input', (req, res) => {
  const { username } = req.params;
  const input = `${req.params.input}%`;
  const sql_get = 'SELECT username, profile_picture, CASE WHEN username IN (SELECT user_two FROM FOLLOWERS_1 WHERE user_one = ?) THEN \'1\' END AS followed FROM TRINIWA.USERS WHERE username LIKE ? limit 5';
  connection.query(sql_get, [username, input],
    (err, friends) => {
      if (err) {
        console.log('I failed');
        res.status(405).json({ error: err.message });
      }
      res.json({
        message: '200',
        friends,
      });
    });
});

webapp.get('/followers/:uid', (req, res) => {
  // finish the outes correctly
  const sql_get = 'SELECT uid_user_two FROM FOLLOWERS WHERE uid_user_one=?';
  const params = [req.params.uid];
  connection.query(sql_get, params,
    (err, followers) => {
      if (err) {
        res.status(405).json({ error: err.message });
      }
      res.json({
        message: '200',
        followers,
      });
    });
});

webapp.get('/profile/avatar/:username', (req, res) => {
  const sql_get = 'SELECT profile_picture FROM USERS WHERE username=?';
  const params = req.params.username;
  connection.query(sql_get, params, (err, avatar) => {
    if (err) {
      res.status(405).json({
        error: err.message,
      });
    }
    res.json({
      message: 'Profile retrieved successfully!',
      avatar,
    });
  });
});
// blocking a follower
webapp.post('/block/:username', (req, res) => {
  const sql_insert = 'INSERT INTO BLOCKED_USERS_1 ( user_one, user_two ) VALUES(?,?)';
  const params = [req.params.username, req.body.follower];
  connection.query(sql_insert, params,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'user successfully blocked', changes: this.changes });
    });
});

// following a follower
webapp.post('/follow/:username', (req, res) => {
  const sql_insert = 'INSERT INTO FOLLOWERS_1 ( user_one, user_two ) VALUES(?,?)';
  const params = [req.params.username, req.body.follower];
  connection.query(sql_insert, params,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'user successfully followed', changes: this.changes });
    });
});

// unfollowing a user
webapp.put('/unfollow/:username', (req, res) => {
  const sql_unfollow = 'DELETE FROM FOLLOWERS_1 WHERE user_one = ? AND user_two = ?';
  const params = [req.params.username, req.body.follower];
  connection.query(sql_unfollow, params,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'user successfully unfollowed', changes: this.changes });
    });
});

// unblocking a user
webapp.put('/unblock/:username', (req, res) => {
  const sql_unfollow = 'DELETE FROM BLOCKED_USERS_1 WHERE user_one = ? AND user_two = ?';
  const params = [req.params.username, req.body.follower];
  connection.query(sql_unfollow, params,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'user successfully unblocked', changes: this.changes });
    });
});

// get blocked users
webapp.get('/blocked/:username', (req, res) => {
  const { username } = req.params;
  const sql = `SELECT USERS.profile_picture, USERS.username, BLOCKED_USERS_1.user_two FROM USERS INNER JOIN BLOCKED_USERS_1 ON BLOCKED_USERS_1.user_two = USERS.username WHERE BLOCKED_USERS_1.user_one = '${username}'`;

  connection.query(sql,
    (err, friends) => {
      if (err) {
        res.status(405).json({ error: err.message });
      }
      res.json({
        message: '200',
        friends,
      });
    });
});

// updating tweet likes
webapp.put('/tweet/likes/:tweetid', (req, res) => {
  console.log(`Update: ${req.params.tweetid}.....${req.body.likes}`);
  const sql_update = `UPDATE TWEETS_1 SET tweet_likes='${req.body.likes}' WHERE tweet_id='${req.params.tweetid}'`;
  connection.query(sql_update,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'tweetLikes successfully updated', changes: this.changes });
    });
});

// checking if a tweet has been already liked by user
webapp.get('/tweet/isliked/:username/:tweetid/', (req, res) => {
  const sql_update = `SELECT 1 FROM LIKED_TWEETS
  WHERE user = '${req.params.username}' and tweet_id = ?`;
  const params = [req.params.tweetid];
  connection.query(sql_update, params,
    function (err, bool) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({
        message: 'tweetLikes successfully updated',
        changes: this.changes,
        bool,
      });
    });
});

// like a tweet
webapp.post('/tweet/like/:username', (req, res) => {
  console.log(`${req.params.username}.....${req.body.tweetid}`);
  const sql_like = `INSERT INTO LIKED_TWEETS (user, tweet_id) VALUES ('${req.params.username}','${req.body.tweetid}')`;
  connection.query(sql_like,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'tweet successfully liked', changes: this.changes });
    });
});

// unlike a user
webapp.put('/tweet/unlike/:username', (req, res) => {
  const sql_unlike = `DELETE FROM LIKED_TWEETS WHERE user='${req.params.username}' AND tweet_id='${req.body.tweetid}'`;
  // const params = [req.params.username, req.body.follower];
  connection.query(sql_unlike,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'tweet successfully unliked', changes: this.changes });
    });
});

// updating picture

// deleting picture

// updating cover page

// deleting cover page

/* -------------------------------------------------------------------------- */
/*                                CREATE TWEET                                */
/* -------------------------------------------------------------------------- */

webapp.get('/home/:uid', (req, res) => {
  const sql = 'SELECT username from USERS WHERE uid=?';
  const params = [req.params.uid];
  connection.query(sql, params, (err, user) => {
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }
    res.json({
      message: 'successful operation',
      data: user,
    });
  });
});

// Adding tweet
webapp.post('/createTweet/:username', (req, res) => {
  const input = req.body;
  // insert newTweet in table TWEETS
  const sql = 'INSERT INTO TWEETS_1 (user, tweet_id, type, content, tweet_date, tweet_likes) VALUES (?,?,?,?,?,?)';
  const params = [req.params.username, input.tweetId, input.type,
    input.content, input.tweet_date, 0];
  connection.query(sql, params,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'Tweet successfully added', changes: this.changes });
    });
});

// Adding tweet
webapp.post('/comment/add/:username', (req, res) => {
  const { commentId, tweetId, content, timestamp }= req.body;
  const user = req.params.username;
  // insert newTweet in table TWEETS
  const sql = 'INSERT INTO COMMENTS_1 (comm_id, tweet_id, user, content, timestamp) VALUES (?,?,?,?,?)';
  const params = [commentId, tweetId, user, content, timestamp];
  connection.query(sql, params,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'Comment successfully added', changes: this.changes });
    });
});


// deleting a tweet
webapp.delete('/tweet/delete/:tweetid', (req, res) => {
  const input = req.params.tweetid;
  const sql = `DELETE FROM TWEETS_1 WHERE tweet_id = '${input}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'sucessful deletion of tweet',
      data: result,
    });
  });
});

// hiding a tweet
webapp.post('/tweet/hide/:tweetid', (req, res) => {
  const input = req.params.tweetid;
  const { username } = req.body;

  console.log(`${input}----------${username}`);
  const sql = `INSERT INTO HIDDEN_TWEETS (user, tweet_id) VALUES ('${username}', '${input}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'sucessfully hid the tweet',
      data: result,
    });
  });
});

// update number of tweet block
webapp.post('/tweet/block/:tweetid', (req, res) => {
  const input = req.params.tweetid;
  const { blocks } = req.body;
  const sql = `UPDATE TWEETS_1 SET tweet_blocks=${blocks} WHERE tweet_id='${input}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'tweet_blocks updated',
      data: result,
    });
  });
});

// gets alls the followers with no limit
webapp.get('/all/followers/:username', (req, res) => {
  // finish the outes correctly
  const { username } = req.params;
  const sql_get = `SELECT user_two FROM FOLLOWERS_1 WHERE user_one = '${username}' and user_two NOT IN (SELECT user_two FROM BLOCKED_USERS_1 WHERE user_one= '${username}')`;

  connection.query(sql_get,
    (err, followers) => {
      if (err) {
        res.status(405).json({ error: err.message });
      }
      res.json({
        message: '200',
        followers,
      });
    });
});

// gets alls the followers with no limit
webapp.get('/tweets/all/:username', (req, res) => {
  // finish the outes correctly
  const { username } = req.params;
  const sql_get = `SELECT* FROM ((SELECT user, tweet_id, type, content, tweet_date, tweet_likes, tweet_comments, tweet_blocks
    FROM TWEETS_1 JOIN (SELECT user_two FROM FOLLOWERS_1 WHERE user_one='${username}') AS T ON user=user_two)
     UNION ALL (select * from TWEETS_1 where user='${username}'))AS M where tweet_id not in (SELECT tweet_id FROM HIDDEN_TWEETS WHERE user = '${username}') ORDER BY tweet_date DESC`;
  connection.query(sql_get,
    (err, tweets) => {
      if (err) {
        res.status(405).json({ error: err.message });
      }
      res.json({
        message: '200',
        tweets,
      });
    });
});
webapp.use((_req, res) => {
  res.status(404);
});

module.exports = webapp;
