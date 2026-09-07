import { CubeLogo } from '@/components/CubeLogo';
import { useReveal } from '@/lib/useReveal';
import { usePageMeta } from '@/hooks/usePageMeta';

export function About() {
  usePageMeta('about', 'about element 83 — a very small studio making quiet, unsettling games.');
  const heading = useReveal<HTMLDivElement>();
  const body = useReveal<HTMLDivElement>();

  return (
    <section className="relative pt-32 pb-16 px-6">
      <div className="absolute inset-0 -z-10 bg-atmosphere" />
      <div className="max-w-5xl mx-auto">
        <div ref={heading.ref} data-shown={heading.shown} className="reveal">
          <div className="text-xs uppercase tracking-[0.4em] text-haze-400 mb-3">studio</div>
          <h1 className="font-extrabold lowercase text-mist-50 text-5xl md:text-7xl tracking-tight">
            about us<span className="text-haze-500">.</span>
          </h1>
        </div>

        <div
          ref={body.ref}
          data-shown={body.shown}
          className="reveal mt-14 grid md:grid-cols-[auto_1fr] gap-12 items-start"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 rounded-2xl border border-white/5 bg-ink-900/40">
              <CubeLogo size={120} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-haze-500/40 text-[10px] uppercase tracking-[0.35em] text-haze-300 bg-ink-900/40">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-haze-500 shadow-glow" />
              made with godot
            </div>
          </div>

          <div className="space-y-6 text-mist-100 text-lg leading-relaxed">
            <p>
              we are <span className="text-script text-3xl align-middle">element 83</span>, a very
              small studio tucked away in a room lit mostly by monitors. we make quiet, unsettling
              games with big feelings and small teams.
            </p>
            <p className="text-mist-200">
              two of us. one engine. a shelf of half-drunk mugs. every game is stirred by hand,
              patiently, until it starts to look back at you.
            </p>
            <p className="text-mist-200">
              we care about mood, restraint, and the kind of stories that stay with you like a
              rumor. no hype cycles. no roadmaps carved in stone. just a slow simmer, and something
              worth playing at the end of it.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4">
              <div>
                <div className="text-3xl font-extrabold text-mist-50">02</div>
                <div className="text-xs uppercase tracking-[0.3em] text-mist-300 mt-2">people</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-mist-50">01</div>
                <div className="text-xs uppercase tracking-[0.3em] text-mist-300 mt-2">
                  game brewing
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-mist-50">∞</div>
                <div className="text-xs uppercase tracking-[0.3em] text-mist-300 mt-2">
                  cups of coffee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
