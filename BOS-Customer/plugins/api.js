import Vue from 'vue'
import {
  customerLoginSMSWithTKN,
  customerVerifySMSWithTKN,
  getCustomerPersonalData,
  customerSelfUpdate,
  applyCustomerPersoanlDataToMerchant,
  customerMembershipRecord
 } from '@/api/member.js'

 import {
  getAllCustomerReservationRecords,
  getNotDoneCustomerReservationRecords,
  getDoneCustomerReservationRecords,
  customerCancelReservation
 } from '@/api/appointmentRecord.js'

 import {
  getCustomerConsumptionRecords
 } from '@/api/consumption.js'

 import {
  customerCouponBalanceReport
 } from '@/api/ticket.js'

 import {
  customerWalletRecords,
  customerBonusRecords
 } from '@/api/addValue.js'

 import {
  getAllMerchants,
  getMerchant,
  customerGetMerchantDesigners,
  updateCustomerCuttentMerchant,
  updateCustomerPreferDesigner,
  customerGetCurrentMerchantSetting
 } from '@/api/merchant.js'

 import {
  getDesignerBookingTimesWithRange,
  getBookingItemCategoryForCustomer,
  bookingV2,
  nonDesignationBooking,
  getCustomerReference
 } from '@/api/appointment.js'
 
 import {customerBindWithLine,getCustomerSidePageDisplayForCellphone} from '@/api/bindingLine';

export default({ redirect, store }, inject) => {
  const api = {
    customerLoginSMSWithTKN,
    customerVerifySMSWithTKN,
    getCustomerPersonalData,
    customerSelfUpdate,
    applyCustomerPersoanlDataToMerchant,
    getAllCustomerReservationRecords,
    getNotDoneCustomerReservationRecords,
    getDoneCustomerReservationRecords,
    customerCancelReservation,
    getCustomerConsumptionRecords,
    customerCouponBalanceReport,
    customerWalletRecords,
    customerBonusRecords,
    customerMembershipRecord,
    getAllMerchants,
    getMerchant,
    customerGetMerchantDesigners,
    updateCustomerCuttentMerchant,
    updateCustomerPreferDesigner,
    customerGetCurrentMerchantSetting,
    getDesignerBookingTimesWithRange,
    getBookingItemCategoryForCustomer,
    bookingV2,
    nonDesignationBooking,
    getCustomerReference,
    customerBindWithLine,
    getCustomerSidePageDisplayForCellphone
  }

  Vue.prototype.api = api
  Vue.prototype.redirect = redirect
  Vue.prototype.store = store

  inject('api', api)

}