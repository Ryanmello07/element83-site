import { useEffect, useState } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Overlay } from '@/components/Overlay';
import { Splash } from '@/components/Splash';
import { Home } from '@/pages/Home';
import { Games } from '@/pages/Games';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';

type Route = 'home' | 'about' | 'games' | 'contact';

const SPLASH_KEY = 'e83_splash_seen_v1';

function App() {
  const [route, setRoute] = useState<Route>('home');
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(SPLASH_KEY) !== '1';
  });
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!showSplash) return;
    return () => {
      sessionStorage.setItem(SPLASH_KEY, '1');
    };
  }, [showSplash]);

  const navigate = (r: Route) => {
    if (r === route) return;
    setTransitioning(true);
    window.setTimeout(() => {
      setRoute(r);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTransitioning(false);
    }, 220);
  };

  return (
    <div className="relative min-h-screen bg-atmosphere">
      {showSplash && <Splash onDone={() => setShowSplash(false)} />}
      <Overlay />
      <Nav route={route} onNavigate={navigate} />

      <main
        className={`transition-opacity duration-300 ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {route === 'home' && <Home onNavigate={navigate} />}
        {route === 'games' && <Games />}
        {route === 'about' && <About />}
        {route === 'contact' && <Contact />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
