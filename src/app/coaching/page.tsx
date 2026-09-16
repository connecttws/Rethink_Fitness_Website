export const revalidate = 60;

import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import styles from './CoachingPage.module.css';
import { isAdminSession } from '@/lib/auth/session';
import { EditModeProvider } from '@/components/visual-editor/EditModeContext';
import { EditorToolbar } from '@/components/visual-editor/EditorToolbar';
import { EditableText, EditableImage } from '@/components/visual-editor';
import { getCachedPageContent } from '@/lib/visual-data/loadContent';
import LeadCaptureForm from '@/components/LeadCaptureForm';

function loadLocalCoachingData() {
  try {
    const coachingPath = join(process.cwd(), 'visual-data', 'CoachingContent.json');
    return JSON.parse(readFileSync(coachingPath, 'utf-8'));
  } catch {
    return {};
  }
}

function loadLocalTrainersData() {
  try {
    const trainersPath = join(process.cwd(), 'visual-data', 'TrainersContent.json');
    return JSON.parse(readFileSync(trainersPath, 'utf-8'));
  } catch {
    return { detailedTrainers: [] };
  }
}

const fallbackTrainers = [
  {
    id: 1,
    name: 'Marcus Vance',
    specialty: 'Strength & Conditioning',
    image: 'https://res.cloudinary.com/dqcls20dp/image/upload/v1788241803/rethink-gallery/hlknyuwfm3wslvga7zsk.jpg',
    bio: 'Marcus is a former Olympic weightlifter with over 10 years of experience turning beginners into absolute beasts. His philosophy is rooted in mastering basic compound movements before progressing to complex lifts.',
    certifications: ['Olympic Weightlifting L2', 'NASM CPT', 'Precision Nutrition L1'],
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    specialty: 'HIIT & Endurance',
    image: 'https://res.cloudinary.com/dqcls20dp/image/upload/v1788241819/rethink-gallery/gof7unqio7dohre0ivin.jpg',
    bio: 'Sarah brings an infectious high-energy approach to every session. She specializes in pushing cardiovascular limits and incinerating fat fast.',
    certifications: ['CrossFit L2', 'ACE Certified Personal Trainer', 'Kettlebell Athletics'],
  },
  {
    id: 3,
    name: 'David Chen',
    specialty: 'Mobility & Recovery',
    image: 'https://res.cloudinary.com/dqcls20dp/image/upload/v1788241835/rethink-gallery/ad8jauvdze1efu1mpi2z.jpg',
    bio: 'David focuses on longevity, injury prevention, and building a foundation of true functional strength, working with athletes to fix imbalances and improve joint health.',
    certifications: ['Doctor of Physical Therapy', 'FRC Mobility Specialist', 'Yoga Alliance RYT 200'],
  }
];

