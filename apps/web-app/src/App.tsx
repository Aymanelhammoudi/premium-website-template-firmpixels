import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));

function App(): React.ReactElement {
  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <div className="app-shell min-h-screen bg-[#04060f] text-[var(--text-primary)]">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050914]/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 lg:px-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300/90 font-black text-slate-950">F</span>
              <span className="text-sm font-semibold tracking-[0.06em] text-cyan-100">FIRMPIXELS REDESIGN</span>
            </Link>

            <nav className="flex items-center gap-2 text-sm text-slate-200">
              <a href="#pakketten" className="rounded-md px-3 py-2 hover:bg-white/10">Pakketten</a>
              <a href="#contact" className="rounded-md px-3 py-2 hover:bg-white/10">Contact</a>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-screen-2xl px-4 py-6 md:py-8 lg:px-8">
          <Suspense
            fallback={
              <div className="flex min-h-[40vh] items-center justify-center text-sm text-[var(--text-muted)]">
                Laden...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
