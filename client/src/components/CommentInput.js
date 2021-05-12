import React from 'react';
import './CommentInput.css';

export default function CommentInput() {
  return (
    <div className="comment_box">
      <div className="commentInpCtn">
        <input
          style={{
            border: 'none',
            borderRadius: '8px',
            height: '45px',
          }}
          className="commentInput"
          placeHolder="Comment on post"

        />
      </div>
      <div className="commentBtnCtn">
        <button id="commentButton" type="button"> Comment</button>
      </div>
    </div>
  );
}
