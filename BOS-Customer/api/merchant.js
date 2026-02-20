import api from './index.js'

// 搜尋客戶去過的所有門市
export const getAllMerchants = (keyword = '') => {
  const query = `
    query {
      getAllMerchants(keyword: "${keyword}") {
        id,
        name,
        address,
        availableBookingTime{
          time
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
// 搜尋單一門市
export const getMerchant = (storeId = '') => {
  const query = `
    query {
      getMerchant(storeId: "${storeId}") {
        id,
        name,
        availableBookingTime{
          time
        },
        address
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
// 搜尋門市可預約設計師
export const customerGetMerchantDesigners = (id = '') => {
  const query = `
    query {
      customerGetMerchantDesigners(storeId: "${id}") {
        id,
        name,
        nickName,
        avatar,
        nameForCustomerSide
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
// 變更喜好門市
export const updateCustomerCuttentMerchant = (storeId) => {
  const query = `
    mutation {
      updateCustomerCuttentMerchant(storeId: "${storeId}") {
        id,
        name,
        availableBookingTime{
          time
        },
        address
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
// 變更喜好設計師
export const updateCustomerPreferDesigner = (designerId, storeId) => {
  console.log(designerId);
  let query = "";
  if (designerId !== "") {
    query = `
    mutation {
      updateCustomerPreferDesigner(input: {
        designerId: "${designerId}",
        storeId: "${storeId}"
      })
    }
    `
  } else {
    query = `
    mutation {
      updateCustomerPreferDesigner(input: {
        storeId: "${storeId}"
      })
    }
    `
  }

  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}
// 取得喜好門市、設計師、所有門市
export const customerGetCurrentMerchantSetting = () => {
  const query = `
    query {
      customerGetCurrentMerchantSetting {
        currentMerchant{
          id,
          name,
          availableBookingTime{
            time
          },
          address
          shopURL
          rankingURL
        },
        preferDesigner{
          id,
          name,
          nickName,
          avatar
        },
        consumedMerchants{
          id,
          name,
          availableBookingTime{
            time
          },
          address
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
