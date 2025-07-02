import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { initTelegram } from './tg';
import Welcome from './pages/Welcome';
import Buy from './pages/Buy';
import Gift from './pages/Gift';
import Success from './pages/Success';
import './index.css';

export default function App() {
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/gift" element={<Gift />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}
