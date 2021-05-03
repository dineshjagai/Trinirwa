import React, { useState } from 'react';
import './CommentBox.css';

export default function CommentBox() {
  const [comment, setComment] = useState('');

  const onCancel = () => {
    setComment('');
  };

  const onChange = (event) => {
    setComment(event.target.value);
  };

  const postTweet = (event) => {
    // implement posting tweet
  };

  const deleteTweet = (event) => {
    // implement posting tweet
  };

  const commnentOnTweet = (event) => {
    // implement comment on tweet
  };

  return (
        <div className="commentBox">
           <form action="#" method="post">
				<input type="text" onChange={onChange} value={comment} placeholder="What's on your mind?"></input>
                <div class="btn">
                    <button type="submit" className="comment" disabled={comment.length < 1} onClick={postTweet}>COMMENT</button>
                    <button type="button" className="cancel" onClick={onCancel}>CANCEL</button>
                </div>
            </form>
        </div>
  );
}
