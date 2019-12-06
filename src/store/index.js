import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    collapse: false,
    dataRefresh: false,
    userId: 0,
    currentDeviceId: '',
    deviceList: [],
    elementInfo: [],
    relayInfo: [],
    deviceInfo: {},
    language: 'zh_CN',
  },
  mutations: {
    language(state, payload) {
      state.language = payload.language;
    },
    collapse(state) { // 改变收缩状态
      state.collapse = !state.collapse;
    },
    deviceList(state, payload) {
      state.deviceList = payload.deviceList;
    },
    elementInfo(state, payload) {
      state.elementInfo = payload.elementInfo;
    },
    relayInfo(state, payload) {
      state.relayInfo = payload.relayInfo;
    },
    deviceInfo(state, payload) {
      state.deviceInfo = payload.deviceInfo;
    },
    currentDeviceId(state, payload) {
      state.currentDeviceId = payload.currentDeviceId;
    },
    userId(state, payload) {
      state.userId = payload.userId;
    },
    dataRefresh(state, payload) {
      state.dataRefresh = payload.dataRefresh;
    },
    reset(state) {
      state = {};
      console.log(state);
    },
  },
});

export default store;
