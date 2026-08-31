import styles from './FacilityTour.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText, EditableImage } from '@/components/visual-editor';

export default function FacilityTour({ data }: { data: VisualContent['facilityTour'] }) {
  return (
    <section className={styles.tourSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            <EditableText path="facilityTour.titlePrefix" fallback={data.titlePrefix} />{" "}
            <EditableText path="facilityTour.titleAccent" fallback={data.titleAccent} as="span" className="text-accent" />
          </h2>
          <EditableText 
            path="facilityTour.description" 
            fallback={data.description} 
            as="p" 
            className={styles.sectionDesc} 
            multiline 
          />
        </div>

        <div className={styles.gallery}>
          {data.images.map((img, index) => (
            <div 
              key={img.id} 
              className={`${styles.galleryItem} ${img.featured ? styles.featuredItem : ''}`}
            >
              <EditableImage 
                path={`facilityTour.images.${index}.url`}
                fallback={img.url}
                alt={img.title}
                className="w-full h-full absolute inset-0"
                imgClassName="w-full h-full object-cover"
              />
              <div className={styles.overlay}>
                <EditableText 
                  path={`facilityTour.images.${index}.title`} 
                  fallback={img.title} 
                  as="h3" 
                  className={styles.overlayTitle} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
