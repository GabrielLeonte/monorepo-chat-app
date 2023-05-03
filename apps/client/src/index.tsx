import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Index from './pages/Index';

import UnprotectedPage from './layout/UnprotectedPage';
import ProtectedPage from './layout/ProtectedPage';

import '@fontsource/rubik';
import './style.scss';

// in a dedicated environment I would fetch the channels first and then navigate to the first global one
// but this is supposed to be bare minimum
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/channel/1" />,
  },
  {
    path: '/channel',
    element: <Navigate to="/channel/1" />,
  },
  {
    path: '/channel/:channelId',
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
