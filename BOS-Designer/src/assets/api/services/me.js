// 取得權限
const api = (request) => () => {
  const variables = JSON.stringify({});
  const query = `
  query {
    me{
      lineAccountId
      firstName
      lastName
      nickName
      gender
      birthday
      merchantIdentity{
        authorityName
        authorityId
      }
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
