import { Twitter, MessageCircle, Youtube, Gamepad2, Mail } from 'lucide-react';

const socials = [
  { icon: Twitter, label: 'twitter / x', href: '#' },
  { icon: MessageCircle, label: 'discord', href: '#' },
  { icon: Youtube, label: 'youtube', href: '#' },
  { icon: Gamepad2, label: 'itch.io', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-ink-900/60">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-extrabold lowercase text-mist-100 text-lg">element 83.</div>
          <p className="text-script text-xl mt-2">brewing your favorite games</p>
        </div>

        <div className="md:justify-self-center">
          <div className="text-xs uppercase tracking-[0.3em] text-mist-300 mb-3">say hi</div>
          <a
            href="mailto:hello@element83.games"
            className="inline-flex items-center gap-2 text-mist-100 hover:text-haze-400 transition"
          >
            <Mail size={16} />
            hello@element83.games
          </a>
        </div>

        <div className="md:justify-self-end">
          <div className="text-xs uppercase tracking-[0.3em] text-mist-300 mb-3">follow</div>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-mist-200 hover:text-mist-50 hover:border-haze-500/70 hover:shadow-glow transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-mist-300 lowercase">
          <div>© 2028 element 83. all rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-haze-500 shadow-glow" />
            made with godot
          </div>
        </div>
      </div>
    </footer>
  );
}
