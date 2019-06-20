import Router from 'vue-router';
import Vue from 'vue';
import routes from './routes';

Vue.use(Router);

export default new Router({
  base: '/',
  mode: 'history', // "hash" | "history" | "abstract"
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
