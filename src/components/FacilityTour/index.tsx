import styles from './FacilityTour.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import Image from 'next/image';

export default function FacilityTour({ data }: { data: VisualContent['facilityTour'] }) {
  return (
    <section className={styles.tourSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            {data.titlePrefix} <span className="text-accent">{data.titleAccent}</span>
          </h2>
          <p className={styles.sectionDesc}>
            {data.description}
          </p>
        </div>

        <div className={styles.gallery}>
          {data.images.map((img) => (
            <div 
              key={img.id} 
              className={`${styles.galleryItem} ${img.featured ? styles.featuredItem : ''}`}
            >
              <Image src={img.url} alt={img.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
              <div className={styles.overlay}>
                <h3 className={styles.overlayTitle}>{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
