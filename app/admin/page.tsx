'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isAdminEmail } from '@/lib/admin';
import Logo from '@/components/Logo';
import LeadsPanel from './LeadsPanel';
import ContentPanel from './ContentPanel';
import SettingsPanel from './SettingsPanel';
import { sections } from './sections';
import styles from './admin.module.css';

type Tab = 'leads' | 'settings' | (typeof sections)[number]['key'];

export default function AdminPage() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [tab, setTab] = useState<Tab>('leads');
  const [error, setError] = useState('');

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  async function signIn() {
    setError('');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code !== 'auth/popup-closed-by-user' && code !== 'auth/cancelled-popup-request') {
        setError(err instanceof Error ? err.message : 'Sign-in failed.');
      }
    }
  }

  if (user === undefined) {
    return <div className={styles.center}><p className={styles.muted}>Loading…</p></div>;
  }

  if (!user || !isAdminEmail(user.email)) {
    return (
      <div className={styles.center}>
        <div className={styles.signInCard}>
          <Logo variant="dark" size={52} />
          <h1 className={styles.signInTitle}>Site Admin</h1>
          {user ? (
            <>
              <p className={styles.muted}>
                {user.email} doesn&rsquo;t have access to this admin area.
              </p>
              <button className="btn btnOutline" onClick={() => signOut(auth)}>Use a different account</button>
            </>
          ) : (
            <>
              <p className={styles.muted}>Sign in to manage quote requests and website content.</p>
              <button className="btn btnPrimary" onClick={signIn}>
                <GoogleIcon /> Sign in with Google
              </button>
            </>
          )}
          {error && <p className={styles.error} role="alert">{error}</p>}
          <Link href="/" className={styles.backLink}>&larr; Back to website</Link>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'leads', label: 'Quote Requests' },
    ...sections.map((s) => ({ key: s.key as Tab, label: s.label })),
    { key: 'settings', label: 'Contact Info' },
  ];
  const section = sections.find((s) => s.key === tab);

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <Logo variant="dark" size={36} />
          <span>Site Admin</span>
        </div>
        <div className={styles.userBox}>
          <Link href="/" target="_blank" className={styles.link}>View site ↗</Link>
          <span className={styles.muted}>{user.email}</span>
          <button className={styles.textBtn} onClick={() => signOut(auth)}>Sign out</button>
        </div>
      </header>

      <nav className={styles.tabs} aria-label="Admin sections">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            onClick={() => setTab(t.key)}
            aria-current={tab === t.key ? 'page' : undefined}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className={styles.main}>
        {tab === 'leads' && <LeadsPanel />}
        {tab === 'settings' && <SettingsPanel />}
        {section && <ContentPanel key={section.key} section={section} />}
      </main>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}
