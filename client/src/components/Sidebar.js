import React from 'react';
import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import './Sidebar.css';
import ProfilePage from "./ProfilePage"
import { useHistory } from 'react-router-dom'


const SideBarData = [
  {
    title: 'Followers',
    path: '/followers',
    icon: <FaIcons.FaUserFriends />,
    cName: 'nav-text',
  },
];
function reload () {
    window.location.reload();
}

function SideBar(props) {
  const profile = `/profile/${props.uid}`;
  const { username } = props;
  return (
        <Router>
            <div className="sidebar">
                <ul className='sidebar-items'>
                    <li className='nav-text'>
                        <Link to={profile}>
                            <FaIcons.FaUserFriends />
                            <span>{username}</span>
                        </Link>
                    </li>
                    {SideBarData.map((item, index) => (
                            <li key={index} className={item.cName}>
                                <Link onClik={reload} to={item.path}>
                                    {item.icon} 
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>      
            </div>  
            <Route path="/profile" component={() => <ProfilePage/>}/>
        </Router>

  );
}

export default SideBar;
