import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import { getAuthCookie } from '@/stores/auth';
import HomeViewVue from '@/views/HomeView.vue';

function requireAuth(to: RouteLocationNormalized) {
  const { name } = to;
  const redirect = { name: 'home', query: { loginRequired: name ? String(name) : 'true' } };

  try {
    // @ts-expect-error this is added by vue-cookies
    const maybeCookie = getAuthCookie(window.$cookies);
    if (maybeCookie) {
      return true;
    }
    return redirect;
  } catch (e) {
    return redirect;
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeViewVue,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/exchange_token',
    name: 'oauth',
    component: () => import('@/views/ExchangeOAuthToken.vue'),
  },
  {
    path: '/activities',
    name: 'activities',
    component: () => import('@/views/ActivitiesView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/activities/:id',
    name: 'activity',
    component: () => import('@/views/ActivityView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/plan',
    name: 'plan',
    component: () => import('@/views/PlanView.vue'),
    beforeEnter: requireAuth,
  },
];

export function routeNameToTitle(name: Symbol | string | null | undefined) {
  switch (name) {
    case 'activity':
      return 'Activity';
    case 'activities':
      return 'Activities';
    case 'plan':
      return 'Plan';
    case 'about':
      return 'About';
    default:
      return null;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
