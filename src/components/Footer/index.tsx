import Link from 'next/link';
import styles from './Footer.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText } from '../visual-editor';

export default function Footer({ data }: { data: VisualContent['footer'] }) {
  if (!data) return null; // Safe fallback

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            <img src={data.logoImage} alt="RethinkFit Logo" className={styles.logoImg} />
          </Link>
          <EditableText 
            path="footer.brandDesc" 
            fallback={data.brandDesc} 
            as="p" 
            className={styles.brandDesc} 
            multiline 
          />
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            {data.quickLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.href}>
                  <EditableText path={`footer.quickLinks.${i}.label`} fallback={link.label} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Contact Us</h4>
          <ul className={styles.linkList}>
            <li><EditableText path="footer.address" fallback={data.address} /></li>
            <li><EditableText path="footer.phone" fallback={data.phone} /></li>
            <li><EditableText path="footer.email" fallback={data.email} /></li>
          </ul>
        </div>

        <div className={styles.hoursCol}>
          <h4 className={styles.colTitle}>Hours</h4>
          <ul className={styles.linkList}>
            {data.hours.map((hour, i) => (
              <li key={i}>
                <EditableText path={`footer.hours.${i}`} fallback={hour} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>
          &copy; {new Date().getFullYear()} <EditableText path="footer.copyrightText" fallback={data.copyrightText} />
        </p>
      </div>
    </footer>
  );
}
