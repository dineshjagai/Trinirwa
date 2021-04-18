
import './App.css';
import axios from "axios";
import Profile from './components/ProfilePicture';
import NavBar from './components/navBar';
import Displayer from './components/Displayer';
import Followers from './components/Followers';
import React, {useState, useEffect} from 'react';
import TweetDisplayer from './components/tweetDisplayer.js';

export default function App(props) {
  
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

