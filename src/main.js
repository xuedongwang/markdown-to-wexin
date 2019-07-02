import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import router from './router';
import store from './store';
import filters from '@/common/filters';
import http from './utils/fetch';
import './assets/scss/main.scss';
import 'element-ui/lib/theme-chalk/index.css';
import VueDrawer from 'vue-drawer-component';
import 'vue-drawer-component/src/index.css';

Vue.component(VueDrawer.name, VueDrawer);
Vue.use(ElementUI);
Vue.use(filters);
Vue.use(http);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
});
