export const state = () => ({
  time: '',
  timestamp: '',
  merchantId: '',
  merchantName: '',
  designerId: '',
  designerName: '',
  designerNickName: ''
})

export const actions = {
  handleSetDesignerAndMerchant({ commit }, data) {
    commit('setDesignerAndMerchant', data)
  },
  handleSetTime({ commit }, data) {
    commit('setTime', data)
  },
  handleClearData({ commit }) {
    commit('clearData')
  }
}

export const mutations = {
  setDesignerAndMerchant(state, data) {
    state.merchantId = data.merchantId,
    state.merchantName = data.merchantName,
    state.designerId = data.designerId,
    state.designerName = data.designerName
    state.designerNickName = data.designerNickName
  },
  setTime(state, data) {
    state.time = data.time
    state.timestamp = data.timestamp
  },
  clearData(state) {
    state.time = ''
    state.timestamp = ''
    state.merchantId = ''
    state.merchantName = ''
    state.designerId = ''
    state.designerName = ''
    state.designerNickName = ''
  }
}