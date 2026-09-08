import { Link } from 'react-router-dom';
import { Twitter, MessageCircle, Youtube, Gamepad2, Mail } from 'lucide-react';
import { ComingSoon } from './ComingSoon';

const socials = [
  { icon: Twitter, label: 'twitter / x' },
  { icon: MessageCircle, label: 'discord' },
  { icon: Youtube, label: 'youtube' },
  { icon: Gamepad2, label: 'itch.io' },
];

const sitemap = [
  { to: '/', label: 'home' },
  { to: '/about', label: 'about' },
  { to: '/games', label: 'games' },
  { to: '/contact', label: 'contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/5 bg-ink-900/60">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-extrabold lowercase text-mist-100 text-lg">element 83.</div>
          <p className="text-script text-xl mt-2">brewing your favorite games</p>
          <nav aria-label="footer" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm lowercase">
            {sitemap.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                className="text-mist-300 hover:text-mist-50 transition-colors duration-200"
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:justify-self-center">
          <div className="text-xs uppercase tracking-[0.3em] text-mist-300 mb-3">say hi</div>
          <a
            href="mailto:hello@element83.org"
            className="inline-flex items-center gap-2 text-mist-100 hover:text-haze-400 transition"
          >
            <Mail size={16} aria-hidden="true" />
            hello@element83.org
          </a>
        </div>

        <div className="md:justify-self-end">
          <div className="text-xs uppercase tracking-[0.3em] text-mist-300 mb-3">follow</div>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <ComingSoon
                key={label}
                label={label}
                icon={<Icon size={16} aria-hidden="true" />}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-mist-300 lowercase">
          <div>© {year} element 83. all rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="badge-dot" aria-hidden="true" />
            made with godot
          </div>
        </div>
      </div>
    </footer>
  );
}
