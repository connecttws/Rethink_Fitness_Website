'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText, useEditMode } from '@/components/visual-editor';

export default function Hero({ data }: { data: VisualContent['hero'] }) {
  const [text, setText] = useState('');
  const fullText = data.fullText;
  const { isEditMode } = useEditMode();

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [fullText]);

  const lines = text.split('\n');

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.content}`}>
        {isEditMode ? (
          <EditableText path="hero.fullText" fallback={data.fullText} as="h1" className={`${styles.title} whitespace-pre-wrap`} />
        ) : (
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
        )}
        
        <EditableText 
          path="hero.subtitle" 
          fallback={data.subtitle} 
          as="p" 
          className={styles.subtitle} 
        />
        
        <div className={styles.actions}>
          <EditableText path="hero.primaryBtnText" fallback={data.primaryBtnText} as="button" className="btn" />
          <EditableText path="hero.secondaryBtnText" fallback={data.secondaryBtnText} as="button" className="btn btn-outline" />
        </div>
      </div>
    </section>
  );
}
