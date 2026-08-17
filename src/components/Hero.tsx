import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>
          Rethink Your <br />
          <span className="text-accent">Limits</span>
        </h1>
        <p className={styles.subtitle}>
          The ultimate fitness experience designed to push your boundaries. 
          State-of-the-art equipment, elite trainers, and an atmosphere built for champions.
        </p>
        <div className={styles.actions}>
          <button className="btn">Join Now</button>
          <button className="btn btn-outline">View Classes</button>
        </div>
      </div>
    </section>
  );
}
