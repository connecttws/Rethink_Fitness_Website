import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            <img src="/Images/Logo/RF%20LOGO-01.png" alt="RethinkFit Logo" className={styles.logoImg} />
          </Link>
          <p className={styles.brandDesc}>
            The ultimate fitness experience designed to push your boundaries. 
            State-of-the-art equipment, elite trainers, and an atmosphere built for champions.
          </p>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/trainers">Trainers</Link></li>
            <li><Link href="/schedule">Schedule</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Contact Us</h4>
          <ul className={styles.linkList}>
            <li>123 Fitness Ave, Iron District, NY 10001</li>
            <li>(555) 123-4567</li>
            <li>info@rethinkfit.com</li>
          </ul>
        </div>

        <div className={styles.hoursCol}>
          <h4 className={styles.colTitle}>Hours</h4>
          <ul className={styles.linkList}>
            <li>Mon - Fri: 5:00 AM - 11:00 PM</li>
            <li>Sat - Sun: 7:00 AM - 9:00 PM</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Rethink Fitness. All rights reserved.</p>
      </div>
    </footer>
  );
}
