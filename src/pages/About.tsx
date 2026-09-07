import type { Variants } from 'framer-motion';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Hourglass, Moon, VolumeX } from 'lucide-react';
import { CubeLogo } from '@/components/CubeLogo';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/about/CountUp';
import { usePageMeta } from '@/hooks/usePageMeta';
import { EASE_OUT, revealVariants, staggerContainer } from '@/lib/motion';

/** section-header entrance (design §8.7): eyebrow → headline word-stagger 90ms → lede */
const headerContainer: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const headerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const stats = [
  { value: 2, pad: 2, label: 'people' },
  { value: 1, pad: 2, label: 'game brewing' },
  { value: 83, pad: 0, label: 'the element (bismuth)' },
] as const;

const steps = [
  {
    n: '01',
    title: 'the spark',
    body: "an idea that refuses to leave us alone. it gets a page in the notebook and a week of side-eye. if it's still there on friday, it's real.",
  },
  {
    n: '02',
    title: 'the prototype',
    body: 'ugly, fast, honest. grey boxes and borrowed sounds. if the mood survives with no art at all, it earns the right to continue.',
  },
  {
    n: '03',
    title: 'the simmer',
    body: 'the long middle. months of small decisions, deleted features, and refilled mugs. this is where most games are actually made.',
  },
  {
    n: '04',
    title: 'the tasting',
    body: 'friends play it while we watch in silence, wincing quietly, taking notes. everything they trip over goes back in the pot.',
  },
  {
    n: '05',
    title: 'the pour',
    body: "released only when it looks back at you. no carved-stone roadmaps — when there's a date worth trusting, it's on the games page.",
  },
];

const principles = [
  {
    icon: Moon,
    title: 'mood before mechanics',
    body: "if a scene doesn't feel right at 2am with the lights off, it goes back in the pot — no matter how clever the code underneath is.",
  },
  {
    icon: VolumeX,
    title: 'restraint over noise',
    body: 'no jumpscares as a crutch, no feature bloat. tension comes from patience and silence, not volume.',
  },
  {
    icon: Hourglass,
    title: 'honest timelines',
    body: `we'd rather say "when it's ready" than miss a date we invented for marketing. slow is a feature.`,
  },
];

