import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import '../../styles/Nav.css';

function Navbar({ currentUser, logoutUser }) {
    const history = useHistory();

    function logout() {
        logoutUser();
        history.push('/');
    }

    return (
        <nav className="navbar">
            <ul id="Nav-menu">
                <li><NavLink className="nav-head" to="/" exact><img className="nav-head" src={process.env.PUBLIC_URL+"/images/todo-logo.png"} alt="Home" width="100" height="60"/></NavLink></li>
                
                { currentUser 
                ? <li><button id="btn-logout" onClick={logout}>Log out</button></li> 
                : <>
                    <li><NavLink className="nav-link" to="/signup" exact>Sign up</NavLink></li>
                    <li><NavLink className="nav-link" to="/login" exact>Log in</NavLink></li>
                </>
                }
            </ul>
        </nav>
    );
}

export default Navbar;