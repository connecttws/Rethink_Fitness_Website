'use client';

import { useState } from 'react';
import styles from './BmiCalculator.module.css';

export default function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    if (height && weight) {
      const h = parseFloat(height) / 100; // cm to m
      const w = parseFloat(weight);
      const calculatedBmi = w / (h * h);
      setBmi(Math.round(calculatedBmi * 10) / 10);
    }
  };

  let status = '';
  if (bmi) {
    if (bmi < 18.5) status = 'Underweight - Time to bulk up!';
    else if (bmi < 24.9) status = 'Normal - Keep crushing it!';
    else if (bmi < 29.9) status = 'Overweight - Let\'s shed some fat!';
    else status = 'Obese - We are here to transform you!';
  }

  return (
    <section className={styles.bmiSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>Calculate Your <span className="text-accent">BMI</span></h2>
          <p className={styles.desc}>
            Knowing your Body Mass Index is the first step to understanding your fitness baseline. 
            Enter your details below and let's set a goal.
          </p>
        </div>
        <div className={styles.calculatorBox}>
          <form onSubmit={calculateBMI} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Height (cm)</label>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(e.target.value)} 
                placeholder="e.g. 175" 
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Weight (kg)</label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                placeholder="e.g. 70" 
                required 
              />
            </div>
            <button type="submit" className={`btn ${styles.submitBtn}`}>Calculate</button>
          </form>
          {bmi && (
            <div className={styles.resultBox}>
              <h3>Your BMI: <span className="text-accent">{bmi}</span></h3>
              <p>{status}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
