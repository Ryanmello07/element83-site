import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { revealVariants, staggerContainer } from '@/lib/motion';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** extra delay in seconds, applied after the reveal triggers */
  delay?: number;
};

/**
 * Default section reveal (design §6): opacity 0→1, y 40→0, 800ms ease-out,
 * triggers once at 20% viewport. Reduced motion collapses to a crossfade
 * via MotionConfig reducedMotion="user".
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

/** Staggered group container — children should be <RevealItem>. 100ms steps. */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={cn(className)} variants={revealVariants}>
      {children}
    </motion.div>
  );
}
