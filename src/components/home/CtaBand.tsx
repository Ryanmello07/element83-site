import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EASE_OUT } from '@/lib/motion';
import { BlurIn, WordRise } from './text';

/**
 * §5 — Closing CTA band. Intensified atmosphere: breathing haze glow centered
 * (4s, stops under reduced motion), hairline borders, script line, word-
 * staggered headline, and the contact pull.
 */
export function CtaBand() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden border-y border-white/5 px-6 py-28"
    >
      {/* breathing center glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        {reduced ? (
          <div
            className="h-[60vh] w-[85vw] opacity-60"
            style={{ background: 'radial-gradient(closest-side, rgba(167, 139, 250, 0.16), transparent)' }}
          />
        ) : (
          <motion.div
            className="h-[60vh] w-[85vw]"
            style={{ background: 'radial-gradient(closest-side, rgba(167, 139, 250, 0.16), transparent)' }}
            animate={{ opacity: [0.5, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />
        )}
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <BlurIn duration={1}>
          <p className="text-script text-3xl md:text-4xl">want to watch it brew?</p>
        </BlurIn>

        <h2
          id="cta-heading"
          className="mt-6 text-5xl font-extrabold lowercase tracking-tight text-mist-50 md:text-6xl"
        >
          <span className="sr-only">come say hi.</span>
          <WordRise text="come say hi" accentPeriod step={0.09} />
        </h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
          className="mt-6 text-mist-200"
        >
          we read everything, we answer most things.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
          className="mt-10"
        >
          <Link to="/contact" className="btn-ghost">
            contact the studio
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
