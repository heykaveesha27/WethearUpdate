import React, { useState } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import tag from '../assets/images/TAG.png';


const Landing = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisterActive, setRegisterActive] = useState(false);

  const handleRegisterClick = () => {
    setRegisterActive(true);
  };

  const handleLoginClick = () => {
    setRegisterActive(false);
  };

  const handlePopupClick = () => {
    setLoginVisible(true);
  };

  const handleCloseClick = () => {
    setLoginVisible(false);
  };

  return (
    <div>
      
      <header>
        <img src={tag} className='logo' alt="" />
        <nav className="navigation">
        {/* <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a> */}
          
            <Link to="/login" className="btnLogin-popup" id="login1" onClick={handlePopupClick}>Login</Link>
            
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Our Website</h1>
        <p>
          This is a web project created to display weather conditions in a certain place input by the user.
        </p>
        <button className="btnExplore">Explore More</button>
      </section>

      
      <section className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Feature 1</h3>
            <p>User can register and login using Email and a password provided by themselves.</p>
          </div>
          <div className="card">
            <h3>Feature 2</h3>
            <p>User can type completely or select a certain place from the suggestions</p>
          </div>
          <div className="card">
            <h3>Feature 3</h3>
            <p>User can view weather information for today and forecast for upcoming two weeks.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-content">
          <h3 className='font-thin'>WEATHER UPDATE</h3>
          <p>
            We are dedicated to delivering the best services to our customers. Stay connected with
            us through our social media channels.
          </p>
          <div className="social-icons">
            <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
            <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
            <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
            <a href="#"><ion-icon name="logo-linkedin"></ion-icon></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 WEATHER-UPDATE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;