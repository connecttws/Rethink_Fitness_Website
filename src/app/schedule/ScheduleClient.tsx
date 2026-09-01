'use client';

import { useState } from 'react';
import styles from './SchedulePage.module.css';
import BookingModal from '@/components/BookingModal';
import { EditableText } from '@/components/visual-editor';

export default function ScheduleClient({ fullScheduleData, classDescriptions }: { fullScheduleData: any, classDescriptions: any }) {
  const [isModalOpen, setModalOpen] = useState(false);
  
  return (
    <main className={styles.pageContainer}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            <EditableText path="heroTitlePrefix" fallback="Find Your Next" />{" "}
            <EditableText path="heroTitleAccent" fallback="Challenge" as="span" className="text-accent" />
          </h1>
          <p className={styles.heroDesc}>
            <EditableText path="heroDesc" fallback="From high-intensity intervals to deep mobility work, our diverse schedule has something to push you out of your comfort zone." />
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
                    <td className={styles.timeCell}>
                      <EditableText path={`fullScheduleData.${idx}.time`} fallback={item.time} />
                    </td>
                    <td className={styles.classCell}>
                      <EditableText path={`fullScheduleData.${idx}.class`} fallback={item.class} />
                    </td>
                    <td className={styles.trainerCell}>
                      <EditableText path={`fullScheduleData.${idx}.trainer`} fallback={item.trainer} />
                    </td>
                    <td className={styles.durationCell}>
                      <EditableText path={`fullScheduleData.${idx}.duration`} fallback={item.duration} />
                    </td>
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
          <h2 className={styles.descTitle}>
            <EditableText path="descTitlePrefix" fallback="Class" />{" "}
            <EditableText path="descTitleAccent" fallback="Descriptions" as="span" className="text-accent" />
          </h2>
          <div className={styles.descGrid}>
            {classDescriptions.map((desc: any, idx: number) => (
              <div key={idx} className={styles.descCard}>
                <h3 className={styles.className}>
                  <EditableText path={`classDescriptions.${idx}.name`} fallback={desc.name} />
                </h3>
                <span className={styles.intensity}>
                  <EditableText path={`classDescriptions.${idx}.intensity`} fallback={desc.intensity} />
                </span>
                <EditableText path={`classDescriptions.${idx}.description`} fallback={desc.description} as="p" className={styles.classDetails} multiline />
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
