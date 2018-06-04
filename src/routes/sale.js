import asyncComponent from 'components/async_component';

const AsyncSaleScreen = asyncComponent(() => import('views/Sale'));

const saleRoutes = [
  { path: '/sale', component: AsyncSaleScreen }
];

export default saleRoutes;
