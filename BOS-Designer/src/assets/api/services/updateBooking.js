// 指定預約
const api = (request) => ({ ...updateBooking }) => {
  const variables = JSON.stringify({ input: { ...updateBooking } });
  const query = `
  mutation updateBooking($input: BookingUpdateInput! ){
      updateBooking(input: $input){
      id
      date
      remark
      status
      remarkForCustomer
      messageForCustomer
      isDesignate
      timeCost
      isBookingCostUsing
      merchant{
        id
        name
      }
      customer{
        id
        name
        cellphone
      }
      designer{
        id
        name
      }
      serviceOrders{
        id
        name
      }
      friends{
        customer{
          id
          name
          cellphone
        }
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
