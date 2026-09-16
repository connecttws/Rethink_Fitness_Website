export const revalidate = 60;

import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import styles from './AboutPage.module.css';
import { isAdminSession } from '@/lib/auth/session';
import { EditModeProvider } from '@/components/visual-editor/EditModeContext';
import { EditorToolbar } from '@/components/visual-editor/EditorToolbar';
import { EditableText } from '@/components/visual-editor';
import { getCachedPageContent } from '@/lib/visual-data/loadContent';

function loadLocalAboutData() {
  try {
    const p = join(process.cwd(), 'visual-data', 'AboutContent.json');
    return JSON.parse(readFileSync(p, 'utf-8'));
  } catch {
    return {};
  }
}

export default async function AboutPage() {
  const localData = loadLocalAboutData();
  const dbData = await getCachedPageContent('/about');
  const isEditMode = await isAdminSession();

  const content = (dbData && Object.keys(dbData).length > 0) ? dbData : localData;

  const pillars = content.philosophy?.pillars || [
    {
      id: "01",
      title: "Rethink How You Train.",
      description: "Understand what you're doing and why you're doing it."
    },
    {
      id: "02",
      title: "Rethink What Progress Means.",
      description: "Progress isn't always about the number on the scale. It's about becoming stronger, fitter, and more capable."
    },
    {
      id: "03",
      title: "Rethink What You're Capable Of.",
      description: "Challenge the limits you've placed on yourself."
    },
    {
      id: "04",
      title: "Rethink What A Gym Can Be.",
      description: "A place to train, learn, connect, and become better."
    }
  ];

  return (
    <EditModeProvider isEditMode={isEditMode} visualContent={content} pageSlug="/about">
      <EditorToolbar />
      <main className={styles.pageContainer}>

        {/* 01. HERO */}
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>
              <EditableText path="hero.titlePrefix" fallback={content.hero?.titlePrefix || "We Built Rethink Because"} />{" "}
              <EditableText path="hero.titleAccent" fallback={content.hero?.titleAccent || "Fitness Needed To Be Rethought."} as="span" className="text-accent" />
            </h1>
            <EditableText 
              path="hero.subtitle" 
              fallback={content.hero?.subtitle || "A training environment built for people who want to do more than just work out — they want to become better."} 
              as="p" 
              className={styles.heroDesc} 
            />
          </div>
        </section>

        {/* 02. OUR STORY */}
        <section className={styles.storySection}>
          <div className={`container ${styles.storyGrid}`}>
            <div className={styles.storyImageWrapper}>
              <img 
                src="https://res.cloudinary.com/dqcls20dp/image/upload/v1788241654/rethink-gallery/syhad4oel3vxuakvh4ih.jpg" 
                alt="Rethink Fitness Facility" 
                className={styles.storyImage} 
              />
            </div>

            <div className={styles.storyContent}>
              <h2 className={styles.sectionTitle}>
                <EditableText path="story.titlePrefix" fallback={content.story?.titlePrefix || "It Started With"} />{" "}
                <EditableText path="story.titleAccent" fallback={content.story?.titleAccent || "A Simple Idea."} as="span" className="text-accent" />
              </h2>

              <p className={styles.highlightParagraph}>
                What if a gym could be more than a place you visit? What if it could be a place where you actually learned how to train, surrounded yourself with the right people, and built something that lasted?
              </p>

              <p className={styles.storyParagraph}>
                That idea became <strong>Rethink Fitness</strong>.
              </p>

              <p className={styles.storyParagraph}>
                Today, our goal remains the same: to create a training environment where every person who walks through our doors has the opportunity to become stronger, healthier, and more confident.
              </p>
            </div>
          </div>
        </section>

        {/* 03. THE RETHINK PHILOSOPHY */}
        <section className={styles.philosophySection}>
          <div className="container">
            <div className={styles.centerHeader}>
              <h2 className={styles.sectionTitle}>
                <EditableText path="philosophy.titlePrefix" fallback={content.philosophy?.titlePrefix || "The Rethink"} />{" "}
                <EditableText path="philosophy.titleAccent" fallback={content.philosophy?.titleAccent || "Philosophy"} as="span" className="text-accent" />
              </h2>
            </div>

            <div className={styles.pillarsGrid}>
              {pillars.map((pillar: any, idx: number) => (
                <div key={pillar.id || idx} className={styles.pillarCard}>
                  <span className={styles.pillarNumber}>{pillar.id || `0${idx + 1}`}</span>
                  <h3 className={styles.pillarTitle}>
                    <EditableText path={`philosophy.pillars.${idx}.title`} fallback={pillar.title} />
                  </h3>
                  <p className={styles.pillarDesc}>
                    <EditableText path={`philosophy.pillars.${idx}.description`} fallback={pillar.description} multiline />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04. FINAL CTA */}
        <section className={styles.finalCtaSection}>
          <div className="container">
            <div className={styles.ctaBox}>
              <h2 className={styles.sectionTitle}>
                <EditableText path="finalCta.titlePrefix" fallback={content.finalCta?.titlePrefix || "Ready to Rethink"} />{" "}
                <EditableText path="finalCta.titleAccent" fallback={content.finalCta?.titleAccent || "Your Fitness?"} as="span" className="text-accent" />
              </h2>
              <EditableText
                path="finalCta.subtitle"
                fallback={content.finalCta?.subtitle || "Start training with purpose and discover a different way to approach fitness."}
                as="p"
                className={styles.ctaSubtitle}
              />
              <Link href="/coaching#lead-form" className="btn" style={{ marginTop: '1rem' }}>
                <EditableText path="finalCta.ctaBtnText" fallback={content.finalCta?.ctaBtnText || "Start Your Journey"} />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </EditModeProvider>
  );
}
