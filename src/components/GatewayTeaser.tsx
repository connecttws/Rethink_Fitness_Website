import Link from 'next/link';
import styles from './GatewayTeaser.module.css';

export default function GatewayTeaser() {
  return (
    <section className={styles.gatewaySection}>
      <div className={styles.split}>
        <div className={`${styles.block} ${styles.trainersBlock}`}>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h2 className={styles.title}>Elite Coaching</h2>
            <p className={styles.desc}>Train with world-class professionals who push your limits.</p>
            <Link href="/trainers" className="btn">Meet The Team</Link>
          </div>
        </div>
        
        <div className={`${styles.block} ${styles.classesBlock}`}>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h2 className={styles.title}>Dynamic Classes</h2>
            <p className={styles.desc}>From HIIT to Yoga, find the perfect class for your goals.</p>
            <Link href="/schedule" className="btn btn-outline">View Schedule</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
