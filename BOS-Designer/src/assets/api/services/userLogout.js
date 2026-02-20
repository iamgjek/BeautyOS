// 登入
const api = (request) => () => {
  const variables = JSON.stringify({});
  const query = `
  mutation userLogout{
    userLogout
  }`;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
