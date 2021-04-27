// create express app
const express = require ('express');
const auth = require('./authentication.js');
var crypto = require("crypto");
const webapp = express();

//impporting database
let mysql = require('mysql');
let config = require('./db_connection.js');

//connecting to database
let connection = mysql.createConnection(config);

const cors = require('cors');
webapp.use(cors());
const bodyParser = require('body-parser');
//const connection = require('./db_connection.js').default;


const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
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
    methods: ["GET", "POST"],
    credentials: true,
  })
);

webapp.use(cookieParser());
webapp.use(bodyParser.urlencoded({ extended: true }));

webapp.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

/* -------------------------------------------------------------------------- */
/*                      LOGIN AND REGISTRATION ENDPOINTS                      */
/* -------------------------------------------------------------------------- */

webapp.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    connection.query(
      "INSERT INTO USERS_AUTH (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

webapp.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

webapp.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM USERS_AUTH WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

/* -------------------------------------------------------------------------- */
/*                        PROFILE AND TWEETS ENDPOINTS                        */
/* -------------------------------------------------------------------------- */





















//getting the profile info
webapp.get('/profile/:uid', (req, res) => {
    const sql_info = 'SELECT username, first_name, last_name, email, profile_picture, location FROM USERS WHERE  uid = ?';
    const sql_interest = 'SELECT interest FROM INTERESTS WHERE interests_uid= ?';
    const sql_following = 'SELECT uid, username, profile_picture FROM USERS WHERE uid IN  (SELECT uid_user_two FROM FOLLOWERS WHERE uid_user_one = ?)';
    const parameters = [req.params.uid];
    connection.query(sql_info, parameters,(err, student)=> {
        let data = [];
        if(err) {
            res.status(404).json({error: err.message});
            return;
        }
        data.push(student);
        connection.query(sql_interest, parameters, (err, interests)=> {
            if(err) {
                res.status(404).json({
                    message: "no interest",
                    data: data,
                    error: err.message});
                return;
            }
            data.push(interests);

            connection.query(sql_following, parameters, (err, followers)=> {
                if(err) {
                    res.status(404).json({
                        message: "no followers",
                        data: data,
                        error: err.message});
                    return;
                }
                data.push(followers);
                res.json({
                    message: "200",
                    data: student, interests, followers,
                })
            }); 
        });  
    }); 
});

/**
 * Retrieving all tweets of users
 * route to be updated for infinitely scrolling list
 * **/

webapp.get('/profile/tweet/:uid', (req, res)=> {
    const sql_select = 'SELECT * FROM TWEETS WHERE uid=?';
    const params = [req.params.uid];
    connection.query(sql_select, params, (err, tweets)=> {
        if(err) {
            res.status(404).json({
                message: "no followers",
                error: err.message});
            return;
        }
        res.json({
            message: "200",
            data: tweets,
        })
    }); 
    
});

// deleting profile
 webapp.delete('/profile/delete/:uid', (req, res)=> {
    const sql_delete = 'DELETE FROM USERS WHERE uid =? AND hashed_password = ?';
    const params = [req.params.uid, req.body.password];
    connection.query(sql_delete, params, 
        function (err){
            if(err) {
                res.status(401).json({error: err.message});
                return;
            }
            res.json({ message: 'deleted', changes: this.changes });
        }
    );
});
// changing username
webapp.put('/profile/username/:uid', (req, res)=> {
    const sql_update = 'UPDATE USERS SET username = ? WHERE uid = ?';
    const params = [req.body.username, req.params.uid];
    connection.query(sql_update, params, 
        function(err){
            if(!auth.isValidUsername(params[0])) {
                res.status(400).json({message: "invalid username"});
                return;
            } else if(err) {
                res.status(405).json({error: err.message});
                return;
            }
            res.json({message: 'Username updated', changes: this.changes});
        }
    );
});

// updating password
webapp.put('/profile/password/:uid', (req, res)=> {
    const sql_update = 'UPDATE USERS SET hashed_password= ? WHERE uid= ? AND hashed_password= ?';
    const params = [req.body.new_password,req.params.uid, req.body.old_password];
    //encrypt the password
   
   
   //checks if newPassword is valid
   if(auth.isValidPassword(params[0])) {
        connection.query(sql_update, params, 
            function(err){
               if(err) {
                    res.status(405).json({error: err.message});
                    return;
                }
                res.json({message: 'password updated', changes: this.changes});
            }
         );
   } else {
       res.status(405).json({message: "new password doesn't meet requirement"})
       return;
   }
});
//Adding interest
webapp.post('/profile/interest/:uid', (req, res)=> {
    const sql_update = 'INSERT INTO INTERESTS (interests_uid, interest) VALUES (?, ?)';
    const params = [req.params.uid, req.body.interest];
    connection.query(sql_update, params, 
        function(err){
            if(err) {
                res.status(405).json({error: err.message});
                return;
            }
            res.json({message: 'Interest successfull added', changes: this.changes});
        }
    );
});

//delete interest
webapp.delete('/profile/delete/interest/:uid', (req, res)=> {
    const sql_delete = 'DELETE FROM INTERESTS WHERE interests_uid=? AND interest=?';
    const params = [req.params.uid, req.body.interest];
    connection.query(sql_delete, params, 
        function(err){
            if(err) {
                res.status(405).json({error: err.message});
                return;
            }
            res.json({message: 'Interest successfull deleted', changes: this.changes});
        }
    );
});


//removing profile picture
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
//updating picture

//deleting picture

//updating cover page

//deleting cover page

webapp.use((_req, res) => {
    res.status(404);
});

module.exports = webapp;



