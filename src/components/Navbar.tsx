import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { CubeLogo } from './CubeLogo';
import { EASE_OUT } from '@/lib/motion';

const items = [
  { to: '/about', label: 'about' },
  { to: '/games', label: 'games' },
  { to: '/contact', label: 'contact' },
];

const MOBILE_PANEL_ID = 'mobile-nav-panel';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close on route change (focus is handed to <main> by Layout)
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      setOpen(false);
    }
  }, [location.pathname]);

  // Escape closes; opening moves focus to the first link
  useEffect(() => {
    if (!open) return;
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a');
    firstLink?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const closeAndRefocus = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink-900/70 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group rounded-md"
          aria-label="element 83 home"
        >
          <span className="transition-transform duration-300 group-hover:rotate-[8deg] group-hover:drop-shadow-[0_0_12px_rgba(167,139,250,0.45)]">
            <CubeLogo size={36} />
          </span>
          <span className="text-mist-100 font-extrabold tracking-tight lowercase text-lg group-hover:[text-shadow:0_0_10px_rgba(167,139,250,0.6)] transition">
            element 83
          </span>
        </Link>

        <nav aria-label="primary" className="hidden md:flex items-center gap-10 text-sm font-semibold lowercase">
          {items.map((i) => (
            <NavLink key={i.to} to={i.to} className="relative inline-block py-1">
              {({ isActive }) => (
                <>
                  <span data-active={isActive} className="nav-link">
                    {i.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-[6px] left-0 right-0 h-px bg-haze-500/90"
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => (open ? closeAndRefocus() : setOpen(true))}
          className="md:hidden btn-icon text-mist-100"
          aria-label={open ? 'close menu' : 'open menu'}
          aria-expanded={open}
          aria-controls={MOBILE_PANEL_ID}
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={MOBILE_PANEL_ID}
            ref={panelRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-ink-900/95 backdrop-blur-md"
          >
            <nav aria-label="mobile" className="px-6 py-4 flex flex-col gap-4 text-base font-semibold lowercase">
              {items.map((i, idx) => (
                <motion.div
                  key={i.to}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.06 * idx, ease: EASE_OUT }}
                >
                  <NavLink
                    to={i.to}
                    className="nav-link inline-block"
                  >
                    {({ isActive }) => (
                      <span data-active={isActive} className="nav-link">
                        {i.label}
                      </span>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
