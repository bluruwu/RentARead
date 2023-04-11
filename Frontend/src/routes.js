import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Inicio from './pages/Inicio';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Mapa from './pages/Mapa';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import MisCompras from './pages/MisCompras';
import MisVentas from './pages/MisVentas';
import Perfil from './pages/Perfil';
import Payment from './pages/Payment';
import PaymentPage from './pages/PaymentPage';
import PropertyRegistry from './pages/PropertyRegistry';
import PublicityRegistry from './pages/PublicityRegistry';
import MapView from './pages/MapView';
import EditUser from './pages/EditUser';
import InterfaceBook from './pages/InterfaceBook';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/inicio" />, index: true },
        { path: 'mapa', element: <Mapa /> },
        { path: 'inicio', element: <Inicio /> },
        { path: 'miscompras', element: <MisCompras /> },
        { path: 'misventas', element: <MisVentas /> },
        { path: 'perfil', element: <Perfil /> },
        { path: 'payment', element: <Payment /> },
        { path: 'onlinepayment', element: <PaymentPage /> },
        { path: 'publicityRegistry', element: <PublicityRegistry /> },
        { path: 'book', element: <InterfaceBook /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'map',
      element: <MapView />,
    },
    {
      path: '/home',
      element: <HomePage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/propertyRegister',
      element: <PropertyRegistry />,
    },
    {
      path: 'edituser',
      element: <EditUser />,
    },
    {
      path: 'book',
      element: <InterfaceBook />,
    },
  ]);

  return routes;
}
