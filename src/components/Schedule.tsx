'use client';

import { useState } from 'react';
import styles from './Schedule.module.css';
import BookingModal from './BookingModal';

const scheduleData = [
  { time: '06:00 AM', class: 'HIIT Burn', trainer: 'Sarah Jenkins', duration: '45 Min' },
  { time: '07:30 AM', class: 'Powerlifting', trainer: 'Marcus Vance', duration: '60 Min' },
  { time: '09:00 AM', class: 'Yoga Flow', trainer: 'David Chen', duration: '60 Min' },
  { time: '05:00 PM', class: 'CrossFit WOD', trainer: 'Marcus Vance', duration: '60 Min' },
  { time: '06:30 PM', class: 'Spin Class', trainer: 'Sarah Jenkins', duration: '45 Min' },
  { time: '08:00 PM', class: 'Mobility & Stretch', trainer: 'David Chen', duration: '30 Min' }
];

export default function Schedule() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <section className={styles.scheduleSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            Class <span className="text-accent">Schedule</span>
          </h2>
          <p className={styles.sectionDesc}>
            Plan your workouts. Never miss a session.
          </p>
        </div>

        <div className={styles.daysFilter}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
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
      </div>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Reserve Your Class"
      />
    </section>
  );
}
