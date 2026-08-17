import styles from './AppTeaser.module.css';

export default function AppTeaser() {
  return (
    <section className={styles.appSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Your Gym. <br/> <span className="text-accent">In Your Pocket.</span>
          </h2>
          <p className={styles.desc}>
            Download the RethinkFit app to book classes, track your progress, 
            get custom meal plans, and connect with your trainer 24/7.
          </p>
          <div className={styles.badges}>
            <div className={styles.badgePlaceholder}>App Store</div>
            <div className={styles.badgePlaceholder}>Google Play</div>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.phoneMockup}>
            <div className={styles.screen}>
              <h3>Rethink<span className="text-accent">Fit</span></h3>
              <div className={styles.mockupContent}></div>
              <div className={styles.mockupContentHalf}></div>
              <div className={styles.mockupBtn}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
