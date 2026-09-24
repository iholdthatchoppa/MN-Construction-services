// ============================================================
// SITE CONTENT — edit this file to update all section copy
// ============================================================

export const PHONE = '(206) 499-5229';
export const PHONE_HREF = 'tel:+12064995229';
export const EMAIL = 'MehranGC@outlook.com';

// ---------- Services ----------
export type ServiceItem = {
  id: string;
  icon: 'kitchen' | 'bathroom' | 'repairs';
  title: string;
  desc: string;
  bullets: string[];
};

export const services: ServiceItem[] = [
  {
    id: 'kitchen',
    icon: 'kitchen',
    title: 'Kitchen Renovations',
    desc: 'Transform your kitchen into a functional, beautiful space tailored exactly to how you cook and live every day.',
    bullets: [
      'Custom cabinetry & countertops',
      'Full layout redesigns',
      'Appliance installation',
      'Backsplash & tile work',
      'Lighting & electrical upgrades',
    ],
  },
  {
    id: 'bathroom',
    icon: 'bathroom',
    title: 'Bathroom Renovations',
    desc: 'From spa-inspired master baths to efficient guest bathrooms — every detail handled with precision and care.',
    bullets: [
      'Shower & tub replacement',
      'Vanity & fixture upgrades',
      'Floor & wall tiling',
      'Plumbing rough-in & finish',
      'Waterproofing & ventilation',
    ],
  },
  {
    id: 'repairs',
    icon: 'repairs',
    title: 'Home Repairs',
    desc: 'Quality repairs done right the first time — whether it\'s a targeted fix or a comprehensive maintenance project.',
    bullets: [
      'Drywall repair & painting',
      'Flooring repair & installation',
      'Door & window work',
      'Trim & finish carpentry',
      'Basement finishing',
    ],
  },
];

// ---------- Portfolio ----------
export type PortfolioItem = {
  id: string;
  name: string;
  /** Optional — hidden when empty */
  year: string;
  /** Background shown while the photo loads, or if there is no photo */
  placeholderColor: string;
  /** '/images/projects/…' or an https:// URL */
  imageSrc?: string;
  imageAlt: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'waterfall-island-kitchen',
    name: 'Waterfall Island Kitchen',
    year: '',
    placeholderColor: 'linear-gradient(145deg,#cac2b8 0%,#bdb5aa 100%)',
    imageSrc: '/images/projects/waterfall-island-kitchen.jpg',
    imageAlt: 'Remodeled kitchen with a marble waterfall island, white shaker cabinets and a skylight',
  },
  {
    id: 'primary-bath-freestanding-tub',
    name: 'Primary Bath with Freestanding Tub',
    year: '',
    placeholderColor: 'linear-gradient(145deg,#b8b0a6 0%,#ada69c 100%)',
    imageSrc: '/images/projects/primary-bath-freestanding-tub.jpg',
    imageAlt: 'Bathroom with a frameless glass shower, freestanding soaking tub and marble-look tile',
  },
  {
    id: 'open-concept-kitchen',
    name: 'Open-Concept Kitchen',
    year: '',
    placeholderColor: 'linear-gradient(145deg,#b0a99f 0%,#a59e94 100%)',
    imageSrc: '/images/projects/open-concept-kitchen.jpg',
    imageAlt: 'Open kitchen with grey shaker cabinets, quartz peninsula and stainless appliances',
  },
  {
    id: 'white-shaker-kitchen',
    name: 'White Shaker Kitchen',
    year: '',
    placeholderColor: 'linear-gradient(145deg,#bfb8ae 0%,#b4ada3 100%)',
    imageSrc: '/images/projects/white-shaker-kitchen.jpg',
    imageAlt: 'Kitchen with white shaker cabinets, glass tile backsplash, marble waterfall island and stainless appliances',
  },
  {
    id: 'stacked-stone-fireplace',
    name: 'Stacked-Stone Fireplace',
    year: '',
    placeholderColor: 'linear-gradient(145deg,#c4bdb3 0%,#b9b2a7 100%)',
    imageSrc: '/images/projects/stacked-stone-fireplace.jpg',
    imageAlt: 'Floor-to-ceiling grey stacked-stone fireplace surround next to a large window',
  },
];

// ---------- Trust reasons ----------
export type TrustItem = {
  id: string;
  icon: 'shield' | 'clock' | 'dollar' | 'check';
  title: string;
  desc: string;
};

export const trustReasons: TrustItem[] = [
  {
    id: 'licensed',
    icon: 'shield',
    title: 'Licensed & Fully Insured',
    desc: "All work is performed by licensed contractors. You're protected on every project — no exceptions, no shortcuts.",
  },
  {
    id: 'experience',
    icon: 'clock',
    title: '9+ Years of Local Experience',
    desc: 'Deep roots in the greater Seattle community. We know local codes, the Pacific Northwest climate, and what lasts.',
  },
  {
    id: 'pricing',
    icon: 'dollar',
    title: 'Transparent, Fair Pricing',
    desc: 'Detailed written estimates before any work begins. No hidden fees, no surprise invoices at the end.',
  },
  {
    id: 'ontime',
    icon: 'check',
    title: 'On-Time, On-Budget Delivery',
    desc: 'We set realistic timelines and stick to them. Your home and your schedule are always respected.',
  },
];
