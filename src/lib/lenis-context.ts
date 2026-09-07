import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

/**
 * Site-wide Lenis instance (null under prefers-reduced-motion or before init).
 * Created and owned by Layout; page agents can consume via useLenis() to
 * sync scroll-driven work, but should not create their own instance.
 */
export const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}