export function About() {
  usePageMeta('about', 'about element 83 — a very small studio making quiet, unsettling games.');
  const reduced = useReducedMotion();

  return (
    <>
      {/* ---- section 1: page header + studio band ---- */}
      <section className="relative pt-32 px-6" aria-labelledby="about-heading">
        <div className="absolute inset-0 -z-10 bg-atmosphere" />
        <div className="max-w-6xl mx-auto">
          <motion.div variants={headerContainer} initial="hidden" animate="shown">
            <motion.p
              variants={headerItem}
              className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3"
            >
              the studio
            </motion.p>
            <h1
              id="about-heading"
              className="font-extrabold lowercase text-mist-50 text-5xl md:text-7xl tracking-tight"
            >
              <motion.span variants={headerItem} className="inline-block">
                about
              </motion.span>{' '}
              <motion.span variants={headerItem} className="inline-block">
                us
              </motion.span>
              <motion.span variants={headerItem} className="inline-block text-haze-500">
                .
              </motion.span>
            </h1>
            <motion.p
              variants={headerItem}
              className="mt-6 max-w-2xl text-mist-200 leading-relaxed"
            >
              two people, one engine, a shelf of half-drunk mugs. we make quiet, unsettling
              games with big feelings and small teams.
            </motion.p>
          </motion.div>

          <Reveal className="mt-14">
            <figure className="relative overflow-hidden rounded-3xl border border-white/5">
              <img
                src="/about-studio.png"
                alt="the element 83 studio at night — two desks side by side, lit only by violet monitor glow"
                width={2048}
                height={1152}
                decoding="async"
                className="w-full aspect-[12/5] object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-ink-950/30"
                aria-hidden="true"
              />
              <figcaption className="absolute bottom-5 left-6 md:bottom-8 md:left-10 text-script text-2xl md:text-3xl">
                a room lit by monitors.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---- section 2: studio story ---- */}
      <section className="relative py-24 md:py-32 px-6" aria-labelledby="story-heading">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[auto_1fr] gap-12 items-start">
          <Reveal className="flex flex-col items-center gap-4">
            <div className="p-6 rounded-2xl border border-white/5 bg-ink-900/40">
              <CubeLogo size={120} />
            </div>
            <span className="badge">
              <span className="badge-dot" aria-hidden="true" />
              made with godot
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3">
              who we are
            </div>
            <h2
              id="story-heading"
              className="font-extrabold lowercase text-mist-50 text-3xl md:text-4xl tracking-tight"
            >
              a very small studio<span className="text-haze-500">.</span>
            </h2>
            <div className="mt-8 space-y-6 text-mist-100 text-lg leading-relaxed max-w-3xl">
              <p>
                we are <span className="text-script text-3xl align-middle">element 83</span>, a
                very small studio tucked away in a room lit mostly by monitors. we make quiet,
                unsettling games with big feelings and small teams.
              </p>
              <p className="text-mist-200">
                two of us. one engine. a shelf of half-drunk mugs. every game is stirred by hand,
                patiently, until it starts to look back at you.
              </p>
              <p className="text-mist-200">
                we care about mood, restraint, and the kind of stories that stay with you like a
                rumor. no hype cycles. no roadmaps carved in stone. just a slow simmer, and
                something worth playing at the end of it.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ---- section 3: animated stats ---- */}
        <div className="max-w-6xl mx-auto mt-20">
          <motion.ul
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((s) => (
              <motion.li key={s.label} variants={revealVariants} className="card p-6 md:p-8">
                <CountUp
                  to={s.value}
                  pad={s.pad}
                  className="block text-4xl md:text-5xl font-extrabold text-mist-50 tracking-tight"
                />
                <div className="text-xs uppercase tracking-[0.3em] text-mist-300 mt-3">
                  {s.label}
                </div>
              </motion.li>
            ))}
            <motion.li variants={revealVariants} className="card p-6 md:p-8">
              <span className="block text-4xl md:text-5xl font-extrabold text-mist-50 tracking-tight">
                ∞
              </span>
              <div className="text-xs uppercase tracking-[0.3em] text-mist-300 mt-3">
                cups of coffee
              </div>
            </motion.li>
          </motion.ul>
        </div>
      </section>

      {/* ---- section 4: brewing-process timeline ---- */}
      <section className="relative pb-24 md:pb-32 px-6" aria-labelledby="process-heading">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3">
              how we brew
            </div>
            <h2
              id="process-heading"
              className="font-extrabold lowercase text-mist-50 text-3xl md:text-4xl tracking-tight"
            >
              the slow simmer<span className="text-haze-500">.</span>
            </h2>
            <p className="mt-6 text-mist-200 leading-relaxed max-w-2xl">
              every game goes through the same five stages. none of them can be rushed, and the
              middle one never ends on schedule.
            </p>
          </Reveal>

          <motion.ol
            className="mt-14 space-y-12 border-l border-haze-500/20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.15 }}
          >
            {steps.map((s) => (
              <motion.li key={s.n} variants={revealVariants} className="relative pl-10 md:pl-14">
                <span
                  className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-haze-500 shadow-glow"
                  aria-hidden="true"
                />
                <div className="tag-chip mb-3">step {s.n}</div>
                <h3 className="font-extrabold lowercase text-mist-50 text-xl md:text-2xl tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-mist-200 leading-relaxed max-w-2xl">{s.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ---- section 5: principles ---- */}
      <section className="relative pb-24 md:pb-32 px-6" aria-labelledby="principles-heading">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3">
              what we believe
            </div>
            <h2
              id="principles-heading"
              className="font-extrabold lowercase text-mist-50 text-3xl md:text-4xl tracking-tight"
            >
              a few quiet rules<span className="text-haze-500">.</span>
            </h2>
          </Reveal>

          <motion.ul
            className="mt-14 grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
          >
            {principles.map((p) => (
              <motion.li key={p.title} variants={revealVariants} className="card p-8">
                <p.icon size={22} aria-hidden="true" className="text-haze-500" />
                <h3 className="mt-5 font-extrabold lowercase text-mist-50 text-xl tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-mist-200 text-sm leading-relaxed">{p.body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ---- section 6: closing ---- */}
      <section className="relative py-20 px-6 text-center" aria-label="closing">
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="text-script text-2xl md:text-3xl"
        >
          come watch it brew.
        </motion.p>
        <Reveal delay={0.3} className="mt-6">
          <Link
            to="/games"
            className="group inline-flex items-center gap-2 text-mist-200 hover:text-mist-50 lowercase tracking-widest text-sm transition-colors duration-200"
          >
            <span className="relative">
              see what we're brewing
              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-haze-400 transition-transform duration-300 group-hover:scale-x-100"
              />
            </span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
