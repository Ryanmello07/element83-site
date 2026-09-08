import type { Variants } from 'framer-motion';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Gamepad2,
  Mail,
  MessageCircle,
  Twitter,
  Youtube,
} from 'lucide-react';
import { CopyButton } from '@/components/CopyButton';
import { ComingSoon } from '@/components/ComingSoon';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { FaqAccordion } from '@/components/contact/FaqAccordion';
import type { FaqItem } from '@/components/contact/FaqAccordion';
import { usePageMeta } from '@/hooks/usePageMeta';
import { EASE_OUT } from '@/lib/motion';

const EMAIL = 'hello@element83.org';

const socials = [
  { icon: Twitter, label: 'twitter / x' },
  { icon: MessageCircle, label: 'discord' },
  { icon: Youtube, label: 'youtube' },
  { icon: Gamepad2, label: 'itch.io' },
];

const faqs: FaqItem[] = [
  {
    q: 'can we interview you / feature your game?',
    a: "yes, please. email works best; include your outlet and deadline and we'll do our quiet best.",
  },
  {
    q: 'do you take collaborations or commissions?',
    a: "rarely, but we're flattered. tell us what you're brewing and we'll be honest about bandwidth.",
  },
  {
    q: 'found a bug or something broken on the site?',
    a: 'tell us! subject line "bug" gets read first. screenshots earn our eternal gratitude.',
  },
  {
    q: 'when does MISANTHROPIC come out?',
    a: "2028, quietly. no carved-stone roadmaps — when there's a date worth trusting, it'll be on the games page.",
  },
];

/** section-header entrance (design §8.7) */
const headerContainer: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const headerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** social chips: stagger 80ms, scale 0.8→1 + fade, 30% trigger (contact.md §3) */
const chipContainer: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08 } },
};
const chipItem: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  shown: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
};

export function Contact() {
  usePageMeta(
    'contact',
    'reach element 83: hello@element83.org. we read everything, we answer most things.',
  );
  const reduced = useReducedMotion();

  return (
    <>
      {/* ---- section 1: page header ---- */}
      <section className="relative pt-32 px-6" aria-labelledby="contact-heading">
        <div className="absolute inset-0 -z-10 bg-atmosphere" />
        <div className="max-w-4xl mx-auto">
          <motion.div variants={headerContainer} initial="hidden" animate="shown">
            <motion.p
              variants={headerItem}
              className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3"
            >
              say hi
            </motion.p>
            <h1
              id="contact-heading"
              className="font-extrabold lowercase text-mist-50 text-5xl md:text-7xl tracking-tight"
            >
              <motion.span variants={headerItem} className="inline-block">
                contact
              </motion.span>
              <motion.span variants={headerItem} className="inline-block text-haze-500">
                .
              </motion.span>
            </h1>
            <motion.p
              variants={headerItem}
              className="mt-6 max-w-xl text-mist-200 leading-relaxed"
            >
              got a question, a kind word, or a strange dream to share? drop us a line. we read
              everything, we answer most things.
            </motion.p>
          </motion.div>

          {/* ---- section 2: email card (primary) ---- */}
          <Reveal className="mt-14">
            <div className="card group p-8 md:p-12 relative overflow-hidden">
              {/* corner glow, fades in last, then static */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              <RevealGroup className="relative">
                <RevealItem>
                  <div className="text-[10px] uppercase tracking-[0.5em] text-haze-400 mb-4">
                    write to the studio
                  </div>
                </RevealItem>

                <RevealItem>
                  <div className="min-w-0">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="group/link inline-flex flex-wrap items-center gap-3 max-w-full text-mist-50 font-extrabold lowercase tracking-tight text-2xl sm:text-3xl md:text-5xl hover:text-haze-400 transition-colors"
                    >
                      <Mail
                        className="text-haze-500 shrink-0 transition-transform duration-300 group-hover:rotate-[8deg]"
                        size={32}
                        aria-hidden="true"
                      />
                      <span className="relative break-all">
                        {EMAIL}
                        <span
                          aria-hidden="true"
                          className="absolute left-0 -bottom-1 h-[2px] w-full bg-haze-500/40"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-haze-400 transition-transform duration-300 group-hover/link:scale-x-100"
                        />
                      </span>
                    </a>
                    <p className="text-script text-2xl mt-4">we brew, we read, we reply</p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3 md:justify-end">
                    <CopyButton
                      text={EMAIL}
                      label="copy"
                      announcement="email address copied"
                    />
                    <a href={`mailto:${EMAIL}`} className="btn-ghost">
                      open mail
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </RevealItem>

                <RevealItem>
                  <div className="mt-10 pt-8 border-t border-white/5">
                    <p className="text-xs text-mist-300 lowercase tracking-[0.25em] leading-relaxed max-w-xs">
                      mostly late replies. sometimes very late. we're a two-person shop, so
                      patience is appreciated.
                    </p>
                  </div>
                </RevealItem>
              </RevealGroup>
            </div>
          </Reveal>

          {/* ---- section 3: socials (honest states) ---- */}
          <Reveal className="mt-12">
            <div className="card p-8 md:flex md:items-center md:justify-between md:gap-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3">
                  follow
                </div>
                <p className="text-mist-200 leading-relaxed max-w-md">
                  our socials are still on the stove. when they pour, they'll be linked right
                  here.
                </p>
              </div>

              <motion.div
                className="mt-6 md:mt-0 flex items-center gap-4 shrink-0"
                variants={chipContainer}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, amount: 0.3 }}
              >
                {socials.map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    variants={chipItem}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <ComingSoon label={label} icon={<Icon size={16} aria-hidden="true" />} />
                    {/* tooltips don't exist on touch — a visible micro-badge keeps the state honest */}
                    <span
                      className="md:hidden text-[8px] uppercase tracking-[0.2em] text-haze-300/60"
                      aria-hidden="true"
                    >
                      soon
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Reveal>

          {/* ---- section 4: faq ---- */}
          <section className="mt-12" aria-labelledby="faq-heading">
            <Reveal>
              <div className="text-[10px] uppercase tracking-[0.4em] text-haze-400 mb-3">
                quick answers
              </div>
              <h2
                id="faq-heading"
                className="font-extrabold lowercase text-mist-50 text-3xl md:text-4xl tracking-tight"
              >
                before you write<span className="text-haze-500">.</span>
              </h2>
            </Reveal>
            <FaqAccordion items={faqs} className="mt-8" />
          </section>
        </div>
      </section>

      {/* ---- section 5: closing ---- */}
      <section className="relative py-20 px-6 text-center" aria-label="closing">
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="text-script text-2xl md:text-3xl"
        >
          the kettle's always on.
        </motion.p>
        <Reveal delay={0.3} className="mt-6">
          <Link
            to="/games"
            className="group inline-flex items-center gap-2 text-mist-200 hover:text-mist-50 lowercase tracking-widest text-sm transition-colors duration-200"
          >
            <span className="relative">
              back to the games
              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-haze-400 transition-transform duration-300 group-hover:scale-x-100"
              />
            </span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
