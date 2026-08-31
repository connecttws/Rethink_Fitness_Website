'use client';

import { useState } from 'react';
import styles from './Schedule.module.css';
import BookingModal from '../BookingModal';
import Link from 'next/link';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText } from '@/components/visual-editor';

export default function Schedule({ data }: { data: VisualContent['schedule'] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <section id="schedule" className={styles.scheduleSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            <EditableText path="schedule.titlePrefix" fallback={data.titlePrefix} />{" "}
            <EditableText path="schedule.titleAccent" fallback={data.titleAccent} as="span" className="text-accent" />
          </h2>
          <EditableText 
            path="schedule.description" 
            fallback={data.description} 
            as="p" 
            className={styles.sectionDesc} 
            multiline 
          />
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
                  <td className={styles.timeCell}>
                    <EditableText path={`schedule.items.${idx}.time`} fallback={item.time} />
                  </td>
                  <td className={styles.classCell}>
                    <EditableText path={`schedule.items.${idx}.class`} fallback={item.class} />
                  </td>
                  <td className={styles.trainerCell}>
                    <EditableText path={`schedule.items.${idx}.trainer`} fallback={item.trainer} />
                  </td>
                  <td className={styles.durationCell}>
                    <EditableText path={`schedule.items.${idx}.duration`} fallback={item.duration} />
                  </td>
                  <td>
                    <button className={styles.bookBtn} onClick={() => setModalOpen(true)}>Book Spot</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/schedule" className="btn">
            <EditableText path="schedule.btnText" fallback={data.btnText} />
          </Link>
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
