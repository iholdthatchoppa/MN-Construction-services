'use client';

import { useEffect, useState } from 'react';
import Nav       from './Nav';
import Hero      from './Hero';
import Services  from './Services';
import Portfolio from './Portfolio';
import Trust     from './Trust';
import Cta       from './Cta';
import Footer    from './Footer';
import { getSiteContent, type SiteContent } from '@/lib/content';

// The site is static, so pull the latest /admin edits from Firestore once the page loads.
export default function HomeContent({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState(initial);

  useEffect(() => {
    let active = true;
    getSiteContent().then((fresh) => { if (active) setContent(fresh); });
    return () => { active = false; };
  }, []);

  const phone = { phone: content.phone, phoneHref: content.phoneHref };

  return (
    <>
      <Nav {...phone} />
      <main>
        <Hero {...phone} />
        <Services services={content.services} />
        <Portfolio portfolioItems={content.portfolioItems} />
        <Trust trustReasons={content.trustReasons} />
        <Cta {...phone} />
      </main>
      <Footer {...phone} email={content.email} />
    </>
  );
}
