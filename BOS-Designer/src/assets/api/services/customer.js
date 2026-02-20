// 登入
const api = (request) => ({ id }) => {
  const variables = JSON.stringify({ id });
  const query = `
  query customer($id:ID){
    customer(id:$id){
      id
      name
      cellphone
      nickName
      email
      lineId
      address
      lineId
      source
      gender
      birthday {
        year
        month
        day
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
