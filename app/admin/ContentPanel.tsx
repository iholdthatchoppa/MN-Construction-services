'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Section } from './sections';
import styles from './admin.module.css';

type Item = { id: string; order: number; [key: string]: string | number };

export default function ContentPanel({ section }: { section: Section }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [editing, setEditing] = useState<string | null>(null); // item id, or 'new'
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(query(collection(db, section.collection), orderBy('order')));
      setItems(snap.docs.map((d) => ({ ...(d.data() as Omit<Item, 'id'>), id: d.id }) as Item));
    } catch (err) {
      setError(errorText(err));
      setItems([]);
    }
  }, [section.collection]);

  useEffect(() => { load(); }, [load]);

  async function run(action: () => Promise<unknown>) {
    setBusy(true);
    setError('');
    try {
      await action();
      await load();
      return true;
    } catch (err) {
      setError(errorText(err));
      return false;
    } finally {
      setBusy(false);
    }
  }

  const importDefaults = () =>
    run(async () => {
      const batch = writeBatch(db);
      section.defaults.forEach((d, order) => batch.set(doc(collection(db, section.collection)), { ...d, order }));
      await batch.commit();
    });

  async function save(id: string | 'new', values: Record<string, string>) {
    const ok = await run(async () => {
      if (id === 'new') {
        const order = items?.length ? Math.max(...items.map((i) => i.order)) + 1 : 0;
        await addDoc(collection(db, section.collection), { ...values, order });
      } else {
        // Merge so fields the form doesn't edit (order, placeholderColor) are kept.
        await setDoc(doc(db, section.collection, id), values, { merge: true });
      }
    });
    if (ok) setEditing(null);
  }

  function remove(item: Item) {
    if (!confirm(`Delete “${item[section.titleField]}”? This can’t be undone.`)) return;
    run(() => deleteDoc(doc(db, section.collection, item.id)));
  }

  function move(index: number, delta: number) {
    const list = items!;
    const a = list[index];
    const b = list[index + delta];
    if (!b) return;
    run(async () => {
      // Renumber everything so duplicate/gapped order values can't make a swap a no-op.
      const reordered = [...list];
      reordered[index] = b;
      reordered[index + delta] = a;
      const batch = writeBatch(db);
      reordered.forEach((item, order) => {
        if (item.order !== order) batch.update(doc(db, section.collection, item.id), { order });
      });
      await batch.commit();
    });
  }

  if (items === null) return <p className={styles.muted}>Loading…</p>;

  return (
    <section>
      <div className={styles.panelHead}>
        <div>
          <h2 className={styles.panelTitle}>{section.label}</h2>
          <p className={styles.muted}>Changes appear on the website within about a minute.</p>
        </div>
        {items.length > 0 && editing !== 'new' && (
          <button className="btn btnPrimary" onClick={() => setEditing('new')} disabled={busy}>Add</button>
        )}
      </div>

      {error && <p className={styles.error} role="alert">{error}</p>}

      {items.length === 0 && editing !== 'new' && (
        <div className={styles.empty}>
          <p>The website is still showing its built-in {section.label.toLowerCase()} content.</p>
          <p className={styles.muted}>Import it to start editing, or start from scratch.</p>
          <div className={styles.actions}>
            <button className="btn btnPrimary" onClick={importDefaults} disabled={busy}>
              Import current content ({section.defaults.length})
            </button>
            <button className="btn btnOutline" onClick={() => setEditing('new')} disabled={busy}>Start empty</button>
          </div>
        </div>
      )}

      {editing === 'new' && (
        <ItemForm section={section} initial={{}} busy={busy} onSave={(v) => save('new', v)} onCancel={() => setEditing(null)} />
      )}

      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={item.id} className={styles.card}>
            {editing === item.id ? (
              <ItemForm
                section={section}
                initial={item}
                busy={busy}
                onSave={(v) => save(item.id, v)}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <div className={styles.row}>
                <div className={styles.rowMain}>
                  <strong>{String(item[section.titleField] ?? '')}</strong>
                  <span className={styles.muted}>{summary(section, item)}</span>
                </div>
                <div className={styles.rowActions}>
                  <button className={styles.iconBtn} onClick={() => move(i, -1)} disabled={busy || i === 0} aria-label="Move up">↑</button>
                  <button className={styles.iconBtn} onClick={() => move(i, 1)} disabled={busy || i === items.length - 1} aria-label="Move down">↓</button>
                  <button className={styles.textBtn} onClick={() => setEditing(item.id)} disabled={busy}>Edit</button>
                  <button className={`${styles.textBtn} ${styles.danger}`} onClick={() => remove(item)} disabled={busy}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ItemForm({
  section,
  initial,
  busy,
  onSave,
  onCancel,
}: {
  section: Section;
  initial: Record<string, string | number>;
  busy: boolean;
  onSave: (values: Record<string, string>) => void;
  onCancel: () => void;
}) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    for (const f of section.fields) {
      let v = String(fd.get(f.key) ?? '').trim();
      if (f.type === 'lines') v = v.split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
      values[f.key] = v;
    }
    onSave(values);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {section.fields.map((f) => {
        const value = String(initial[f.key] ?? (f.type === 'select' ? f.options?.[0] : '') ?? '');
        const id = `f-${f.key}`;
        return (
          <label key={f.key} className={styles.field} htmlFor={id}>
            <span>
              {f.label}
              {f.hint && <em className={styles.hint}> — {f.hint}</em>}
            </span>
            {f.type === 'select' ? (
              <select id={id} name={f.key} defaultValue={value} required={f.required}>
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === 'text' ? (
              <input
                id={id}
                name={f.key}
                defaultValue={value}
                maxLength={f.max}
                required={f.required}
                pattern={f.pattern?.source}
              />
            ) : (
              <textarea id={id} name={f.key} defaultValue={value} maxLength={f.max} required={f.required} rows={f.type === 'lines' ? 5 : 4} />
            )}
          </label>
        );
      })}
      <div className={styles.actions}>
        <button type="submit" className="btn btnPrimary" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        <button type="button" className="btn btnOutline" onClick={onCancel} disabled={busy}>Cancel</button>
      </div>
    </form>
  );
}

function summary(section: Section, item: Item) {
  const other = section.fields.find((f) => f.key !== section.titleField && (f.type === 'textarea' || f.key === 'year'));
  const text = other ? String(item[other.key] ?? '') : '';
  return text.length > 90 ? text.slice(0, 90) + '…' : text;
}

export function errorText(err: unknown) {
  const code = (err as { code?: string }).code;
  if (code === 'permission-denied') return 'Permission denied — check the values are valid and that your account is an admin.';
  return err instanceof Error ? err.message : 'Something went wrong.';
}
