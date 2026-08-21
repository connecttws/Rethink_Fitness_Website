import Link from 'next/link';
import styles from './GatewayTeaser.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';

export default function GatewayTeaser({ data }: { data: VisualContent['gatewayTeaser'] }) {
  return (
    <section className={styles.gatewaySection}>
      <div className={styles.split}>
        <div className={`${styles.block} ${styles.trainersBlock}`}>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h2 className={styles.title}>{data.block1.title}</h2>
            <p className={styles.desc}>{data.block1.desc}</p>
            <Link href="/trainers" className="btn">{data.block1.btnText}</Link>
          </div>
        </div>
        
        <div className={`${styles.block} ${styles.classesBlock}`}>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h2 className={styles.title}>{data.block2.title}</h2>
            <p className={styles.desc}>{data.block2.desc}</p>
            <Link href="/schedule" className="btn btn-outline">{data.block2.btnText}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
