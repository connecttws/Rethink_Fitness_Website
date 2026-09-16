'use client';

import React, { useState } from 'react';
import styles from './LeadCaptureForm.module.css';

interface LeadCaptureFormProps {
  variant?: 'general' | 'memberships';
  ctaText?: string;
  sourcePage?: string;
}

export default function LeadCaptureForm({
  variant = 'general',
  ctaText,
  sourcePage = 'website',
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    fitnessGoal: '',
    preferredOption: variant === 'memberships' ? 'Gym Access' : 'Personalised 1-on-1 Coaching',
    preferredContactTime: 'Evening (5 PM - 8 PM)',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
          sourcePage,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.successCard}>
        <div className={styles.successBadge}>✓</div>
        <h3 className={styles.successTitle}>Request Received</h3>
        <p className={styles.successText}>
          Thank you, <strong>{formData.name}</strong>. A Rethink Fitness coach will contact you at <strong>{formData.phone}</strong> to guide you on your journey.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              email: '',
              fitnessGoal: '',
              preferredOption: variant === 'memberships' ? 'Gym Access' : 'Personalised 1-on-1 Coaching',
              preferredContactTime: 'Evening (5 PM - 8 PM)',
            });
          }}
          className="btn btn-outline"
          style={{ marginTop: '1rem', fontSize: '0.9rem', padding: '10px 20px' }}
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  const defaultBtnText = variant === 'memberships' ? 'Find My Membership' : 'Start Your Journey';

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {errorMessage && (
        <div className={styles.errorAlert}>
          {errorMessage}
        </div>
      )}

      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label htmlFor={`name-${sourcePage}`}>Your Name *</label>
          <input
            id={`name-${sourcePage}`}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor={`phone-${sourcePage}`}>Phone Number *</label>
          <input
            id={`phone-${sourcePage}`}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            required
          />
        </div>

        {variant === 'general' ? (
          <>
            <div className={styles.inputGroup}>
              <label htmlFor={`email-${sourcePage}`}>Email Address</label>
              <input
                id={`email-${sourcePage}`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor={`fitnessGoal-${sourcePage}`}>Fitness Goal</label>
              <input
                id={`fitnessGoal-${sourcePage}`}
                type="text"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                placeholder="e.g., Fat Loss, Muscle Gain, Mobility"
              />
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label htmlFor={`preferredOption-${sourcePage}`}>Preferred Training Option</label>
              <select
                id={`preferredOption-${sourcePage}`}
                name="preferredOption"
                value={formData.preferredOption}
                onChange={handleChange}
              >
                <option value="Personalised 1-on-1 Coaching">Personalised 1-on-1 Coaching</option>
                <option value="Transformation Plan">Transformation Plan</option>
                <option value="Gym Access">Gym Access</option>
                <option value="Not Sure - Need Guidance">Not Sure - Need Guidance</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label htmlFor={`fitnessGoal-${sourcePage}`}>What are you looking to achieve? *</label>
              <textarea
                id={`fitnessGoal-${sourcePage}`}
                name="fitnessGoal"
                rows={3}
                value={formData.fitnessGoal}
                onChange={handleChange}
                placeholder="Tell us about your fitness targets, previous injuries, or what you want to achieve..."
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor={`preferredOption-${sourcePage}`}>Which option interests you? *</label>
              <select
                id={`preferredOption-${sourcePage}`}
                name="preferredOption"
                value={formData.preferredOption}
                onChange={handleChange}
                required
              >
                <option value="Gym Access">Gym Access</option>
                <option value="Transformation Plan">Transformation Plan</option>
                <option value="Personalised 1-on-1 Coaching">Personalised 1-on-1 Coaching</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor={`preferredContactTime-${sourcePage}`}>Preferred time to be contacted</label>
              <select
                id={`preferredContactTime-${sourcePage}`}
                name="preferredContactTime"
                value={formData.preferredContactTime}
                onChange={handleChange}
              >
                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</option>
                <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                <option value="Anytime">Anytime</option>
              </select>
            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`btn ${styles.submitBtn}`}
      >
        {loading ? 'Processing...' : (ctaText || defaultBtnText)}
      </button>
    </form>
  );
}
