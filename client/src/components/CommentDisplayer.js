import React from 'react';
import './CommentDisplayer.css';

export default function CommentDisplayer() {
  return (
    <div className="comment_cont" stlye={{ height: '200px', width: '100px', backgroundColor: 'red' }}>
      <div className="comment_header">
        <div className="header_profile">
          <img id="comment_picture" src="https://img.mipon.org/wp-content/uploads/2019/04/05164321/saitama-one-punch-man-oppai-shirt1-1024x569.jpg" alt="" />
        </div>
        <div className="header_name">
          <span id="cmnt_username">name</span>
        </div>
      </div>
      <div className="cmnt_cnt_box">
        <span id="cmnt_cnt">to is the end</span>
      </div>
      <div className="comment_EditBtn_box">
        <button id="editBtn" type="button">Edit</button>
      </div>
    </div>
  );
}
