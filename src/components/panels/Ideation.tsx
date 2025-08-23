import React, { useState, useEffect } from 'react';
import styles from './Ideation.module.scss';
import NeuralNetwork from './ideation/NeuralNetwork';

/**
 * The main component for the Ideation panel.
 * This component orchestrates the parallax effect and renders the neural network animation.
 */
const Ideation: React.FC = () => {
  // State to store the current mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  /**
   * Handles the mouse move event and updates the mouse position state.
   * @param e The mouse event.
   */
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Effect to add and remove the mouse move event listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Style for the parallax container, which moves based on the mouse position
  const parallaxStyle = {
    transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
  };

  return (
    // The main container for the Ideation panel
    <div className={styles.ideationPanel}>
      {/* The neural network animation component */}
      <NeuralNetwork />
      {/* The container for the content that will have the parallax effect */}
      <div data-testid="ideation-parallax-container" className={styles.parallaxContainer} style={parallaxStyle}>
        {/* The title of the panel */}
        <h1 style={{color: 'white'}}>Ideation</h1>
      </div>
    </div>
  );
};

export default Ideation;
