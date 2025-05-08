import React from 'react';
import './App.css';
import TechStack from './components/TechStack';

const App: React.FC = () => {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>
      
      <section className="landing" id="about">
        <div className="landing-content">
          <div className="avatar-container">
            <img 
              src="/dani.jpg" 
              alt="Dani's portrait" 
              className="avatar-image"
            />
            <TechStack />
          </div>
          <div className="intro-text">
            <h1>Daniel Naydenov</h1>
            <p>A Senior FrontEnd Developer with a passion for style. I would love to help you build your next project. Checkout my portfolio and let's talk!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
