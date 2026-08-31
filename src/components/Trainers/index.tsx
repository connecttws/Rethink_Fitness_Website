import styles from './Trainers.module.css';
import Link from 'next/link';
import { VisualContent } from '@/lib/visual-data/loadContent';
import Image from 'next/image';

export default function Trainers({ data }: { data: VisualContent['trainers'] }) {
  return (
    <section id="trainers" className={styles.trainersSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            {data.titlePrefix} <span className="text-accent">{data.titleAccent}</span>
          </h2>
          <p className={styles.sectionDesc}>
            {data.description}
          </p>
        </div>

        <div className={styles.grid}>
          {data.items.map((trainer) => (
            <div key={trainer.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image src={trainer.image} alt={trainer.name} className={styles.image} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
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
          <Link href="/trainers" className="btn">{data.btnText}</Link>
        </div>
      </div>
    </section>
  );
}
