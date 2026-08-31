import Link from 'next/link';
import styles from './GatewayTeaser.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText } from '@/components/visual-editor';

export default function GatewayTeaser({ data }: { data: VisualContent['gatewayTeaser'] }) {
  return (
    <section className={styles.gatewaySection}>
      <div className={styles.split}>
        <div className={`${styles.block} ${styles.trainersBlock}`}>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <EditableText path="gatewayTeaser.block1.title" fallback={data.block1.title} as="h2" className={styles.title} />
            <EditableText path="gatewayTeaser.block1.desc" fallback={data.block1.desc} as="p" className={styles.desc} multiline />
            <Link href="/trainers" className="btn">
              <EditableText path="gatewayTeaser.block1.btnText" fallback={data.block1.btnText} />
            </Link>
          </div>
        </div>
        
        <div className={`${styles.block} ${styles.classesBlock}`}>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <EditableText path="gatewayTeaser.block2.title" fallback={data.block2.title} as="h2" className={styles.title} />
            <EditableText path="gatewayTeaser.block2.desc" fallback={data.block2.desc} as="p" className={styles.desc} multiline />
            <Link href="/schedule" className="btn btn-outline">
              <EditableText path="gatewayTeaser.block2.btnText" fallback={data.block2.btnText} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
