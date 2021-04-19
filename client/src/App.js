import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Registration from "./components/Registration";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Route path="/" exact render={(props) => <Registration />} />
      <Route path="/registration" exact render={(props) => <Registration />} />
      <Route path="/login" exact render={(props) => <Login />} />

    </Router>
  );
}

export default App;
