import Vue from 'vue';
import axiosInstancePackage from './axiosInstancePackage';

import userLoginV2 from './services/userLoginV2';
import services from './services/services';
import userLogout from './services/userLogout';
import orders from './services/orders';
import order from './services/order';
import user from './services/user';
import VerifyBookingInput from './services/VerifyBookingInput ';
import bookingV2 from './services/bookingV2';
import getBookingTimes from './services/getBookingTimes';
import unspecifiedBookingTimes from './services/unspecifiedBookingTimes';
import customers from './services/customers';
import customer from './services/customer';
import getBookingItemCategory from './services/getBookingItemCategory';
import designerDailyReport from './services/designerDailyReport';
import nonDesignationBooking from './services/nonDesignationBooking';
import updateBooking from './services/updateBooking';
import me from './services/me';
import getMerchantAuthorities from './services/getMerchantAuthorities';
import dailyClockInRecord from './services/dailyClockInRecord';
import attendanceRecords from './services/attendanceRecords';
import userClockIn from './services/userClockIn';
import getDesignerBookingTimesWithRange from './services/getDesignerBookingTimesWithRange';
import adminBookingTime from './services/adminBookingTime';
import adminBookingTimeWholeDay from './services/adminBookingTimeWholeDay';
import getRegularHoliday from './services/getRegularHoliday';
import getRegularHolidaySetting from './services/getRegularHolidaySetting';
import setRegularHoliday from './services/setRegularHoliday';
import walletDepositRecord from './services/walletDepositRecord';
import walletUseRecord from './services/walletUseRecord';
import designerOrders from './services/designerOrders';
import customerWallet from './services/customerWallet';
import getUserHelperRetrieve from './services/getUserHelperRetrieve';
import customersWithoutSorting from './services/customersWithoutSorting';
import userRakeReport from './services/userRakeReport';
import getAllBookingTimesWithRange from './services/getAllBookingTimesWithRange';
import getIsMerchantScheduleDisplay from './services/getIsMerchantScheduleDisplay';
import customerCouponBalanceReport from './services/customerCouponBalanceReport';
import getIsDisplayHelperRetrieveInDailyReport from './services/getIsDisplayHelperRetrieveInDailyReport';
import getIsUsingMathRoundInDesignerDailyReport from './services/getIsUsingMathRoundInDesignerDailyReport';
import getIsZeroValueHiddenOnDailyReport from './services/getIsZeroValueHiddenOnDailyReport';
import getPriceDisplayOnDailyReportDefault from './services/getPriceDisplayOnDailyReportDefault';
import checkGPSStatus from './services/checkGPSStatus';
import setUserAvatar from './services/setUserAvatar';
import getMerchantNewsTicker from './services/getMerchantNewsTicker';
import designerPerforamnceAnalyzeReport from './services/designerPerforamnceAnalyzeReport';
import users from './services/users';
import userSalaryReport from './services/userSalaryReport';
import createBookingItemCategory from './services/createBookingItemCategory';
import updateBookingItemCategory from './services/updateBookingItemCategory';
import deleteBookingItemCategory from './services/deleteBookingItemCategory';
import createBookingItem from './services/createBookingItem';
import updateBookingItem from './services/updateBookingItem';
import deleteBookingItem from './services/deleteBookingItem';
import updateBookingItemSorting from './services/updateBookingItemSorting';
import updateBookingItemCategorySorting from './services/updateBookingItemCategorySorting';
import userBindWithLine from './services/userBindWithLine';
import createEvent from './services/createEvent';
import deleteEvent from './services/deleteEvent';
import helperDailyReport from './services/helperDailyReport';
import products from './services/products';
import productOrdersWithoutPaging from './services/productOrdersWithoutPaging';
import getIsDisplayAllOrderForCellphone from './services/getIsDisplayAllOrderForCellphone';
import userUpdateLastName from './services/userUpdateLastName';
import userUpdateFirstName from './services/userUpdateFirstName';
import userUpdateNickName from './services/userUpdateNickName';
import userUpdateGender from './services/userUpdateGender';
import userUpdateBirthday from './services/userUpdateBirthday';
import changePasswordForCellphone from './services/changePasswordForCellphone';
import getDesignerCalendar from './services/getDesignerCalendar';
import getDesignerReservation from './services/getDesignerReservation';

