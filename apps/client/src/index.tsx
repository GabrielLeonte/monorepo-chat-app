import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './components/pages/Login';
import Index from './components/pages/Index';

import UnprotectedPage from './components/layout/UnprotectedPage';
import ProtectedPage from './components/layout/ProtectedPage';

import '@fontsource/rubik';
import './style.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedPage children={<Index />} />,
  },
  {
    path: '/login',
    element: <UnprotectedPage children={<Login />} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
