import React, { useState, useEffect } from 'react';
import styles from './Ideation.module.scss';

const Ideation: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
  };

  return (
    <div className={styles.ideationPanel}>
      <div data-testid="ideation-parallax-container" className={styles.parallaxContainer} style={parallaxStyle}>
        {/* Parallax items will go here */}
      </div>
    </div>
  );
};

export default Ideation;
