import styles from './Pricing.module.css';
import Link from 'next/link';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText } from '@/components/visual-editor';

export default function Pricing({ data }: { data: VisualContent['pricing'] }) {
  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h2 className={styles.bannerTitle}>
              <EditableText path="pricing.bannerTitlePrefix" fallback={data.bannerTitlePrefix} />{" "}
              <EditableText path="pricing.bannerTitleAccent" fallback={data.bannerTitleAccent} as="span" className="text-accent" />
            </h2>
            <p className={styles.bannerDesc} dangerouslySetInnerHTML={{ __html: data.bannerDescHtml }}></p>
          </div>
          <div className={styles.bannerAction}>
            <Link href="/pricing" className="btn">
              <EditableText path="pricing.btnText" fallback={data.btnText} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
