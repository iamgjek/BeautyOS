import api from './index';
export const customerBindWithLine = (code) => {
    const query = `
      mutation {
        customerBindWithLine(code:"${code}")
      }
    `
    const graphqlQuery = {
        "query": query
    }
    return api.post('graphql', graphqlQuery)
}



export const getCustomerSidePageDisplayForCellphone = (storeId) => {
  const query = `
  query {
    getCustomerSidePageDisplayForCellphone(storeId:${storeId}){
      ServiceRecord
      TicketRecord
      WalletRecord
      BonusRecord
    }
  }
  `
  const graphqlQuery = {
      "query": query
  }
  return api.post('graphql', graphqlQuery)
}