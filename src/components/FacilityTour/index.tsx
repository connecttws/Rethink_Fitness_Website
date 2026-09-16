import styles from './FacilityTour.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText, EditableGroup } from '@/components/visual-editor';

export default function FacilityTour({ data }: { data: VisualContent['facilityTour'] }) {
  const images = data?.images || [];

  return (
    <section className={styles.tourSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            <EditableText path="facilityTour.titlePrefix" fallback={data?.titlePrefix || "Explore Our"} />{" "}
            <EditableText path="facilityTour.titleAccent" fallback={data?.titleAccent || "Facility"} as="span" className="text-accent" />
          </h2>
          <EditableText 
            path="facilityTour.description" 
            fallback={data?.description || "From the equipment you train on to the environment around you, every detail at Rethink Fitness is designed with your training experience in mind."} 
            as="p" 
            className={styles.sectionDesc} 
            multiline 
          />
        </div>

        <div className={styles.gallery}>
          {images.map((img, index) => {
            const cardContent = (
              <>
                <img 
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full absolute inset-0 object-cover"
                />
                <div className={styles.overlay}>
                  <h3 className={styles.overlayTitle}>{img.title}</h3>
                </div>
              </>
            );

            return (
              <div 
                key={img.id} 
                className={`${styles.galleryItem} ${img.featured ? styles.featuredItem : ''}`}
              >
                <EditableGroup 
                  basePath={`facilityTour.images.${index}`}
                  schema={[
                    { key: 'url', label: 'Background Image', type: 'image' },
                    { key: 'title', label: 'Overlay Title', type: 'text' }
                  ]}
                  className="h-full w-full"
                >
                  {cardContent}
                </EditableGroup>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
