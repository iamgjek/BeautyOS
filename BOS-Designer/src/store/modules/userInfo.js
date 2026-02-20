const actions = {
  SET_USER_PROFILE({ commit }, value) {
    return new Promise((resovle, reject) => {
      // 之後看要不要加密
      try {
        localStorage.setItem('ML_DESIGN', JSON.stringify(value));
        commit('UPDATE_USER_PROFILE', value);
        resovle(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  SET_USER_CURRENT_MERCHANTID({ commit }, value) {
    return new Promise((resovle, reject) => {
      // 之後看要不要加密
      try {
        const userInfo = JSON.parse(localStorage.getItem('ML_DESIGN'));
        const { currentMechantId, ...others } = userInfo;
        localStorage.setItem('ML_DESIGN', JSON.stringify({ currentMechantId: value, ...others }));
        commit('UPDATE_USER_CURRENT_MERCHANTID', value);
        resovle(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  SET_USER_AUTHORIZELIST({ commit }, value) {
    return new Promise((resovle, reject) => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('ML_DESIGN'));
        const { userAuthorizeList, ...others } = userInfo;
        localStorage.setItem('ML_DESIGN', JSON.stringify({ userAuthorizeList: value, ...others }));
        commit('UPDATE_USER_AUTHORIZELIST', value);
        resovle(true);
      } catch (err) {
        reject(err);
      }
    });
  },
};

const mutations = {
  UPDATE_USER_PROFILE(state, payload) {
    state.userInfo = payload;
  },
  UPDATE_USER_CURRENT_MERCHANTID(state, payload) {
    state.currentMechantId = payload;
  },
  UPDATE_USER_AUTHORIZELIST(state, payload) {
    state.userAuthorizeList = payload;
  },
};

const state = {
  userInfo: null,
  currentMechantId: null,
  userAuthorizeList: [],
};

const getters = {
  GETTER_MECHANTNAME(store) {
    const GETTER_MECHANTNAME = store.userInfo?.user?.merchants.find((item) => item.id === store.currentMechantId);
    return GETTER_MECHANTNAME ? GETTER_MECHANTNAME.name : '';
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
