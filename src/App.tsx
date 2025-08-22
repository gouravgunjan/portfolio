import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
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
      <Hero />

      {/* 
        Scene 2: The About Component.
        This component provides a brief professional summary.
        It is placed directly after the Hero component to create the necessary
        scrollable area on the page. This allows the ScrollTrigger animation 
        in the Hero component to be activated. Without a subsequent section to 
        scroll to, the pinning and animation effects would not be visible.
      */}
      <About />

      {/* Other sections will be added here in the future */}
    </div>
  );
}

export default App;