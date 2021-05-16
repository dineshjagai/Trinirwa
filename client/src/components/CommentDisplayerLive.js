import React, { useEffect, useState } from 'react';
import './CommentDisplayer.css';
import { getAvatar } from './Module';

export default function CommentDisplayer({ data }) {
  const [avatar, setAvatar] = useState('');
  const getData = async () => {
    await getAvatar(data.user).then((res) => {
      setAvatar(res.data.avatar[0].profile_picture);
    }).catch((err) => {
      console.log(err.message);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="comment_cont" stlye={{ height: '200px', width: '100px', backgroundColor: 'red' }}>
      <div className="comment_header">
        <div className="header_profile">
          <img id="comment_picture" src={`/api/viewFile/${avatar}`} alt="" />
        </div>
        <div className="header_name">
          <span id="cmnt_username">{data.user}</span>
        </div>
      </div>
      <div className="cmnt_cntBtn_box" style={{ width: 'fit-content' }}>
        <div className="cmnt_cnt_box">
          <span id="cmnt_cnt">{data.content}</span>
        </div>
      </div>

    </div>
  );
}
