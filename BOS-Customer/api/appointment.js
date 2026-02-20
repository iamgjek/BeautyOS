import api from './index.js'

// 取得設計師可預約時間
export const getDesignerBookingTimesWithRange = (input) => {
  const query = `
    query {
      getDesignerBookingTimesWithRange(input: {
        designerId: "${input.designerId}",
        storeId: "${input.storeId}",
        dateRange: {
          startDate: ${input.dateRange.startDate},
          endDate: ${input.dateRange.endDate}
        }
      }){
        date,
        isRegularHoliday,
        bookingTimes{
          time,
          status
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
// 取得設計師服務項目
export const getBookingItemCategoryForCustomer = (input) => {
  const query = `
    query {
      getBookingItemCategoryForCustomer(input: {
        designerId: "${input.designerId}",
        storeId: "${input.storeId}"
      }) {
        id,
        sort,
        name,
        bookingItem{
          id,
          sort,
          name,
          lowestPrice,
          highestPrice
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
// 預約(指定)
export const bookingV2 = (input) => {
  const query = `
    mutation {
      bookingV2(input: {
        designerId: "${input.designerId}",
        dateTime: ${input.dateTime},
        cellphone: "${input.cellphone}",
        merchantId: "${input.merchantId}",
        name: "${input.name}",
        reference: "${input.reference}",
        remarkForCustomer: "${input.remarkForCustomer}",
        designerServiceIds: [${input.designerServiceIds}]
      }) {
        id,
        date,
        status,
        designer{
          nameForCustomerSide
        },
        remarkForCustomer
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
// 預約(不指定)
export const nonDesignationBooking = (input) => {
  const query = `
    mutation {
      nonDesignationBooking(input: {
        bookingDate: ${input.bookingDate},
        cellphone: "${input.cellphone}",
        customerName: "${input.customerName}",
        storeId: "${input.storeId}",
        remarkForCustomer: "${input.remarkForCustomer}"
      }) {
          id,
          date,
          status,
          designer{
            name
          },
          remarkForCustomer
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
// 取得客戶來源
export const getCustomerReference = () => {
  const query = `
    query {
      getCustomerReference
    }
  `
  const variables = {}

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}