import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GlitchTitle } from '@/components/GlitchTitle';
import { usePageMeta } from '@/hooks/usePageMeta';

/**
 * Route stub for the MISANTHROPIC detail page — the game-detail agent
 * replaces this file's body with the full cinematic page.
 */
export function GameMisanthropic() {
  usePageMeta(
    'misanthropic',
    'misanthropic — a quiet horror game in development at element 83.',
  );

  return (
    <section className="relative pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-extrabold text-mist-50 text-4xl md:text-6xl tracking-tight">
          <GlitchTitle>MISANTHROPIC</GlitchTitle>
        </h1>
        <p className="text-script text-2xl mt-4">a quiet horror</p>
        <p className="mt-6 max-w-2xl text-mist-200 leading-relaxed">
          this page is still brewing. check back soon.
        </p>
        <Link to="/games" className="btn-ghost mt-10">
          <ArrowLeft size={16} aria-hidden="true" />
          back to games
        </Link>
      </div>
    </section>
  );
}
