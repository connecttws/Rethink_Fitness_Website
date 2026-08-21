import styles from './Pricing.module.css';
import Link from 'next/link';
import { VisualContent } from '@/lib/visual-data/loadContent';

export default function Pricing({ data }: { data: VisualContent['pricing'] }) {
  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h2 className={styles.bannerTitle}>
              {data.bannerTitlePrefix} <span className="text-accent">{data.bannerTitleAccent}</span>
            </h2>
            <p className={styles.bannerDesc} dangerouslySetInnerHTML={{ __html: data.bannerDescHtml }}></p>
          </div>
          <div className={styles.bannerAction}>
            <Link href="/pricing" className="btn">{data.btnText}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
