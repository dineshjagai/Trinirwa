/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import {
  Route, useHistory, BrowserRouter as Router, Link,
} from 'react-router-dom';
import './Sidebar.css';
import ProfilePage from './ProfilePage';
import idContext from './Context';
// import { getUsername } from './Module';

const SideBarData = [
  {
    title: 'Followers',
    path: '/followers',
    icon: <FaIcons.FaUserFriends />,
    cName: 'nav-text',
  },
];
function reload() {
  window.location.reload();
}

function SideBar() {
  // const [username, setUsername] = useState('');
  // getUsername(uid).then((result) => {
  //   setUsername(result.data.data[0].username);
  // });
  const history = useHistory();
  const handleClick = () => {
    const path = '/profile';
    history.push(path);
  };
  return (
    <Router>
      <div className="sidebar">
        <ul className="sidebar-items">
          <li className="nav-text">
            <div>
              <FaIcons.FaUserFriends onClick={handleClick} />
              <span style={{ fontWeight: 'bold' }}>{useContext(idContext)}</span>
            </div>
          </li>
          {SideBarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link onClick={reload} to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Route path="/profile" component={() => <ProfilePage uid={1220} />} />
    </Router>

  );
}

export default SideBar;
