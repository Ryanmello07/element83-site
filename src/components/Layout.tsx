import { useEffect, useRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Overlay } from './Overlay';
import { Splash } from './Splash';
import { LenisContext } from '@/lib/lenis-context';
import { EASE_IN_OUT, pageVariants, pageVariantsReduced } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

const SPLASH_KEY = 'e83_splash_seen_v2';

/** routes that render the full chrome; anything else (404) gets no footer nav clutter */
const KNOWN_ROUTES = ['/', '/games', '/games/misanthropic', '/about', '/contact'];

/** Brief full-screen ink curtain with a scanline leading edge, played on route change. */
function Curtain({ pathname }: { pathname: string }) {
  const reduced = useReducedMotion();
  const [sweepKey, setSweepKey] = useState<string | null>(null);
  const firstPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== firstPath.current) setSweepKey(pathname);
  }, [pathname]);

  if (reduced || sweepKey === null) return null;

  return (
    <motion.div
      key={sweepKey}
      aria-hidden="true"
      className="fixed inset-0 z-[70] pointer-events-none bg-ink-950"
      initial={{ y: '-100%' }}
      animate={{ y: ['-100%', '0%', '-100%'] }}
      transition={{ duration: 0.7, times: [0, 0.45, 1], ease: EASE_IN_OUT }}
    >
      <div className="absolute bottom-0 inset-x-0 h-px bg-haze-500/40" />
    </motion.div>
  );
}

export function Layout() {
  const location = useLocation();
  const outlet = useOutlet();
  const reducedMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(SPLASH_KEY) !== '1';
    } catch {
      return false;
    }
  });

  // Lenis smooth scroll, site-wide; disabled entirely under reduced motion.
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    setLenis(instance);
    instance.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      instance.off('scroll', ScrollTrigger.update);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Route change: instant scroll to top + focus <main> for SR announcement.
  const firstRoute = useRef(location.pathname);
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    if (location.pathname !== firstRoute.current) {
      firstRoute.current = location.pathname;
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [location.pathname, lenis]);

  useEffect(() => {
    if (!showSplash) return;
    try {
      sessionStorage.setItem(SPLASH_KEY, '1');
    } catch {
      /* storage unavailable */
    }
  }, [showSplash]);

  return (
    <LenisContext.Provider value={lenis}>
      <div className="relative min-h-[100dvh] bg-atmosphere">
        <a href="#main" className="skip-link">
          skip to content
        </a>

        {showSplash && <Splash onDone={() => setShowSplash(false)} />}
        <Overlay />
        <Navbar />
        <Curtain pathname={location.pathname} />

        <main id="main" ref={mainRef} tabIndex={-1} className="relative focus:outline-none">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              variants={reducedMotion ? pageVariantsReduced : pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>

        {KNOWN_ROUTES.includes(location.pathname) && <Footer />}
      </div>
    </LenisContext.Provider>
  );
}
