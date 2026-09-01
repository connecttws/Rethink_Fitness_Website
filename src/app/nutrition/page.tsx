export const revalidate = 60;
import styles from './NutritionPage.module.css';
import BmiCalculator from '@/components/BmiCalculator';
import prisma from "@/lib/prisma";


import { isAdminSession } from "@/lib/auth/session";
import { EditModeProvider } from "@/components/visual-editor/EditModeContext";
import { EditorToolbar } from "@/components/visual-editor/EditorToolbar";
import { EditableText } from "@/components/visual-editor";
import { getCachedPageContent } from "@/lib/visual-data/loadContent";

export default async function NutritionPage() {
  const pageData = await getCachedPageContent('/nutrition');
  const isEditMode = await isAdminSession();
  
  // Provide safe fallbacks so the site doesn't break if the data hasn't been added to CMS yet
  const content = (pageData as any) || {};

  return (
    <EditModeProvider isEditMode={isEditMode} visualContent={content} pageSlug="/nutrition">
      <EditorToolbar />
      <main className={styles.pageContainer}>
        <section className={styles.hero}>
          <div className={`container ${styles.containerRelative}`}>
            <h1 className={styles.heroTitle}>
              <EditableText path="heroTitlePrefix" fallback="Nutrition Structured for Your" />{" "}
              <EditableText path="heroTitleAccent" fallback="Metabolism" as="span" className="text-accent" />
            </h1>
            <p className={styles.heroDesc}>
              <EditableText path="heroDesc" fallback="Workouts break down muscle tissue; what you eat determines whether you build lean muscle or stay stuck. At Rethink Fitness, nutrition is integrated directly into our personal training packages." />
            </p>
          </div>
        </section>

        <section className={styles.pillarsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>
              <EditableText path="pillarsTitlePrefix" fallback="The 3 Pillars of" />{" "}
              <EditableText path="pillarsTitleAccent" fallback="Nutrition" as="span" className="text-accent" />
            </h2>
            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <svg className={styles.pillarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <h3 className={styles.pillarTitle}>
                  <EditableText path="pillars.0.title" fallback="Macronutrient Balance" />
                </h3>
                <EditableText path="pillars.0.desc" fallback="We calculate the precise ratio of proteins, fats, and carbohydrates your body requires based on your specific training volume and goals, eliminating the guesswork from your diet." as="p" className={styles.pillarDesc} multiline />
              </div>
              
              <div className={styles.pillarCard}>
                <svg className={styles.pillarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                <h3 className={styles.pillarTitle}>
                  <EditableText path="pillars.1.title" fallback="Strategic Hydration" />
                </h3>
                <EditableText path="pillars.1.desc" fallback="Water alone isn't enough. We guide you on proper electrolyte replenishment and timing to ensure cellular hydration, maximize muscle pump, and prevent fatigue during grueling workouts." as="p" className={styles.pillarDesc} multiline />
              </div>

              <div className={styles.pillarCard}>
                <svg className={styles.pillarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
                <h3 className={styles.pillarTitle}>
                  <EditableText path="pillars.2.title" fallback="Micronutrient Timing" />
                </h3>
                <EditableText path="pillars.2.desc" fallback="It’s not just about what you eat, but *when* you eat it. We optimize your pre- and post-workout nutrition windows to spike insulin effectively and trigger rapid muscle protein synthesis." as="p" className={styles.pillarDesc} multiline />
              </div>
            </div>
          </div>
        </section>

        {/* Embedded BMI Calculator Component */}
        <BmiCalculator />

        <section className={styles.packagesSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>
              <EditableText path="packagesTitlePrefix" fallback="Coaching" />{" "}
              <EditableText path="packagesTitleAccent" fallback="Packages" as="span" className="text-accent" />
            </h2>
            <div className={styles.packagesGrid}>
              
              <div className={styles.packageCard}>
                <h3 className={styles.packageTitle}><EditableText path="packages.0.title" fallback="Dietitian Consultation" /></h3>
                <div className={styles.packagePrice}>$<EditableText path="packages.0.price" fallback="99" /><span style={{fontSize: '1rem', color: 'var(--text-secondary)'}}>/session</span></div>
                <ul className={styles.packageList}>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.0.features.0" fallback="Full dietary audit and habit analysis" /></li>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.0.features.1" fallback="Body composition baseline testing" /></li>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.0.features.2" fallback="Caloric baseline & macro targets setup" /></li>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.0.features.3" fallback="Supplementation recommendations" /></li>
                </ul>
                <button className={`btn btn-outline ${styles.btnFull}`}>Book Session</button>
              </div>

              <div className={styles.packageCard} style={{ borderColor: 'var(--accent-color)' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--accent-color)', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>MOST POPULAR</div>
                <h3 className={styles.packageTitle}><EditableText path="packages.1.title" fallback="Custom 30-Day Plan" /></h3>
                <div className={styles.packagePrice}>$<EditableText path="packages.1.price" fallback="249" /><span style={{fontSize: '1rem', color: 'var(--text-secondary)'}}>/month</span></div>
                <ul className={styles.packageList}>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.1.features.0" fallback="Everything in Consultation" /></li>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.1.features.1" fallback="Day-by-day customized meal plan" /></li>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.1.features.2" fallback="Grocery shopping lists & recipes" /></li>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.1.features.3" fallback="Weekly adjustments & check-ins" /></li>
                </ul>
                <button className={`btn ${styles.btnFull}`}>Start 30-Day Plan</button>
              </div>

              <div className={styles.packageCard}>
                <h3 className={styles.packageTitle}><EditableText path="packages.2.title" fallback="Elite Contest Prep" /></h3>
                <div className={styles.packagePrice}>$<EditableText path="packages.2.price" fallback="499" /><span style={{fontSize: '1rem', color: 'var(--text-secondary)'}}>/month</span></div>
                <ul className={styles.packageList}>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.2.features.0" fallback="Everything in Custom Plan" /></li>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.2.features.1" fallback="Peak week water & sodium manipulation" /></li>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.2.features.2" fallback="Daily physique check-ins" /></li>
                  <li className={styles.packageItem}><CheckIcon /><EditableText path="packages.2.features.3" fallback="24/7 priority access to your coach" /></li>
                </ul>
                <button className={`btn btn-outline ${styles.btnFull}`}>Apply Now</button>
              </div>

            </div>
          </div>
        </section>
      </main>
    </EditModeProvider>
  );
}

function CheckIcon() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

