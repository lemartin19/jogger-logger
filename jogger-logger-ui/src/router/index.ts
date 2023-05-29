import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { getIsAuthed } from '@/stores/auth';

function requireAuth() {
  try {
    // @ts-expect-error this is added by vue-cookies
    const maybeCookie = getIsAuthed(window.$cookies);
    if (maybeCookie) {
      return true;
    }
  } catch (e) {
    // handled in finally
  } finally {
    return { name: '/login' };
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/exchange_token',
      name: 'oauth',
      component: () => import('../views/ExchangeOAuthToken.vue'),
    },
    {
      path: '/activities',
      name: 'activities',
      component: () => import('../views/ActivitiesView.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('../views/PlanView.vue'),
      beforeEnter: requireAuth,
    },
  ],
});

export default router;
