// 取得跑馬燈
const api = (request) => () => {
  const variables = JSON.stringify({});
  const query = `
  query{
    getIsDisplayAllOrderForCellphone
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
