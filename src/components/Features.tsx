import styles from './Features.module.css';

const features = [
  {
    id: '01',
    title: 'Elite Trainers',
    description: 'Work with the best in the industry to push your limits and achieve your goals faster.',
  },
  {
    id: '02',
    title: 'Modern Equipment',
    description: 'Access state-of-the-art machines and free weights designed for peak performance.',
  },
  {
    id: '03',
    title: 'Open 24/7',
    description: 'Train on your schedule. Our facilities are open around the clock for your convenience.',
  },
];

export default function Features() {
  return (
    <section className={styles.featuresSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            Why Choose <span className="text-accent">Us</span>
          </h2>
          <p className={styles.sectionDesc}>
            We provide everything you need to transform your body and mind. No compromises.
          </p>
        </div>
        
        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.card}>
              <span className={styles.number}>{feature.id}</span>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
