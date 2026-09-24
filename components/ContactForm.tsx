'use client';

import { useState, FormEvent } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/content';
import styles from './ContactForm.module.css';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const serviceOptions = [
  'Kitchen Renovation',
  'Bathroom Renovation',
  'Home Repairs',
  'Basement Finishing',
  'Other',
];

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);
    const field = (k: string) => String(fd.get(k) ?? '').trim();
    const name = field('name');
    const phone = field('phone');
    const email = field('email');
    const service = field('service');
    const message = field('message');

    // Same limits as isValidNewLead() in firestore.rules
    const error =
      !name ? 'Please enter your name.' :
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? 'Please enter a valid email address.' :
      !message ? 'Please tell us about your project.' :
      name.length > 100 || email.length > 200 || phone.length > 40 || message.length > 5000 ? 'One of the fields is too long.' :
      '';
    if (error) {
      setState('error');
      setErrorMsg(error);
      return;
    }

    try {
      await addDoc(collection(db, COLLECTIONS.leads), {
        name,
        email,
        ...(phone && { phone }),
        ...(service && { service }),
        message,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      setState('success');
    } catch (err) {
      console.error('[contact] Failed to save request:', err);
      setState('error');
      setErrorMsg('Something went wrong. Please try again, or give us a call.');
    }
  }

  if (state === 'success') {
    return (
      <div className={styles.success} role="alert">
        <SuccessIcon />
        <h3>Message Sent!</h3>
        <p>Thanks for reaching out. We&rsquo;ll be in touch within 1 business day.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-name">Full Name <span aria-hidden="true">*</span></label>
          <input id="cf-name" name="name" type="text" placeholder="Jane Smith" required autoComplete="name" />
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-phone">Phone Number</label>
          <input id="cf-phone" name="phone" type="tel" placeholder="(206) 555-0123" autoComplete="tel" />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-email">Email Address <span aria-hidden="true">*</span></label>
          <input id="cf-email" name="email" type="email" placeholder="jane@example.com" required autoComplete="email" />
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-service">Service Interest</label>
          <select id="cf-service" name="service">
            <option value="">Select a service…</option>
            {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-message">Tell Us About Your Project <span aria-hidden="true">*</span></label>
        <textarea id="cf-message" name="message" rows={4} placeholder="Describe the scope, timeline, or any questions you have…" required />
      </div>

      {state === 'error' && (
        <p className={styles.errorMsg} role="alert">{errorMsg}</p>
      )}

      <button type="submit" className={`btn btnWhite ${styles.submit}`} disabled={state === 'loading'}>
        {state === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

function SuccessIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}
