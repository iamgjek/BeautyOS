// 刪除行事曆預約「事件」
const api = (request) => (input) => {
  const variables = JSON.stringify(input);
  const query = `
  mutation deleteEvent($eventId: ID!){
    deleteEvent(eventId:$eventId)
  }
        `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
