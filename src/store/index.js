import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createLogger from 'vuex/dist/logger';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import state from './state';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [createPersistedState({
    key: 'data',
    reducer (state) {
      const needSaveStateName = ['author'];
      const needSaveState = {};
      for (let key in state) {
        if (needSaveStateName.includes(key)) {
          needSaveState[key] = state[key];
        }
      }
      return needSaveState;
    }
  }), debug && createLogger()]
});
