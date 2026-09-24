import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';
import styles from './Hero.module.css';

export default function Hero({ phone: PHONE, phoneHref: PHONE_HREF }: { phone: string; phoneHref: string }) {
  return (
    <section className={styles.hero} id="home" aria-label="Hero">
      {/* Background photo — the double-vanity bathroom (not reused in the portfolio) */}
      <Image
        className={styles.bg}
        src="/images/hero-bathroom.jpg"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
      />
      <div className="container">
        <div className={styles.inner}>

          {/* LEFT: copy */}
          <div className={styles.copy}>
            <div className={`eyebrow ${styles.eyebrow}`}>Building Dreams, Maintaining Excellence</div>

            <h1 className={styles.headline}>
              Crafting Homes<br />
              Built to <em>Last</em>
            </h1>

            <p className={styles.desc}>
              From full kitchen renovations to spa-worthy bathroom remodels,
              MN Construction Services LLC delivers expert craftsmanship and
              honest service across the greater Seattle area — on time, on budget,
              every time.
            </p>

            <div className={styles.actions}>
              <Link href="#contact" className={`btn btnPrimary`}>
                Get Free Estimate
              </Link>
              <a href={PHONE_HREF} className={styles.ctaPhone} aria-label={`Call us at ${PHONE}`}>
                <PhoneIcon />
                {PHONE}
              </a>
            </div>

            <div className={styles.stats} aria-label="Company statistics">
              <div className={styles.stat}>
                <span className={styles.statNum}>9+</span>
                <span className={styles.statLbl}>Years Experience</span>
              </div>
              <div className={styles.statSep} role="separator" />
              <div className={styles.stat}>
                <span className={styles.statNum}>200+</span>
                <span className={styles.statLbl}>Projects Complete</span>
              </div>
              <div className={styles.statSep} role="separator" />
              <div className={styles.stat}>
                <span className={styles.statNum}>✓</span>
                <span className={styles.statLbl}>Licensed &amp; Insured</span>
              </div>
            </div>
          </div>

          {/* RIGHT: photo collage */}
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.collage}>
              <div className={styles.photo1}>
                <Image
                  className={styles.img1}
                  src="/images/projects/waterfall-island-kitchen.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority
                />
              </div>
              <div className={styles.photo2}>
                <Image
                  className={styles.img2}
                  src="/images/projects/primary-bath-freestanding-tub.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className={styles.photo3}>
                <Image
                  className={styles.img3}
                  src="/images/projects/glass-subway-backsplash.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className={styles.badge} role="img" aria-label="MN Construction Services, established 2016">
                <Logo variant="light" size={40} />
                <span className={styles.badgeText}>Est. 2016</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
    </svg>
  );
}
