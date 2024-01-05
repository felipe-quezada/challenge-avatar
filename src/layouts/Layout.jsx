import { Outlet, useLocation } from 'react-router-dom';
import { Navbar, SearchPokemon } from '../components';
import { useEffect } from 'react';

export const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="bg-white">
      <header className="container m-auto text-white">
        <Navbar />
      </header>

      <main className="container m-auto my-8">
        <div className="text-center">
          <SearchPokemon />
        </div>
        <Outlet />
      </main>
    </section>
  );
};
