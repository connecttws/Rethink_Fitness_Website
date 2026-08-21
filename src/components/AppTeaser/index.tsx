import styles from './AppTeaser.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';

export default function AppTeaser({ data }: { data: VisualContent['appTeaser'] }) {
  return (
    <section className={styles.appSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            {data.titlePrefix} <br/> <span className="text-accent">{data.titleAccent}</span>
          </h2>
          <p className={styles.desc}>
            {data.description}
          </p>
          <div className={styles.badges}>
            <div className={styles.badgePlaceholder}>App Store</div>
            <div className={styles.badgePlaceholder}>Google Play</div>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.phoneMockup}>
            <div className={styles.screen}>
              <h3>Rethink<span className="text-accent">Fit</span></h3>
              <div className={styles.mockupContent}></div>
              <div className={styles.mockupContentHalf}></div>
              <div className={styles.mockupBtn}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
