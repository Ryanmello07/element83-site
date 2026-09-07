import { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { EASE_OUT } from '@/lib/motion';
import { SectionHeader } from './text';
import { useHomeGsap } from './useHomeGsap';

const PHRASES = ['quiet games', 'big feelings', 'small teams', 'slow simmer'];

function MarqueeLine() {
  return (
    <span className="flex shrink-0 items-center">
      {Array.from({ length: 4 }).flatMap((_, rep) =>
        PHRASES.map((phrase) => (
          <span key={`${rep}-${phrase}`} className="flex items-center">
            <span className="px-6">{phrase}</span>
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-haze-500/70" aria-hidden="true" />
          </span>
        )),
      )}
    </span>
  );
}

/**
 * Word marquee divider (§3): infinite -50% translate loop, 30s linear,
 * pauses on hover. Reduced motion: a single static line, no scrolling.
 * Perpetual loop isolated in a memoized micro-component.
 */
const WordMarquee = memo(function WordMarquee() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (reduced || !rootRef.current) return;
    const ctx = gsap.context(() => {
      tween.current = gsap.to('[data-marquee-track]', {
        xPercent: -50,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });
    }, rootRef.current);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      onMouseEnter={() => tween.current?.pause()}
      onMouseLeave={() => tween.current?.resume()}
      className="overflow-hidden border-y border-white/5 py-4 text-sm uppercase tracking-[0.4em] text-mist-400/40"
    >
      <div data-marquee-track className="flex w-max whitespace-nowrap">
        <MarqueeLine />
        {!reduced && <MarqueeLine />}
      </div>
    </div>
  );
});

/** 0 → value count-up (900ms, once, 40% in view); instant under reduced motion. */
function CountNumeral({ value, pad }: { value: number; pad: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const text = useTransform(progress, (v) => String(Math.round(v)).padStart(pad, '0'));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      progress.set(value);
      return;
    }
    const controls = animate(progress, value, { duration: 0.9, ease: EASE_OUT });
    return () => controls.stop();
  }, [inView, reduced, progress, value]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

/** ∞ crossfading in from "00" (900ms, once); static under reduced motion. */
function InfinityNumeral() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  if (reduced) return <span ref={ref}>∞</span>;

  return (
    <span ref={ref} className="relative inline-block">
      <motion.span
        className="inline-block"
        initial={{ opacity: 1 }}
        animate={inView ? { opacity: 0 } : undefined}
        transition={{ duration: 0.45, delay: 0.45, ease: EASE_OUT }}
        aria-hidden="true"
      >
        00
      </motion.span>
      <motion.span
        className="absolute inset-0 inline-block"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.45, delay: 0.45, ease: EASE_OUT }}
      >
        ∞
      </motion.span>
    </span>
  );
}

/**
 * §3 — Studio strip. Word marquee divider above; two-column intro + 3-up
 * stats with count-up numerals. The grid carries a soft 3% parallax lag
 * against the marquee band (GSAP scrub).
 */
export function StudioStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useHomeGsap(sectionRef, () => {
    gsap.fromTo(
      '[data-studio-lag]',
      { yPercent: 1.5 },
      {
        yPercent: -1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      },
    );
  });

  return (
    <>
      <WordMarquee />
      <section ref={sectionRef} aria-labelledby="studio-heading" className="px-6 py-24">
        <div data-studio-lag className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <div>
              <SectionHeader eyebrow="the studio" title="two people, one engine" headingId="studio-heading" />
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
                className="mt-6 max-w-xl leading-relaxed text-mist-200"
              >
                we are a very small studio tucked away in a room lit mostly by monitors. we make
                quiet, unsettling games with big feelings and small teams — stirred by hand until
                they start to look back at you.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.3 }}
                className="mt-8"
              >
                <Link
                  to="/about"
                  className="nav-link inline-flex items-center gap-2 text-sm lowercase tracking-widest"
                >
                  more about us
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-extrabold text-mist-50">
                  <CountNumeral value={2} pad={2} />
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-mist-300">people</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-mist-50">
                  <CountNumeral value={1} pad={2} />
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-mist-300">
                  game brewing
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-mist-50">
                  <InfinityNumeral />
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-mist-300">
                  cups of coffee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
