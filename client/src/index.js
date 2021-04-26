import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />, document.getElementById("react-root"));



// ReactDOM.render(
//   <React.StrictMode>
//     <App id = {3}/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

/*import reportWebVitals from './reportWebVitals';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

const uid = 3;

ReactDOM.render(
    <Router>
      <Switch>
        {/*<Route path={"/profile/"+uid} component={() => <ProfilePage id={uid}/>}/>*///}
        /*<Route path="/home" component={() => <Home uid={uid} username={"Anaick"}/>}/>
      </Switch>
    </Router>,
  document.getElementById('root')
);*/


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
