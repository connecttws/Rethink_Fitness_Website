'use client';

import { useState } from 'react';
import styles from './PricingPage.module.css';

export default function PricingClient({ pricingPlans, featureComparison, faqs }: { pricingPlans: any, featureComparison: any, faqs: any }) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <main className={styles.pageContainer}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            Invest In Your <span className="text-accent">Potential</span>
          </h1>
          <p className={styles.heroDesc}>
            Transparent pricing. No hidden fees. Choose the membership tier that fits your goals and start your transformation today.
          </p>

          <div className={styles.toggleContainer}>
            <span 
              className={`${styles.toggleLabel} ${!isAnnual ? styles.active : ''}`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </span>
            <div 
              className={styles.toggleSwitch} 
              data-active={isAnnual}
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <div className={styles.toggleKnob}></div>
            </div>
            <span 
              className={`${styles.toggleLabel} ${isAnnual ? styles.active : ''}`}
              onClick={() => setIsAnnual(true)}
            >
              Annually <span className={styles.discountBadge}>Save 15%</span>
            </span>
          </div>
        </div>
      </section>

      <section className={styles.pricingSection}>
        <div className="container">
          <div className={styles.grid}>
            {pricingPlans.map((plan: any) => (
              <div key={plan.id} className={`${styles.card} ${plan.isPopular ? styles.popular : ''}`}>
                {plan.isPopular && <div className={styles.badge}>Most Popular</div>}
                <h3 className={styles.planName}>{plan.name}</h3>
                
                <div className={styles.priceContainer}>
                  <span className={styles.price}>${isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                  <span className={styles.period}>/month</span>
                </div>
                
                <ul className={styles.featureList}>
                  {plan.features.map((feature: any, idx: number) => (
                    <li key={idx} className={styles.featureItem}>
                      <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`btn ${plan.isPopular ? '' : 'btn-outline'} ${styles.btnFull}`}>
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.comparisonSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Compare <span className="text-accent">Features</span></h2>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Basic</th>
                  <th className={styles.highlight}>Pro</th>
                  <th>Elite</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td>{item.feature}</td>
                    <td>
                      {typeof item.basic === 'boolean' 
                        ? (item.basic ? <CheckIcon /> : <CrossIcon />) 
                        : item.basic}
                    </td>
                    <td>
                      {typeof item.pro === 'boolean' 
                        ? (item.pro ? <CheckIcon /> : <CrossIcon />) 
                        : item.pro}
                    </td>
                    <td>
                      {typeof item.elite === 'boolean' 
                        ? (item.elite ? <CheckIcon /> : <CrossIcon />) 
                        : item.elite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Frequently Asked <span className="text-accent">Questions</span></h2>
          <div className={styles.faqGrid}>
            {faqs.map((faq: any, idx: number) => (
              <div key={idx} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CheckIcon() {
  return (
    <svg className={styles.iconYes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className={styles.iconNo} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
