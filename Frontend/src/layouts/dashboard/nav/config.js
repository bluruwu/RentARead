// component
import SvgColor from '../../../components/svg-color';
import account from '../../../_mock/account';
// ----------------------------------------------------------------------
const icon = (name) => <SvgColor src={`/static/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const navConfig = [
  {
    title: 'Libros Disponibles',
    path: '/dashboard/inicio',
    icon: icon('books2'),
  },
  {
    title: 'Mapa de Libros',
    path: '/dashboard/mapa',
    icon: icon('near_me'),
  },
  {
    title: 'Mis Libros',
    path: '/dashboard/disponibles',
    icon: icon('books2'),
  },
  {
    title: 'Mis Compras',
    path: '/dashboard/miscompras',
    icon: icon('shopping_cart'),
  },
  {
    title: 'Mis Ventas',
    path: '/dashboard/misventas',
    icon: icon('receipt'),
  },
  {
    title: 'Mi Perfil',
    path: '/dashboard/perfil',
    icon: icon('ic_profile'),
  },

  {
    title: 'Solicitudes de intercambios',
    path: '/dashboard/avisos',
    icon: icon('inter'),
  },
];

export default navConfig;
