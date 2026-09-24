// ============================================================
// SITE CONTENT — loaded from Firestore, falling back to lib/data.ts
// ============================================================
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import {
  PHONE,
  PHONE_HREF,
  EMAIL,
  services as defaultServices,
  portfolioItems as defaultPortfolio,
  trustReasons as defaultTrust,
  type ServiceItem,
  type PortfolioItem,
  type TrustItem,
} from './data';

export type SiteContent = {
  phone: string;
  phoneHref: string;
  email: string;
  services: ServiceItem[];
  portfolioItems: PortfolioItem[];
  trustReasons: TrustItem[];
};

/** Firestore collection names for each editable section. */
export const COLLECTIONS = {
  services: 'services',
  portfolio: 'portfolio',
  trust: 'trustReasons',
  settings: 'settings',
  leads: 'leads',
} as const;

export const SETTINGS_DOC = 'site';

/** 'tel:' link from a display number, e.g. (612) 555-0100 → tel:+16125550100 */
export function toPhoneHref(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  return `tel:+${digits.length === 10 ? '1' + digits : digits}`;
}

/** Bullets are stored as one newline-separated string so the rules can size-limit them. */
export function bulletsToList(bullets: unknown): string[] {
  if (Array.isArray(bullets)) return bullets.map(String);
  if (typeof bullets !== 'string') return [];
  return bullets.split('\n').map((b) => b.trim()).filter(Boolean);
}

async function loadOrdered<T>(name: string, map: (id: string, data: Record<string, unknown>) => T) {
  const snap = await getDocs(query(collection(db, name), orderBy('order')));
  return snap.docs.map((d) => map(d.id, d.data()));
}

export async function getSiteContent(): Promise<SiteContent> {
  const fallback: SiteContent = {
    phone: PHONE,
    phoneHref: PHONE_HREF,
    email: EMAIL,
    services: defaultServices,
    portfolioItems: defaultPortfolio,
    trustReasons: defaultTrust,
  };

  try {
    const [settings, services, portfolioItems, trustReasons] = await Promise.all([
      getDoc(doc(db, COLLECTIONS.settings, SETTINGS_DOC)),
      loadOrdered<ServiceItem>(COLLECTIONS.services, (id, d) => ({
        id,
        icon: d.icon as ServiceItem['icon'],
        title: String(d.title ?? ''),
        desc: String(d.desc ?? ''),
        bullets: bulletsToList(d.bullets),
      })),
      loadOrdered<PortfolioItem>(COLLECTIONS.portfolio, (id, d) => ({
        id,
        name: String(d.name ?? ''),
        year: String(d.year ?? ''),
        placeholderColor: String(d.placeholderColor || 'linear-gradient(145deg,#c4bdb3 0%,#b9b2a7 100%)'),
        imageSrc: d.imageSrc ? String(d.imageSrc) : undefined,
        imageAlt: String(d.imageAlt ?? ''),
      })),
      loadOrdered<TrustItem>(COLLECTIONS.trust, (id, d) => ({
        id,
        icon: d.icon as TrustItem['icon'],
        title: String(d.title ?? ''),
        desc: String(d.desc ?? ''),
      })),
    ]);

    const s = settings.data();
    const phone = s?.phone ? String(s.phone) : fallback.phone;

    // An empty collection means it hasn't been set up in /admin yet — keep the built-in copy.
    return {
      phone,
      phoneHref: toPhoneHref(phone) || fallback.phoneHref,
      email: s?.email ? String(s.email) : fallback.email,
      services: services.length ? services : fallback.services,
      portfolioItems: portfolioItems.length ? portfolioItems : fallback.portfolioItems,
      trustReasons: trustReasons.length ? trustReasons : fallback.trustReasons,
    };
  } catch (err) {
    console.error('[content] Falling back to built-in content:', err);
    return fallback;
  }
}
