import RevealWrapper from './RevealWrapper';
import ContactForm from './ContactForm';
import styles from './Cta.module.css';

export default function Cta({ phone: PHONE, phoneHref: PHONE_HREF }: { phone: string; phoneHref: string }) {
  return (
    <section className={styles.section} id="contact" aria-labelledby="cta-title">
      <div className="container">
        <div className={styles.inner}>

          <RevealWrapper className={styles.textBlock}>
            <div className={`eyebrow ${styles.eyebrow}`}>Let&rsquo;s Get Started</div>
            <h2 className={styles.title} id="cta-title">
              Ready to Transform<br />Your Home?
            </h2>
            <p className={styles.sub}>
              Fill out the form and we&rsquo;ll get back to you within 1 business day
              with a free, no-obligation estimate.
            </p>
            <a href={PHONE_HREF} className={styles.phoneLink}>
              <PhoneIcon />
              {PHONE}
            </a>
          </RevealWrapper>

          <RevealWrapper className={styles.formBlock} delay="d1">
            <ContactForm />
          </RevealWrapper>

        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
    </svg>
  );
}
