const sqlite3 = require('sqlite3').verbose();


const DB_NAME = 'app.sqlite';

const db = new sqlite3.Database(DB_NAME, (err) => {
  if (err) {
    // error opening database
    console.error(err.message);
    throw err;
  } else {
    db.run(`CREATE TABLE USERS 
    (uid INTEGER NOT NULL, 
      username text NOT NULL UNIQUE, 
      first_name text NOT NULL, 
      last_name text NOT NULL, 
      email text NOT NULL,
      hashed_password text NOT NULL, 
      profile_picture text NOT NULL, 
      followers_count int NOT NULL, 
      is_logged_in  boolean NOT NULL, 
      tweets_count int NOT NULL, 
      location text NOT NULL, 
      is_live int NOT NULL, 
      PRIMARY KEY("uid" AUTOINCREMENT));
    `,
    (othererr) => {
      if (othererr) {
        // error creating table
        console.error(othererr.message);
      } else {
        // Add data to the table
        const insert_users = 
        'INSERT INTO USERS (username, first_name, last_name, email, hashed_password, profile_picture, followers_count, is_logged_in, tweets_count, location, is_live) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        db.run(insert_users, ['Ida', 'Ida', 'Mae','ida@cis.upenn.edu',  'Kigali', 'not url', '2', 'true', '0', 'Kigali','true']);
        db.run(insert_users, ['Ida1', 'Ida1', 'Mae1','ida1@cis.upenn.edu', 'Kigali!2021', 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350', '2', 'true', '0', 'Kigali', 'true']);
        db.run(insert_users, ['Ida2', 'Ida2', 'Mae2','ida2@cis.upenn.edu', 'Kigali!2023', 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80', '2', 'true', '0', 'Kigali', 'true']);
        db.run(insert_users, ['Ida3', 'Ida3', 'Mae3','ida3@cis.upenn.edu', 'Kigali!2023', 'https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg', '2', 'true', '0', 'Kigali', 'true']);
      }
    });

    db.run(
        `CREATE TABLE FOLLOWERS 
        (uid_user_one int NOT NULL, 
        uid_user_two int NOT NULL, 
        FOREIGN KEY(uid_user_one) REFERENCES USERS(uid) ON DELETE CASCADE, 
        FOREIGN KEY(uid_user_two) REFERENCES USERS(uid) ON DELETE CASCADE);`,
         (othererr) => {
            if(othererr) {
                 console.error(othererr.message);

            } else {
                const insert_followers = 'INSERT INTO FOLLOWERS (uid_user_one, uid_user_two) VALUES (?,?)';
                    // insert followers
                db.run(insert_followers, ['1', '2']);
                db.run(insert_followers, ['1', '3']);
                db.run(insert_followers, ['3', '1']);
                db.run(insert_followers, ['2', '1']);
                db.run(insert_followers, ['3', '2']);
            }
    });

    db.run(
        `CREATE TABLE INTERESTS 
        (interests_uid INTEGER NOT NULL, 
        interest TEXT NOT NULL, 
        UNIQUE(interests_uid, interest),
        FOREIGN KEY(interests_uid) REFERENCES USERS(uid) ON DELETE CASCADE);`,
    
         (othererr) => {
            if(othererr) {
                 console.error(othererr.message);
            } else {
                const insert_interests = 'INSERT INTO INTERESTS (interests_uid, interest) VALUES (?,?)';
                 //insert interests
                db.run(insert_interests, ['1', 'soccer']);
                db.run(insert_interests, ['1', 'Bitcoin']);
                db.run(insert_interests, ['3', 'Music']);
                db.run(insert_interests, ['1', 'debate']);
                db.run(insert_interests, ['2', 'eating']);
            }
    });
  
    db.run(
      `CREATE TABLE TWEETS 
      (uid INTEGER NOT NULL, 
      tweet_id  INTEGER NOT NULL,
      type TEXT, 
      content TEXT, 
      tweet_date datetime, 
      tweet_likes TEXT NOT NULL,
      PRIMARY KEY ("tweet_id" AUTOINCREMENT), 
      FOREIGN KEY ("uid") REFERENCES USERS("uid"));`,
  
       (othererr) => {
          if(othererr) {
               console.error(othererr.message);
          } else {
              const insert_tweet = 'INSERT INTO TWEETS (uid, type, content, tweet_date, tweet_likes) VALUES (?,?,?,?,?)';
               //insert interests
              db.run(insert_tweet, ['1', 'soccer', 'philosophy', '02.3.2020', '5']);
              db.run(insert_tweet, ['1', 'Politic', 'MAGA', '02.3.2020', '5']);
              db.run(insert_tweet, ['3', 'Music', 'MJ is back', '02.3.2020', '5']);
              db.run(insert_tweet, ['1', 'debate', 'Silence', '02.3.2020', '5']);
              db.run(insert_tweet, ['2', 'eating', 'pizza is overrated', '02.3.2020', '5']);
          }
        });
}
  });



module.exports = db;




// CREATE TABLE TWEETS (uid int NOT NULL, tweet_id  int NOT NULL AUTO_INCREMENT, type text, content text, PRIMARY KEY (tweet_id), FOREIGN KEY (uid) REFERENCES USERS(uid));

// CREATE TABLE COMMENTS (tweet_id_one int NOT NULL, tweet_id_two int NOT NULL, FOREIGN KEY(tweet_id_one) REFERENCES TWEETS (tweet_id), FOREIGN KEY(tweet_id_two) REFERENCES TWEETS (tweet_id));

// CREATE TABLE MESSAGES (uid_user_one int NOT NULL, uid_user_two int NOT NULL, mesage_date datetime NOT NULL, message text, FOREIGN KEY(uid_user_one) REFERENCES USERS(uid), FOREIGN KEY(uid_user_two) REFERENCES USERS(uid));

// CREATE TABLE LIVE_STREAM  (live_stream_id int NOT NULL, subject varchar(255) NOT NULL, uid_host int NOT NULL, live_stream_date  datetime NOT NULL, Is_public boolean NOT NULL,  PRIMARY KEY(live_stream_id));

// CREATE TABLE LIVESTREAM_ACCESS (live_stream_id  int NOT NULL, uid_user int NOT NULL, FOREIGN KEY(live_stream_id) REFERENCES LIVE_STREAM(live_stream_id), FOREIGN KEY(uid_user) REFERENCES USERS(uid));
