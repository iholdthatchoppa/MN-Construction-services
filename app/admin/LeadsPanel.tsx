'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/content';
import { errorText } from './ContentPanel';
import styles from './admin.module.css';

const STATUSES = ['new', 'contacted', 'quoted', 'won', 'lost', 'archived'] as const;

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: (typeof STATUSES)[number];
  notes?: string;
  createdAt?: Timestamp;
};

export default function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [filter, setFilter] = useState<'open' | 'all' | Lead['status']>('open');
  const [openId, setOpenId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Live listener so new quote requests show up without a refresh.
  useEffect(() => {
    const q = query(collection(db, COLLECTIONS.leads), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snap) => setLeads(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Lead, 'id'>) }))),
      (err) => { setError(errorText(err)); setLeads([]); },
    );
  }, []);

  async function update(lead: Lead, fields: Partial<Pick<Lead, 'status' | 'notes'>>) {
    setError('');
    try {
      await updateDoc(doc(db, COLLECTIONS.leads, lead.id), { ...fields, updatedAt: serverTimestamp() });
    } catch (err) {
      setError(errorText(err));
    }
  }

  async function remove(lead: Lead) {
    if (!confirm(`Delete the request from ${lead.name}? This can’t be undone.`)) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.leads, lead.id));
    } catch (err) {
      setError(errorText(err));
    }
  }

  if (leads === null) return <p className={styles.muted}>Loading…</p>;

  const visible = leads.filter((l) =>
    filter === 'all' ? true : filter === 'open' ? !['won', 'lost', 'archived'].includes(l.status) : l.status === filter,
  );
  const newCount = leads.filter((l) => l.status === 'new').length;

  return (
    <section>
      <div className={styles.panelHead}>
        <div>
          <h2 className={styles.panelTitle}>Quote Requests</h2>
          <p className={styles.muted}>
            {newCount ? `${newCount} new · ` : ''}Submitted through the website contact form.
          </p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className={styles.filter} aria-label="Filter by status">
          <option value="open">Open</option>
          <option value="all">All</option>
          {STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
        </select>
      </div>

      {error && <p className={styles.error} role="alert">{error}</p>}

      {visible.length === 0 ? (
        <div className={styles.empty}><p className={styles.muted}>No requests here yet.</p></div>
      ) : (
        <ul className={styles.list}>
          {visible.map((lead) => {
            const open = openId === lead.id;
            return (
              <li key={lead.id} className={styles.card}>
                <button className={styles.leadHead} onClick={() => setOpenId(open ? null : lead.id)} aria-expanded={open}>
                  <span className={styles.rowMain}>
                    <strong>{lead.name}</strong>
                    <span className={styles.muted}>
                      {lead.service || 'General inquiry'} · {lead.createdAt ? formatDate(lead.createdAt.toDate()) : 'just now'}
                    </span>
                  </span>
                  <span className={`${styles.badge} ${styles['status_' + lead.status]}`}>{label(lead.status)}</span>
                </button>

                {open && (
                  <div className={styles.leadBody}>
                    <dl className={styles.meta}>
                      <dt>Email</dt><dd><a href={`mailto:${lead.email}`}>{lead.email}</a></dd>
                      {lead.phone && (<><dt>Phone</dt><dd><a href={`tel:${lead.phone}`}>{lead.phone}</a></dd></>)}
                    </dl>
                    <p className={styles.message}>{lead.message}</p>

                    <label className={styles.field}>
                      <span>Status</span>
                      <select value={lead.status} onChange={(e) => update(lead, { status: e.target.value as Lead['status'] })}>
                        {STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
                      </select>
                    </label>

                    <NotesField lead={lead} onSave={(notes) => update(lead, { notes })} />

                    <div className={styles.actions}>
                      <a className="btn btnPrimary" href={`mailto:${lead.email}?subject=${encodeURIComponent('Your quote request — MN Construction Services')}`}>Reply by email</a>
                      <button className={`${styles.textBtn} ${styles.danger}`} onClick={() => remove(lead)}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function NotesField({ lead, onSave }: { lead: Lead; onSave: (notes: string) => void }) {
  const [notes, setNotes] = useState(lead.notes ?? '');
  const dirty = notes !== (lead.notes ?? '');
  return (
    <label className={styles.field}>
      <span>Private notes</span>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={5000} rows={3} placeholder="Site visit booked, budget, follow-up date…" />
      {dirty && (
        <button type="button" className={`btn btnOutline ${styles.saveNotes}`} onClick={() => onSave(notes)}>Save notes</button>
      )}
    </label>
  );
}

function label(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatDate(d: Date) {
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}
