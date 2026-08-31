import styles from './Trainers.module.css';
import Link from 'next/link';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText, EditableImage } from '@/components/visual-editor';

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
          {data.items.map((trainer, idx) => (
            <div key={trainer.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <EditableImage 
                  path={`trainers.items.${idx}.image`}
                  fallback={trainer.image}
                  alt={trainer.name}
                  className={`w-full h-full absolute inset-0 ${styles.image}`}
                  imgClassName="w-full h-full object-cover"
                />
                <div className={styles.overlay}>
                  <EditableText 
                    path={`trainers.items.${idx}.bio`} 
                    fallback={trainer.bio} 
                    as="p" 
                    className={styles.bio} 
                    multiline 
                  />
                  <button className="btn btn-outline" style={{marginTop: '1rem'}}>Book Session</button>
                </div>
              </div>
              <div className={styles.info}>
                <EditableText path={`trainers.items.${idx}.name`} fallback={trainer.name} as="h3" className={styles.name} />
                <EditableText path={`trainers.items.${idx}.specialty`} fallback={trainer.specialty} as="p" className={styles.specialty} />
              </div>
            </div>
          ))}
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
