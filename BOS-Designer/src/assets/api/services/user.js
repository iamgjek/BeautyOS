// 查詢個人資訊
const api = (request) => ({ id }) => {
  const variables = JSON.stringify({ input: { id } });
  const query = `
    query user($input: UserInput){
      user(input:$input){
        avatar
        lineAccountId
        firstName
        lastName
        nickName
        gender
        birthday
        merchants {
          id
          name
          openingHours
          closingHours
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
