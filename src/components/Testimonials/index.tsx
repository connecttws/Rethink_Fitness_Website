import styles from './Testimonials.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import Image from 'next/image';

export default function Testimonials({ data }: { data: VisualContent['testimonials'] }) {
  return (
    <section className={styles.testimonialSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            {data.titlePrefix} <span className="text-accent">{data.titleAccent}</span>
          </h2>
          <p className={styles.sectionDesc}>
            {data.description}
          </p>
        </div>
        
        <div className={styles.grid}>
          {data.items.map((rev) => (
            <div key={rev.id} className={styles.card}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.reviewText}>{rev.review}</p>
              <div className={styles.authorContainer}>
                <Image src={rev.image} alt={rev.name} className={styles.avatar} width={50} height={50} />
                <div className={styles.authorInfo}>
                  <h4 className={styles.name}>{rev.name}</h4>
                  <span className={styles.role}>{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
