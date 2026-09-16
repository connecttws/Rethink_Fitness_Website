import styles from './Pricing.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText } from '@/components/visual-editor';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export default function Pricing({ data }: { data: VisualContent['pricing'] }) {
  const bannerTitlePrefix = data?.bannerTitlePrefix || "Ready to";
  const bannerTitleAccent = data?.bannerTitleAccent || "Commit?";
  const bannerDescHtml = data?.bannerDescHtml || "Take the first step towards training with purpose and having a plan built around you. Get in touch with our team today.";

  return (
    <section id="ready-to-commit" className={styles.pricingSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h2 className={styles.bannerTitle}>
              <EditableText path="pricing.bannerTitlePrefix" fallback={bannerTitlePrefix} />{" "}
              <EditableText path="pricing.bannerTitleAccent" fallback={bannerTitleAccent} as="span" className="text-accent" />
            </h2>
            <p className={styles.bannerDesc} dangerouslySetInnerHTML={{ __html: bannerDescHtml }}></p>
            <div className={styles.perksList}>
              <div className={styles.perkItem}>
                <span className={styles.perkDot}>✓</span>
                <span>Personalized guidance tailored to your body</span>
              </div>
              <div className={styles.perkItem}>
                <span className={styles.perkDot}>✓</span>
                <span>Structured path to sustainable strength & progress</span>
              </div>
              <div className={styles.perkItem}>
                <span className={styles.perkDot}>✓</span>
                <span>Premium, focused facility designed for serious results</span>
              </div>
            </div>
          </div>
          
          <div className={styles.formWrapper}>
            <LeadCaptureForm 
              variant="general" 
              ctaText="Start Your Journey" 
              sourcePage="home-ready-to-commit" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
