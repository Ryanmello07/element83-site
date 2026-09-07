import { useId, useState } from 'react';
import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { EASE_IN_OUT, EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

export type FaqItem = {
  q: string;
  a: string;
};

type Props = {
  items: FaqItem[];
  className?: string;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/**
 * FAQ accordion (contact.md §4). Single-open; proper accordion semantics —
 * each question is a real <button> inside an <h3> with aria-expanded /
 * aria-controls, each answer a labelled region — so it's fully keyboard
 * operable with native Tab / Enter / Space. Panels height-auto-animate
 * 350ms ease-in-out; chevron rotates 180°. Staggered 80ms scroll-in.
 * Framer Motion is configured with reducedMotion="user" globally, and CSS
 * collapses transitions under prefers-reduced-motion.
 */
export function FaqAccordion({ items, className }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <motion.div
      className={cn('card overflow-hidden', className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <motion.div
            key={item.q}
            variants={itemVariants}
            className="border-b border-white/5 last:border-b-0"
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-4 px-6 py-5 md:px-8 text-left rounded-none"
              >
                <span className="text-base md:text-lg font-semibold text-mist-200 transition-all duration-200 group-hover:text-mist-50 group-hover:translate-x-1">
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={cn(
                    'shrink-0 text-haze-500 transition-transform duration-300',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_IN_OUT }}
                  className="overflow-hidden"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="px-6 pb-6 md:px-8 text-mist-200 leading-relaxed max-w-2xl"
                  >
                    {item.a}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
