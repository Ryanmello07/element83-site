import { Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Games } from '@/pages/Games';
import { GameMisanthropic } from '@/pages/GameMisanthropic';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { NotFound } from '@/pages/NotFound';

function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="games" element={<Games />} />
          <Route path="games/misanthropic" element={<GameMisanthropic />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </TooltipProvider>
  );
}

export default App;
