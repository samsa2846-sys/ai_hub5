import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { FactoryDetail } from './pages/FactoryDetail';
import { RFQ } from './pages/RFQ';
import { Chats } from './pages/Chats';
import { Deals } from './pages/Deals';
import { Profile } from './pages/Profile';
import { Favorites } from './pages/Favorites';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import { NotFound } from './pages/NotFound';

function routerBasename(): string | undefined {
  const base = import.meta.env.BASE_URL;
  if (!base || base === '/') return undefined;
  return base.endsWith('/') ? base.slice(0, -1) : base;
}

const basename = routerBasename();

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: 'catalog', Component: Catalog },
        { path: 'factory/:id', Component: FactoryDetail },
        { path: 'rfq', Component: RFQ },
        { path: 'chats', Component: Chats },
        { path: 'deals', Component: Deals },
        { path: 'profile', Component: Profile },
        { path: 'favorites', Component: Favorites },
        { path: 'settings', Component: Settings },
        { path: 'help', Component: Help },
        { path: '*', Component: NotFound },
      ],
    },
  ],
  basename ? { basename } : {},
);