export default async function CoachingPage() {
  const localData = loadLocalCoachingData();
  const trainersData = loadLocalTrainersData();
  const dbData = await getCachedPageContent('/coaching');
  const isEditMode = await isAdminSession();

  const content = (dbData && Object.keys(dbData).length > 0) ? dbData : localData;
  const coaches = trainersData.detailedTrainers && trainersData.detailedTrainers.length > 0
    ? trainersData.detailedTrainers
    : fallbackTrainers;

  return (
    <EditModeProvider isEditMode={isEditMode} visualContent={content} pageSlug="/coaching">
      <EditorToolbar />
      <main className={styles.pageContainer}>
        
        {/* 01. HERO */}
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>
              <EditableText path="hero.titlePrefix" fallback={content.hero?.titlePrefix || "Your Goals. Your Plan."} />{" "}
              <EditableText path="hero.titleAccent" fallback={content.hero?.titleAccent || "Your Progress."} as="span" className="text-accent" />
            </h1>
            <EditableText 
              path="hero.subtitle" 
              fallback={content.hero?.subtitle || "Personalized training, expert guidance, and a plan designed around your goals — because your training should be as individual as you are."} 
              as="p" 
              className={styles.heroDesc} 
            />
            <a href="#lead-form" className="btn">
              <EditableText path="hero.ctaBtnText" fallback={content.hero?.ctaBtnText || "Start Your Journey"} />
            </a>
          </div>
        </section>

        {/* 02. MORE THAN JUST PERSONAL TRAINING */}
        <section className={styles.moreThanSection}>
          <div className={`container ${styles.splitGrid}`}>
            <div>
              <h2 className={styles.sectionTitle}>
                <EditableText path="moreThanPT.titlePrefix" fallback={content.moreThanPT?.titlePrefix || "More Than Just"} />{" "}
                <EditableText path="moreThanPT.titleAccent" fallback={content.moreThanPT?.titleAccent || "Personal Training"} as="span" className="text-accent" />
              </h2>
              <EditableText
                path="moreThanPT.desc"
                fallback={content.moreThanPT?.desc || "1-on-1 coaching at Rethink Fitness is built around you — your goals, your current ability, and your progress. Every part of your training is intentional, from the plan you follow to the way you perform each movement."}
                as="p"
                className={styles.sectionLead}
                multiline
              />
            </div>
            
            <div className={styles.includesList}>
              {(content.moreThanPT?.includes || [
                "Personalized Training Plan",
                "1-on-1 Coach Guidance",
                "Progress Tracking",
                "Exercise & Technique Coaching",
                "Accountability & Support"
              ]).map((item: string, idx: number) => (
                <div key={idx} className={styles.includesItem}>
                  <span className={styles.checkBadge}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03. HOW YOUR COACHING JOURNEY WORKS */}
        <section className={styles.howSection}>
          <div className="container">
            <div className={styles.centerHeader}>
              <h2 className={styles.sectionTitle}>
                <EditableText path="howItWorks.titlePrefix" fallback={content.howItWorks?.titlePrefix || "How Your Coaching"} />{" "}
                <EditableText path="howItWorks.titleAccent" fallback={content.howItWorks?.titleAccent || "Journey Works"} as="span" className="text-accent" />
              </h2>
            </div>

            <div className={styles.stepsGrid}>
              {(content.howItWorks?.steps || [
                { step: "01", title: "Understand", desc: "We start by understanding your goals, experience, lifestyle, and where you are today." },
                { step: "02", title: "Plan", desc: "Your coach creates a training approach designed specifically around you and your goals." },
                { step: "03", title: "Train", desc: "You train with your coach, learning the right techniques and building strength, confidence, and consistency." },
                { step: "04", title: "Progress", desc: "Your progress is tracked and your training evolves as you get stronger and your goals develop." }
              ]).map((stepItem: any, idx: number) => (
                <div key={idx} className={styles.stepCard}>
                  <span className={styles.stepNumber}>{stepItem.step}</span>
                  <h3 className={styles.stepTitle}>{stepItem.title}</h3>
                  <p className={styles.stepDesc}>{stepItem.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04. THE RIGHT COACH CHANGES EVERYTHING */}
        <section id="coaches" className={styles.coachesSection}>
          <div className="container">
            <div className={styles.coachesHeader}>
              <h2 className={styles.sectionTitle}>
                <EditableText path="coachesSection.titlePrefix" fallback={content.coachesSection?.titlePrefix || "The Right Coach"} />{" "}
                <EditableText path="coachesSection.titleAccent" fallback={content.coachesSection?.titleAccent || "Changes Everything."} as="span" className="text-accent" />
              </h2>
              <EditableText
                path="coachesSection.desc"
                fallback={content.coachesSection?.desc || "Training becomes different when you have someone who knows your goals, understands your journey, and knows when to push you and when to adapt."}
                as="p"
                className={styles.sectionLead}
              />
            </div>

            <div className={styles.coachesGrid}>
              {coaches.map((coach: any, idx: number) => (
                <div key={coach.id || idx} className={styles.coachCard}>
                  <div className={styles.coachImageWrapper}>
                    <img 
                      src={coach.image} 
                      alt={coach.name} 
                      className={styles.coachImage} 
                    />
                  </div>
                  <div className={styles.coachInfo}>
                    <h3 className={styles.coachName}>{coach.name}</h3>
                    <p className={styles.coachSpecialty}>{coach.specialty}</p>
                    <p className={styles.coachBio}>{coach.bio}</p>
                    {coach.certifications && (
                      <div className={styles.certList}>
                        {coach.certifications.map((c: string, cIdx: number) => (
                          <span key={cIdx} className={styles.certBadge}>{c}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA & LEAD CAPTURE FORM */}
        <section id="lead-form" className={styles.finalCtaSection}>
          <div className="container">
            <div className={styles.ctaHeader}>
              <h2 className={styles.sectionTitle}>
                <EditableText path="finalCta.titlePrefix" fallback={content.finalCta?.titlePrefix || "Ready to Start"} />{" "}
                <EditableText path="finalCta.titleAccent" fallback={content.finalCta?.titleAccent || "Your Journey?"} as="span" className="text-accent" />
              </h2>
              <EditableText
                path="finalCta.desc"
                fallback={content.finalCta?.desc || "Take the first step towards training with purpose and having a plan built around you."}
                as="p"
                className={styles.sectionLead}
              />
            </div>

            <LeadCaptureForm
              variant="general"
              ctaText="Start Your Journey"
              sourcePage="1-on-1-coaching"
            />
          </div>
        </section>

      </main>
    </EditModeProvider>
  );
}
