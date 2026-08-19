import styles from './Trainers.module.css';
import Link from 'next/link';

const trainers = [
  {
    id: 1,
    name: 'Marcus Vance',
    specialty: 'Strength & Conditioning',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop',
    bio: 'Former Olympic weightlifter with 10 years of experience turning beginners into beasts.',
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    specialty: 'HIIT & Endurance',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop',
    bio: 'High-energy coach dedicated to pushing your cardiovascular limits and burning fat fast.',
  },
  {
    id: 3,
    name: 'David Chen',
    specialty: 'Mobility & Recovery',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    bio: 'Focuses on longevity, injury prevention, and building a foundation of true functional strength.',
  }
];

export default function Trainers() {
  return (
    <section id="trainers" className={styles.trainersSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            Meet Your <span className="text-accent">Coaches</span>
          </h2>
          <p className={styles.sectionDesc}>
            Elite professionals dedicated to your transformation.
          </p>
        </div>

        <div className={styles.grid}>
          {trainers.map((trainer) => (
            <div key={trainer.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={trainer.image} alt={trainer.name} className={styles.image} />
                <div className={styles.overlay}>
                  <p className={styles.bio}>{trainer.bio}</p>
                  <button className="btn btn-outline" style={{marginTop: '1rem'}}>Book Session</button>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{trainer.name}</h3>
                <p className={styles.specialty}>{trainer.specialty}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/trainers" className="btn">View Full Trainer Profiles</Link>
        </div>
      </div>
    </section>
  );
}
