import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import { Link, useHistory,  BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";


export default function Login() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  const [loginStatus, setLoginStatus] = useState("");
  const [isLoggedIn, setLoginBool ] = useState(false);
  Axios.defaults.withCredentials = true;

  const login = async () => {
    Axios.post("/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
        alert(response.data.message);
        history.push('/login/');

      } else {
        setLoginBool(true);
        setLoginStatus(response.data[0].username);
        history.push('/home/');
      }
    });
  };
  
 let loggedInHtml =   <Router>
 <div className="card shadow mx-auto mt-5" style={{ width: '30rem' }}>
<div className="container mx-1">
  <div className="card-body p-xs">
    <h2 className="card-title text-center font-weight-bold">Log In</h2>
    <div className="form-group">
      <label>Username:</label>
      <input
        id="new-username-form"
        className="form-control"
        onChange={e => setUsername(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label>Password:</label>
      <input
        type="password"
        className="form-control"
        onChange={e => setPassword(e.target.value)}
      />
    </div>
    <div className="form-group text-center">
      <Link to ="/home">
      <button
        type="button"
        className="btn btn-primary w-100"
        onClick={login}>Log In
      </button>
      </Link>
      
    </div>
    <p>
      Don&apos;t have an account?&nbsp;
      <Link to="/registration">Sign Up!</Link>
    </p>
  </div>
</div>
</div>
<Route path="/home" component={() => <Home/>}/>

</Router>;

let notLoggedIn =  <Router>
<div className="card shadow mx-auto mt-5" style={{ width: '30rem' }}>
<div className="container mx-1">
 <div className="card-body p-xs">
   <h2 className="card-title text-center font-weight-bold">Log In</h2>
   <div className="form-group">
     <label>Username:</label>
     <input
       id="new-username-form"
       className="form-control"
       onChange={e => setUsername(e.target.value)}
     />
   </div>
   <div className="form-group">
     <label>Password:</label>
     <input
       type="password"
       className="form-control"
       onChange={e => setPassword(e.target.value)}
     />
   </div>
   <div className="form-group text-center">
     <Link to ="/home">
     <button
       type="button"
       className="btn btn-primary w-100"
       onClick={login}>Log In
     </button>
     </Link>
     
   </div>
   <p>
     Don&apos;t have an account?&nbsp;
     <Link to="/registration">Sign Up!</Link>
   </p>
 </div>
</div>
</div>
<Route path="/login" exact render={(props) => <Login />} />
</Router>;

if (isLoggedIn == true)
 {
     return (
        loggedInHtml
  ) 
} else {
  return (
  notLoggedIn
  )
}
}
