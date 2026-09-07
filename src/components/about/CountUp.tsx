import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';

type Props = {
  /** final number */
  to: number;
  /** pad with leading zeros, e.g. pad=2 renders 2 as "02" */
  pad?: number;
  duration?: number;
  className?: string;
};

/**
 * Count-up stat value (About page). Animates 0 → `to` once when scrolled
 * into view (50% visible). The value lives in a MotionValue bound directly
 * to the DOM — no re-render per frame. Under prefers-reduced-motion the
 * final value renders instantly, no animation. If the element is jumped
 * past without ever intersecting (anchor/keyboard jump), a scroll fallback
 * snaps it to the final value so it never gets stuck at 0.
 */
export function CountUp({ to, pad = 0, duration = 1.4, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const value = useMotionValue(reduced ? to : 0);
  const text = useTransform(value, (v) => String(Math.round(v)).padStart(pad, '0'));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration, ease: EASE_OUT });
    return () => controls.stop();
  }, [inView, reduced, to, duration, value]);

  // fallback: jumped past the element without an intersection (e.g. anchor nav)
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const check = () => {
      if (node.getBoundingClientRect().bottom < 0) {
        value.set(to);
        window.removeEventListener('scroll', check);
      }
    };
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [to, value]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
