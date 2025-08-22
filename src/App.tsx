import React from 'react';
import Ideation from './components/panels/Ideation';
import './App.scss';

function App() {
  return (
    // This is the main container for the entire application.
    // It will hold all the different "scenes" or sections of the portfolio.
    <div>
      {/* 
        Scene 1: The Hero Component.
        This component is the main entry point of the portfolio.
        It features a full-screen, pinned section with a parallax animation 
        driven by GSAP and ScrollTrigger. The animation is designed to be 
        cinematic, drawing the user in.
      */}
      <Ideation />
    </div>
  );
}

export default App;