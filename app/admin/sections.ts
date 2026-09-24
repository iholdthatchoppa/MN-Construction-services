import { COLLECTIONS } from '@/lib/content';
import { services, portfolioItems, trustReasons } from '@/lib/data';

// Editable site sections. Field limits mirror the validators in firestore.rules.

export type Field = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'lines';
  max: number;
  required?: boolean;
  options?: readonly string[];
  hint?: string;
  pattern?: RegExp;
};

export type Section = {
  key: string;
  label: string;
  collection: string;
  titleField: string;
  fields: readonly Field[];
  /** The content currently hard-coded in lib/data.ts, used to seed an empty collection. */
  defaults: readonly Record<string, string>[];
};

export const sections = [
  {
    key: 'services',
    label: 'Services',
    collection: COLLECTIONS.services,
    titleField: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text', max: 100, required: true },
      { key: 'icon', label: 'Icon', type: 'select', max: 20, required: true, options: ['kitchen', 'bathroom', 'repairs'] },
      { key: 'desc', label: 'Description', type: 'textarea', max: 1000, required: true },
      { key: 'bullets', label: 'Bullet points', type: 'lines', max: 2000, hint: 'One per line' },
    ],
    defaults: services.map((s) => ({ title: s.title, icon: s.icon, desc: s.desc, bullets: s.bullets.join('\n') })),
  },
  {
    key: 'portfolio',
    label: 'Portfolio',
    collection: COLLECTIONS.portfolio,
    titleField: 'name',
    fields: [
      { key: 'name', label: 'Project name', type: 'text', max: 120, required: true },
      { key: 'year', label: 'Year', type: 'text', max: 4, pattern: /^(\d{4})?$/, hint: 'Optional, e.g. 2024' },
      { key: 'imageSrc', label: 'Photo', type: 'text', max: 1000, pattern: /^(https:\/\/.+|\/images\/[\w.\/\-]+)?$/, hint: 'A /images/… path from the site, or an https:// link' },
      { key: 'imageAlt', label: 'Photo description', type: 'text', max: 200, required: true, hint: 'For screen readers and search engines' },
    ],
    defaults: portfolioItems.map((p) => ({
      name: p.name,
      year: p.year,
      imageSrc: p.imageSrc ?? '',
      imageAlt: p.imageAlt,
      placeholderColor: p.placeholderColor,
    })),
  },
  {
    key: 'trust',
    label: 'Why Choose Us',
    collection: COLLECTIONS.trust,
    titleField: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text', max: 100, required: true },
      { key: 'icon', label: 'Icon', type: 'select', max: 20, required: true, options: ['shield', 'clock', 'dollar', 'check'] },
      { key: 'desc', label: 'Description', type: 'textarea', max: 1000, required: true },
    ],
    defaults: trustReasons.map((t) => ({ title: t.title, icon: t.icon, desc: t.desc })),
  },
] as const satisfies readonly Section[];
