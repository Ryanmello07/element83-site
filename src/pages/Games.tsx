import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useReveal } from '@/lib/useReveal';
import { GlitchTitle } from '@/components/GlitchTitle';
import { usePageMeta } from '@/hooks/usePageMeta';

function MisanthropicArt() {
  return (
    <div className="relative aspect-[4/5] md:aspect-auto md:h-full w-full overflow-hidden rounded-2xl border border-white/5">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 30% 20%, #3a3560 0%, #221e3d 45%, #0f0d1e 100%)',
        }}
      />
      <div className="absolute inset-x-0 top-1/2 h-px bg-haze-500/40" />
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0 3px, rgba(167,139,250,0.06) 3px 4px)',
        }}
      />
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="figFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0813" stopOpacity="0" />
            <stop offset="60%" stopColor="#0a0813" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0a0813" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="halo" cx="50%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="400" height="500" fill="url(#halo)" />
        <g fill="#0a0813" opacity="0.8">
          <rect x="20" y="300" width="60" height="150" />
          <rect x="90" y="280" width="45" height="170" />
          <rect x="145" y="310" width="35" height="140" />
          <rect x="260" y="290" width="55" height="160" />
          <rect x="325" y="305" width="50" height="145" />
        </g>
        <g fill="#b7a4ff">
          <circle cx="35" cy="330" r="1.5" opacity="0.8" />
          <circle cx="105" cy="315" r="1.5" opacity="0.5" />
          <circle cx="160" cy="345" r="1.5" opacity="0.7" />
          <circle cx="280" cy="325" r="1.5" opacity="0.6" />
          <circle cx="345" cy="335" r="1.5" opacity="0.8" />
        </g>
        <g transform="translate(200 210)" fill="#050410">
          <ellipse cx="0" cy="0" rx="42" ry="52" />
          <path d="M -70 40 Q 0 20 70 40 L 90 260 L -90 260 Z" />
        </g>
        <rect x="0" y="0" width="400" height="500" fill="url(#figFade)" />
      </svg>

      <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-haze-500/50 bg-ink-900/60 backdrop-blur text-[10px] uppercase tracking-[0.3em] text-haze-300">
        <Clock size={12} /> coming 2028
      </div>
    </div>
  );
}

export function Games() {
  usePageMeta('games', 'the element 83 portfolio: misanthropic, upcoming brews, and experiments.');
  const heading = useReveal<HTMLDivElement>();
  const card = useReveal<HTMLDivElement>();

  return (
    <section className="relative pt-32 pb-16 px-6">
      <div className="absolute inset-0 -z-10 bg-atmosphere" />
      <div className="max-w-6xl mx-auto">
        <div ref={heading.ref} data-shown={heading.shown} className="reveal">
          <div className="text-xs uppercase tracking-[0.4em] text-haze-400 mb-3">portfolio</div>
          <h1 className="font-extrabold lowercase text-mist-50 text-5xl md:text-7xl tracking-tight">
            our games<span className="text-haze-500">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-mist-200 leading-relaxed">
            dive into our portfolio of acclaimed games. each title is a product of love and hardwork.
          </p>
        </div>

        <div ref={card.ref} data-shown={card.shown} className="reveal mt-14">
          <article className="card overflow-hidden grid md:grid-cols-[1.1fr_1fr] gap-0">
            <MisanthropicArt />

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="text-[10px] uppercase tracking-[0.5em] text-haze-400 mb-4">
                featured title
              </div>
              <GlitchTitle className="text-4xl md:text-6xl">MISANTHROPIC</GlitchTitle>
              <p className="text-script text-2xl mt-4">a quiet horror</p>
              <p className="mt-6 text-mist-200 leading-relaxed max-w-lg">
                it's 2027. AGI has been achieved, but what does it mean for the world?
                play as a researcher and witness manmade horrors.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/games/misanthropic" className="btn-ghost">
                  check it out
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <div className="flex items-center gap-2 text-mist-300 text-xs uppercase tracking-[0.3em]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-haze-500 shadow-glow" />
                  narrative · single-player
                </div>
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <dt className="text-mist-300 uppercase tracking-[0.3em]">engine</dt>
                  <dd className="mt-1 text-mist-100">godot</dd>
                </div>
                <div>
                  <dt className="text-mist-300 uppercase tracking-[0.3em]">platforms</dt>
                  <dd className="mt-1 text-mist-100">pc · mac</dd>
                </div>
                <div>
                  <dt className="text-mist-300 uppercase tracking-[0.3em]">status</dt>
                  <dd className="mt-1 text-mist-100">in development</dd>
                </div>
              </dl>
            </div>
          </article>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="card p-8">
            <div className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3">upcoming</div>
            <div className="font-extrabold lowercase text-mist-100 text-2xl">untitled brew № 2</div>
            <p className="mt-3 text-mist-200 text-sm leading-relaxed">
              something small, strange, and slow-burning. more soon.
            </p>
          </div>
          <div className="card p-8">
            <div className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3">archive</div>
            <div className="font-extrabold lowercase text-mist-100 text-2xl">early experiments</div>
            <p className="mt-3 text-mist-200 text-sm leading-relaxed">
              little prototypes, jam entries, and half-remembered dreams from the workshop floor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
