import styles from './Features.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText } from '@/components/visual-editor';

export default function Features({ data }: { data: VisualContent['features'] }) {
  return (
    <section className={styles.featuresSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            <EditableText path="features.titlePrefix" fallback={data.titlePrefix} as="span" />{" "}
            <EditableText path="features.titleAccent" fallback={data.titleAccent} as="span" className="text-accent" />
          </h2>
          <EditableText path="features.description" fallback={data.description} as="p" className={styles.sectionDesc} />
        </div>
        
        <div className={styles.grid}>
          {data.items.map((feature, idx) => (
            <div key={feature.id} className={styles.card}>
              <span className={styles.number}>{feature.id}</span>
              <EditableText path={`features.items.${idx}.title`} fallback={feature.title} as="h3" className={styles.cardTitle} />
              <EditableText path={`features.items.${idx}.description`} fallback={feature.description} as="p" className={styles.cardDesc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
