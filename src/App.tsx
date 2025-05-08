import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import TechStack from './components/TechStack';

const App: React.FC = () => {
  const skillsTitleRef = useRef<HTMLHeadingElement>(null);
  const [skillsTitleVisible, setSkillsTitleVisible] = useState(false);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

  // Animate skills title
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setSkillsTitleVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (skillsTitleRef.current) {
      observer.observe(skillsTitleRef.current);
    }
    return () => {
      if (skillsTitleRef.current) {
        observer.unobserve(skillsTitleRef.current);
      }
    };
  }, []);

  // Update hash on scroll
  useEffect(() => {
    const sections = [
      { ref: aboutRef, hash: '#about' },
      { ref: skillsRef, hash: '#skills' },
    ];
    const handleScroll = () => {
      let found = false;
      for (const section of sections) {
        const el = section.ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            if (window.location.hash !== section.hash) {
              window.history.replaceState(null, '', section.hash);
            }
            found = true;
            break;
          }
        }
      }
      // If no section is found, clear the hash
      if (!found && window.location.hash) {
        window.history.replaceState(null, '', ' ');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>
      
      <section className="landing" id="about" ref={aboutRef}>
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

      <section className="skills-section" id="skills" ref={skillsRef}>
        <div className="skills-content">
          <h2 ref={skillsTitleRef} className={`skills-title${skillsTitleVisible ? ' visible' : ''}`}>Checkout my awesome skills!</h2>
          <ul className="skills-list">
            <li className="skill-item">
              <span className="skill-icon"><img src="/Angular.svg" alt="Angular" /></span>
              <div>
                <h3>Angular</h3>
                <p>3 years of professional experience with version ranging from 7 to 17. Legacy or latest - I got you covered.</p>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-icon"><img src="/material.png" alt="Angular Material" style={{width: '28px', height: '28px'}} /></span>
              <div>
                <h3>Angular Material</h3>
                <p>Angular's best friend. Same versioning range - 3 years of experience.</p>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-icon"><img src="/rxjs.svg" alt="RxJs" style={{width: '28px', height: '28px'}} /></span>
              <div>
                <h3>RxJs</h3>
                <p>The power of reactivity, in the palms of your hands - 3 years of experience.</p>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-icon"><img src="/js.svg" alt="JS" style={{width: '28px', height: '28px'}} /><img src="/html-5.svg" alt="HTML" style={{width: '28px', height: '28px', marginLeft: '4px'}} /><img src="/css-3.svg" alt="CSS" style={{width: '28px', height: '28px', marginLeft: '4px'}} /></span>
              <div>
                <h3>JS, HTML, CSS</h3>
                <p>It goes without saying, web's holly trinity - 4 years of experience.</p>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-icon"><img src="/git.svg" alt="Git" style={{width: '28px', height: '28px'}} /><img src="/jira.svg" alt="Jira" style={{width: '28px', height: '28px', marginLeft: '4px'}} /></span>
              <div>
                <h3>Git and Github/Bitbucket</h3>
                <p>No version will remain uncontrolled - 4 years of experience.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default App;
