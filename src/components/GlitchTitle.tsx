import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: string;
  className?: string;
  /** uppercase display treatment (MISANTHROPIC-style); default lowercase display */
  uppercase?: boolean;
};

/**
 * Glitch-treated display title (§8.8): wraps text with data-text for
 * pseudo-element rose/cyan splits; random auto-glitch every 4–10s with a
 * 380ms burst, plus hover glitch. Static under reduced motion.
 * All timers are tracked and cleared on unmount.
 */
export function GlitchTitle({ children, className, uppercase = true }: Props) {
  const [glitching, setGlitching] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let alive = true;
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (alive) fn();
      }, ms);
      timers.current.push(id);
    };

    const loop = () => {
      if (!alive) return;
      setGlitching(true);
      later(() => setGlitching(false), 380);
      later(loop, 4000 + Math.random() * 6000);
    };
    later(loop, 3000);

    return () => {
      alive = false;
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, []);

  return (
    <span
      className={cn(
        'glitch font-extrabold text-mist-50 tracking-tight',
        uppercase ? 'uppercase' : 'lowercase',
        className,
      )}
      data-text={children}
      data-glitch={glitching}
    >
      {children}
    </span>
  );
}
