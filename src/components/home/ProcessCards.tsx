import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { EASE_OUT } from '@/lib/motion';
import { SectionHeader } from './text';
import { useHomeGsap } from './useHomeGsap';

const STEPS = [
  {
    n: 1,
    title: 'steep',
    body: 'we sit with an idea until it stains. months of notes, moodboards, and half-remembered dreams before a single scene exists.',
  },
  {
    n: 2,
    title: 'stir',
    body: 'prototype, taste, throw half of it away. the game tells us what it wants to be; we just keep the heat steady.',
  },
  {
    n: 3,
    title: 'serve',
    body: "no hype cycles, no carved-stone roadmaps. when it's ready we pour it, quietly, and hope it stays with you like a rumor.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** number label draws in with a tracking expansion (0.6em → 0.4em, 600ms) */
const numberVariants: Variants = {
  hidden: { opacity: 0, letterSpacing: '0.6em' },
  shown: { opacity: 1, letterSpacing: '0.4em', transition: { duration: 0.6, ease: EASE_OUT } },
};

const numberCls =
  'text-[10px] font-bold uppercase tracking-[0.4em] text-haze-400 transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_12px_rgba(167,139,250,0.6)]';

/**
 * §4 — Process ("how we brew"). Three cards stagger up at 25% trigger with
 * 120ms steps; on desktop a ±10px offset stagger eases to level as the
 * section centers (GSAP scrub on wrapper nodes, so it never fights the
 * framer-motion reveal on the cards themselves).
 */
export function ProcessCards() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useHomeGsap(sectionRef, () => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const offsets = [10, 0, -10];
      gsap.utils.toArray<HTMLElement>('[data-brew-card]').forEach((wrap, i) => {
        gsap.fromTo(
          wrap,
          { y: offsets[i % offsets.length] },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'center center',
              scrub: 0.5,
            },
          },
        );
      });
    });
  });

  const grid = reduced ? (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {STEPS.map((step) => (
        <div key={step.n} className="card group p-8">
          <div className={numberCls}>№ {step.n}</div>
          <h3 className="mt-4 text-xl font-extrabold lowercase text-mist-100">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-mist-200">{step.body}</p>
        </div>
      ))}
    </div>
  ) : (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
      className="mt-14 grid gap-6 md:grid-cols-3"
    >
      {STEPS.map((step) => (
        <div key={step.n} data-brew-card>
          <motion.div
            variants={cardVariants}
            className="card group h-full p-8 transition-transform duration-300 hover:-translate-y-1"
          >
            <motion.div variants={numberVariants} className={numberCls}>
              № {step.n}
            </motion.div>
            <h3 className="mt-4 text-xl font-extrabold lowercase text-mist-100">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">{step.body}</p>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );

  return (
    <section ref={sectionRef} aria-labelledby="process-heading" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="process" title="a slow simmer" headingId="process-heading" />
        {grid}
      </div>
    </section>
  );
}
