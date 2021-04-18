import React, { Component, Profiler } from 'react';
import axios from 'axios';
import './Profile.css';

export default function Profile(props){
    let input = props.picture;
    return(
        <div className= "pictures">
            <img className = "pictures" src = {props.picture.profile_picture} id = "overlay"></img>
            <img className="pictures" src = {props.picture.profile_picture} id = "originalDiv"></img>
        </div>
    );
}