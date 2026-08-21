'use client';

import { useState } from 'react';
import styles from './Schedule.module.css';
import BookingModal from '../BookingModal';
import Link from 'next/link';
import { VisualContent } from '@/lib/visual-data/loadContent';

export default function Schedule({ data }: { data: VisualContent['schedule'] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <section id="schedule" className={styles.scheduleSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            {data.titlePrefix} <span className="text-accent">{data.titleAccent}</span>
          </h2>
          <p className={styles.sectionDesc}>
            {data.description}
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
              {data.items.map((item, idx) => (
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
          <Link href="/schedule" className="btn">{data.btnText}</Link>
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
