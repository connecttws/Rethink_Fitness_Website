'use client';

import { useState } from 'react';
import styles from './SchedulePage.module.css';
import BookingModal from '@/components/BookingModal';

export default function ScheduleClient({ fullScheduleData, classDescriptions }: { fullScheduleData: any, classDescriptions: any }) {
  const [isModalOpen, setModalOpen] = useState(false);
  
  return (
    <main className={styles.pageContainer}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            Find Your Next <span className="text-accent">Challenge</span>
          </h1>
          <p className={styles.heroDesc}>
            From high-intensity intervals to deep mobility work, our diverse schedule has something to push you out of your comfort zone.
          </p>
        </div>
      </section>

      <section className={styles.scheduleSection}>
        <div className="container">
          <div className={styles.daysFilter}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => (
              <button key={day} className={`${styles.dayBtn} ${idx === 0 ? styles.activeDay : ''}`}>
                {day}
              </button>
            ))}
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Class</th>
                  <th>Trainer</th>
                  <th>Duration</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fullScheduleData.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td className={styles.timeCell}>{item.time}</td>
                    <td className={styles.classCell}>{item.class}</td>
                    <td className={styles.trainerCell}>{item.trainer}</td>
                    <td className={styles.durationCell}>{item.duration}</td>
                    <td style={{ color: item.spots === 0 ? 'var(--accent-color)' : 'var(--text-secondary)' }}>
                      {item.spots === 0 ? 'Waitlist' : `${item.spots} Spots Left`}
                    </td>
                    <td>
                      <button 
                        className={styles.bookBtn} 
                        onClick={() => setModalOpen(true)}
                        style={{ opacity: item.spots === 0 ? 0.5 : 1 }}
                      >
                        {item.spots === 0 ? 'Join Waitlist' : 'Book Spot'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.descriptionsSection}>
        <div className="container">
          <h2 className={styles.descTitle}>Class <span className="text-accent">Descriptions</span></h2>
          <div className={styles.descGrid}>
            {classDescriptions.map((desc: any, idx: number) => (
              <div key={idx} className={styles.descCard}>
                <h3 className={styles.className}>{desc.name}</h3>
                <span className={styles.intensity}>{desc.intensity}</span>
                <p className={styles.classDetails}>{desc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Reserve Your Spot"
      />
    </main>
  );
}
