import React, { useContext, useState, useEffect } from 'react';
import './Sidebar.css';
import {
  useHistory, BrowserRouter as Router,
} from 'react-router-dom';
import idContext from './Context';
import { getAvatar } from './Module';

export default function Sidebar() {
  const history = useHistory();
  const [avatar, setAvatar] = useState('');
  const handleClick = () => {
    const path = '/profile';
    history.push(path);
  };
  const user = useContext(idContext);
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
    </Router>
  );
}
