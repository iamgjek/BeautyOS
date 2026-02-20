// 登入
const api = (request) => ({ orderId }) => {
  const variables = JSON.stringify({ orderId });
  const query = `
  query order($orderId:ID!){
    order(orderId:$orderId){
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
