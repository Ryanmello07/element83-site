import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CubeLogo } from './CubeLogo';

type Route = 'home' | 'about' | 'games' | 'contact';

type Props = {
  route: Route;
  onNavigate: (r: Route) => void;
};

const items: { key: Route; label: string }[] = [
  { key: 'about', label: 'about' },
  { key: 'games', label: 'games' },
  { key: 'contact', label: 'contact' },
];

export function Nav({ route, onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (r: Route) => {
    onNavigate(r);
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink-900/70 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-3 group"
          aria-label="element 83 home"
        >
          <CubeLogo size={36} />
          <span className="text-mist-100 font-extrabold tracking-tight lowercase text-lg group-hover:[text-shadow:0_0_10px_rgba(167,139,250,0.6)] transition">
            element 83
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-10 text-sm font-semibold lowercase">
          {items.map((i) => (
            <button
              key={i.key}
              onClick={() => go(i.key)}
              className="nav-link"
              data-active={route === i.key}
            >
              {i.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-mist-100 p-2 rounded-full border border-white/10 hover:border-haze-500/60 hover:shadow-glow transition"
          aria-label="toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-ink-900/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-4 text-base font-semibold lowercase">
            {items.map((i) => (
              <button
                key={i.key}
                onClick={() => go(i.key)}
                className="nav-link text-left"
                data-active={route === i.key}
              >
                {i.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
