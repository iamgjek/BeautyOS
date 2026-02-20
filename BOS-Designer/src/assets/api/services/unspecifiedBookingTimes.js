//
const api = (request) => ({ ...UnspecifiedBookingTimesInput }) => {
  const variables = JSON.stringify({ input: { ...UnspecifiedBookingTimesInput } });
  const query = `
  query unspecifiedBookingTimes($input: UnspecifiedBookingTimesInput!){
    unspecifiedBookingTimes(input:$input) {
      status
      time
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
