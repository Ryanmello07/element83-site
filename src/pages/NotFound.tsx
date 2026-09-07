import { Link } from 'react-router-dom';
import { CubeLogo } from '@/components/CubeLogo';
import { GlitchTitle } from '@/components/GlitchTitle';
import { usePageMeta } from '@/hooks/usePageMeta';

export function NotFound() {
  usePageMeta('page not found', 'this page dissolved in the brew.');

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center px-6 pt-[72px]">
      <div className="flex flex-col items-center text-center">
        <CubeLogo size={72} className="mb-10 opacity-80" />
        <h1>
          <GlitchTitle className="text-7xl md:text-9xl font-black">404</GlitchTitle>
        </h1>
        <p className="text-script text-2xl md:text-3xl mt-6">this page dissolved in the brew.</p>
        <Link to="/" className="btn-ghost mt-12">
          back home
        </Link>
      </div>
    </section>
  );
}
