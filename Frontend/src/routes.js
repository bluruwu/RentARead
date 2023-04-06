import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Bills from './pages/Bills';
import Customer from './pages/Customer';
import Cliente from './pages/Cliente';
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
        { element: <Navigate to="/dashboard/user" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'bills', element: <Bills/>},
        { path: 'customers', element: <Customer/>},
        { path: 'cliente', element: <Cliente/>},
        { path: 'payment', element: <Payment/>},
        { path: 'onlinepayment', element: <PaymentPage/>},
        { path: 'publicityRegistry', element: <PublicityRegistry/>},
        
        
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
      element: <HomePage/>
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
      element: <Register/>
    },
    {
      path: '/propertyRegister',
      element: <PropertyRegistry/>
    },
    {
      path: 'edituser',
      element: <EditUser/>
    },
    {
      path: 'book',
      element: <InterfaceBook/>
    },
   

  ]);

  return routes;
}
