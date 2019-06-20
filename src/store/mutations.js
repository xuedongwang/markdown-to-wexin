import { SET_AUTHOR_NAME } from './mutationTypes';
const mutations = {
  [SET_AUTHOR_NAME] (state, payload) {
    state.author = payload;
  }
};

export default mutations;
