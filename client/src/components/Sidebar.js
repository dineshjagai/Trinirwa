import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { BrowserRouter as Router, Link } from "react-router-dom";
import './Sidebar.css';

const SideBarData = [
    {
        title: 'Followers',
        path: '/followers',
        icon: <FaIcons.FaUserFriends />,
        cName: 'nav-text'
    }
];

function SideBar(props) {
    const profile = "/profile/"+props.uid;
    const username = props.username;
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
                    {SideBarData.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon} 
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>      
            </div>  
        </Router>
   
    );
}

export default SideBar;