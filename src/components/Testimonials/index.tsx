import styles from './Testimonials.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText, EditableImage } from '@/components/visual-editor';

export default function Testimonials({ data }: { data: VisualContent['testimonials'] }) {
  return (
    <section className={styles.testimonialSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            <EditableText path="testimonials.titlePrefix" fallback={data.titlePrefix} />{" "}
            <EditableText path="testimonials.titleAccent" fallback={data.titleAccent} as="span" className="text-accent" />
          </h2>
          <EditableText 
            path="testimonials.description" 
            fallback={data.description} 
            as="p" 
            className={styles.sectionDesc} 
            multiline 
          />
        </div>
        
        <div className={styles.grid}>
          {data.items.map((rev, idx) => (
            <div key={rev.id} className={styles.card}>
              <div className={styles.quoteIcon}>"</div>
              <EditableText path={`testimonials.items.${idx}.review`} fallback={rev.review} as="p" className={styles.reviewText} multiline />
              <div className={styles.authorContainer}>
                <EditableImage 
                  path={`testimonials.items.${idx}.image`}
                  fallback={rev.image}
                  alt={rev.name}
                  className={styles.avatar}
                  imgClassName="w-full h-full object-cover rounded-full"
                />
                <div className={styles.authorInfo}>
                  <EditableText path={`testimonials.items.${idx}.name`} fallback={rev.name} as="h4" className={styles.name} />
                  <EditableText path={`testimonials.items.${idx}.role`} fallback={rev.role} as="span" className={styles.role} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
