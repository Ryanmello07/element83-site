import { useEffect, useState } from 'react';
import { CubeLogo } from './CubeLogo';

type Props = { onDone: () => void };

export function Splash({ onDone }: Props) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = prefersReduced ? 100 : 1800;
    const end = prefersReduced ? 200 : 2400;
    const t1 = setTimeout(() => setLeaving(true), start);
    const t2 = setTimeout(onDone, end);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-500 ${
        leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <CubeLogo size={92} animate />
        <div className="text-mist-100 lowercase text-sm tracking-[0.4em] opacity-0 animate-fade-in-slow">
          element 83
        </div>
      </div>
    </div>
  );
}
