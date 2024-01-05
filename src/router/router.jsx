import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { HomePage, PokemonPage, SearchPage } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'pokemon/:id',
        element: <PokemonPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);
