import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, Bookmark } from 'lucide-react';
import { gsap } from 'gsap';
import { GlitchTitle } from '@/components/GlitchTitle';
import { ComingSoon } from '@/components/ComingSoon';
import { EASE_OUT } from '@/lib/motion';
import { SectionHeader } from './text';
import { useHomeGsap } from './useHomeGsap';

const cardVariants: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  shown: {
    clipPath: 'inset(0% 0 0% 0)',
    transition: {
      duration: 0.9,
      ease: EASE_OUT,
      when: 'beforeChildren',
      delayChildren: 0.35,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

/**
 * §2 — Featured game: MISANTHROPIC. Wide card with key art (ken-burns drift,
 * in-mask parallax, settle-on-reveal) and a staggered copy column. Card
 * reveals via clip-path inset; all scroll-linked effects are GSAP-scoped and
 * reduced-motion safe.
 */
export function FeaturedGame() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const kenBurns = useRef<gsap.core.Tween | null>(null);

  useHomeGsap(sectionRef, () => {
    // key-art vertical parallax inside its mask (y -6% → 6%, scrub)
    gsap.fromTo(
      '[data-art-para]',
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-art-mask]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      },
    );
    // slow ken-burns drift, 20s alternate; pauses while the card is hovered
    kenBurns.current = gsap.fromTo(
      '[data-art-img]',
      { scale: 1 },
      { scale: 1.06, duration: 20, ease: 'sine.inOut', yoyo: true, repeat: -1 },
    );
    // settle effect: art scales 1.08 → 1 as the card reveals
    gsap.fromTo(
      '[data-art-settle]',
      { scale: 1.08 },
      {
        scale: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: '[data-art-mask]', start: 'top 80%', once: true },
      },
    );
  });

  const copy = (
    <>
      <motion.div variants={itemVariants}>
        <h3>
          <GlitchTitle className="font-black text-4xl md:text-6xl">MISANTHROPIC</GlitchTitle>
        </h3>
        <p className="text-script text-2xl mt-4">a quiet horror</p>
      </motion.div>

      <motion.p variants={itemVariants} className="text-mist-200 leading-relaxed max-w-lg mt-6">
        it's 2027. AGI has been achieved, but what does it mean for the world? play as a researcher
        and witness manmade horrors.
      </motion.p>

      <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        <span className="tag-chip">narrative</span>
        <span className="tag-chip">single-player</span>
        <span className="tag-chip">godot</span>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
        <Link to="/games/misanthropic" className="btn-solid">
          enter the lab
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <ComingSoon
          variant="pill"
          label="wishlist"
          icon={<Bookmark size={16} aria-hidden="true" />}
        />
      </motion.div>
    </>
  );

  return (
    <section
      id="featured"
      ref={sectionRef}
      aria-labelledby="featured-heading"
      className="px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="featured title"
          title="now brewing"
          headingId="featured-heading"
          aside="our first game, still on the stove"
        />

        {reduced ? (
          <div className="card group mt-14 overflow-hidden">
            <div className="grid md:grid-cols-[1.1fr_1fr]">
              <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-full">
                <img
                  src="/misanthropic-keyart.png"
                  alt="MISANTHROPIC key art — a lone hooded researcher dissolving into darkness above a brutalist city skyline lit in pale violet"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <span className="badge absolute left-4 top-4">
                  <span className="badge-dot" aria-hidden="true" />
                  coming 2028
                </span>
              </div>
              <div className="p-8 md:p-12">{copy}</div>
            </div>
          </div>
        ) : (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            onMouseEnter={() => kenBurns.current?.pause()}
            onMouseLeave={() => kenBurns.current?.resume()}
            className="card group mt-14 overflow-hidden"
          >
            <div className="grid md:grid-cols-[1.1fr_1fr]">
              {/* key art: parallax > settle > hover-zoom > ken-burns, one transform per layer */}
              <div
                data-art-mask
                className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-full"
              >
                <div data-art-para className="absolute inset-0">
                  <div
                    data-art-settle
                    className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  >
                    <img
                      data-art-img
                      src="/misanthropic-keyart.png"
                      alt="MISANTHROPIC key art — a lone hooded researcher dissolving into darkness above a brutalist city skyline lit in pale violet"
                      className="h-full w-full object-cover will-change-transform"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                {/* haze wash from the right edge, blending art into the copy column */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-l from-haze-500/10 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-800/60 to-transparent md:hidden"
                  aria-hidden="true"
                />
                <span className="badge absolute left-4 top-4">
                  <span className="badge-dot" aria-hidden="true" />
                  coming 2028
                </span>
              </div>

              <div className="p-8 md:p-12">{copy}</div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
