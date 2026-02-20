// 取得跑馬燈
const api = (request) => () => {
  const variables = JSON.stringify({});
  const query = `
  query{
    getMerchantNewsTicker
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
