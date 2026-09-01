export const revalidate = 60;
import styles from './TrainersPage.module.css';
import prisma from "@/lib/prisma";

const detailedTrainers = [
  {
    id: 1,
    name: 'Marcus Vance',
    specialty: 'Strength & Conditioning',
    image: '/Images/Galley/DS9A7984.jpg',
    bio: 'Marcus is a former Olympic weightlifter with over 10 years of experience turning beginners into absolute beasts. His philosophy is rooted in mastering the basic compound movements before progressing to complex lifts. Whether your goal is to pack on muscle mass or increase your 1-rep max, Marcus will build a bulletproof foundation for your strength.',
    certifications: ['Olympic Weightlifting L2', 'NASM CPT', 'Precision Nutrition L1'],
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    specialty: 'HIIT & Endurance',
    image: '/Images/Galley/DS9A7985.jpg',
    bio: 'Sarah brings an infectious high-energy approach to every session. She specializes in pushing your cardiovascular limits and incinerating fat fast. With a background in competitive sprinting and CrossFit, Sarah’s workouts are intense, varied, and scientifically designed to boost your VO2 max and metabolic conditioning.',
    certifications: ['CrossFit L2', 'ACE Certified Personal Trainer', 'Kettlebell Athletics'],
  },
  {
    id: 3,
    name: 'David Chen',
    specialty: 'Mobility & Recovery',
    image: '/Images/Galley/DS9A7986.jpg',
    bio: 'David focuses on longevity, injury prevention, and building a foundation of true functional strength. Having recovered from a severe spinal injury himself, David understands the mechanics of the human body better than anyone. He works with athletes to fix imbalances, improve joint health, and ensure they can train hard for decades.',
    certifications: ['Doctor of Physical Therapy (DPT)', 'FRC Mobility Specialist', 'Yoga Alliance RYT 200'],
  }
];

import { isAdminSession } from "@/lib/auth/session";
import { EditModeProvider } from "@/components/visual-editor/EditModeContext";
import { EditorToolbar } from "@/components/visual-editor/EditorToolbar";
import { EditableText, EditableImage } from "@/components/visual-editor";
import { getCachedPageContent } from "@/lib/visual-data/loadContent";

export default async function TrainersPage() {
  const pageData = await getCachedPageContent('/trainers');
  const isEditMode = await isAdminSession();
  
  // Provide safe fallbacks so the site doesn't break if the data hasn't been added to CMS yet
  const content = (pageData as any) || {};

  const currentTrainers = content.detailedTrainers || detailedTrainers;

  return (
    <EditModeProvider isEditMode={isEditMode} visualContent={content} pageSlug="/trainers">
      <EditorToolbar />
      <main className={styles.pageContainer}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>
              <EditableText path="heroTitlePrefix" fallback="Personal Training Designed Around Your" />{" "}
              <EditableText path="heroTitleAccent" fallback="Biomechanics" as="span" className="text-accent" />
            </h1>
            <p className={styles.heroDesc}>
              <EditableText path="heroDesc" fallback="Stop wasting hours on exercises that cause joint pain and deliver slow results. Our certified personal trainers build a roadmap tailored specifically to your metabolic rate, mobility limitations, and physique goals." />
            </p>
          </div>
        </section>

        <section className={styles.trainersList}>
          <div className={`container ${styles.trainersContainer}`}>
            {currentTrainers.map((trainer: any, idx: number) => (
              <div key={trainer.id || idx} className={styles.trainerRow}>
                <div className={styles.imageContainer}>
                  <EditableImage path={`detailedTrainers.${idx}.image`} fallback={trainer.image} alt={trainer.name} imgClassName={styles.image} />
                </div>
                <div className={styles.infoContainer}>
                  <h2 className={styles.name}>
                    <EditableText path={`detailedTrainers.${idx}.name`} fallback={trainer.name} />
                  </h2>
                  <p className={styles.specialty}>
                    <EditableText path={`detailedTrainers.${idx}.specialty`} fallback={trainer.specialty} />
                  </p>
                  
                  <EditableText path={`detailedTrainers.${idx}.bio`} fallback={trainer.bio} as="p" className={styles.bio} multiline />
                  
                  <div className={styles.certifications}>
                    <h3 className={styles.certTitle}>Credentials</h3>
                    <div className={styles.certList}>
                      {trainer.certifications.map((cert: any, certIdx: number) => (
                        <span key={certIdx} className={styles.certBadge}>
                          <EditableText path={`detailedTrainers.${idx}.certifications.${certIdx}`} fallback={cert} />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <button className="btn">Book a Session</button>
                    <a href="#" className={styles.socialBtn} aria-label="Instagram">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </EditModeProvider>
  );
}

