import styles from './FacilityTour.module.css';

const images = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    title: 'Free Weights Zone',
    featured: true,
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop',
    title: 'Cardio Deck',
    featured: false,
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1974&auto=format&fit=crop',
    title: 'Functional Training',
    featured: false,
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1571388208497-71bedc66e932?q=80&w=2072&auto=format&fit=crop',
    title: 'Recovery Lounge',
    featured: false,
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1593079831268-3381b0c1239b?q=80&w=2069&auto=format&fit=crop',
    title: 'Yoga Studio',
    featured: false,
  }
];

export default function FacilityTour() {
  return (
    <section className={styles.tourSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            Premium <span className="text-accent">Facilities</span>
          </h2>
          <p className={styles.sectionDesc}>
            State-of-the-art equipment in an environment designed for ultimate performance.
          </p>
        </div>

        <div className={styles.gallery}>
          {images.map((img) => (
            <div 
              key={img.id} 
              className={`${styles.galleryItem} ${img.featured ? styles.featuredItem : ''}`}
            >
              <img src={img.url} alt={img.title} />
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
