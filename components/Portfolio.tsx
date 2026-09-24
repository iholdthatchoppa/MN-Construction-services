import Link from 'next/link';
import RevealWrapper from './RevealWrapper';
import styles from './Portfolio.module.css';
import type { PortfolioItem } from '@/lib/data';

export default function Portfolio({ portfolioItems }: { portfolioItems: PortfolioItem[] }) {
  return (
    <section className={styles.section} id="portfolio" aria-labelledby="portfolio-title">
      <div className="container">

        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <RevealWrapper><div className="eyebrow">Our Work</div></RevealWrapper>
            <RevealWrapper delay="d1">
              <h2 className="sectionTitle" id="portfolio-title">Projects We&rsquo;re Proud Of</h2>
            </RevealWrapper>
          </div>
          <RevealWrapper delay="d2">
            <Link href="#contact" className={`btn btnOutline`}>Request a Consultation</Link>
          </RevealWrapper>
        </div>

        <div className={styles.grid}>
          {portfolioItems.map((item, i) => {
            const delay = (['d1', 'd2'] as const)[(i - 1) % 2];
            return (
              <RevealWrapper key={item.id} delay={i === 0 ? undefined : delay}>
                <article className={styles.item} aria-label={item.imageAlt}>
                  {item.imageSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element -- photo URLs are set in /admin
                    <img className={styles.img} src={item.imageSrc} alt={item.imageAlt} loading="lazy" />
                  ) : (
                    <div
                      className={styles.img}
                      style={{ background: item.placeholderColor }}
                      role="img"
                      aria-label={item.imageAlt}
                    />
                  )}
                  <div className={styles.overlay} aria-hidden="true">
                    <div className={styles.info}>
                      <span className={styles.name}>{item.name}</span>
                      {item.year && <span className={styles.year}>{item.year}</span>}
                    </div>
                  </div>
                </article>
              </RevealWrapper>
            );
          })}
        </div>

      </div>
    </section>
  );
}
