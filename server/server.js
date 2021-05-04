// create express app

const express = require('express');

const webapp = express();

// impporting database
const mysql = require('mysql');

const cors = require('cors');

webapp.use(cors());
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const auth = require('./authentication.js');

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
  const datetime = new Date('en-US').toLocaleString();
  const followerCount = 0;
  const isLoggedIn = 1;
  const tweetsCount = 0;
  const isLive = 0;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    connection.query(
      'INSERT INTO USERS (username, password, first_name, last_name,email, date, followers_count, is_logged_in, tweets_count, is_live, date) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [username, hash, first_name, last_name, email, followerCount,
        isLoggedIn, tweetsCount, isLive, datetime],
      (err, result) => {
        console.log(err);
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

/* -------------------------------------------------------------------------- */
/*                        PROFILE AND TWEETS ENDPOINTS                        */
/* -------------------------------------------------------------------------- */
// getting the profile info
webapp.get('/profile/:uid', (req, res) => {
  const sql_info = 'SELECT username, first_name, last_name, email, profile_picture, location FROM USERS WHERE  uid = ?';
  const sql_interest = 'SELECT interest FROM INTERESTS WHERE interests_uid= ?';
  const sql_following = 'SELECT uid, username, profile_picture FROM USERS WHERE uid IN  (SELECT uid_user_two FROM FOLLOWERS WHERE uid_user_one = ?)';
  const parameters = [req.params.uid];
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

webapp.get('/profile/tweet/:uid', (req, res) => {
  const sql_select = 'SELECT * FROM TWEETS WHERE uid=?';
  const params = [req.params.uid];
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

// deactivating profile
webapp.delete('/profile/delete/:uid', (req, res) => {
  const sql_get = 'SELECT password FROM USERS WHERE uid=?'
  const sql_deact = 'UPDATE USERS SET isDeactivated = true WHERE uid =?';
  const id = req.params.uid;
  const {password} = req.body;
  connection.query(sql_get, id, function (err, result){
    if (err) {
      res.status(401).json({ error: err.message });
      return;
    }
    console.log(id);
    if (result.length > 0) {
      
      bcrypt.compare(password, result[0].password, (error, response) => {
        console.log(response);
        if(error) {
          res.status(401).json({ error: err.message });
          return;
        } else if (response) {
          connection.query(sql_deact, id,
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
  })
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
      return;
    });
});

// updating password
webapp.put('/profile/password/:uid', (req, res) => {
  const sql_get = 'SELECT password FROM USERS WHERE uid=?'
  const sql_update = 'UPDATE USERS SET password= ? WHERE uid= ?';
  const id = req.params.uid;
  const newPass = req.body.newPassword;
  const oldPass = req.body.oldPassword;
  console.log(id+ "/"+newPass + "/"+ oldPass);
  connection.query(sql_get, id, function (err, result) {
    if(err) {
      res.status(404).json({error: err.message});
      return
    }
    if(result.length > 0) {
      bcrypt.compare(oldPass, result[0].password, (error, response) => {
        if(error) {
          res.status(401).json({error: error.message});
          return;
        }
        if(response) {
          bcrypt.hash(newPass, saltRounds, (hashingError, hash) => {
            if(hashingError){
              res.json({error: hashingError.message});
              return;
            } else {
              connection.query(sql_update, [hash, id], (err)=>{
                if (err) {
                  res.status(500).json({ error: err.message});
                  return
                } else {
                  res.json({message: 'password successfully updated'});
                  return;
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
webapp.post('/profile/interest/:uid', (req, res) => {
  const sql_update = 'INSERT INTO INTERESTS (interests_uid, interest) VALUES (?, ?)';
  const params = [req.params.uid, req.body.interest];
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
webapp.delete('/profile/delete/interest/:uid', (req, res) => {
  const sql_delete = 'DELETE FROM INTERESTS WHERE interests_uid=? AND interest=?';
  const params = [req.params.uid, req.body.interest];
  connection.query(sql_delete, params,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'Interest successfully deleted', changes: this.changes });
    });
});

webapp.get('/profile/followers/:uid', (req, res) => {
  // finish the outes correctly
  const sql_get = 'SELECT profile_picture, username FROM (SELECT * FROM USERS JOIN FOLLOWERS ON USERS.UID = FOLLOWERS.uid_user_one) AS T WHERE uid_user_two=? LIMIT 8';
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

webapp.get('/followers/:uid', (req, res) => {
  // finish the outes correctly
  const sql_get = 'SELECT uid_user_two FROM FOLLOWERS WHERE uid_user_one=?';
  const params = [req.params.uid];
  connection.query(sql_get, params,
    (err, followers) => {
      if (err) {
        res.status(405).json({ error: err.message });
      }
      res.json({ message: 'Followers successfully retrieved', data: followers });
    });
});


// removing profile picture
// webapp.put('/profile/delete/profile_pic/:uid', (req, res)=> {
//     const sql_remove = 'UPDATE USERS SET profile_picture=? WHERE uid=?';
//     const params = [req.params.uid, req.body.url];
//     if(url != null && )
//     connection.run(sql_remove, params,
//         function(err){
//             if(err) {
//                 res.status(405).json({error: err.message});
//                 return;
//             }
//             res.json({message: 'renoved', changes: this.changes});
//         }
//     );
// });
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
webapp.post('/createTweet/:uid', (req, res) => {
  console.log("Creation of Tweet");
  const newTweet = {
    uid: req.params.uid,
    type: 'text',
    content: req.body.content,
    tweet_date: Date.now(),
    tweet_likes: 0,
  };

  // insert newTweet in table TWEETS
  const sql = 'INSERT INTO TWEETS (uid, tweet_id, type, content, tweet_date, tweet_likes) VALUES (?,?,?,?,?,?)';
  const values = [newTweet.uid, newTweet.tweet_id, newTweet.type, newTweet.content, newTweet.tweet_date, newTweet.tweet_likes];
  connection.query(sql, values,
    function (err) {
      if (err) {
        res.status(405).json({ error: err.message });
        return;
      }
      res.json({ message: 'Tweet successfully added', changes: this.changes });
    });
});



webapp.post('/deleteTweet/:tweetid', (req, res) => {
    console.log('Delete a Tweet');
    const sql = 'DELETE FROM TWEETS WHERE tweet_id = ?';
    const values = [req.params.tweetid];
    db.run(sql, values, function(err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message : 'sucessful deletion of tweet',
            data: result
        });
    });
});

webapp.use((_req, res) => {
  res.status(404);
});

module.exports = webapp;
