import axios from "axios";
import Profile from './ProfilePicture';
import NavBar from './navBar';
import Displayer from './Displayer';
import Followers from './Followers';
import React, {useState, useEffect} from 'react';
import TweetDisplayer from './tweetDisplayer.js';
import { BrowserRouter as Router, Route } from "react-router-dom";


export default function ProfilePage(props) {
  
  const url = "/profile/"+props.id;
    const[info, setData] = useState([{}]);
    const[followers, setFollowers] = useState({});
    const[interests, setInterests] = useState(new Set());
    const [made_query, setMadeQuery] = useState(false);
    const[tweets, setTweets] = useState([{}]);
    const [childKey, setChildKey] = useState(0);
  
  const fetchTweets = ()=>{
      const getUrl = '/profile/tweet/3';
      axios({
        method: 'GET',
        url: getUrl,
      }).then((result)=>{
          setTweets(result.data);
      });
}
   
  useEffect(()=>{
    axios({
      method: 'get',
      url: url
    }).then((result)=>{
        setData(result.data.data[0]);
        setFollowers(result.data.followers);
        let interests = new Set((result.data.interests).map(obj=>obj.interest))
        setInterests(interests);
        setMadeQuery(true);
        fetchTweets();
     });
  }, []);
 
  const addInterest  = (newInterest) => {
    setInterests([...interests, newInterest])
    setChildKey(Math.floor(Math.random() * 1000000000))
    const addUrl = '/profile/interest/3';
    axios({
        method: 'POST',
        url: addUrl,
        data: {
            interest: newInterest,
        }
    });
}


const deleteInterest = (interes)=>{
        let temp = interests;
        temp.delete(interes);
        setInterests(temp);
        setChildKey(Math.floor(Math.random() * 1000000000))
        const delUrl= `/profile/delete/interest/${3}`;//props.id;
        axios({
            method: 'DELETE',
            url: delUrl,
            data: {
                interest: interes,
            }
        });
    }

  return made_query ? (
    <div className="profile">
      
       <NavBar/>
       <div>
          <Profile picture= {info}/>
          <br></br>
          <br></br>
       </div>
        <div className = "center"> 
        
           <Displayer key={childKey} id = {3} interests={interests} addInterest = {addInterest} deleteInterest={deleteInterest}/>
            <br></br>
          <Followers input_followers={followers}/> 
        </div>
        <div id = "center"className="center">
           <TweetDisplayer tweets={tweets}/> 
        </div>
    </div>
  ) : <div></div>;
}


export default ProfilePage;