import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import {
  useHistory, BrowserRouter as Router,
} from 'react-router-dom';
import { getAvatar } from './Module';
import { getCurrentUsername } from '../auth/authServices';
import Friends from './Friends';

export default function Sidebar() {
  const history = useHistory();
  const [avatar, setAvatar] = useState('');
  const handleClick = () => {
    const path = '/profile';
    history.push(path);
  };
  const user = getCurrentUsername();

  useEffect(() => {
    getAvatar(user).then((res) => {
      setAvatar(res.data.avatar[0].profile_picture);
    }).catch((err) => {
      console.log(err.message);
    });
  }, []);

  useEffect(() => {
  }, [avatar]);

  return (
    <Router>
      <div className="sidebar">
        <div style={{ marginBottom: '5px' }} className="bigButton">
          <button className="button_profile" onClick={handleClick} type="button">
            <div className="header_box">
              <div className="img_box">
                <img id="img" alt="" src={`/viewfile/${avatar}`} />
              </div>
              <div className="username_box">
                <span className="user">{user}</span>
              </div>
            </div>
          </button>
        </div>
        <div style={{ marginBottom: '5px' }}>
          <Friends />
        </div>
      </div>
    </Router>
  );
}
