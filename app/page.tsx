import Nav       from '@/components/Nav';
import Hero      from '@/components/Hero';
import Services  from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Trust     from '@/components/Trust';
import Cta       from '@/components/Cta';
import Footer    from '@/components/Footer';
import { getSiteContent } from '@/lib/content';

// Re-fetch content from Firestore at most once a minute, so /admin edits show up without a redeploy.
export const revalidate = 60;

export default async function Home() {
  const content = await getSiteContent();
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
