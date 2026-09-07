import { useEffect, useRef, useState } from 'react';
import { CubeLogo } from './CubeLogo';

type Props = { onDone: () => void };

/**
 * Splash (§8.1): black screen, cube-reveal logo, wordmark fade-in beneath.
 * Total 2.4s → 500ms fade out. Any key / click skips. Reduced motion: a
 * 200ms static flash. All timers cleaned up on unmount.
 */
export function Splash({ onDone }: Props) {
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = prefersReduced ? 100 : 2400;
    const fade = prefersReduced ? 100 : 500;

    const finish = () => {
      setLeaving(true);
      timers.current.push(window.setTimeout(() => doneRef.current(), fade));
    };

    timers.current.push(window.setTimeout(finish, start));

    const skip = () => {
      // clear scheduled finish, fade out immediately
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
      finish();
    };
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, []);

  return (
    <div
      role="status"
      aria-label="element 83 loading"
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-500 ${
        leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <span className="sr-only">element 83 loading</span>
      <div className="flex flex-col items-center gap-5">
        <CubeLogo size={92} animate />
        <div className="text-mist-100 lowercase text-sm tracking-[0.4em] opacity-0 animate-fade-in-slow">
          element 83
        </div>
      </div>
    </div>
  );
}
