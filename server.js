// create express app
const express = require ('express');
const auth = require('./authentication.js');
var crypto = require("crypto");
//
//var password = crypto.createHash("Kigali"); // encrypts the password
//console.log(password);
const webapp = express();

const cors = require('cors');
webapp.use(cors());
const bodyParser = require('body-parser');
const db = require('./database2.js');

const port = 5000;
webapp.use(bodyParser.urlencoded({
    extended: true,
}));
webapp.use(bodyParser.json());

webapp.listen(port, () => {
    console.log(`Server running on port:${port}`);
});

webapp.get('/profile/:uid', (req, res) => {
    const sql_info = 'SELECT username, first_name, last_name, email, profile_picture, location FROM USERS WHERE  uid = ?';
    const sql_interest = 'SELECT interest FROM INTERESTS WHERE interests_uid= ?';
    const sql_following = 'SELECT uid, username, profile_picture FROM USERS WHERE uid IN  (SELECT uid_user_two FROM FOLLOWERS WHERE uid_user_one = ?)';
    const parameters = [req.params.uid];
    db.get(sql_info, parameters,(err, student)=> {
        let data = [];
        if(err) {
            res.status(404).json({error: err.message});
            return;
        }
        data.push(student);
        db.all(sql_interest, parameters, (err, interests)=> {
            if(err) {
                res.status(404).json({
                    message: "no interest",
                    data: data,
                    error: err.message});
                return;
            }
            data.push(interests);

            db.all(sql_following, parameters, (err, followers)=> {
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

// deleting profile
 webapp.delete('/profile/delete/:uid', (req, res)=> {
    const sql_delete = 'DELETE FROM USERS WHERE uid =? AND hashed_password = ?';
    const params = [req.params.uid, req.body.password];
    db.run(sql_delete, params, 
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
    db.run(sql_update, params, 
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
        db.run(sql_update, params, 
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
    console.log(req.body);
    db.run(sql_update, params, 
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
    db.run(sql_delete, params, 
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
//     db.run(sql_remove, params, 
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



