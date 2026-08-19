'use client';

import { useState } from 'react';
import styles from './SchedulePage.module.css';
import BookingModal from '@/components/BookingModal';

const fullScheduleData = [
  { time: '06:00 AM', class: 'HIIT Burn', trainer: 'Sarah Jenkins', duration: '45 Min', spots: 5 },
  { time: '07:30 AM', class: 'Powerlifting', trainer: 'Marcus Vance', duration: '60 Min', spots: 2 },
  { time: '09:00 AM', class: 'Yoga Flow', trainer: 'David Chen', duration: '60 Min', spots: 12 },
  { time: '12:00 PM', class: 'Lunchtime Express', trainer: 'Sarah Jenkins', duration: '30 Min', spots: 8 },
  { time: '05:00 PM', class: 'CrossFit WOD', trainer: 'Marcus Vance', duration: '60 Min', spots: 0 },
  { time: '06:30 PM', class: 'Spin Class', trainer: 'Sarah Jenkins', duration: '45 Min', spots: 3 },
  { time: '08:00 PM', class: 'Mobility & Stretch', trainer: 'David Chen', duration: '30 Min', spots: 15 }
];

const classDescriptions = [
  {
    name: 'HIIT Burn',
    intensity: 'High Intensity',
    description: 'A 45-minute high-intensity interval training session designed to torch calories and build cardiovascular endurance. Expect fast-paced rounds of burpees, sprints, and kettlebell swings.'
  },
  {
    name: 'Powerlifting',
    intensity: 'Advanced Strength',
    description: 'Focus exclusively on the big three: Squat, Bench, and Deadlift. Under expert coaching, you will refine your technique and safely increase your 1-rep max.'
  },
  {
    name: 'Yoga Flow',
    intensity: 'Low Impact / Recovery',
    description: 'A dynamic vinyasa flow focused on linking breath with movement. Perfect for active recovery, increasing flexibility, and building core strength.'
  },
  {
    name: 'CrossFit WOD',
    intensity: 'Extreme',
    description: 'The Workout of the Day. A constantly varied mix of gymnastics, weightlifting, and metabolic conditioning. Not for the faint of heart.'
  },
  {
    name: 'Mobility & Stretch',
    intensity: 'Beginner Friendly / Recovery',
    description: 'Dedicated time to release tight muscles, improve joint health, and prevent injury. Utilizing foam rollers, bands, and deep stretching techniques.'
  }
];

export default function SchedulePage() {
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
                {fullScheduleData.map((item, idx) => (
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
            {classDescriptions.map((desc, idx) => (
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
