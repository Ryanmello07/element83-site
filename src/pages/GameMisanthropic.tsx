import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  FlaskConical,
  Gamepad2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GlitchTitle } from '@/components/GlitchTitle';
import { ComingSoon } from '@/components/ComingSoon';
import { Reveal } from '@/components/Reveal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLenis } from '@/lib/lenis-context';
import { EASE_OUT } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */

const STILLS = [
  {
    src: '/misanthropic-still-1.png',
    caption: '01 the office',
    alt: 'in-game still: a dim monitor-lit research office at night, a glowing terminal casting violet light over scattered paper, rain on the window',
  },
  {
    src: '/misanthropic-still-2.png',
    caption: '02 the racks',
    alt: 'in-game still: endless server racks fading into fog, one rack blinking rose among violet standby lights',
  },
  {
    src: '/misanthropic-still-3.png',
    caption: '03 the hands',
    alt: 'in-game still: over-the-shoulder view of researcher hands typing on a backlit keyboard washed in pale violet screen glow',
  },
] as const;

const DETAILS = [
  { label: 'engine', value: 'godot 4' },
  { label: 'platforms', value: 'pc · mac (linux maybe)' },
  { label: 'release', value: '2028, quietly' },
  { label: 'status', value: 'in active development' },
] as const;

/* ------------------------------------------------------------------ */
/* shared motion                                                       */
/* ------------------------------------------------------------------ */

const heroStagger: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } },
};

const heroChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE_OUT } },
};

/* ------------------------------------------------------------------ */
/* "woke" — the single boldest color moment on the site (signal-rose),  */
/* with a one-time glitch flicker triggered at 60% viewport            */
/* ------------------------------------------------------------------ */

