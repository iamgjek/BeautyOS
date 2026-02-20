// 新增設計師預約項目類別排序
const api = (request) => (input) => {
  const variables = JSON.stringify(input);
  const query = `
  mutation updateBookingItemCategorySorting($input: [ID]!){
    updateBookingItemCategorySorting(input:$input)
  }
          `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