const axiosPackageOptions = {
  userLoginV2: userLoginV2(axiosInstancePackage),
  services: services(axiosInstancePackage),
  userLogout: userLogout(axiosInstancePackage),
  orders: orders(axiosInstancePackage),
  order: order(axiosInstancePackage),
  designerOrders: designerOrders(axiosInstancePackage),
  user: user(axiosInstancePackage),
  VerifyBookingInput: VerifyBookingInput(axiosInstancePackage),
  bookingV2: bookingV2(axiosInstancePackage),
  getBookingTimes: getBookingTimes(axiosInstancePackage),
  unspecifiedBookingTimes: unspecifiedBookingTimes(axiosInstancePackage),
  customers: customers(axiosInstancePackage),
  designerDailyReport: designerDailyReport(axiosInstancePackage),
  nonDesignationBooking: nonDesignationBooking(axiosInstancePackage),
  updateBooking: updateBooking(axiosInstancePackage),
  me: me(axiosInstancePackage),
  getMerchantAuthorities: getMerchantAuthorities(axiosInstancePackage),
  dailyClockInRecord: dailyClockInRecord(axiosInstancePackage),
  attendanceRecords: attendanceRecords(axiosInstancePackage),
  userClockIn: userClockIn(axiosInstancePackage),
  getDesignerBookingTimesWithRange: getDesignerBookingTimesWithRange(axiosInstancePackage),
  adminBookingTime: adminBookingTime(axiosInstancePackage),
  getRegularHoliday: getRegularHoliday(axiosInstancePackage),
  getRegularHolidaySetting: getRegularHolidaySetting(axiosInstancePackage),
  setRegularHoliday: setRegularHoliday(axiosInstancePackage),
  walletDepositRecord: walletDepositRecord(axiosInstancePackage),
  walletUseRecord: walletUseRecord(axiosInstancePackage),
  customerWallet: customerWallet(axiosInstancePackage),
  getUserHelperRetrieve: getUserHelperRetrieve(axiosInstancePackage),
  customersWithoutSorting: customersWithoutSorting(axiosInstancePackage),
  userRakeReport: userRakeReport(axiosInstancePackage),
  getAllBookingTimesWithRange: getAllBookingTimesWithRange(axiosInstancePackage),
  getIsMerchantScheduleDisplay: getIsMerchantScheduleDisplay(axiosInstancePackage),
  customerCouponBalanceReport: customerCouponBalanceReport(axiosInstancePackage),
  adminBookingTimeWholeDay: adminBookingTimeWholeDay(axiosInstancePackage),
  getIsDisplayHelperRetrieveInDailyReport: getIsDisplayHelperRetrieveInDailyReport(axiosInstancePackage),
  getIsUsingMathRoundInDesignerDailyReport: getIsUsingMathRoundInDesignerDailyReport(axiosInstancePackage),
  getIsZeroValueHiddenOnDailyReport: getIsZeroValueHiddenOnDailyReport(axiosInstancePackage),
  getPriceDisplayOnDailyReportDefault: getPriceDisplayOnDailyReportDefault(axiosInstancePackage),
  checkGPSStatus: checkGPSStatus(axiosInstancePackage),
  setUserAvatar: setUserAvatar(axiosInstancePackage),
  getMerchantNewsTicker: getMerchantNewsTicker(axiosInstancePackage),
  designerPerforamnceAnalyzeReport: designerPerforamnceAnalyzeReport(axiosInstancePackage),
  users: users(axiosInstancePackage),
  userSalaryReport: userSalaryReport(axiosInstancePackage),
  customer: customer(axiosInstancePackage),
  getBookingItemCategory: getBookingItemCategory(axiosInstancePackage),
  createBookingItemCategory: createBookingItemCategory(axiosInstancePackage),
  updateBookingItemCategory: updateBookingItemCategory(axiosInstancePackage),
  deleteBookingItemCategory: deleteBookingItemCategory(axiosInstancePackage),
  createBookingItem: createBookingItem(axiosInstancePackage),
  updateBookingItem: updateBookingItem(axiosInstancePackage),
  deleteBookingItem: deleteBookingItem(axiosInstancePackage),
  updateBookingItemSorting: updateBookingItemSorting(axiosInstancePackage),
  updateBookingItemCategorySorting: updateBookingItemCategorySorting(axiosInstancePackage),
  userBindWithLine: userBindWithLine(axiosInstancePackage),
  createEvent: createEvent(axiosInstancePackage),
  deleteEvent: deleteEvent(axiosInstancePackage),
  helperDailyReport: helperDailyReport(axiosInstancePackage),
  productOrdersWithoutPaging: productOrdersWithoutPaging(axiosInstancePackage),
  products: products(axiosInstancePackage),
  getIsDisplayAllOrderForCellphone: getIsDisplayAllOrderForCellphone(axiosInstancePackage),
  userUpdateLastName: userUpdateLastName(axiosInstancePackage),
  userUpdateFirstName: userUpdateFirstName(axiosInstancePackage),
  userUpdateNickName: userUpdateNickName(axiosInstancePackage),
  userUpdateGender: userUpdateGender(axiosInstancePackage),
  userUpdateBirthday: userUpdateBirthday(axiosInstancePackage),
  changePasswordForCellphone: changePasswordForCellphone(axiosInstancePackage),
  getDesignerCalendar: getDesignerCalendar(axiosInstancePackage),
  getDesignerReservation: getDesignerReservation(axiosInstancePackage),
};

const axiosPackage = {
  install: () => { Vue.prototype.$api = axiosPackageOptions; },
};

Vue.use(axiosPackage);
