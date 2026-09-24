'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import styles from './Nav.module.css';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav({ phone: PHONE, phoneHref: PHONE_HREF }: { phone: string; phoneHref: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className="container">
        <div className={styles.inner}>

          {/* Logo */}
          <Link href="#home" className={styles.logo} aria-label="MN Construction Services LLC — home">
            <Logo variant="dark" size={40} />
            <div className={styles.wordmark}>
              <span className={styles.wordmarkMain}>MN Construction</span>
              <span className={styles.wordmarkSub}>Services LLC &middot; Est. 2016</span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className={styles.links} aria-label="Primary navigation">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>

          {/* Right: phone + CTA */}
          <div className={styles.right}>
            <a href={PHONE_HREF} className={styles.phone} aria-label={`Call ${PHONE}`}>
              <PhoneIcon />
              <span>{PHONE}</span>
            </a>
            <Link href="#contact" className={`btn btnPrimary ${styles.cta}`}>Get a Quote</Link>
          </div>

        </div>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
    </svg>
  );
}
