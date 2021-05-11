-- CREATE TABLE USERS_AUTH (uid int NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL UNIQUE, password text NOT NULL, PRIMARY KEY(uid));

CREATE TABLE `USERS` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_picture` text,
  `followers_count` int(10) unsigned zerofill DEFAULT NULL,
  `is_logged_in` tinyint(1) DEFAULT NULL,
  `tweets_count` int(10) unsigned zerofill DEFAULT NULL,
  `location` text,
  `is_live` int(10) unsigned zerofill DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1215 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE INTERESTS (interests_uid int NOT NULL, interest char(255) NOT NULL, CONSTRAINT temp UNIQUE (interests_uid , interest), FOREIGN KEY(interests_uid) REFERENCES USERS(uid) ON DELETE CASCADE);
 
CREATE TABLE FOLLOWERS (uid_user_one int NOT NULL, uid_user_two int NOT NULL, FOREIGN KEY(uid_user_one) REFERENCES USERS(uid) ON DELETE CASCADE, FOREIGN KEY(uid_user_two) REFERENCES USERS(uid) ON DELETE CASCADE);

CREATE TABLE TWEETS (uid int NOT NULL, tweet_id  int NOT NULL AUTO_INCREMENT, type text, content text,  tweet_date datetime, tweet_likes int NOT NULL, PRIMARY KEY (tweet_id), FOREIGN KEY (uid) REFERENCES USERS(uid));

CREATE TABLE COMMENTS (tweet_id_one int NOT NULL, tweet_id_two int NOT NULL, FOREIGN KEY(tweet_id_one) REFERENCES TWEETS (tweet_id), FOREIGN KEY(tweet_id_two) REFERENCES TWEETS (tweet_id));

CREATE TABLE MESSAGES (uid_user_one int NOT NULL, uid_user_two int NOT NULL, mesage_date datetime NOT NULL, message text, FOREIGN KEY(uid_user_one) REFERENCES USERS(uid) ON DELETE CASCADE, FOREIGN KEY(uid_user_two) REFERENCES USERS(uid) ON DELETE CASCADE);

CREATE TABLE LIVE_STREAM  (live_stream_id int NOT NULL, subject varchar(255) NOT NULL, uid_host int NOT NULL, live_stream_date  datetime NOT NULL, Is_public boolean NOT NULL,  PRIMARY KEY(live_stream_id));

CREATE TABLE LIVESTREAM_ACCESS (live_stream_id  int NOT NULL, uid_user int NOT NULL, FOREIGN KEY(live_stream_id) REFERENCES LIVE_STREAM(live_stream_id), FOREIGN KEY(uid_user) REFERENCES USERS(uid));