function WokeWord() {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [glitching, setGlitching] = useState(false);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let burst: number | undefined;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 60%',
      once: true,
      onEnter: () => {
        setGlitching(true);
        burst = window.setTimeout(() => setGlitching(false), 380);
      },
    });
    return () => {
      if (burst !== undefined) window.clearTimeout(burst);
    };
  });

  return (
    <span ref={ref} className="glitch text-signal-rose" data-text="woke" data-glitch={glitching}>
      woke
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* lightbox (focus-trapped dialog, z-80, above atmosphere overlays)    */
/* ------------------------------------------------------------------ */

type LightboxProps = {
  index: number;
  onClose: () => void;
  onCycle: (dir: 1 | -1) => void;
};

function Lightbox({ index, onClose, onCycle }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lenis = useLenis();
  const still = STILLS[index];

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>('button')?.focus();

    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onCycle(-1);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onCycle(1);
        return;
      }
      if (e.key === 'Tab' && dialog) {
        const focusables = Array.from(
          dialog.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'),
        ).filter((el) => !el.hasAttribute('disabled'));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, [lenis, onClose, onCycle]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-ink-950/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`still viewer — ${still.caption}`}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={still.src}
          alt={still.alt}
          decoding="async"
          className="w-full aspect-video object-cover rounded-2xl border border-white/10"
        />
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-mist-300">
            {still.caption}
            <span className="sr-only">
              {' '}
              ({index + 1} of {STILLS.length})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onCycle(-1)}
              className="btn-icon"
              aria-label="previous still"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onCycle(1)}
              className="btn-icon"
              aria-label="next still"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <button type="button" onClick={onClose} className="btn-icon" aria-label="close viewer">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export function GameMisanthropic() {
  usePageMeta(
    'MISANTHROPIC',
    'MISANTHROPIC is a quiet horror game about AGI, in development at element 83. coming 2028.',
  );
  const reduced = useReducedMotion();

  const heroRef = useRef<HTMLElement | null>(null);
  const heroImgRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);

  const premiseRef = useRef<HTMLElement | null>(null);

  const galleryRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const cycleLightbox = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? i : (i + dir + STILLS.length) % STILLS.length)),
    [],
  );

  /* the pinned horizontal gallery runs only on desktop with full motion */
  const [cinematic, setCinematic] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setCinematic(wide.matches && !calm.matches);
    update();
    wide.addEventListener('change', update);
    calm.addEventListener('change', update);
    return () => {
      wide.removeEventListener('change', update);
      calm.removeEventListener('change', update);
    };
  }, []);

  /* hero: image parallax (y 0→12% scrub) + content separating faster (0.7×) */
  useGSAP(
    () => {
      if (reduced) return;
      const hero = heroRef.current;
      const img = heroImgRef.current;
      const content = heroContentRef.current;
      if (!hero || !img || !content) return;
      gsap.to(img, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(content, {
        yPercent: -20,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: '70% top', scrub: true },
      });
    },
    { dependencies: [reduced] },
  );

  /* premise: each statement rises in over its entry 40% of viewport,
     then dims to opacity .25 as it passes (focus-passing effect) */
  useGSAP(
    () => {
      if (reduced) return;
      const root = premiseRef.current;
      if (!root) return;
      const blocks = gsap.utils.toArray<HTMLElement>('[data-premise-block]', root);
      blocks.forEach((block, i) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 60, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: { trigger: block, start: 'top 85%', end: 'top 45%', scrub: true },
          },
        );
        if (i < blocks.length - 1) {
          gsap.to(block, {
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: { trigger: block, start: 'bottom 40%', end: 'bottom 10%', scrub: true },
          });
        }
      });
    },
    { dependencies: [reduced] },
  );

  /* gallery: pinned horizontal scroll w/ counter-parallax + progress hairline */
  useGSAP(
    () => {
      if (!cinematic) return;
      const gallery = galleryRef.current;
      const track = trackRef.current;
      if (!gallery || !track) return;

      const distance = () => Math.max(track.scrollWidth - window.innerWidth, 1);

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: gallery,
          start: 'top top',
          end: () => `+=${Math.max(distance(), window.innerHeight)}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      const imgs = track.querySelectorAll<HTMLElement>('[data-still-img]');
      gsap.fromTo(
        imgs,
        { xPercent: 3 },
        {
          xPercent: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: gallery,
            start: 'top top',
            end: () => `+=${Math.max(distance(), window.innerHeight)}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { dependencies: [cinematic] },
  );

  return (
    <>
      {/* ------------------------------------------------- section 1: hero */}
      <section
        ref={heroRef}
        aria-label="MISANTHROPIC hero"
        className="relative min-h-[80vh] flex flex-col justify-end overflow-hidden"
      >
        {/* GSAP parallax moves the wrapper; framer handles the load settle on the img.
            the img is oversized (115%) so the downward parallax never reveals a gap. */}
        <div ref={heroImgRef} className="absolute inset-0">
          <motion.img
            src="/misanthropic-hero.png"
            alt="a vast dark server-hall corridor receding to a single violet light source, a lone small figure mid-frame in volumetric haze"
            fetchPriority="high"
            decoding="async"
            initial={reduced ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: EASE_OUT }}
            className="absolute top-0 left-0 w-full h-[115%] object-cover"
          />
        </div>
        {/* blend into nav above and page body below */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink-800/80 via-transparent to-ink-800"
        />

        <motion.div
          ref={heroContentRef}
          variants={heroStagger}
          initial={reduced ? false : 'hidden'}
          animate="shown"
          className="relative max-w-6xl mx-auto px-6 pb-16 w-full flex flex-col items-start"
        >
          <motion.nav
            variants={heroChild}
            aria-label="breadcrumb"
            className="text-[10px] uppercase tracking-[0.4em] text-mist-300 mb-5"
          >
            <Link to="/games" className="hover:text-mist-50 transition-colors duration-200">
              games
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">misanthropic</span>
          </motion.nav>

          <motion.div variants={heroChild} className="mb-6">
            <span className="badge backdrop-blur">
              <Clock size={12} aria-hidden="true" />
              in development · coming 2028
            </span>
          </motion.div>

          <motion.h1
            variants={heroChild}
            className="font-black uppercase text-mist-50 tracking-tight text-5xl md:text-8xl"
          >
            <GlitchTitle className="text-5xl md:text-8xl font-black">MISANTHROPIC</GlitchTitle>
          </motion.h1>

          <motion.p variants={heroChild} className="text-script text-2xl md:text-3xl mt-4">
            a quiet horror
          </motion.p>

          <motion.div variants={heroChild} className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <span className="tag-chip">narrative</span>
            <span className="tag-chip">single-player</span>
            <span className="tag-chip">pc · mac</span>
            <span className="tag-chip">godot</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------------------------------------- section 2: premise */}
      <section ref={premiseRef} aria-labelledby="premise-heading" className="py-28 px-6">
        <h2 id="premise-heading" className="sr-only">
          the premise
        </h2>
        <div className="max-w-3xl mx-auto text-center space-y-24">
          <p data-premise-block className="text-3xl md:text-5xl font-extrabold text-mist-50">
            it's 2027.
          </p>
          <p data-premise-block className="text-3xl md:text-5xl font-extrabold text-mist-100">
            artificial general intelligence has been achieved.
          </p>
          <div>
            <div aria-hidden="true" className="w-16 h-px bg-haze-500/40 mx-auto mb-24" />
            <p data-premise-block className="text-3xl md:text-5xl font-extrabold text-mist-100">
              nobody agrees on what <WokeWord /> up.
            </p>
          </div>
        </div>
        <p className="max-w-3xl mx-auto mt-16 text-center text-mist-200 leading-relaxed text-lg">
          you play a researcher inside the facility where it happened — piecing together logs,
          footage, and the people who knew. a slow, single-player descent into manmade horrors. no
          jumpscares. just the slow realization of what was built, and what it quietly wants.
        </p>
      </section>

      {/* ---------------------------------------- section 3: stills gallery */}
      <section
        ref={galleryRef}
        aria-labelledby="stills-heading"
        className={cinematic ? 'py-24 overflow-hidden' : 'py-24 px-6'}
      >
        <div className={cinematic ? 'max-w-6xl mx-auto px-6' : 'max-w-6xl mx-auto'}>
          <div className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3">stills</div>
          <h2
            id="stills-heading"
            className="font-extrabold lowercase text-mist-50 text-3xl md:text-5xl tracking-tight"
          >
            from inside the facility<span className="text-haze-500">.</span>
          </h2>
          <p className="text-script text-xl md:text-2xl mt-4">concept stills, not final pixels</p>
          <div aria-hidden="true" className="mt-8 h-px bg-white/10 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full w-full bg-haze-500 origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>

        <div
          ref={trackRef}
          className={
            cinematic
              ? 'mt-14 flex gap-8 w-max px-6'
              : 'mt-14 max-w-6xl mx-auto flex flex-col gap-10'
          }
        >
          {STILLS.map((still, i) => {
            const panel = (
              <button
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`enlarge still — ${still.caption}`}
                className={`group block text-left rounded-2xl border border-white/5 overflow-hidden
                  transition-[transform,border-color,box-shadow] duration-300
                  hover:scale-[1.02] hover:border-haze-500/40 hover:shadow-glow ${
                    cinematic ? 'w-[70vw] max-w-3xl shrink-0' : 'w-full'
                  }`}
              >
                <span className="block relative aspect-video overflow-hidden">
                  <img
                    data-still-img
                    src={still.src}
                    alt={still.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover scale-[1.08]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, transparent 0 3px, rgba(167,139,250,0.06) 3px 4px)',
                    }}
                  />
                </span>
                <span className="block px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-mist-300 bg-ink-900/60">
                  {still.caption}
                </span>
              </button>
            );
            return cinematic ? (
              <div key={still.src}>{panel}</div>
            ) : (
              <Reveal key={still.src}>{panel}</Reveal>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------- section 4: details grid */}
      <section aria-labelledby="details-heading" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="card p-8 md:p-12">
              <h2 id="details-heading" className="sr-only">
                game details
              </h2>
              <motion.dl
                variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
                initial={reduced ? false : 'hidden'}
                whileInView="shown"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {DETAILS.map((d) => (
                  <motion.div key={d.label} variants={cellVariants}>
                    <dt className="text-[10px] text-mist-300 uppercase tracking-[0.3em]">
                      {d.label}
                    </dt>
                    <dd className="mt-2 text-mist-100 font-semibold lowercase">{d.value}</dd>
                  </motion.div>
                ))}
              </motion.dl>

              <div className="my-10 h-px bg-white/5" aria-hidden="true" />

              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3">
                    devlog
                  </div>
                  <p className="text-mist-200 text-sm leading-relaxed max-w-xl">
                    we'll write about the brew when there's something worth pouring. devlogs live
                    here first.
                  </p>
                </div>
                <ComingSoon
                  variant="pill"
                  label="read the devlog"
                  icon={<FlaskConical size={16} aria-hidden="true" />}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------- section 5: wishlist + way back */}
      <section aria-labelledby="wishlist-heading" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <motion.p
              initial={reduced ? false : { opacity: 0, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: EASE_OUT }}
              className="text-script text-2xl md:text-3xl"
            >
              it'll be ready when it's ready.
            </motion.p>
          </Reveal>
          <motion.h2
            id="wishlist-heading"
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
            }}
            initial={reduced ? false : 'hidden'}
            whileInView="shown"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-6 font-extrabold lowercase text-mist-50 text-4xl md:text-5xl tracking-tight"
          >
            <motion.span variants={heroChild} className="inline-block">
              wishlist
            </motion.span>{' '}
            <motion.span variants={heroChild} className="inline-block">
              the
            </motion.span>{' '}
            <motion.span variants={heroChild} className="inline-block">
              horror<span className="text-haze-500">.</span>
            </motion.span>
          </motion.h2>

          <motion.div
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
            initial={reduced ? false : 'hidden'}
            whileInView="shown"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.div variants={heroChild}>
              <ComingSoon
                variant="pill"
                label="steam"
                icon={<Gamepad2 size={16} aria-hidden="true" />}
              />
            </motion.div>
            <motion.div variants={heroChild}>
              <ComingSoon
                variant="pill"
                label="itch.io"
                icon={<FlaskConical size={16} aria-hidden="true" />}
              />
            </motion.div>
          </motion.div>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <Link to="/games" className="btn-ghost lowercase text-sm">
                <ArrowLeft size={16} aria-hidden="true" />
                back to all games
              </Link>
            </div>
            <p className="mt-6 text-sm text-mist-300">
              <Link
                to="/contact"
                className="lowercase underline-offset-4 hover:text-mist-50 hover:underline transition-colors duration-200"
              >
                questions? contact the studio
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox index={lightbox} onClose={closeLightbox} onCycle={cycleLightbox} />
        )}
      </AnimatePresence>
    </>
  );
}
