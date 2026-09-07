import { usePageMeta } from '@/hooks/usePageMeta';
import { Hero } from '@/components/home/Hero';
import { FeaturedGame } from '@/components/home/FeaturedGame';
import { StudioStrip } from '@/components/home/StudioStrip';
import { ProcessCards } from '@/components/home/ProcessCards';
import { CtaBand } from '@/components/home/CtaBand';

/**
 * Home (`/`) — cinematic hero (character-split mega-headline, fog, parallax)
 * plus the below-fold content the hero's scroll cue promises: featured
 * MISANTHROPIC section, studio strip with word marquee + count-up stats,
 * process cards, and a closing CTA band.
 */
export function Home() {
  usePageMeta(
    undefined,
    'element 83 is a tiny indie studio brewing quiet, unsettling games. our first title, MISANTHROPIC, is in development.',
  );

  return (
    <>
      <Hero />
      <FeaturedGame />
      <StudioStrip />
      <ProcessCards />
      <CtaBand />
    </>
  );
}
