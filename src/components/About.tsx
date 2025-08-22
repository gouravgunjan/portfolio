// src/components/About.tsx
import React from 'react';
import { getResumeData } from '../services/resumeService';
import styles from './About.module.scss';

const About = () => {
  const resume = getResumeData();

  return (
    <section className={styles.aboutContainer} data-testid="about-section">
      <h2 className={styles.aboutTitle}>About Me</h2>
      <p className={styles.aboutText}>{resume.summary}</p>
    </section>
  );
};

export default About;
