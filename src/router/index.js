import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../App.vue')
  },
  {
    path: '/produto/:id',
    name: 'product-detail',
    component: () => import('../views/ProductDetail.vue'),
    props: true
  },
  {
    path: '/sobre',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contato',
    name: 'contact',
    component: () => import('../views/Contact.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;


