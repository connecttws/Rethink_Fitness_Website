import styles from './NutritionPage.module.css';
import BmiCalculator from '@/components/BmiCalculator';

export default function NutritionPage() {
  return (
    <main className={styles.pageContainer}>
      <section className={styles.hero}>
        <div className={`container ${styles.containerRelative}`}>
          <h1 className={styles.heroTitle}>
            Fuel Your <span className="text-accent">Performance</span>
          </h1>
          <p className={styles.heroDesc}>
            You can't out-train a bad diet. Our holistic approach to nutrition ensures your body gets exactly what it needs to recover, rebuild, and perform at its peak.
          </p>
        </div>
      </section>

      <section className={styles.pillarsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>The 3 Pillars of <span className="text-accent">Nutrition</span></h2>
          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <svg className={styles.pillarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <h3 className={styles.pillarTitle}>Macronutrient Balance</h3>
              <p className={styles.pillarDesc}>
                We calculate the precise ratio of proteins, fats, and carbohydrates your body requires based on your specific training volume and goals, eliminating the guesswork from your diet.
              </p>
            </div>
            
            <div className={styles.pillarCard}>
              <svg className={styles.pillarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              <h3 className={styles.pillarTitle}>Strategic Hydration</h3>
              <p className={styles.pillarDesc}>
                Water alone isn't enough. We guide you on proper electrolyte replenishment and timing to ensure cellular hydration, maximize muscle pump, and prevent fatigue during grueling workouts.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <svg className={styles.pillarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4l3 3"/>
              </svg>
              <h3 className={styles.pillarTitle}>Micronutrient Timing</h3>
              <p className={styles.pillarDesc}>
                It’s not just about what you eat, but *when* you eat it. We optimize your pre- and post-workout nutrition windows to spike insulin effectively and trigger rapid muscle protein synthesis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded BMI Calculator Component */}
      <BmiCalculator />

      <section className={styles.packagesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Coaching <span className="text-accent">Packages</span></h2>
          <div className={styles.packagesGrid}>
            
            <div className={styles.packageCard}>
              <h3 className={styles.packageTitle}>Dietitian Consultation</h3>
              <div className={styles.packagePrice}>$99<span style={{fontSize: '1rem', color: 'var(--text-secondary)'}}>/session</span></div>
              <ul className={styles.packageList}>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  Full dietary audit and habit analysis
                </li>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  Body composition baseline testing
                </li>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  Caloric baseline & macro targets setup
                </li>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  Supplementation recommendations
                </li>
              </ul>
              <button className={`btn btn-outline ${styles.btnFull}`}>Book Session</button>
            </div>

            <div className={styles.packageCard} style={{ borderColor: 'var(--accent-color)' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--accent-color)', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>MOST POPULAR</div>
              <h3 className={styles.packageTitle}>Custom 30-Day Plan</h3>
              <div className={styles.packagePrice}>$249<span style={{fontSize: '1rem', color: 'var(--text-secondary)'}}>/month</span></div>
              <ul className={styles.packageList}>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  Everything in Consultation
                </li>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  Day-by-day customized meal plan
                </li>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  Grocery shopping lists & recipes
                </li>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  Weekly adjustments & check-ins
                </li>
              </ul>
              <button className={`btn ${styles.btnFull}`}>Start 30-Day Plan</button>
            </div>

            <div className={styles.packageCard}>
              <h3 className={styles.packageTitle}>Elite Contest Prep</h3>
              <div className={styles.packagePrice}>$499<span style={{fontSize: '1rem', color: 'var(--text-secondary)'}}>/month</span></div>
              <ul className={styles.packageList}>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  Everything in Custom Plan
                </li>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  Peak week water & sodium manipulation
                </li>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  Daily physique check-ins
                </li>
                <li className={styles.packageItem}>
                  <CheckIcon />
                  24/7 priority access to your coach
                </li>
              </ul>
              <button className={`btn btn-outline ${styles.btnFull}`}>Apply Now</button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

function CheckIcon() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
