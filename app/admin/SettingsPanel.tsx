'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS, SETTINGS_DOC } from '@/lib/content';
import { PHONE, EMAIL } from '@/lib/data';
import { errorText } from './ContentPanel';
import styles from './admin.module.css';

export default function SettingsPanel() {
  const [values, setValues] = useState<{ phone: string; email: string } | null>(null);
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    getDoc(doc(db, COLLECTIONS.settings, SETTINGS_DOC))
      .then((snap) => {
        const d = snap.data();
        setValues({ phone: d?.phone ?? PHONE, email: d?.email ?? EMAIL });
      })
      .catch((err) => { setError(errorText(err)); setValues({ phone: PHONE, email: EMAIL }); });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState('saving');
    setError('');
    try {
      await setDoc(doc(db, COLLECTIONS.settings, SETTINGS_DOC), {
        phone: String(fd.get('phone') ?? '').trim(),
        email: String(fd.get('email') ?? '').trim(),
        updatedAt: serverTimestamp(),
      });
      setState('saved');
    } catch (err) {
      setError(errorText(err));
      setState('idle');
    }
  }

  if (!values) return <p className={styles.muted}>Loading…</p>;

  return (
    <section>
      <div className={styles.panelHead}>
        <div>
          <h2 className={styles.panelTitle}>Contact Info</h2>
          <p className={styles.muted}>Shown in the header, hero, contact section and footer.</p>
        </div>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <form className={`${styles.form} ${styles.card}`} onSubmit={handleSubmit} onChange={() => setState('idle')}>
        <label className={styles.field}>
          <span>Phone number</span>
          <input name="phone" type="tel" defaultValue={values.phone} maxLength={40} placeholder="(206) 555-0100" />
        </label>
        <label className={styles.field}>
          <span>Email address <em className={styles.hint}>— shown on the site</em></span>
          <input name="email" type="email" defaultValue={values.email} maxLength={200} required />
        </label>
        <div className={styles.actions}>
          <button type="submit" className="btn btnPrimary" disabled={state === 'saving'}>
            {state === 'saving' ? 'Saving…' : 'Save'}
          </button>
          {state === 'saved' && <span className={styles.muted}>Saved.</span>}
        </div>
      </form>
    </section>
  );
}
