import styles from './Trainers.module.css';
import Link from 'next/link';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText, EditableGroup } from '@/components/visual-editor';

export default function Trainers({ data }: { data: VisualContent['trainers'] }) {

  return (
    <section id="trainers" className={styles.trainersSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            <EditableText path="trainers.titlePrefix" fallback={data.titlePrefix} />{" "}
            <EditableText path="trainers.titleAccent" fallback={data.titleAccent} as="span" className="text-accent" />
          </h2>
          <EditableText 
            path="trainers.description" 
            fallback={data.description} 
            as="p" 
            className={styles.sectionDesc} 
            multiline 
          />
        </div>

        <div className={styles.grid}>
          {data.items.map((trainer, idx) => {
            const cardContent = (
              <>
                <div className={styles.imageWrapper}>
                  <img 
                    src={trainer.image}
                    alt={trainer.name}
                    className={`w-full h-full absolute inset-0 object-cover ${styles.image}`}
                  />
                  <div className={styles.overlay}>
                    <p className={styles.bio}>{trainer.bio}</p>
                    <button className="btn btn-outline" style={{marginTop: '1rem'}}>Book Session</button>
                  </div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{trainer.name}</h3>
                  <p className={styles.specialty}>{trainer.specialty}</p>
                </div>
              </>
            );

            return (
              <div key={trainer.id} className={styles.card}>
                <EditableGroup
                  basePath={`trainers.items.${idx}`}
                  schema={[
                    { key: 'image', label: 'Trainer Photo', type: 'image' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'specialty', label: 'Specialty', type: 'text' },
                    { key: 'bio', label: 'Biography', type: 'textarea' }
                  ]}
                  className="w-full h-full block"
                >
                  {cardContent}
                </EditableGroup>
              </div>
            );
          })}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/trainers" className="btn">
            <EditableText path="trainers.btnText" fallback={data.btnText} />
          </Link>
        </div>
      </div>
    </section>
  );
}
