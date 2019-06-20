export default [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/pages/home'),
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'NotFound',
    path: '/404',
    component: () => import('@/404'),
    meta: {
      keepAlive: false
    }
  }
];
