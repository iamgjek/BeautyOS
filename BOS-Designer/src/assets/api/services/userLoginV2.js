// 登入
const api = (request) => ({ ...UserLoginInput }) => {
  const variables = JSON.stringify({ input: { ...UserLoginInput } });
  const query = `
  mutation UserLoginV2($input: UserLoginInput!){
    userLoginV2(input:$input){
      user{
        name
        id
        lineAccountId
        merchants{
          id
          name
        }
      }
      token
      officialBrandMerchantId
      officialBrandMerchantName
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
