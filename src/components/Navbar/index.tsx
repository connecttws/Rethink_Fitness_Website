'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookingModal from '../BookingModal';
import { LoginForm } from '../dev-cms/LoginForm';
import styles from './Navbar.module.css';
import { VisualContent } from '@/lib/visual-data/loadContent';
import { EditableText } from '../visual-editor';

export default function Navbar({ data }: { data: VisualContent['navbar'] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  if (!data) return null; // Safe fallback

  return (
    <>
      <nav className={styles.nav}>
        <div className={`container ${styles.container}`}>
          <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
            <div onDoubleClick={() => setLoginOpen(true)}>
              <img src={data.logoImage} alt="RethinkFit Logo" className={styles.logoImg} />
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            <div className={styles.navLinks}>
              {data.links.map((link, i) => (
                <Link key={i} href={link.href}>
                  <EditableText path={`navbar.links.${i}.label`} fallback={link.label} />
                </Link>
              ))}
            </div>
            <button 
              className="btn" 
              style={{ padding: '10px 20px', fontSize: '0.9rem' }}
              onClick={() => setModalOpen(true)}
            >
              <EditableText path="navbar.ctaBtnText" fallback={data.ctaBtnText} />
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
          {data.links.map((link, i) => (
            <Link key={i} href={link.href} onClick={closeMobileMenu}>
              <EditableText path={`navbar.links.${i}.label`} fallback={link.label} />
            </Link>
          ))}
        </div>
        <button 
          className="btn" 
          onClick={() => {
            closeMobileMenu();
            setModalOpen(true);
          }}
        >
          <EditableText path="navbar.ctaBtnText" fallback={data.ctaBtnText} />
        </button>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Book Your Assessment"
      />

      {isLoginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="relative w-full max-w-md">
            <button
              className="absolute -right-3 -top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-xl transition-all hover:scale-105"
              onClick={() => setLoginOpen(false)}
            >
              ✕
            </button>
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
}
