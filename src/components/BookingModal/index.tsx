'use client';

import { useState } from 'react';
import styles from './BookingModal.module.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function BookingModal({ isOpen, onClose, title = "Secure Your Spot" }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        {submitted ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h3>You're All Set!</h3>
            <p>We've sent the details to your email. See you at the gym.</p>
          </div>
        ) : (
          <>
            <h2 className={styles.modalTitle}>{title}</h2>
            <p className={styles.modalDesc}>Fill out the form below to confirm your request.</p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="(555) 000-0000" required />
              </div>
              <button type="submit" className={`btn ${styles.submitBtn}`}>Confirm</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
