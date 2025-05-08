import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import TechStack from './components/TechStack';

const App: React.FC = () => {
  const skillsTitleRef = useRef<HTMLHeadingElement>(null);
  const [skillsTitleVisible, setSkillsTitleVisible] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [cardVisible, setCardVisible] = useState(Array(9).fill(false));

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

  // Show avatar after hero text animation
  useEffect(() => {
    const timeout = setTimeout(() => setShowAvatar(true), 1900);
    return () => clearTimeout(timeout);
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

  // Animate skill cards on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          setCardVisible((prev) => {
            const updated = [...prev];
            updated[i] = entry.isIntersecting;
            return updated;
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => {
      observers.forEach((observer, i) => {
        if (cardRefs.current[i]) observer.unobserve(cardRefs.current[i]!);
      });
    };
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
          <div className={`avatar-container${showAvatar ? ' avatar-visible' : ''}`}>
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
            <li className={`skill-item${cardVisible[0] ? ' visible' : ''}`} ref={el => { cardRefs.current[0] = el; }}>
              <span className="skill-icon"><img src="/Angular.svg" alt="Angular" /></span>
              <div>
                <h3>Angular</h3>
                <p>3 years of professional experience with version ranging from 7 to 17. Legacy or latest - I got you covered.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[1] ? ' visible' : ''}`} ref={el => { cardRefs.current[1] = el; }}>
              <span className="skill-icon"><img src="/material.png" alt="Angular Material" style={{width: '28px', height: '28px'}} /></span>
              <div>
                <h3>Angular Material</h3>
                <p>Angular's best friend. Same versioning range - 3 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[2] ? ' visible' : ''}`} ref={el => { cardRefs.current[2] = el; }}>
              <span className="skill-icon"><img src="/rxjs.svg" alt="RxJs" style={{width: '28px', height: '28px'}} /></span>
              <div>
                <h3>RxJs</h3>
                <p>The power of reactivity, in the palms of your hands - 3 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[3] ? ' visible' : ''}`} ref={el => { cardRefs.current[3] = el; }}>
              <span className="skill-icon"><img src="/js.svg" alt="JS" style={{width: '28px', height: '28px'}} /></span>
              <div>
                <h3>JS</h3>
                <p>It goes without saying, web's holly trinity - 4 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[4] ? ' visible' : ''}`} ref={el => { cardRefs.current[4] = el; }}>
              <span className="skill-icon"><img src="/html-5.svg" alt="HTML" style={{width: '28px', height: '28px', marginLeft: '4px'}} /></span>
              <div>
                <h3>HTML</h3>
                <p>It goes without saying, web's holly trinity - 4 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[5] ? ' visible' : ''}`} ref={el => { cardRefs.current[5] = el; }}>
              <span className="skill-icon"><img src="/css-3.svg" alt="CSS" style={{width: '28px', height: '28px', marginLeft: '4px'}} /></span>
              <div>
                <h3>CSS</h3>
                <p>It goes without saying, web's holly trinity - 4 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[6] ? ' visible' : ''}`} ref={el => { cardRefs.current[6] = el; }}>
              <span className="skill-icon"><img src="/git.svg" alt="Git" style={{width: '28px', height: '28px'}} /></span>
              <div>
                <h3>Git and Github/Bitbucket</h3>
                <p>No version will remain uncontrolled - 4 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[7] ? ' visible' : ''}`} ref={el => { cardRefs.current[7] = el; }}>
              <span className="skill-icon"><img src="/react.svg" alt="React" style={{width: '28px', height: '28px'}} /></span>
              <div>
                <h3>React</h3>
                <p>React - 3 years of react experience.This portfolio was built using react.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[8] ? ' visible' : ''}`} ref={el => { cardRefs.current[8] = el; }}>
              <span className="skill-icon"><img src="/docker.svg" alt="Docker" style={{width: '28px', height: '28px'}} /></span>
              <div>
                <h3>Docker</h3>
                <p>Package and deploy your application with ease - 4 years of experience.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default App;
