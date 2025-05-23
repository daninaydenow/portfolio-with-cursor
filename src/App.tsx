import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import TechStack from './components/TechStack';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const skillsTitleRef = useRef<HTMLHeadingElement>(null);
  const [skillsTitleVisible, setSkillsTitleVisible] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [cardVisible, setCardVisible] = useState(Array(9).fill(false));
  const socialLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [socialLinksVisible, setSocialLinksVisible] = useState(Array(3).fill(false));
  const contactTitleRef = useRef<HTMLHeadingElement>(null);
  const [contactTitleVisible, setContactTitleVisible] = useState(false);

  // Animate skills title
  useEffect(() => {
    const ref = skillsTitleRef.current;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setSkillsTitleVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (ref) {
      observer.observe(ref);
    }
    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, []);

  // Show avatar after hero text animation
  useEffect(() => {
    const timeout = setTimeout(() => setShowAvatar(true), 1900);
    return () => clearTimeout(timeout);
  }, []);

  // Animate social links on scroll
  useEffect(() => {
    const refs = [...socialLinkRefs.current];
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setSocialLinksVisible(prev => {
              const updated = [...prev];
              updated[index] = entry.isIntersecting;
              return updated;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Update hash on scroll
  useEffect(() => {
    const sections = [
      { ref: aboutRef, hash: '#about' },
      { ref: skillsRef, hash: '#skills' },
      { ref: contactRef, hash: '#contact' },
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
    const refs = [...cardRefs.current];
    const observers: IntersectionObserver[] = [];
    refs.forEach((ref, i) => {
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
        if (refs[i]) observer.unobserve(refs[i]!);
      });
    };
  }, []);

  // Animate contact title on scroll
  useEffect(() => {
    const ref = contactTitleRef.current;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setContactTitleVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (ref) {
      observer.observe(ref);
    }
    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
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
              src="/dani.png" 
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
              <a href="https://angular.dev" target="_blank" rel="noopener noreferrer" className="skill-link">
                <span className="skill-icon"><img src="/angular.svg" alt="Angular" style={{width: '28px', height: '28px'}} /></span>
              </a>
              <div>
                <h3>Angular</h3>
                <p>3 years of professional experience with version ranging from 7 to 17. Legacy or latest - I got you covered.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[1] ? ' visible' : ''}`} ref={el => { cardRefs.current[1] = el; }}>
              <a href="https://material.angular.io/" target="_blank" rel="noopener noreferrer" className="skill-link">
                <span className="skill-icon"><img src="/material.png" alt="Angular Material" style={{width: '28px', height: '28px'}} /></span>
              </a>
              <div>
                <h3>Angular Material</h3>
                <p>Angular's best friend. Same versioning range - 3 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[2] ? ' visible' : ''}`} ref={el => { cardRefs.current[2] = el; }}>
              <a href="https://rxjs.dev/guide/overview" target="_blank" rel="noopener noreferrer" className="skill-link">
                <span className="skill-icon"><img src="/rxjs.svg" alt="RxJs" style={{width: '28px', height: '28px'}} /></span>
              </a>
              <div>
                <h3>RxJs</h3>
                <p>The power of reactivity, in the palms of your hands - 3 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[3] ? ' visible' : ''}`} ref={el => { cardRefs.current[3] = el; }}>
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className="skill-link">
                <span className="skill-icon"><img src="/js.svg" alt="JS" style={{width: '28px', height: '28px'}} /></span>
              </a>
              <div>
                <h3>JS</h3>
                <p>It goes without saying - member of web's holly trinity - 4 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[4] ? ' visible' : ''}`} ref={el => { cardRefs.current[4] = el; }}>
              <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" className="skill-link">
                <span className="skill-icon"><img src="/html-5.svg" alt="HTML" style={{width: '28px', height: '28px', marginLeft: '4px'}} /></span>
              </a>
              <div>
                <h3>HTML</h3>
                <p>It goes without saying - member of web's holly trinity - 4 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[5] ? ' visible' : ''}`} ref={el => { cardRefs.current[5] = el; }}>
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer" className="skill-link">
                <span className="skill-icon"><img src="/css-3.svg" alt="CSS" style={{width: '28px', height: '28px', marginLeft: '4px'}} /></span>
              </a>
              <div>
                <h3>CSS</h3>
                <p>It goes without saying - member of web's holly trinity - 4 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[6] ? ' visible' : ''}`} ref={el => { cardRefs.current[6] = el; }}>
              <a href="https://git-scm.com/doc" target="_blank" rel="noopener noreferrer" className="skill-link">
                <span className="skill-icon"><img src="/git.svg" alt="Git" style={{width: '28px', height: '28px'}} /></span>
              </a>
              <div>
                <h3>Git and Github/Bitbucket</h3>
                <p>No version will remain uncontrolled - 4 years of experience.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[7] ? ' visible' : ''}`} ref={el => { cardRefs.current[7] = el; }}>
              <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="skill-link">
                <span className="skill-icon"><img src="/react.svg" alt="React" style={{width: '28px', height: '28px'}} /></span>
              </a>
              <div>
                <h3>React</h3>
                <p>React - 3 years of react experience.This portfolio was built using react.</p>
              </div>
            </li>
            <li className={`skill-item${cardVisible[8] ? ' visible' : ''}`} ref={el => { cardRefs.current[8] = el; }}>
              <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer" className="skill-link">
                <span className="skill-icon"><img src="/docker.svg" alt="Docker" style={{width: '28px', height: '28px'}} /></span>
              </a>
              <div>
                <h3>Docker</h3>
                <p>Package and deploy your application with ease - 4 years of experience.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="contact-section" id="contact" ref={contactRef}>
        <div className="contact-content">
          <h2 ref={contactTitleRef} className={`contact-title${contactTitleVisible ? ' visible' : ''}`}>Let's Connect!</h2>
          <div className="social-links">
            <a 
              href="https://github.com/daninaydenow" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`social-link github${socialLinksVisible[0] ? ' visible' : ''}`}
              ref={el => { socialLinkRefs.current[0] = el; }}
            >
              <div className="social-icon">
                <img src="/github.svg" alt="GitHub" />
              </div>
              <h3>GitHub</h3>
              <p>Check out my projects and contributions</p>
            </a>
            <a 
              href="https://linkedin.com/in/daniel-naydenov-131a7321b" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`social-link linkedin${socialLinksVisible[1] ? ' visible' : ''}`}
              ref={el => { socialLinkRefs.current[1] = el; }}
            >
              <div className="social-icon">
                <img src="/linkedin.svg" alt="LinkedIn" />
              </div>
              <h3>LinkedIn</h3>
              <p>Connect with me professionally</p>
            </a>
            <a 
              href="https://discord.gg/egGqURzW" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`social-link discord${socialLinksVisible[2] ? ' visible' : ''}`}
              ref={el => { socialLinkRefs.current[2] = el; }}
            >
              <div className="social-icon">
                <img src="/discord.svg" alt="Discord" />
              </div>
              <h3>Discord</h3>
              <p>Let's chat and collaborate</p>
            </a>
          </div>
        </div>
      </section>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
};

export default App;
