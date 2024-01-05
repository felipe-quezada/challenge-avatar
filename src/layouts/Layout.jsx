import { Outlet } from 'react-router-dom';
import { Navbar, SearchPokemon } from '../components';

export const Layout = () => {
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
