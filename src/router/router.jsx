import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <h1>Main page</h1>,
      },
      {
        path: 'character',
        element: <h1>character page</h1>,
      },
    ],
  },
]);
