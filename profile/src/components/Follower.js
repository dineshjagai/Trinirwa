import React,{useState} from 'react';
import logo from './goku.jpeg';

export default function Follower(props) {
    const[uid, setUid]= useState(props.info.uid);
    const[username, setUsername]= useState(props.info.username);
    const[picture, setPicture]= useState(props.info.profile_picture);
    return(
        
        <div style={{
            marginTop: "10px",
            marginLeft:"10px",
            }}  >
            <img style={{
                 width: "60px",
                 height: "60px",
                 borderRadius: "100px",
            }} src={props.info.profile_picture}></img>
            <p
            style={{
                margin: "auto"
            }}>{props.info.username}</p>
        </div>
    );
}