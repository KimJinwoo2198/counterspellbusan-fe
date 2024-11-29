import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Introduce from './articles/Introduce';
import CountDown from './articles/CountDown';
import CountDown2 from './articles/CountDown2';
import Guild from './articles/Guild';
import Info from './articles/Info';
import Fqa from './articles/Faq';
import Sponsor from './articles/Sponsor';
import MoreInfo from './articles/MoreInfo';
import NotFound from './articles/404';
import Index from './pages/Index';
import HackathonFormPage from './pages/FormPage';
import LogoSvg from './assets/logo.svg';
import Poster from './pages/Poster';

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      setIsVisible(currentScrollPos < 50 || isScrollingUp);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const MainContent = () => (
    <>
      <Introduce />
      <CountDown />
      <Info />
      <Guild />
      <Fqa />
      <Sponsor />
      <MoreInfo />
    </>
  );

  return (
    <BrowserRouter>
      <header
        style={{
          position: 'fixed',
          width: '100%',
          top: 0,
          transform: `translateY(${isVisible ? '0' : '-100%'})`,
          transition: 'transform 500ms ease-in-out',
          touchAction: 'none',
          pointerEvents: isVisible ? 'auto' : 'none',
          overflowY: 'hidden',
        }}
      >
        <img src={LogoSvg} alt="Logo" />
        <nav>
          <Link to="https://dashboard.counterspellbusan.com">dashboard</Link>
          <Link to="/apply" className="btn">
            apply now
          </Link>
        </nav>
      </header>

      <main style={{ marginTop: '80px' }}> {/* Add marginTop to ensure main content is not hidden behind the header */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/main-content" element={<MainContent />} />
          <Route path="/apply" element={<HackathonFormPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/presskit" element={<meta httpEquiv="refresh" content="0; url=https://go.paulkim.me/csb_presskit"/>} />
          <Route path="/poster" element={ <Poster/> } />
          <Route path="/contest-countdown" element={ <CountDown2/> } />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;