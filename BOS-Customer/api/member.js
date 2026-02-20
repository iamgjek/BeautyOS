import api from './index.js'

// 取得驗證碼
export const customerLoginSMSWithTKN = (phone) => {
  const query = `
    mutation {
      customerLoginSMSWithTKN(
        cellphone: "${phone}",
        isDevMode: ${Boolean(process.env.VUE_DEV_MODE)}
      )
    }
  `

  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
// 驗證簡訊驗證碼
export const customerVerifySMSWithTKN = (inputData, needKey) => {
  const query = `
    mutation {
      customerVerifySMSWithTKN(input: {
        cellphone: "${inputData.cellphone}",
        code: "${inputData.code}"
      },
      isDevMode: ${Boolean(process.env.VUE_DEV_MODE)}
      ){
        ${needKey}
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
// 取得會員資料
export const getCustomerPersonalData = (needKey) => {
  const query = `
    query {
      getCustomerPersonalData{
        ${needKey}
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
// 修改會員資料
export const customerSelfUpdate = (inputData, needKey) => {
  const query = `
    mutation {
      customerSelfUpdate(input: {
        name: "${inputData.name}",
        nickName: "${inputData.nickName}",
        gender: ${inputData.gender},
        email: "${inputData.email}",
        lineId: "${inputData.lineId}",
        birthday: ${inputData.birthday},
        address: "${inputData.address}"
      }){
        ${needKey}
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

// 修改會員資料
export const applyCustomerPersoanlDataToMerchant = (inputData) => {
  const query = `
    mutation {
      applyCustomerPersoanlDataToMerchant(merchantId: "${inputData.merchantId}")
    }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
// 取得會員卡片
export const customerMembershipRecord = (storeId) => {
  const query = `
  query {
    customerMembershipRecord(storeId: "${storeId}") {
      unExpired {
        merchantId,
        merchantname,
        membershipName,
        membershipImage,
        membershipComment,
        membershipTextCoclor,
        expiryDate
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