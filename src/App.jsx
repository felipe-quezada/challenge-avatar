import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { PokemonProvider } from './context/PokemonProvider';

export const App = () => {
  return (
    <PokemonProvider>
      <RouterProvider router={router} />
    </PokemonProvider>
  );
};
