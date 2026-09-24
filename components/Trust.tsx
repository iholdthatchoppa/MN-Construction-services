import RevealWrapper from './RevealWrapper';
import styles from './Trust.module.css';
import type { TrustItem } from '@/lib/data';

export default function Trust({ trustReasons }: { trustReasons: TrustItem[] }) {
  return (
    <section className={styles.section} id="about" aria-labelledby="trust-title">
      <div className="container">
        <div className={styles.inner}>

          {/* LEFT: heading */}
          <div className={styles.left}>
            <RevealWrapper><div className="eyebrow">Why Choose Us</div></RevealWrapper>
            <RevealWrapper delay="d1">
              <h2 className={`sectionTitle ${styles.title}`} id="trust-title">
                Trusted by Greater Seattle<br />Homeowners Since 2016
              </h2>
            </RevealWrapper>
            <RevealWrapper delay="d2">
              <p className={styles.intro}>
                We&rsquo;re a local team serving homeowners across the greater Seattle
                area &mdash; kitchens, bathrooms, and everything in between.
              </p>
            </RevealWrapper>
          </div>

          {/* RIGHT: reasons */}
          <ul className={styles.list} role="list">
            {trustReasons.map((tr, i) => {
              const delay = (['d1', 'd2', 'd3', 'd4'] as const)[i % 4];
              return (
                <RevealWrapper key={tr.id} as="li" delay={delay}>
                  <TrustItem item={tr} />
                </RevealWrapper>
              );
            })}
          </ul>

        </div>
      </div>
    </section>
  );
}

function TrustItem({ item }: { item: TrustItem }) {
  return (
    <div className={styles.trustItem}>
      <div className={styles.icon} aria-hidden="true">
        <TrustIcon id={item.icon} />
      </div>
      <div className={styles.trustText}>
        <h4>{item.title}</h4>
        <p>{item.desc}</p>
      </div>
    </div>
  );
}

function TrustIcon({ id }: { id: TrustItem['icon'] }) {
  if (id === 'shield') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
  if (id === 'clock') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
  if (id === 'dollar') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
