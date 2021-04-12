import React,{ useState }from 'react';
import './Followers.css';
import Follower from './Follower.js';

export default function Followers(props) {
    const[followers, setList] = useState(props.followers);
    const items = followers.map((follower)=>
        <Follower info={follower}/>
    );
    console.log(items);
    return(
        <div className="containers">
            {items}
        </div>
    );
}