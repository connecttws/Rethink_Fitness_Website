'use client';

import React, { useState, useEffect } from 'react';
import styles from './BookingModal.module.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function BookingModal({ isOpen, onClose, title = "Start Your Journey" }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    fitnessGoal: '',
    preferredOption: 'Personalised 1-on-1 Coaching',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scrolling behind modal
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sourcePage: 'navbar-modal',
        }),
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">&times;</button>
        
        {submitted ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h3>You're All Set!</h3>
            <p>Our coaching team has received your details and will get in touch shortly.</p>
          </div>
        ) : (
          <>
            <h2 className={styles.modalTitle}>{title}</h2>
            <p className={styles.modalDesc}>Take the first step towards training with purpose. Tell us about your goals.</p>
            
            {errorMessage && (
              <p style={{ color: '#ff8088', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                {errorMessage}
              </p>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="John Doe" 
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="+91 98765 43210" 
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="john@example.com" 
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Fitness Goal</label>
                <input 
                  type="text" 
                  name="fitnessGoal" 
                  value={formData.fitnessGoal} 
                  onChange={handleChange} 
                  placeholder="e.g. Fat Loss, Strength, General Health" 
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Preferred Training Option</label>
                <select 
                  name="preferredOption" 
                  value={formData.preferredOption} 
                  onChange={handleChange}
                  className={styles.selectInput}
                >
                  <option value="Personalised 1-on-1 Coaching">Personalised 1-on-1 Coaching</option>
                  <option value="Transformation Plan">Transformation Plan</option>
                  <option value="Gym Access">Gym Access</option>
                  <option value="Not Sure">Not Sure - Need Guidance</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className={`btn ${styles.submitBtn}`}>
                {loading ? 'Submitting...' : 'Start Your Journey'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
