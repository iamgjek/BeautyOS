// 設計師編輯姓
const api = (request) => (input) => {
  const variables = JSON.stringify(input);
  const query = `
  mutation userUpdateLastName($lastName: String){
    userUpdateLastName(lastName:$lastName)
  }
            `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
