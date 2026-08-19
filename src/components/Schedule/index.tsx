'use client';

import { useState } from 'react';
import styles from './Schedule.module.css';
import BookingModal from '../BookingModal';
import Link from 'next/link';

const scheduleData = [
  { time: '06:00 AM', class: 'HIIT Burn', trainer: 'Sarah Jenkins', duration: '45 Min' },
  { time: '07:30 AM', class: 'Powerlifting', trainer: 'Marcus Vance', duration: '60 Min' },
  { time: '09:00 AM', class: 'Yoga Flow', trainer: 'David Chen', duration: '60 Min' }
];

export default function Schedule() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <section id="schedule" className={styles.scheduleSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            Class <span className="text-accent">Schedule</span>
          </h2>
          <p className={styles.sectionDesc}>
            Plan your workouts. Never miss a session.
          </p>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Class</th>
                <th>Trainer</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((item, idx) => (
                <tr key={idx}>
                  <td className={styles.timeCell}>{item.time}</td>
                  <td className={styles.classCell}>{item.class}</td>
                  <td className={styles.trainerCell}>{item.trainer}</td>
                  <td className={styles.durationCell}>{item.duration}</td>
                  <td>
                    <button className={styles.bookBtn} onClick={() => setModalOpen(true)}>Book Spot</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/schedule" className="btn">View Full Schedule</Link>
        </div>
      </div>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Reserve Your Class"
      />
    </section>
  );
}
