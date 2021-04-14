const express = require('express');
const webapp = express();
const bodyParser = require('body-parser');
const db = require('./database.js');
var path = require('path');

// Server port
const port = 8080;

webapp.use(bodyParser.urlencoded({
  extended: true,
}));
webapp.use(bodyParser.json());
webapp.set('view engine', 'html');

webapp.use(express.static(path.join(__dirname, 'public')));
// Start server
webapp.listen(port, () => {
  console.log(`Server running on port:${port}`);
});

webapp.get('/home', (req, res) => {
    console.log("Home page in!");
    res.render('homepage.html');
    /*const sql = 'SELECT * from TWEETS';
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

        
    });*/
});

webapp.post('/createTweet', (req, res) => {
    console.log('Create a Tweet');
   /* if (!req.body.username) {
        res.status(400).json({ error: 'missing username' });
        return;
    } */
    
    const newTweet = {
      uid : req.body.ui,
      type : req.body.type,
      content : req.body.content,
      tweet_date : Date.now(),
      tweet_likes : 0
    };

    //insert newTweet in table TWEET
    const sql = 'INSERT INTO TWEETS (uid, tweet_id, type, content, tweet_date, tweet_likes) VALUES (?,?,?,?,?,?)';
    const values = [newTweet.uid, newTweet.tweet_id, newTweet.type, newTweet.content, newTweet.tweet_date, newTweet.tweet_likes];
    db.run(sql, values, function(err, result) {
        if (err) {
            console.log("here");
            res.status(400).json({ error: err.message });
            return;
        } else {
            console.log("successful creation of tweet");
            res.redirect('/home')
        }

        
    });
});

/*webapp.post('/deleteTweet/', (req, res) => {
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

});*/



module.exports = webapp; // for testing