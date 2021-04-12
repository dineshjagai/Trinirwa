import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import './Displayer.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import Divider from '@material-ui/core/Divider';
import DialogBox from './Dialog.js'
export default function Displayer(props){
    const[interests, setInterests]= useState(props.interests);
    function handleDelete(interes){
        const delUrl= '/profile/delete/interest/'+ props.id;
        axios({
            method: 'DELETE',
            url: delUrl,
            data: {
                interest: interes,
            }
        });
        const Newinterests = interests.filter(interest=> interest != interes);
        setInterests(Newinterests);
    }
    const items = interests.map((interest)=>
        <li  onClick= {()=>handleDelete(interest)} className= "badge rounded-pill bg-secondary m-2" key={interest}>
            {interest}
        </li>
    );

    return(
        <div className="wrapper">
            <div className="section1">
                <ul >{items}</ul>
            </div>
            
            <Divider  variant="middle"/>
            <div className="section2">
                <DialogBox onDelete id={props.id}/>
            </div>
        </div>
        
    );
}


