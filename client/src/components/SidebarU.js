import React from 'react';
import './Sidebar.css';
import {
  useHistory, BrowserRouter as Router,
} from 'react-router-dom';

export default function Sidebar() {
  const history = useHistory();
  const handleClick = () => {
    const path = '/profile';
    history.push(path);
  };
  return (
    <Router>
      <div className="sidebar">
        <button onClick={handleClick} type="button">
          <div className="header_box">
            <div className="img_box">
              <img id="img" alt="" src="https://images-na.ssl-images-amazon.com/images/I/81xbpmIZpYL._AC_SL1500_.jpg" />
            </div>
            <div className="username_box">
              <span className="user">Saitama</span>
            </div>
          </div>
        </button>
        <div>
          <span>hellow</span>
        </div>
      </div>
    </Router>
  );
}
