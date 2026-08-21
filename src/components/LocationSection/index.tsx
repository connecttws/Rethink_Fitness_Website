import styles from './LocationSection.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';

export default function LocationSection({ data }: { data: VisualContent['locationSection'] }) {
  return (
    <section id="location" className={styles.locationSection}>
      <div className={`container`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            {data.titlePrefix} <span className="text-accent">{data.titleAccent}</span>
          </h2>
          <p className={styles.sectionDesc}>
            {data.description}
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.infoCard}>
            <div className={styles.infoGroup}>
              <h3 className={styles.infoTitle}>Address</h3>
              <p className={styles.infoText} style={{whiteSpace: 'pre-line'}}>
                {data.address}
              </p>
            </div>

            <div className={styles.infoGroup}>
              <h3 className={styles.infoTitle}>Hours of Operation</h3>
              <p className={styles.infoText} dangerouslySetInnerHTML={{ __html: data.hoursHtml }}></p>
            </div>

            <div className={styles.infoGroup}>
              <h3 className={styles.infoTitle}>Contact</h3>
              <p className={styles.infoText}>
                Phone: {data.phone}<br />
                Email: {data.email}
              </p>
            </div>
            
            <button className="btn btn-outline" style={{marginTop: '1rem', width: '100%'}}>
              Get Directions
            </button>
          </div>

          <div className={styles.mapContainer}>
            <iframe 
              className={styles.mapIframe}
              src={data.mapIframeSrc} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
