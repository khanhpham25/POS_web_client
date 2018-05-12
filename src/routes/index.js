import asyncComponent from 'components/async_component';

const AsyncLoginPage = asyncComponent(() => import('views/Login'));

const indexRoutes = [
  { path: '/login', component: AsyncLoginPage }
];

export default indexRoutes;
