/**
 * TODO：1、时间旅行过程中的性能问题
 *       2、点到点的简单时间旅行处理
 */

import Vuex from 'vuex';
import Vue from 'vue';
import _ from 'lodash';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    pasts: [],
    futures: [],
    present: {

    },
  },
  mutations: {
    setPresent(state, payload) {
      state.present = payload.present;
    },
    doing(state, payload) {
      const tmp = _.cloneDeep(state.present);
      state.pasts.push(tmp);
      state.futures = [];
      switch (payload.type) {
        case 'delete_hobby': {
          state.present.hobbies.splice(payload.i, 1);
          break;
        }
        case 'delete_skill': {
          state.present.skills.splice(payload.i, 1);
          break;
        }
        default: {
          state.present[payload.type] = payload.value; // 直接的赋值操作
          break;
        }
      }
    },
    undo(state) {
      if (!state.pasts.length) {
        return;
      }
      debugger;
      const tmp = _.cloneDeep(state.present);
      state.futures.push(tmp);
      state.present = state.pasts.pop();
    },
    redo(state) {
      if (!state.futures.length) {
        return;
      }
      const tmp = state.present;
      state.pasts.push(tmp);
      state.present = state.futures.pop();
    },
  },
  actions: {

  },
});

export default store;
