import type { Transition, Variants } from 'framer-motion';

/** ease out — entrances */
export const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
/** ease in-out — loops & page transitions */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as [number, number, number, number];

export const pageTransition: Transition = { duration: 0.45, ease: EASE_OUT };
export const pageExitTransition: Transition = { duration: 0.25, ease: EASE_IN_OUT };

/** full-motion page variants (curtain handles the rest) */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: pageTransition },
  exit: { opacity: 0, y: -12, transition: pageExitTransition },
};

/** reduced-motion page variants — opacity-only crossfade */
export const pageVariantsReduced: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/** default section reveal: opacity 0→1, y 40→0, 800ms ease-out, once, 20% viewport */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** staggered group container: 100ms steps */
export const staggerContainer: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1 } },
};
