// create express app
const express = require('express');

const webapp = express();

// impporting database
const mysql = require('mysql');
const path = require('path');

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
  console.log(datetime);
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
  console.log('Get the user id');
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
    'SELECT * FROM USERS WHERE username = ?;',
    username,
    (err, result) => {
      if (err) {
        res.send({ err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: 'Wrong username/password combination!' });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    },
  );
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
  console.log(req.file);
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
      console.log(`ress${res[0]}`);
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
  const sql_select = 'SELECT * FROM TWEETS_1 WHERE user=?';
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
    console.log(username);
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        console.log(response);
        if (error) {
          res.status(401).json({ error: err.message });
        } else if (response) {
          connection.query(sql_deact, user,
            function (err) {
              if (err) {
                res.status(500).json({ error: err.message });
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
  connection.query(sql_get, id, (err, result) => {
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
                  res.json({ message: 'password successfully updated' });
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
  console.log(username);
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
      res.json({ message: 'user successfully blocked', changes: this.changes });
    });
});

// unfollowing a user
webapp.put('/unfollow/:username', (req, res) => {
  const sql_unfollow = 'DELETE FROM FOLLOWERS_1 WHERE user_one = ? AND user_two = ?';
  const params = [req.params.username, req.body.follower];
  console.log(params);
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
  console.log(params);
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
  console.log(input);
  // insert newTweet in table TWEETS
  const sql = 'INSERT INTO TWEETS_1 (user, tweet_id, type, content, tweet_date, tweet_likes) VALUES (?,?,?,?,?,?)';
  const params = [req.params.username, input.tweetId, input.type,
    input.content, input.tweet_date, 0];
  console.log(params);
  connection.query(sql, params,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'Tweet successfully added', changes: this.changes });
    });
});

webapp.delete('/tweet/delete/:tweetid', (req, res) => {
  const input = req.params.tweetid;
  console.log(`this is my tweetId: ${input}`);
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

webapp.use((_req, res) => {
  res.status(404);
});

module.exports = webapp;
