import styles from './Features.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText } from '@/components/visual-editor';

export default function Features({ data }: { data: VisualContent['features'] }) {
  const titlePrefix = data?.titlePrefix || "Why Rethink";
  const titleAccent = data?.titleAccent || "Fitness?";
  const description = data?.description || "Everything you need to train with purpose, make progress, and become stronger — physically and mentally.";
  const items = data?.items || [
    { id: "01", title: "Expert Coaching", description: "Get guidance from experienced coaches who understand your goals and know how to help you progress." },
    { id: "02", title: "Premium Training Environment", description: "Train with quality equipment, thoughtfully designed spaces, and an environment built for serious results." },
    { id: "03", title: "Built Around You", description: "Whether you're starting out, getting back on track, or pushing your limits, your training should fit your goals." }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            <EditableText path="features.titlePrefix" fallback={titlePrefix} as="span" />{" "}
            <EditableText path="features.titleAccent" fallback={titleAccent} as="span" className="text-accent" />
          </h2>
          <EditableText path="features.description" fallback={description} as="p" className={styles.sectionDesc} />
        </div>
        
        <div className={styles.grid}>
          {items.map((feature, idx) => (
            <div key={feature.id || idx} className={styles.card}>
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
