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
// // Other API endpoints
// webapp.get('/api/players', (req, res) => {
//   console.log('READ all players');
//   const sql = 'select * from players';
//   const params = [];
//   db.query(sql, params, (err, rows) => {
//     if (err) {
//       const status = err.status || 500;
//       res.status(status).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows,
//     });

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

// deleting profile
webapp.delete('/profile/delete/:uid', (req, res) => {
  const sql_delete = 'DELETE FROM USERS WHERE uid =? AND hashed_password = ?';
  const params = [req.params.uid, req.body.password];
  connection.query(sql_delete, params,
    function (err) {
      if (err) {
        res.status(401).json({ error: err.message });
        return;
      }
      res.json({ message: 'deleted', changes: this.changes });
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
webapp.put('/profile/password/:uid', (req, res) => {
  const sql_update = 'UPDATE USERS SET hashed_password= ? WHERE uid= ? AND hashed_password= ?';
  const params = [req.body.new_password, req.params.uid, req.body.old_password];
  // encrypt the password

  // checks if newPassword is valid
  if (auth.isValidPassword(params[0])) {
    connection.query(sql_update, params,
      function (err) {
        if (err) {
          res.status(405).json({ error: err.message });
          return;
        }
        res.json({ message: 'password updated', changes: this.changes });
      });
  } else {
    res.status(405).json({ message: "new password doesn't meet requirement" });
  }
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
      res.json({ message: 'Interest successfull added', changes: this.changes });
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
      res.json({ message: 'Interest successfull deleted', changes: this.changes });
    });
});

webapp.get('/followers/:uid', (req, res) => {
  // finish the outes correctly
  const sql_get = 'SELECT uid_user_one FROM FOLLOWERS WHERE uid_user_two=?';
  const params = [req.params.uid];
  connection.query(sql_get, params,
    (err) => {
      if (err) {
        res.status(405).json({ error: err.message });
      }
    });
});

webapp.get('/followers', (req, res) => {

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

webapp.get('/home', (req, res) => {
  console.log('Home page in!');
  res.render('homepage.html');
  /* const sql = 'SELECT * from TWEETS';
  const params = [];
  db.query(sql, params, (err, rows) => {
      if (err) {
          res.status(404).json({ error: err.message });
          return;
      } else {
      }
      res.json({
          message: 'successful operation',
          data: rows,
      });
  }); */
});

webapp.post('/createTweet', (req, res) => {
  console.log('Create a Tweet');
  /* if (!req.body.username) {
       res.status(400).json({ error: 'missing username' });
       return;
   } */

  const newTweet = {
    uid: req.body.ui,
    type: req.body.type,
    content: req.body.content,
    tweet_date: Date.now(),
    tweet_likes: 0,
  };

  // insert newTweet in table TWEET
  const sql = 'INSERT INTO TWEETS (uid, tweet_id, type, content, tweet_date, tweet_likes) VALUES (?,?,?,?,?,?)';
  const values = [newTweet.uid, newTweet.tweet_id, newTweet.type, newTweet.content, newTweet.tweet_date, newTweet.tweet_likes];
  db.run(sql, values, (err, result) => {
    if (err) {
      console.log('here');
      res.status(400).json({ error: err.message });
    } else {
      console.log('successful creation of tweet');
      res.redirect('/home');
    }
  });
});

/* webapp.post('/deleteTweet/', (req, res) => {
    console.log('Delete a Tweet');
    const sql = 'DELETE FROM TWEETS WHERE tweet_id = ?';
    const values = [req.body.tweet_id];
    db.run(sql, values, function(err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message : 'sucessful deletion of tweet',
            tweet: req.body.tweet_id
        });
    });
}); */

webapp.use((_req, res) => {
  res.status(404);
});

module.exports = webapp;
