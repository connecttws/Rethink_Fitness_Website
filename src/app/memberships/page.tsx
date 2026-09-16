export const revalidate = 60;

import { readFileSync } from 'fs';
import { join } from 'path';
import styles from './MembershipsPage.module.css';
import { isAdminSession } from '@/lib/auth/session';
import { EditModeProvider } from '@/components/visual-editor/EditModeContext';
import { EditorToolbar } from '@/components/visual-editor/EditorToolbar';
import { EditableText } from '@/components/visual-editor';
import { getCachedPageContent } from '@/lib/visual-data/loadContent';
import LeadCaptureForm from '@/components/LeadCaptureForm';

function loadLocalMembershipsData() {
  try {
    const p = join(process.cwd(), 'visual-data', 'MembershipsContent.json');
    return JSON.parse(readFileSync(p, 'utf-8'));
  } catch {
    return {};
  }
}

export default async function MembershipsPage() {
  const localData = loadLocalMembershipsData();
  const dbData = await getCachedPageContent('/memberships');
  const isEditMode = await isAdminSession();

  const content = (dbData && Object.keys(dbData).length > 0) ? dbData : localData;

  const options = content.options || [
    {
      id: "01",
      tag: "01 — GYM ACCESS",
      title: "Train Independently.",
      description: "Access the Rethink Fitness facility and train on your own schedule with the equipment and environment you need to stay consistent.",
      idealFor: "Independent training",
      ctaText: "Enquire About Gym Access"
    },
    {
      id: "02",
      tag: "02 — TRANSFORMATION PLANS",
      title: "Have a Goal. Follow a Plan. See the Change.",
      description: "A structured approach designed around your transformation goal, with the guidance, accountability, and direction needed to stay on track.",
      idealFor: "Fat loss • Muscle gain • Body recomposition • Overall transformation",
      ctaText: "Start Your Transformation"
    },
    {
      id: "03",
      tag: "03 — PERSONALISED 1-ON-1 COACHING",
      title: "Your Training. Completely Personalised.",
      description: "Dedicated coaching built around your goals, abilities, progress, and individual needs — with your coach guiding you throughout the journey.",
      idealFor: "Maximum personal attention & dedicated coaching",
      ctaText: "Enquire About 1-on-1 Coaching"
    }
  ];

  return (
    <EditModeProvider isEditMode={isEditMode} visualContent={content} pageSlug="/memberships">
      <EditorToolbar />
      <main className={styles.pageContainer}>
        
        {/* 01. HERO */}
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>
              <EditableText path="hero.titlePrefix" fallback={content.hero?.titlePrefix || "Find the Membership"} />{" "}
              <EditableText path="hero.titleAccent" fallback={content.hero?.titleAccent || "That Fits You."} as="span" className="text-accent" />
            </h1>
            <EditableText 
              path="hero.subtitle" 
              fallback={content.hero?.subtitle || "Whether you're looking for independent training or dedicated coaching, find the option that works best for your goals."} 
              as="p" 
              className={styles.heroDesc} 
            />
          </div>
        </section>

        {/* 02. CHOOSE HOW YOU WANT TO TRAIN */}
        <section className={styles.optionsSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <EditableText path="sectionHeader.titlePrefix" fallback={content.sectionHeader?.titlePrefix || "Choose How You"} />{" "}
                <EditableText path="sectionHeader.titleAccent" fallback={content.sectionHeader?.titleAccent || "Want to Train"} as="span" className="text-accent" />
              </h2>
            </div>

            <div className={styles.optionsGrid}>
              {options.map((opt: any, idx: number) => {
                const isTransformation = opt.id === '02';
                return (
                  <div key={opt.id || idx} className={`${styles.optionCard} ${isTransformation ? styles.highlightCard : ''}`}>
                    <span className={styles.optionTag}>
                      <EditableText path={`options.${idx}.tag`} fallback={opt.tag} />
                    </span>
                    <h3 className={styles.optionTitle}>
                      <EditableText path={`options.${idx}.title`} fallback={opt.title} />
                    </h3>
                    <p className={styles.optionDesc}>
                      <EditableText path={`options.${idx}.description`} fallback={opt.description} multiline />
                    </p>
                    <div className={styles.idealForBox}>
                      <span className={styles.idealForLabel}>Ideal for</span>
                      <p className={styles.idealForText}>
                        <EditableText path={`options.${idx}.idealFor`} fallback={opt.idealFor} />
                      </p>
                    </div>
                    <a 
                      href="#lead-form" 
                      className={`btn ${isTransformation ? '' : 'btn-outline'} ${styles.cardAction}`}
                    >
                      <EditableText path={`options.${idx}.ctaText`} fallback={opt.ctaText} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL LEAD CAPTURE */}
        <section id="lead-form" className={styles.finalCtaSection}>
          <div className="container">
            <div className={styles.ctaHeader}>
              <h2 className={styles.sectionTitle}>
                <EditableText path="finalLeadCapture.titlePrefix" fallback={content.finalLeadCapture?.titlePrefix || "Not sure which option"} />{" "}
                <EditableText path="finalLeadCapture.titleAccent" fallback={content.finalLeadCapture?.titleAccent || "is right for you?"} as="span" className="text-accent" />
              </h2>
              <EditableText
                path="finalLeadCapture.subtitle"
                fallback={content.finalLeadCapture?.subtitle || "Tell us about your goals and our team will help you find the right way to train at Rethink Fitness."}
                as="p"
                className={styles.ctaSubtitle}
              />
            </div>

            <LeadCaptureForm
              variant="memberships"
              ctaText={content.finalLeadCapture?.ctaText || "Find My Membership"}
              sourcePage="memberships-page"
            />
          </div>
        </section>

      </main>
    </EditModeProvider>
  );
}
