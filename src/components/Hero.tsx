// src/components/Hero.tsx
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getResumeData } from '../services/resumeService';
import styles from './Hero.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const resume = getResumeData();
  const component = useRef<HTMLDivElement>(null);
  const background = useRef<HTMLDivElement>(null);
  const foreground = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
        },
      });

      tl.to(background.current, { scale: 1.5 }, 0);
      tl.to(foreground.current, { y: '-50%' }, 0);

    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.heroContainer} ref={component} data-testid="hero-container">
      <div ref={background} className={styles.background} data-testid="hero-background" />
      <div ref={foreground} className={styles.foreground} />
      <h1 className={styles.heroTitle}>{resume.name}</h1>
      <p className={styles.heroSubtitle}>{resume.summary}</p>
    </div>
  );
};

export default Hero;
