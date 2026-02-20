import api from './index.js'

// 取得所有預約記錄
export const getAllCustomerReservationRecords = (needKey, pageLimt = 20) => {
  const query = `
    query {
      getCustomerReservationRecords(input: {
        merchantIds: [],
        reservationType: [],
        pageLimit: ${pageLimt},
        pageOffset: 0
      }) {
        orders{${needKey}}
      }
    }
  `

  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
// 取得待審核預約記錄
export const getNotDoneCustomerReservationRecords = (needKey, page = 0) => {
  const query = `
    query {
      getCustomerReservationRecords(input: {
        merchantIds: [],
        reservationType: [ACCEPTED, PENDING],
        pageLimit: 20,
        pageOffset: ${page}
      }) {
        totalCount,
        pageOffset,
        orders{${needKey}}
      }
    }
  `

  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
// 取得已結束預約記錄
export const getDoneCustomerReservationRecords = (needKey, page = 0) => {
  const query = `
    query {
      getCustomerReservationRecords(input: {
        merchantIds: [],
        reservationType: [CANCELED, DONE,ACCEPTEDOUTDATED,PENDINGOUTDATED],
        pageLimit: 20,
        pageOffset: ${page}
      }) {
        totalCount,
        pageOffset,
        orders{${needKey}}
      }
    }
  `

  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
// 取消預約
export const customerCancelReservation = (orderId = '') => {
  const query = `
    mutation {
      customerCancelReservation(orderId: "${orderId}")
    }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}