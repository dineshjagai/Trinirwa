import React, { useEffect, useState } from 'react';
import './CommentDisplayer.css';
import DialogComment from './DialogComment';
import { getCurrentUsername } from '../auth/authServices';
import { getAvatar, updateComment } from './Module';

export default function CommentDisplayer({ data, handleDeleteComment }) {
  const [avatar, setAvatar] = useState('');
  const [content, setContent] = useState(data.content);
  const user = getCurrentUsername();
  const isOwner = data.user === user;
  const getData = async () => {
    await getAvatar(data.user).then((res) => {
      setAvatar(res.data.avatar[0].profile_picture);
    }).catch((err) => {
      console.log(err.message);
    });
  };

  const updatePost = (newContent) => {
    if (newContent === '') {
      return;
    }
    setContent(newContent);
    updateComment(data.comm_id, newContent).then((res) => {
      console.log(res.message);
    }).catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="comment_cont" stlye={{ height: '200px', width: '100px', backgroundColor: 'red' }}>
      <div className="comment_header">
        <div className="header_profile">
          <img id="comment_picture" src={`/viewFile/${avatar}`} alt="" />
        </div>
        <div className="header_name">
          <span id="cmnt_username">{data.user}</span>
        </div>
      </div>
      <div className="cmnt_cntBtn_box" style={{ width: 'fit-content' }}>
        <div className="cmnt_cnt_box">
          <span id="cmnt_cnt">{content}</span>
        </div>
        <div className="cmnt_btns_box">
          <div style={{ display: isOwner ? 'block' : 'none' }} className="cmnt_EditBtn_box">
            <DialogComment id={data.comm_id} updatePost={updatePost} content={content} />
          </div>
          <div style={{ display: isOwner ? 'block' : 'none' }} className="cmnt_EditBtn_box">
            <button onClick={() => handleDeleteComment(data.comm_id)} id="deleteBtn" type="button">Delete</button>
          </div>
        </div>
      </div>

    </div>
  );
}