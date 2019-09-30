import { RouterOptions } from 'vue-router';

export const routesOptions: RouterOptions = {
  base: process.env.VUE_APP_EVN === 'production' ? '/pc' : '/',
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    // ...
    return { x: 0, y: 0 }
  },
};
