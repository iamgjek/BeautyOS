// 新增設計師預約項目類別
const api = (request) => (name) => {
  const variables = JSON.stringify(name);
  const query = `
    mutation createBookingItemCategory($name:String!){
        createBookingItemCategory (name:$name)
      }
    `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
