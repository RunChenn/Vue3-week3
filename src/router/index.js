import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // {
  //   path: '/demo',
  //   name: 'demo',
  //   component: () => import('../views/demo.vue'),
  // },
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/login.vue'),
    meta: {
      layout: 'Login',
    },
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../pages/products.vue'),
    meta: {
      layout: 'Products',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
