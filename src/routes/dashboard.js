import asyncComponent from 'components/async_component';

const AsyncHome = asyncComponent(() => import('views/Hello'));
const AsyncProduct = asyncComponent(() => import('views/Product'));
const AsyncInventoryNote = asyncComponent(() => import('views/InventoryNote'));
const AsyncInventoryCheck = asyncComponent(() => import('views/InventoryCheck'));
const AsyncCustomer = asyncComponent(() => import('views/Customer'));
const AsyncProvider = asyncComponent(() => import('views/Provider'));
const AsyncUser = asyncComponent(() => import('views/User'));
const AsyncReceipt = asyncComponent(() => import('views/Receipt'));

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
    path: '/inventory-notes',
    component: AsyncInventoryNote
  },
  {
    path: '/inventory-check',
    component: AsyncInventoryCheck
  },
  {
    path: '/customers',
    component: AsyncCustomer
  },
  {
    path: '/providers',
    component: AsyncProvider
  },
  {
    path: '/users',
    component: AsyncUser
  },
  {
    path: '/receipts',
    component: AsyncReceipt
  }
];

export default dashboardRoutes;
// ,
// { redirect: true, path: '/', to: '/hello' }
