import asyncComponent from 'components/async_component';

const AsyncHome = asyncComponent(() => import('views/Hello'));
const AsyncProduct = asyncComponent(() => import('views/Product'));
const AsyncCustomer = asyncComponent(() => import('views/Customer'));

const dashboardRoutes = [
  {
    path: '/',
    exact: true,
    component: AsyncHome
  },
  {
    path: '/products',
    component: AsyncProduct
  },
  {
    path: '/customers',
    component: AsyncCustomer
  }
];

export default dashboardRoutes;
// ,
// { redirect: true, path: '/', to: '/hello' }
