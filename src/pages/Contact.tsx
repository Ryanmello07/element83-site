import { useState } from 'react';
import {
  Mail,
  MessageCircle,
  Twitter,
  Youtube,
  Gamepad2,
  Copy,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { useReveal } from '@/lib/useReveal';

const EMAIL = 'hello@element83.games';

const socials = [
  { icon: Twitter, label: 'twitter / x' },
  { icon: MessageCircle, label: 'discord' },
  { icon: Youtube, label: 'youtube' },
  { icon: Gamepad2, label: 'itch.io' },
];

export function Contact() {
  const heading = useReveal<HTMLDivElement>();
  const card = useReveal<HTMLDivElement>();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignored */
    }
  };

  return (
    <section className="relative pt-32 pb-16 px-6">
      <div className="absolute inset-0 -z-10 bg-atmosphere" />
      <div className="max-w-4xl mx-auto">
        <div ref={heading.ref} data-shown={heading.shown} className="reveal">
          <div className="text-xs uppercase tracking-[0.4em] text-haze-400 mb-3">say hi</div>
          <h2 className="font-extrabold lowercase text-mist-50 text-5xl md:text-7xl tracking-tight">
            contact<span className="text-haze-500">.</span>
          </h2>
          <p className="mt-6 max-w-xl text-mist-200 leading-relaxed">
            got a question, a kind word, or a strange dream to share? drop us a line.
            we read everything, we answer most things.
          </p>
        </div>

        <div ref={card.ref} data-shown={card.shown} className="reveal mt-14">
          <div className="card p-8 md:p-12 relative overflow-hidden">
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="text-[10px] uppercase tracking-[0.5em] text-haze-400 mb-4">
              write to the studio
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-3 text-mist-50 font-extrabold lowercase tracking-tight text-3xl md:text-5xl hover:text-haze-400 transition"
                >
                  <Mail className="text-haze-500 shrink-0" size={32} />
                  <span className="underline decoration-haze-500/40 decoration-2 underline-offset-8 group-hover:decoration-haze-400">
                    {EMAIL}
                  </span>
                </a>
                <p className="text-script text-2xl mt-4">we brew, we read, we reply</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button onClick={copy} className="btn-ghost" aria-label="copy email address">
                  {copied ? (
                    <>
                      <Check size={14} /> copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> copy
                    </>
                  )}
                </button>
                <a href={`mailto:${EMAIL}`} className="btn-ghost">
                  open mail
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-mist-300 mb-3">follow</div>
                <div className="flex items-center gap-3">
                  {socials.map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-mist-200 hover:text-mist-50 hover:border-haze-500/70 hover:shadow-glow transition"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-xs text-mist-300 lowercase tracking-[0.25em] md:text-right leading-relaxed max-w-xs">
                mostly late replies. sometimes very late. we're a two-person shop, so patience is
                appreciated.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
