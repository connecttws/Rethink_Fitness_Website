import styles from './Pricing.module.css';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$49',
    period: '/month',
    features: ['Access to gym equipment', 'Locker room access', '1 Group class per week'],
    isPopular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$89',
    period: '/month',
    features: ['Unlimited gym access', 'Unlimited group classes', 'Sauna & Spa access', '1 PT session per month'],
    isPopular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$149',
    period: '/month',
    features: ['Everything in Pro', '4 PT sessions per month', 'Nutrition plan', 'Priority booking'],
    isPopular: false,
  },
];

export default function Pricing() {
  return (
    <section className={styles.pricingSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            Membership <span className="text-accent">Plans</span>
          </h2>
          <p className={styles.sectionDesc}>
            Choose the perfect plan to crush your fitness goals.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan) => (
            <div key={plan.id} className={`${styles.card} ${plan.isPopular ? styles.popular : ''}`}>
              {plan.isPopular && <div className={styles.badge}>Most Popular</div>}
              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.priceContainer}>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>{plan.period}</span>
              </div>
              <ul className={styles.featureList}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`btn ${plan.isPopular ? '' : 'btn-outline'} ${styles.btnFull}`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
