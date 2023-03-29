// component
import SvgColor from '../../../components/svg-color';
import account from '../../../_mock/account';
// ----------------------------------------------------------------------
const icon = (name) => <SvgColor src={`/static/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const navConfig = [
  {
    title: 'Libros Cercanos',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Libros Disponibles',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Recomendaciones',
    path: '/dashboard/bills',
    icon: icon('ic_bills'),
  },
  {
    title: 'Mis Datos',
    path: '/dashboard/cliente',
    icon: icon('ic_profile'),
  },
  {
    title: 'Mis Libros',
    path: '/dashboard/customers',
    icon: icon('ic_customers'),
  },
  {
    title: '',
    path: '/dashboard/publicityRegistry',
    icon: icon('ic_blog'),
  },
  /* {
    title: 'Mapa de clientes',
    path: '/dashboard/map',
    icon: icon('ic_customers'),
  }, */
  /* {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  }, */
  /* {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  }, */
  /* {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  }, */
  /* {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  }, */
];

export default navConfig;
