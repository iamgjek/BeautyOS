// 指定預約
const api = (request) => ({ ...BookingV2Input }) => {
  const variables = JSON.stringify({ input: { ...BookingV2Input } });
  const query = `
  mutation bookingV2($input: BookingV2Input! ){
    bookingV2(input: $input){
      id
      status
      timeCost
      isBookingCostUsing
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
