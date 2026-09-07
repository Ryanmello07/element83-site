import { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronDown, Clock, FlaskConical, Gamepad2 } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GlitchTitle } from '@/components/GlitchTitle';
import { ComingSoon } from '@/components/ComingSoon';
import { Reveal } from '@/components/Reveal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { EASE_OUT, EASE_IN_OUT } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ */
/* section-header entrance (design §8.7)                               */
/* ------------------------------------------------------------------ */

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const headlineContainer: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const ledeVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.2 } },
};

const stagger100: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1 } },
};

const childRise: Variants = {
  hidden: { opacity: 0, y: 40 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

/* ------------------------------------------------------------------ */
/* featured art: ken-burns key art inside a parallax mask              */
/* ------------------------------------------------------------------ */

const KENBURNS_CSS = `
@keyframes kb-drift {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}
.kb-art {
  animation: kb-drift 22s ease-in-out infinite alternate;
  will-change: transform;
}
.group:hover .kb-art {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .kb-art { animation: none; }
}
`;

const ArtScanlines = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
    style={{
      backgroundImage:
        'repeating-linear-gradient(0deg, transparent 0 3px, rgba(167,139,250,0.06) 3px 4px)',
    }}
  />
);

const FeaturedArt = memo(function FeaturedArt() {
  return (
    <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[560px] w-full overflow-hidden">
      <img
        src="/misanthropic-keyart.png"
        alt="key art for MISANTHROPIC: a hooded researcher silhouette dissolving into darkness above a brutalist city skyline lit in pale violet"
        loading="lazy"
        decoding="async"
        className="kb-art absolute inset-0 w-full h-full object-cover"
      />
      <style>{KENBURNS_CSS}</style>
      <ArtScanlines />
      <div className="absolute top-4 left-4 badge backdrop-blur">
        <Clock size={12} aria-hidden="true" />
        coming 2028
      </div>
      <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em] text-mist-300/70">
        concept key art
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* archive accordion (radix-grade semantics, height auto-animate)      */
/* ------------------------------------------------------------------ */

type Experiment = {
  name: string;
  year: string;
  hook: string;
  body: string;
  chips: string[];
};

const EXPERIMENTS: Experiment[] = [
  {
    name: 'mothlight',
    year: '2024',
    hook: 'a flashlight that attracts more than moths.',
    body: 'a 48-hour jam prototype about guiding something home through the dark. taught us everything about restraint.',
    chips: ['jam', '2d', '48h'],
  },
  {
    name: 'stairwell',
    year: '2024',
    hook: 'nine floors down, and the counting stops making sense.',
    body: 'an exercise in dread with no antagonist. the bismuth stairs never end; neither did the playtest arguments.',
    chips: ['prototype', 'walking sim'],
  },
  {
    name: 'kettle',
    year: '2025',
    hook: 'you are the thing being brewed.',
    body: 'a one-week mood piece that quietly became the seed of MISANTHROPIC.',
    chips: ['prototype', 'narrative seed'],
  },
];

function ArchiveAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <div className="mt-8 divide-y divide-white/5 border-y border-white/5">
      {EXPERIMENTS.map((exp, i) => {
        const isOpen = open === i;
        const triggerId = `experiment-trigger-${i}`;
        const panelId = `experiment-panel-${i}`;
        return (
          <div key={exp.name}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group w-full flex items-baseline gap-4 py-5 text-left transition-transform duration-300 hover:translate-x-1"
              >
                <span className="text-mist-100 font-bold lowercase text-lg group-hover:text-mist-50 transition-colors duration-200">
                  {exp.name}
                </span>
                <span className="text-mist-300 text-xs uppercase tracking-[0.3em]">{exp.year}</span>
                <span className="hidden sm:inline flex-1 text-mist-200 text-sm lowercase">
                  {exp.hook}
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`ml-auto sm:ml-0 shrink-0 self-center text-mist-300 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0.01 : 0.35, ease: EASE_IN_OUT }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="pb-6 pr-8"
                  >
                    <p className="sm:hidden text-mist-200 text-sm lowercase mb-3">{exp.hook}</p>
                    <p className="text-mist-200 leading-relaxed max-w-2xl">{exp.body}</p>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {exp.chips.map((chip) => (
                        <span key={chip} className="tag-chip">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ambient glow pulse behind the follow band (isolated + memoized)     */
/* ------------------------------------------------------------------ */

const GlowPulse = memo(function GlowPulse() {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 blur-3xl opacity-50"
        style={{
          background: 'radial-gradient(closest-side, rgba(167,139,250,0.18), transparent)',
        }}
      />
    );
  }
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 -z-10 blur-3xl"
      style={{
        background: 'radial-gradient(closest-side, rgba(167,139,250,0.18), transparent)',
      }}
      animate={{ opacity: [0.4, 0.7] }}
      transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    />
  );
});

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export function Games() {
  usePageMeta(
    'games',
    "the games of element 83: MISANTHROPIC, a quiet horror in development, plus what's brewing next.",
  );
  const reduced = useReducedMotion();

  const cardRef = useRef<HTMLElement | null>(null);
  const artWrapRef = useRef<HTMLDivElement | null>(null);

  /* gate the auto-glitch loop to ≥30% card visibility (ambient budget) */
  const [cardVisible, setCardVisible] = useState(false);
  useEffect(() => {
    const node = cardRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setCardVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setCardVisible(e.isIntersecting)),
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  /* scroll-linked art parallax inside the mask (y ±5%, scrub 0.5) */
  useGSAP(
    () => {
      if (reduced) return;
      const card = cardRef.current;
      const art = artWrapRef.current;
      if (!card || !art) return;
      gsap.fromTo(
        art,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
        },
      );
    },
    { dependencies: [reduced] },
  );

  const titleClass = 'font-extrabold text-mist-50 tracking-tight uppercase text-4xl md:text-6xl';

  return (
    <>
      {/* ------------------------------------------------ section 1: header */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={eyebrowVariants}
            initial={reduced ? false : 'hidden'}
            animate="shown"
            className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3"
          >
            portfolio
          </motion.div>
          <motion.h1
            variants={headlineContainer}
            initial={reduced ? false : 'hidden'}
            animate="shown"
            className="font-extrabold lowercase text-mist-50 text-5xl md:text-7xl tracking-tight"
          >
            <motion.span variants={wordVariants} className="inline-block">
              our
            </motion.span>{' '}
            <motion.span variants={wordVariants} className="inline-block">
              games<span className="text-haze-500">.</span>
            </motion.span>
          </motion.h1>
          <motion.p
            variants={ledeVariants}
            initial={reduced ? false : 'hidden'}
            animate="shown"
            className="mt-6 max-w-2xl text-mist-200 leading-relaxed"
          >
            everything we've brewed, is brewing, or quietly disposed of. one title in active
            development — we prefer slow and certain over loud and shipped.
          </motion.p>
        </div>
      </section>

      {/* --------------------------------------- section 2: featured title */}
      <section aria-labelledby="featured-heading" className="px-6">
        <div className="max-w-6xl mx-auto mt-6">
          <motion.article
            ref={cardRef}
            aria-labelledby="featured-heading"
            initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="card group overflow-hidden grid md:grid-cols-[1.1fr_1fr] gap-0"
          >
            <div ref={artWrapRef} className="md:h-full">
              <motion.div
                initial={reduced ? false : { scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
                className="md:h-full"
              >
                <FeaturedArt />
              </motion.div>
            </div>

            <motion.div
              variants={stagger100}
              initial={reduced ? false : 'hidden'}
              whileInView="shown"
              viewport={{ once: true, amount: 0.25 }}
              className="p-8 md:p-12 flex flex-col justify-center"
            >
              <motion.div
                variants={childRise}
                className="text-[10px] uppercase tracking-[0.5em] text-haze-400 mb-4"
              >
                featured title
              </motion.div>
              <motion.h2 id="featured-heading" variants={childRise} className={titleClass}>
                {cardVisible ? (
                  <GlitchTitle className="text-4xl md:text-6xl">MISANTHROPIC</GlitchTitle>
                ) : (
                  'MISANTHROPIC'
                )}
              </motion.h2>
              <motion.p variants={childRise} className="text-script text-2xl md:text-3xl mt-4">
                a quiet horror
              </motion.p>
              <motion.p variants={childRise} className="mt-6 text-mist-200 leading-relaxed max-w-lg">
                it's 2027. AGI has been achieved, but what does it mean for the world? play as a
                researcher and witness manmade horrors.
              </motion.p>

              <motion.div variants={childRise} className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                <span className="tag-chip">narrative</span>
                <span className="tag-chip">single-player</span>
                <span className="tag-chip">psychological</span>
              </motion.div>

              <motion.div variants={childRise} className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/games/misanthropic" className="btn-solid group/btn lowercase text-sm">
                  enter the lab
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover/btn:translate-x-[3px]"
                  />
                </Link>
                <ComingSoon
                  variant="pill"
                  label="wishlist on steam"
                  icon={<Gamepad2 size={16} aria-hidden="true" />}
                />
              </motion.div>

              <motion.dl variants={childRise} className="mt-10 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <dt className="text-mist-300 uppercase tracking-[0.3em]">engine</dt>
                  <dd className="mt-1 text-mist-100">godot</dd>
                </div>
                <div>
                  <dt className="text-mist-300 uppercase tracking-[0.3em]">platforms</dt>
                  <dd className="mt-1 text-mist-100">pc · mac</dd>
                </div>
                <div>
                  <dt className="text-mist-300 uppercase tracking-[0.3em]">status</dt>
                  <dd className="mt-1 text-mist-100">in development</dd>
                </div>
              </motion.dl>
            </motion.div>
          </motion.article>
        </div>
      </section>

      {/* ---------------------------------------- section 3: upcoming brew */}
      <section aria-labelledby="brew-heading" className="px-6">
        <div className="max-w-6xl mx-auto mt-10">
          <motion.article
            aria-labelledby="brew-heading"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="card group overflow-hidden grid md:grid-cols-[2fr_3fr] gap-0"
          >
            <div className="relative aspect-[3/2] md:aspect-auto md:h-full w-full overflow-hidden">
              <BrewImage />
              <div className="absolute top-4 left-4 badge backdrop-blur">
                <span className="badge-dot" aria-hidden="true" />
                steeping…
              </div>
            </div>

            <div className="p-8 flex flex-col justify-center">
              <div className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3">
                upcoming
              </div>
              <h2
                id="brew-heading"
                className="font-extrabold lowercase text-mist-100 text-2xl md:text-3xl"
              >
                untitled brew № 2
              </h2>
              <p className="mt-3 text-mist-200 text-sm leading-relaxed max-w-md">
                something small, strange, and slow-burning. more soon — when it's ready to be seen.
              </p>
              <div className="mt-6">
                <ComingSoon
                  variant="pill"
                  label="follow development"
                  icon={<FlaskConical size={16} aria-hidden="true" />}
                />
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ------------------------------------- section 4: experiment archive */}
      <section aria-labelledby="archive-heading" className="px-6">
        <div className="max-w-6xl mx-auto mt-10">
          <Reveal>
            <article aria-labelledby="archive-heading" className="card p-8 md:p-10">
              <div className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3">
                archive
              </div>
              <h2
                id="archive-heading"
                className="font-extrabold lowercase text-mist-100 text-2xl md:text-3xl"
              >
                early experiments
              </h2>
              <p className="mt-3 text-mist-200 text-sm leading-relaxed max-w-2xl">
                little prototypes, jam entries, and half-remembered dreams from the workshop floor.
              </p>

              <ArchiveAccordion />

              <p className="text-script text-xl mt-8">
                these stay in the drawer, but they feed everything that comes next.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------- section 5: follow the brew */}
      <section aria-labelledby="follow-heading" className="px-6">
        <div className="max-w-2xl mx-auto mt-16 text-center relative">
          <GlowPulse />
          <Reveal>
            <h2 id="follow-heading" className="sr-only">
              follow the brew
            </h2>
            <motion.p
              initial={reduced ? false : { opacity: 0, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: EASE_OUT }}
              className="text-script text-2xl md:text-3xl"
            >
              want to know when it pours?
            </motion.p>
            <p className="mt-6 text-mist-200 leading-relaxed">
              wishlists and socials are still on the stove. for now, email is the surest way to
              reach us.
            </p>
            <Link to="/contact" className="btn-ghost mt-8 lowercase text-sm">
              write to the studio
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* teaser image: un-blurs blur(6px)→blur(1px) on reveal (never fully sharp),
   hover rewards with blur(0) + full saturation (600ms) */
function BrewImage() {
  const reduced = useReducedMotion();
  const [hover, setHover] = useState(false);
  return (
    <motion.img
      src="/brew-no2-teaser.png"
      alt="abstract teaser for an unannounced game: a defocused iridescent crystalline form blurred into soft violet bokeh on near-black"
      loading="lazy"
      decoding="async"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={reduced ? false : { filter: 'blur(6px) saturate(0.8)' }}
      whileInView={{ filter: 'blur(1px) saturate(0.8)' }}
      viewport={{ once: true, amount: 0.25 }}
      animate={hover && !reduced ? { filter: 'blur(0px) saturate(1)' } : undefined}
      transition={{ duration: hover ? 0.6 : 1.2, ease: 'easeOut' }}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}
