import React from 'react';
import './CommentInput.css';

export default function CommentInput({ handleComment }) {
  return (
    <div className="comment_box">
      <div className="commentInpCtn">
        <input
          id="commentInput"
          style={{
            border: '1px',
            borderRadius: '8px',
            height: '45px',
            width: '200px',
          }}
          className="commentInput"
          placeHolder="Comment on post"

        />
      </div>
      <div className="commentBtnCtn">
        <button onClick={handleComment} id="commentButton" type="button"> Comment</button>
      </div>
    </div>
  );
}
