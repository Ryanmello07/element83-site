import { memo, useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { CubeLogo } from '@/components/CubeLogo';
import { useLenis } from '@/lib/lenis-context';
import { SplitChars, Entrance } from './text';
import { useHomeGsap } from './useHomeGsap';

const SPLASH_KEY = 'e83_splash_seen_v2';

/** Dot traveling down the 32px scroll thread — perpetual loop, isolated + memoized. */
const ScrollThread = memo(function ScrollThread() {
  const reduced = useReducedMotion();
  return (
    <span className="relative block h-8 w-px overflow-hidden bg-haze-500/30" aria-hidden="true">
      {!reduced && (
        <motion.span
          className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-haze-500 shadow-glow"
          animate={{ y: [0, 26], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.35, 1] }}
        />
      )}
    </span>
  );
});

/** Two drifting radial-gradient fog blobs (ambient, §1). */
const FogBlobs = memo(function FogBlobs() {
  const reduced = useReducedMotion();
  return (
    <div data-para="fog" className="pointer-events-none absolute inset-0" aria-hidden="true">
      <motion.div
        className="absolute -left-[10vw] top-[8%] h-[60vw] w-[60vw] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(167, 139, 250, 0.08), transparent)' }}
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[15vw] bottom-[2%] h-[60vw] w-[60vw] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(107, 79, 208, 0.10), transparent)' }}
        animate={reduced ? undefined : { x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
});

/**
 * §1 — Hero. Full viewport under the fixed nav: eyebrow, character-split
 * mega-headline, script tagline, CTAs, and the (working) scroll cue.
 * Entrance plays after the splash on first visit, immediately on repeat.
 * Scroll parallax (headline 0.4×, tagline 0.6×, fog 0.2×, cube rotate 15°)
 * is GSAP-scrubbed on dedicated wrapper nodes; all loops stop under
 * prefers-reduced-motion.
 */
export function Hero() {
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // First visit per session: the splash covers ~2.4s + 0.5s fade — delay the entrance.
  const [base] = useState(() => {
    try {
      return sessionStorage.getItem(SPLASH_KEY) === '1' ? 0 : 2.9;
    } catch {
      return 0;
    }
  });

  useHomeGsap(heroRef, () => {
    const hero = heroRef.current;
    if (!hero) return;
    const range = (factor: number) => () => -hero.offsetHeight * factor;
    const trigger = () => ({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5,
      invalidateOnRefresh: true,
    });
    gsap.to('[data-para="headline"]', { y: range(0.4), ease: 'none', scrollTrigger: { ...trigger() } });
    gsap.to('[data-para="tagline"]', { y: range(0.6), ease: 'none', scrollTrigger: { ...trigger() } });
    gsap.to('[data-para="fog"]', { y: range(0.2), ease: 'none', scrollTrigger: { ...trigger() } });
    gsap.to('[data-para="cube"]', { rotation: 15, ease: 'none', scrollTrigger: { ...trigger() } });
  });

  const scrollToFeatured = useCallback(() => {
    const target = document.getElementById('featured');
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.6 });
    } else {
      target.scrollIntoView();
    }
  }, [lenis]);

  return (
    <section
      ref={heroRef}
      aria-labelledby="home-heading"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 py-24"
    >
      <FogBlobs />

      {/* giant faint cube watermark, right-of-center behind the text */}
      <div data-para="cube" className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute right-[4%] top-[26%] opacity-[0.05] blur-[2px]"
          style={{ width: '40vmin', height: '40vmin' }}
          animate={reduced ? undefined : { y: [0, -12, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CubeLogo size={400} className="h-full w-full" />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <Entrance delay={base} duration={0.6} y={20} className="text-xs uppercase tracking-[0.5em] text-mist-300">
          indie · godot · since 2024
        </Entrance>

        <div data-para="headline">
          <h1
            id="home-heading"
            className="mt-8 font-black lowercase leading-none tracking-tight text-mist-50 text-[16vw] md:text-[10rem]"
          >
            <span className="sr-only">element 83.</span>
            <SplitChars text="element 83" delay={base + 0.1} />
            <SplitChars text="." delay={base + 0.1 + 10 * 0.025} className="text-haze-500" />
          </h1>
        </div>

        <div data-para="tagline">
          <Entrance delay={base + 0.4} duration={1.2} blur>
            <p className="mt-6 text-script text-3xl md:text-5xl">brewing your favorite games</p>
          </Entrance>
        </div>

        <Entrance delay={base + 0.6} duration={0.7} y={24} className="mt-14">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link to="/games" className="btn-solid">
              see our games
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/about" className="nav-link text-sm lowercase tracking-widest">
              about the studio
            </Link>
          </div>
        </Entrance>

        <Entrance delay={base + 1} duration={0.6} y={0} className="mt-24">
          <button
            type="button"
            onClick={scrollToFeatured}
            aria-label="scroll down to the featured game"
            className="group flex cursor-pointer flex-col items-center gap-4 rounded-md text-xs lowercase tracking-[0.3em] text-mist-300 transition-colors duration-200 hover:text-mist-100"
          >
            <span className="flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-mist-300/40" aria-hidden="true" />
              scroll to peek behind the curtain
              <span className="inline-block h-px w-8 bg-mist-300/40" aria-hidden="true" />
            </span>
            <ScrollThread />
          </button>
        </Entrance>
      </div>
    </section>
  );
}
