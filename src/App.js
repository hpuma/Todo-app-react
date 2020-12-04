import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import Navbar from './components/elements/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Footer from './components/elements/Footer';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

function App(props) {
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || null);

  useEffect( ()=> {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]); 

  function loginUser(authtoken, name) {
    const user = { 
      authtoken: authtoken,
      name: name,
    }        
    setCurrentUser(user);
  }

  function logoutUser() {
    setCurrentUser(null);
  }

  return (
    <Router>
      <div id="site-container">
        <Navbar logoutUser={logoutUser} currentUser={currentUser} />

        <Route path="/" exact>
          <Home currentUser={currentUser} />
        </Route>

        <Route path="/list/:listId">
          {!currentUser ? <Redirect to="/" />
          : <List />} 
        </Route>

        <Route path="/login">
          {currentUser ? <Redirect to="/" /> 
          : <Login loginUser={loginUser} />}
        </Route>

        <Route path="/signup">
          {currentUser ? <Redirect to="/" />
          : <Signup />}
        </Route>   


      <Footer />  
      </div>

    </Router>
  );
}

export default App;
