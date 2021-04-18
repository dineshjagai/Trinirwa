import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './Displayer.css';
import 'bootstrap/dist/css/bootstrap.css';
import Divider from '@material-ui/core/Divider';
import DialogBox from './Dialog.js'

export default function Displayer({interests, addInterest, deleteInterest}){
    let items = [];
    interests.forEach(interest => {
        items.push(<li key={interest} onClick={() => deleteInterest(interest)} className= "badge rounded-pill bg-secondary m-2" key={interest}>
        {interest}
    </li>)
    });

    return(
        <div className="wrapper">
            <div className="section1">
                <ul>{items}</ul>
            </div>
            <Divider  variant="middle"/>
            <div className="section2">
                <DialogBox onClose = {addInterest}/>
            </div>
        </div>
        
    );
}


