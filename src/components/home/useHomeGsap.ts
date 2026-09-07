import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scoped GSAP/ScrollTrigger setup for Home scroll-driven effects.
 *
 * - Skips entirely under prefers-reduced-motion (static layout per §6).
 * - gsap.context scopes selector text to `scope` and reverts every tween,
 *   trigger, and matchMedia created inside `setup` on unmount.
 * - Lenis is owned by Layout and already synced via ScrollTrigger.update;
 *   this hook never creates scroll instances.
 *
 * Isolation contract: GSAP only ever touches dedicated wrapper elements
 * (data-* attributes); framer-motion owns entrances/ambient loops on their
 * own nodes, so no element is animated by both libraries.
 */
export function useHomeGsap(
  scope: RefObject<HTMLElement | null>,
  setup: () => void,
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = scope.current;
    if (reduced || !node) return;
    const ctx = gsap.context(setup, node);
    return () => ctx.revert();
    // setup is stable per mounted section; re-run only on motion preference change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);
}
