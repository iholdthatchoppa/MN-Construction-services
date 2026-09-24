import HomeContent from '@/components/HomeContent';
import { getSiteContent } from '@/lib/content';

export default async function Home() {
  // Snapshot at build time (what search engines see); HomeContent refreshes it in the browser.
  const content = await getSiteContent();
  return <HomeContent initial={content} />;
}
