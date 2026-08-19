import styles from './Pricing.module.css';
import Link from 'next/link';

export default function Pricing() {
  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h2 className={styles.bannerTitle}>
              Ready to <span className="text-accent">Commit?</span>
            </h2>
            <p className={styles.bannerDesc}>
              Premium memberships starting at just <strong>$49/month</strong>. No hidden fees. Zero initiation costs.
            </p>
          </div>
          <div className={styles.bannerAction}>
            <Link href="/pricing" className="btn">View Pricing Plans</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
