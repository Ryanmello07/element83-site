import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Text/motion primitives for the Home page.
 *
 * Accessibility contract: every animated piece renders `aria-hidden` visual
 * text; the accessible label is provided once by a sibling `sr-only` span
 * inside the owning heading (see call sites). Under reduced motion the
 * helpers render plain static text (still aria-hidden) with no animation.
 */

type SplitCharsProps = {
  text: string;
  className?: string;
  /** seconds before the first glyph moves */
  delay?: number;
  /** per-glyph stagger in seconds (§6: 15–25ms) */
  step?: number;
};

/**
 * Character-level rise entrance (home hero only, §1): each glyph rises from
 * y 110% / rotate 4° inside an overflow-hidden mask, 900ms ease-out.
 */
export function SplitChars({ text, className, delay = 0, step = 0.025 }: SplitCharsProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className} aria-hidden="true">
        {text}
      </span>
    );
  }

  return (
    <span className={cn('inline-block', className)} aria-hidden="true">
      {text.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%', rotate: 4 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: delay + i * step }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

type WordRiseProps = {
  /** words, without trailing punctuation */
  text: string;
  className?: string;
  step?: number;
  delay?: number;
  /** render a trailing haze-500 period (display-heading convention) */
  accentPeriod?: boolean;
};

/**
 * Word-level rise on scroll into view (§8.7 headline word-stagger, 90ms).
 * Renders aria-hidden visual words — pair with an sr-only label.
 */
export function WordRise({ text, className, step = 0.09, delay = 0, accentPeriod = false }: WordRiseProps) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  if (reduced) {
    return (
      <span className={className} aria-hidden="true">
        {accentPeriod ? `${text}.` : text}
      </span>
    );
  }

  return (
    <span className={cn('inline-block', className)} aria-hidden="true">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: delay + i * step }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
      {accentPeriod && (
        <span className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block text-haze-500 will-change-transform"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: delay + words.length * step }}
          >
            .
          </motion.span>
        </span>
      )}
    </span>
  );
}

type EntranceProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  /** blur(8px) → 0 entrance (script taglines) */
  blur?: boolean;
};

/** Mount-time fade/rise entrance used by the hero stack (plays after splash). */
export function Entrance({ children, className, delay = 0, duration = 0.6, y = 20, blur = false }: EntranceProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={blur ? { opacity: 0, filter: 'blur(8px)' } : { opacity: 0, y }}
      animate={blur ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 1, y: 0 }}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

type BlurInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

/** Scroll-triggered blur-in (script asides below the fold). */
export function BlurIn({ children, className, delay = 0, duration = 1 }: BlurInProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

const eyebrowCls = 'text-[10px] font-bold uppercase tracking-[0.4em] text-haze-400';

type SectionHeaderProps = {
  eyebrow: string;
  /** lowercase title without the trailing period (added, haze-500, automatically) */
  title: string;
  /** id for the section's aria-labelledby */
  headingId: string;
  /** optional script aside line */
  aside?: string;
  className?: string;
};

/** Section header pattern (§8.7): eyebrow → display h2 with haze period → optional script aside. */
export function SectionHeader({ eyebrow, title, headingId, aside, className }: SectionHeaderProps) {
  const reduced = useReducedMotion();
  return (
    <div className={className}>
      {reduced ? (
        <p className={eyebrowCls}>{eyebrow}</p>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className={eyebrowCls}
        >
          {eyebrow}
        </motion.p>
      )}
      <h2
        id={headingId}
        className="mt-4 text-4xl md:text-5xl font-extrabold lowercase tracking-tight text-mist-50"
      >
        <span className="sr-only">{title}.</span>
        <WordRise text={title} accentPeriod />
      </h2>
      {aside && (
        <BlurIn className="mt-4" delay={0.2} duration={0.8}>
          <p className="text-script text-2xl md:text-3xl">{aside}</p>
        </BlurIn>
      )}
    </div>
  );
}
