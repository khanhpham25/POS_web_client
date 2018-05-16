import asyncComponent from 'components/async_component';

const AsyncHome = asyncComponent(() => import('views/Hello'));
const AsyncProduct = asyncComponent(() => import('views/Product'));

const dashboardRoutes = [
  {
    path: '/',
    exact: true,
    component: AsyncHome
  },
  {
    path: '/products',
    component: AsyncProduct
  }
];

export default dashboardRoutes;
// ,
// { redirect: true, path: '/', to: '/hello' }
