import React,{ useEffect, useState }from 'react';
import './Followers.css';
import Follower from './Follower.js';

export default function Followers(props) {
   
    const[followers, setList] = useState(props.input_followers);
    const items = followers.map((follower)=>
        <Follower info={follower}/>
    );
    return(
        <div className="containers">
            {items}
        </div>
    );
}