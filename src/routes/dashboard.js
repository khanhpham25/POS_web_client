import asyncComponent from 'components/async_component';

const AsyncHome = asyncComponent(() => import('views/Hello'));

const dashboardRoutes = [
  {
    path: '/',
    component: AsyncHome
  }
];

export default dashboardRoutes;
// ,
// { redirect: true, path: '/', to: '/hello' }
