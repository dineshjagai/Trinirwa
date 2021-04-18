CREATE TABLE USERS (uid int NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL UNIQUE, first_name text NOT NULL, last_name text NOT NULL, email text NOT NULL, password text NOT NULL, profile_picture text NOT NULL, followers_count int NOT NULL, is_logged_in  boolean NOT NULL, tweets_count int NOT NULL, location text NOT NULL, is_live int NOT NULL, PRIMARY KEY(uid));

CREATE TABLE USERS_AUTH (uid int NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL UNIQUE, password text NOT NULL, FOREIGN KEY(uid) REFERENCES USERS(uid), FOREIGN KEY(username) REFERENCES USERS(username));

CREATE TABLE INTERESTS (interests_uid int NOT NULL, interest char(255) NOT NULL, CONSTRAINT temp UNIQUE (interests_uid , interest), FOREIGN KEY(interests_uid) REFERENCES USERS(uid) ON DELETE CASCADE);
 
CREATE TABLE FOLLOWERS (uid_user_one int NOT NULL, uid_user_two int NOT NULL, FOREIGN KEY(uid_user_one) REFERENCES USERS(uid) ON DELETE CASCADE, FOREIGN KEY(uid_user_two) REFERENCES USERS(uid) ON DELETE CASCADE);

CREATE TABLE TWEETS (uid int NOT NULL, tweet_id  int NOT NULL AUTO_INCREMENT, type text, content text,  tweet_date datetime, tweet_likes int NOT NULL, PRIMARY KEY (tweet_id), FOREIGN KEY (uid) REFERENCES USERS(uid));

CREATE TABLE COMMENTS (tweet_id_one int NOT NULL, tweet_id_two int NOT NULL, FOREIGN KEY(tweet_id_one) REFERENCES TWEETS (tweet_id), FOREIGN KEY(tweet_id_two) REFERENCES TWEETS (tweet_id));

CREATE TABLE MESSAGES (uid_user_one int NOT NULL, uid_user_two int NOT NULL, mesage_date datetime NOT NULL, message text, FOREIGN KEY(uid_user_one) REFERENCES USERS(uid), FOREIGN KEY(uid_user_two) REFERENCES USERS(uid));

CREATE TABLE LIVE_STREAM  (live_stream_id int NOT NULL, subject varchar(255) NOT NULL, uid_host int NOT NULL, live_stream_date  datetime NOT NULL, Is_public boolean NOT NULL,  PRIMARY KEY(live_stream_id));

CREATE TABLE LIVESTREAM_ACCESS (live_stream_id  int NOT NULL, uid_user int NOT NULL, FOREIGN KEY(live_stream_id) REFERENCES LIVE_STREAM(live_stream_id), FOREIGN KEY(uid_user) REFERENCES USERS(uid));