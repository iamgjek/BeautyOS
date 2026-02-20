import api from './index.js'

// 取得消費紀錄
export const getCustomerConsumptionRecords = (page = 0) => {
  const query = `
    query {
      getCustomerConsumptionRecords(input: {
        merchantIds: [],
        pageLimit: 20,
        pageOffset: ${page}
      }) {
        pageOffset,
        totalCount,
        orders {
          no,
          date,
          designer{name, nickName, nameForCustomerSide},
          isDesignate,
          serviceFakeTotal,
          productFakeTotal,
          ticketSellIntoPerformance,
          ticketSellNotIntoPerformance,
          useTicketTotal,
          membershipFakeTotal,
          businessCash
        }
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
