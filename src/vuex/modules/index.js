import * as types from '../types'
import * as api from './api';
import axios from 'axios'

const state = {
  direction: 'forward',

}

const getters = {
  TXData:state => {
    return state.TXData
  },
  [types.DONE_INDEX_CAROUSEL]: state => {
    return state.bannerList
  }
};

const mutations = {
  // 更新路由方向
  [types.UPDATE_DIRECTION](state,payload) {
    state.direction = payload.direction
  },
}

const actions = {
  [types.SAVE_TIME_SHOW]({commit}, all) {
      commit(types.SAVE_TIME_SHOW,all);
  },
  setModuleStatus({commit}, status) {
    commit(types.SET_MODULE_STATUS, status)
  },
  // 获取首页轮播图
  [types.GET_CAROUSEL]() {
    return new Promise((resolve, reject) => {
      api.getCarousel().then((data) => {
        Promise.resolve(data).then(function (value) {
          state.bannerList = value.splice(6, 4)
        }, function (value) {
          // 不会被调用
        });
      }).catch((err) => {
        reject(err);
      });
    });
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
