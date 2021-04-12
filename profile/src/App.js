
import './App.css';
import axios from "axios";
import Profile from './components/ProfilePicture';
import NavBar from './components/navBar';
import Displayer from './components/Displayer';
import Followers from './components/Followers';
import React, {useState, useEffect} from 'react';
import Follower from './components/Follower';

export default function App(props) {
  const url = "/profile/"+props.id;
   const[data, setData] = useState(0);
  const getData = ()=>{axios.get(url).then((response)=>{
    setData(response.data);   
    });
  };
  
  const foll= [{"uid":3,"username":"Ida3","profile_picture":"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"}, 
  {"uid":2,"username":"Ida","profile_picture":"https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg"}];
  const inter = ['soccer', "Bitcoin", "debate",'soccer1', "Bitcoin1", "debate1"];
  return (
    <div className="profile">
      <NavBar onclick/>
      <Profile picture= {"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"}/>
      <br></br>
      <div>
        <Displayer id = {1} interests={inter}/>
        <br></br>
        <Followers followers ={foll}/>
      </div>
      
    </div>
  );
  
}
