import styles from './Testimonials.module.css';

const reviews = [
  {
    id: 1,
    name: 'James Rodriguez',
    review: 'Rethink Fitness completely changed my life. The trainers are world-class and the equipment is always spotless. I lost 30lbs in my first 4 months.',
    role: 'Member since 2024'
  },
  {
    id: 2,
    name: 'Emily Chen',
    review: 'The energy in this gym is unmatched. From the heavy lifting section to the yoga studio, it feels like a truly premium experience every time I walk in.',
    role: 'Pro Member'
  },
  {
    id: 3,
    name: 'Marcus Thorne',
    review: 'Best gym in the city, hands down. The community here pushes you to be your absolute best. The Elite membership is worth every penny.',
    role: 'Elite Member'
  }
];

export default function Testimonials() {
  return (
    <section className={styles.testimonialSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            Real <span className="text-accent">Results</span>
          </h2>
          <p className={styles.sectionDesc}>
            Don't just take our word for it. Hear from the champions who grind here every day.
          </p>
        </div>
        
        <div className={styles.grid}>
          {reviews.map((rev) => (
            <div key={rev.id} className={styles.card}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.reviewText}>{rev.review}</p>
              <div className={styles.author}>
                <h4 className={styles.name}>{rev.name}</h4>
                <span className={styles.role}>{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
