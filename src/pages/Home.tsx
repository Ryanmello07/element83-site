import { ArrowRight } from 'lucide-react';

type Props = { onNavigate: (r: 'games' | 'about' | 'contact') => void };

export function Home({ onNavigate }: Props) {
  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center px-6">
      <div className="absolute inset-0 -z-10 bg-atmosphere" />
      <div className="max-w-5xl w-full flex flex-col items-center text-center">
        <div className="text-xs uppercase tracking-[0.5em] text-mist-300 mb-8 animate-fade-in">
          indie · godot · since 2024
        </div>

        <h1 className="font-extrabold lowercase text-mist-50 leading-none text-[18vw] md:text-[10rem] tracking-tight animate-fade-in-slow">
          element 83<span className="text-haze-500">.</span>
        </h1>

        <p className="text-script text-3xl md:text-5xl mt-6 animate-fade-in-slow">
          brewing your favorite games
        </p>

        <div className="mt-14 flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
          <button onClick={() => onNavigate('games')} className="btn-ghost">
            see our games
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="text-mist-200 hover:text-mist-50 text-sm lowercase tracking-widest transition"
          >
            about the studio
          </button>
        </div>

        <div className="mt-24 flex items-center gap-3 text-mist-300 text-xs lowercase tracking-[0.3em] animate-fade-in-slow">
          <span className="inline-block w-8 h-px bg-mist-300/40" />
          scroll to peek behind the curtain
          <span className="inline-block w-8 h-px bg-mist-300/40" />
        </div>
      </div>
    </section>
  );
}
