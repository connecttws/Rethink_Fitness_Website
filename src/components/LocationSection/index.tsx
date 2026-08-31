import styles from './LocationSection.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText, EditableIframe } from '@/components/visual-editor';

export default function LocationSection({ data }: { data: VisualContent['locationSection'] }) {
  return (
    <section id="location" className={styles.locationSection}>
      <div className={`container`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            <EditableText path="locationSection.titlePrefix" fallback={data.titlePrefix} />{" "}
            <EditableText path="locationSection.titleAccent" fallback={data.titleAccent} as="span" className="text-accent" />
          </h2>
          <EditableText 
            path="locationSection.description" 
            fallback={data.description} 
            as="p" 
            className={styles.sectionDesc} 
            multiline 
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.infoCard}>
            <div className={styles.infoGroup}>
              <h3 className={styles.infoTitle}>Address</h3>
              <div style={{whiteSpace: 'pre-line'}}>
                <EditableText path="locationSection.address" fallback={data.address} as="p" className={styles.infoText} multiline />
              </div>
            </div>

            <div className={styles.infoGroup}>
              <h3 className={styles.infoTitle}>Hours of Operation</h3>
              <p className={styles.infoText} dangerouslySetInnerHTML={{ __html: data.hoursHtml }}></p>
            </div>

            <div className={styles.infoGroup}>
              <h3 className={styles.infoTitle}>Contact</h3>
              <p className={styles.infoText}>
                Phone: <EditableText path="locationSection.phone" fallback={data.phone} /><br />
                Email: <EditableText path="locationSection.email" fallback={data.email} />
              </p>
            </div>
            
            <button className="btn btn-outline" style={{marginTop: '1rem', width: '100%'}}>
              Get Directions
            </button>
          </div>

          <div className={styles.mapContainer}>
            <EditableIframe 
              path="locationSection.mapIframeSrc"
              fallback={data.mapIframeSrc}
              iframeClassName={styles.mapIframe}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
