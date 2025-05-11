import React from 'react';

const TechStack: React.FC = () => {
  return (
    <div className="tech-stack">
      <img 
        src="/angular.svg" 
        alt="Angular" 
        className="tech-icon angular"
      />
      <img 
        src="/rxjs.svg" 
        alt="RxJS" 
        className="tech-icon rxjs"
      />
      <img 
        src="/typescript.svg" 
        alt="TypeScript" 
        className="tech-icon typescript"
      />
      <img 
        src="/material.png" 
        alt="Material" 
        className="tech-icon material"
      />
      <img 
        src="/js.svg" 
        alt="JavaScript" 
        className="tech-icon js"
      />
      <img 
        src="/html-5.svg" 
        alt="HTML" 
        className="tech-icon html"
      />
      <img 
        src="/css-3.svg" 
        alt="CSS" 
        className="tech-icon css"
      />
      <img 
        src="/docker.svg" 
        alt="Docker" 
        className="tech-icon docker"
      />
      <img 
        src="/git.svg" 
        alt="Git" 
        className="tech-icon git"
      />
      <img 
        src="/jira.svg" 
        alt="Jira" 
        className="tech-icon jira"
      />
    </div>
  );
};

export default TechStack; 