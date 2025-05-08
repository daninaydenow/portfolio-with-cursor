import React from 'react';

const TechStack: React.FC = () => {
  return (
    <div className="tech-stack">
      <img 
        src="/Angular.svg" 
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
    </div>
  );
};

export default TechStack; 