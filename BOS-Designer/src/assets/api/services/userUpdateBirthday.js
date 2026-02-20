// 設計師編輯生日
const api = (request) => (input) => {
  const variables = JSON.stringify(input);
  const query = `
  mutation userUpdateBirthday($birthday: DateTime!){
    userUpdateBirthday(birthday:$birthday)
  }
            `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
