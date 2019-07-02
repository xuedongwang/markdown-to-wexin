import { SAVE_CURRENT_ARTICLE, SAVE_STYLE_CONFIG } from './mutation-types';
const mutations = {
  [SAVE_STYLE_CONFIG] (state, payload) {
    state.userStyleConfig = payload.userStyleConfig;
  },
  [SAVE_CURRENT_ARTICLE] (state, payload) {
    state.currentArticle = payload;
  }
};

export default mutations;
