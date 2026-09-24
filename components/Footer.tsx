import Link from 'next/link';
import Logo from './Logo';
import styles from './Footer.module.css';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer({
  phone: PHONE,
  phoneHref: PHONE_HREF,
  email: EMAIL,
}: {
  phone: string;
  phoneHref: string;
  email: string;
}) {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">

        <div className={styles.top}>
          <Link href="#home" className={styles.logo} aria-label="MN Construction Services LLC — back to top">
            <Logo variant="light" size={52} />
            <div className={styles.wordmark}>
              <span className={styles.wordmarkMain}>MN Construction Services</span>
              <span className={styles.wordmarkSub}>LLC &middot; Est. 2016 &middot; Licensed &amp; Insured</span>
            </div>
          </Link>

          <nav className={styles.nav} aria-label="Footer navigation">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>

          <div className={styles.contact}>
            <a href={PHONE_HREF}>{PHONE}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>&copy; {new Date().getFullYear()} MN Construction Services LLC. All rights reserved.</p>
          <span className={styles.tag}>Building Dreams, Maintaining Excellence</span>
        </div>

      </div>
    </footer>
  );
}
