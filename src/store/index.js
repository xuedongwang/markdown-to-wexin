import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import state from './state';

Vue.use(Vuex);

const isDev = process.env.NODE_ENV !== 'development';

// const needSaveStateName = [
//   'currentArticle',
//   'userStyleConfig'
// ];

// const saveStateToLocalStorage = store => {
//   // 当 store 初始化后调用
//   store.subscribe((mutation, state) => {
//     needSaveStateName.forEach(stateName => {
//       if (Object.keys(state).includes(stateName)) {
//         localStorage.setItem(stateName, typeof mutation.payload === 'string' ? mutation.payload : JSON.stringify(mutation.payload));
//       }
//     });
//   });
// };

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: isDev,
  plugins: isDev ? [createLogger()] : []
});
