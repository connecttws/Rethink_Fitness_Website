'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [text, setText] = useState('');
  const fullText = "Rethink\nYour\nLimits";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Typing speed in ms
    
    return () => clearInterval(interval);
  }, []);

  // Split the typed text by newline to render the <br /> and styled span correctly
  const lines = text.split('\n');

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>
          {lines[0]}
          {lines.length > 1 && (
            <>
              <br />
              {lines[1]}
            </>
          )}
          {lines.length > 2 && (
            <>
              <br />
              <span className="text-accent">{lines[2]}</span>
            </>
          )}
          <span className={styles.cursor}>|</span>
        </h1>
        <p className={styles.subtitle}>
          The ultimate fitness experience designed to push your boundaries. 
          State-of-the-art equipment, elite trainers, and an atmosphere built for champions.
        </p>
        <div className={styles.actions}>
          <button className="btn">Join Now</button>
          <button className="btn btn-outline">View Classes</button>
        </div>
      </div>
    </section>
  );
}
