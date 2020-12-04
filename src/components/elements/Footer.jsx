import React from 'react';
import '../../styles/Footer.css';

function Footer (props) {
    return (
        <div className="footer">
            <a href="https://lunchbox.io">
                <img 
                className="footer"
                src={process.env.PUBLIC_URL+"/images/lunchbox-logo.png"} 
                alt="Lunchbox" 
                width="170" 
                height="24"/>
            </a>
        </div>
    );
}

export default Footer;