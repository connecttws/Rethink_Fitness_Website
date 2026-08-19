'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookingModal from '../BookingModal';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className={styles.nav}>
        <div className={`container ${styles.container}`}>
          <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
            <img src="/Images/Logo/RF%20LOGO-01.png" alt="RethinkFit Logo" className={styles.logoImg} />
          </Link>
          
          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            <div className={styles.navLinks}>
              <Link href="/">Home</Link>
              <Link href="/trainers">Trainers</Link>
              <Link href="/schedule">Schedule</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/nutrition">Nutrition</Link>
              <Link href="/blog">Blog</Link>
            </div>
            <button 
              className="btn" 
              style={{ padding: '10px 20px', fontSize: '0.9rem' }}
              onClick={() => setModalOpen(true)}
            >
              Claim Free Pass
            </button>
          </div>

          {/* Hamburger Icon */}
          <button className={styles.hamburger} onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileLinks}>
          <Link href="/" onClick={closeMobileMenu}>Home</Link>
          <Link href="/trainers" onClick={closeMobileMenu}>Trainers</Link>
          <Link href="/schedule" onClick={closeMobileMenu}>Schedule</Link>
          <Link href="/pricing" onClick={closeMobileMenu}>Pricing</Link>
          <Link href="/nutrition" onClick={closeMobileMenu}>Nutrition</Link>
          <Link href="/blog" onClick={closeMobileMenu}>Blog</Link>
        </div>
        <button 
          className="btn" 
          onClick={() => {
            closeMobileMenu();
            setModalOpen(true);
          }}
        >
          Claim Free Pass
        </button>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Claim Your Free VIP Pass"
      />
    </>
  );
}
