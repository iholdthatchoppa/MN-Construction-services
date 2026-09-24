import RevealWrapper from './RevealWrapper';
import styles from './Services.module.css';
import type { ServiceItem } from '@/lib/data';

export default function Services({ services }: { services: ServiceItem[] }) {
  return (
    <section className={styles.section} id="services" aria-labelledby="services-title">
      <div className="container">

        <RevealWrapper className={styles.header}>
          <div className="eyebrow" style={{ color: 'var(--olive-light)' }}>What We Do</div>
          <h2 className={`sectionTitle ${styles.title}`} id="services-title">
            Expert Home Renovation Services
          </h2>
          <p className={styles.subtitle}>
            Three decades of combined craftsmanship, focused on the spaces you live in most.
          </p>
        </RevealWrapper>

        <div className={styles.grid}>
          {services.map((svc, i) => (
            <RevealWrapper key={svc.id} delay={(['d1', 'd2', 'd3'] as const)[i % 3]}>
              <ServiceCard svc={svc} />
            </RevealWrapper>
          ))}
        </div>

      </div>
    </section>
  );
}

function ServiceCard({ svc }: { svc: ServiceItem }) {
  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        <ServiceIcon id={svc.icon} />
      </div>
      <h3 className={styles.cardTitle}>{svc.title}</h3>
      <p className={styles.cardDesc}>{svc.desc}</p>
      <ul className={styles.list} role="list">
        {svc.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

function ServiceIcon({ id }: { id: ServiceItem['icon'] }) {
  if (id === 'kitchen') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="8" rx="2"/>
      <path d="M3 11v8a2 2 0 002 2h14a2 2 0 002-2v-8"/>
      <circle cx="8.5" cy="7" r="1.2"/>
      <circle cx="15.5" cy="7" r="1.2"/>
      <line x1="12" y1="15" x2="12" y2="19"/>
      <line x1="10" y1="17" x2="14" y2="17"/>
    </svg>
  );
  if (id === 'bathroom') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/>
      <path d="M6 12V5a2 2 0 012-2h3v2.5"/>
      <line x1="4" y1="20" x2="4" y2="22"/>
      <line x1="20" y1="20" x2="20" y2="22"/>
    </svg>
  );
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}
