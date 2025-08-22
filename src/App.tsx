import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </Container>
    </>
  );
}

export default App;
