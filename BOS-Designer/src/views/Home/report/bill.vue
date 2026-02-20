<template>
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'Report' }"></C-Back-Nav>
    <section class="relative p-4">
      <div class="mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">帳單列表</h1>
      </div>
      <div class="flex items-center gap-2 px-4">
        <p>日期：</p>
        <vc-date-picker
          @input="getOrders()"
          v-model="searchDate"
          mode="date"
          :model-config="modelConfig"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <input
              :placeholder="$dayjs(reviewResult.currentDate).format('YYYY/MM/DD')"
              class="w-[150px] rounded border border-ml/20 px-2 py-1 placeholder:text-gray focus:outline-none"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </vc-date-picker>
      </div>

      <div class="text-left text-sm">
        <!-- <div class="my-4 flex items-center justify-between">
          <div class="flex items-baseline">
            <p class="mr-1 text-[24px] font-bold">{{ showYear }}年</p>
            <p>{{ showMonth }}月</p>
          </div>
          <div>
            <p>設計師 {{ userInfo.user.name }}</p>
          </div>
        </div> -->

        <div class="my-4 flex items-center justify-between px-4 text-primary">
          <p class="text-[16px]">{{ showYear }}年/{{ showMonth }}月</p>
          <p>設計師 {{ userInfo.user.name }}</p>
        </div>
        <!-- <div v-if="isReviewResult">
          <div v-for="(reviewItem, index) in reviewResult" :key="`reviewItem${index}`" class="mb-1 flex cursor-pointer items-center justify-between border-b border-solid border-primary/50 py-1 ">
            <div class="w-2/12 pl-1">{{+index+1 > 10 ? +index+1 :`0${+index+1}`}}</div>
            <div class="w-7/12">{{reviewItem.label}}</div>
            <div class="w-3/12 text-right">${{reviewItem.price}}</div>
          </div>
        </div> -->
        <!-- <div class="mt-3 flex items-baseline justify-between text-second">
          <p>總應領薪資</p>
          <p class="text-[28px]">${{totalCount(reviewResult)}}</p>
        </div> -->

        <!-- 上方資訊 -->
        <ul
          v-if="reviewResult.intervalSummary && reviewResult.orders.length > 0"
          class="grid grid-cols-12 gap-2 rounded-[20px] bg-white px-[1rem] py-[2rem] font-sans font-normal text-primary"
        >
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>服務消費</p>
            <p class="text-lg font-bold">{{ reviewResult.intervalSummary.service }}</p>
          </li>
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>店販消費</p>
            <p class="text-lg font-bold">{{ reviewResult.intervalSummary.product }}</p>
          </li>
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>卡券使用(入業績)</p>
            <p class="text-lg font-bold">{{ reviewResult.intervalSummary.usedTicket }}</p>
          </li>
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>卡券販賣(入業績)</p>
            <p class="text-lg font-bold">
              {{ reviewResult.intervalSummary.ticketSellIntoPerformance }}
            </p>
          </li>
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>業績收入</p>
            <p class="text-lg font-bold">{{ reviewResult.intervalSummary.performanceIncome }}</p>
          </li>
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>卡券販賣(不入業績)</p>
            <p class="text-lg font-bold">
              {{ reviewResult.intervalSummary.ticketSellNotIntoPerformance }}
            </p>
          </li>
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>卡券使用(-)</p>
            <p class="text-lg font-bold">{{ reviewResult.intervalSummary.usedTicketForDecount }}</p>
          </li>
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>第三方卡券(-)</p>
            <p class="text-lg font-bold">
              {{ reviewResult.intervalSummary.thirdPartTicketForDecount }}
            </p>
          </li>
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>其他付款方式(-)</p>
            <p class="text-lg font-bold">
              {{ reviewResult.intervalSummary.otherPayWayForDecount }}
            </p>
          </li>
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>入金使用(-)</p>
            <p class="text-lg font-bold">
              {{
                reviewResult.intervalSummary.walletUsedForDecount
                  ? reviewResult.intervalSummary.walletUsedForDecount
                  : 0
              }}
            </p>
          </li>
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>入金儲值</p>
            <p class="text-lg font-bold">{{ reviewResult.intervalSummary.walletDeposit }}</p>
          </li>
          <li
            class="col-span-3 flex h-full flex-col items-center justify-between gap-2 text-center md:col-span-2"
          >
            <p>營業現金應收</p>
            <p class="text-lg font-bold">{{ reviewResult.intervalSummary.businessCash }}</p>
          </li>
        </ul>

        <!-- 訂單列表 -->
        <h2
          v-if="reviewResult.orders && reviewResult.orders.length > 0"
          class="mb-3 mt-5 px-4 text-center text-[17px] font-bold text-primary"
        >
          訂單列表
        </h2>
        <div class="rounded-[10px] bg-white px-[1rem] py-[2rem] font-sans font-normal">
          <ul
            v-if="reviewResult.orders && reviewResult.orders.length > 0"
            class="grid gap-4 text-primary"
          >
            <li v-for="item in reviewResult.orders" :key="item.id">
              <p class="mb-4 text-[17px] font-bold">訂單編號 {{ item.no }}</p>
              <div class="grid grid-cols-12 gap-2">
                <div
                  class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2"
                >
                  <p>服務消費</p>
                  <p>${{ item.serviceFakeTotal }}</p>
                </div>
                <div
                  class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2"
                >
                  <p>店販消費</p>
                  <p>${{ item.productFakeTotal }}</p>
                </div>
                <div
                  class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2"
                >
                  <p>卡券使用(入業績)</p>
                  <p>${{ item.useTicketTotal }}</p>
                </div>
                <div
                  class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2"
                >
                  <p>卡券販賣(入業績)</p>
                  <p>${{ item.ticketSellIntoPerformance }}</p>
                </div>
                <div
                  class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2"
                >
                  <p>業績收入</p>
                  <p>${{ item.performanceIncome }}</p>
                </div>
                <div
                  class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2"
                >
                  <p>卡券販賣(不入業績)</p>
                  <p>${{ item.ticketSellNotIntoPerformance }}</p>
                </div>
                <div
                  class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2"
                >
                  <p>卡券使用(-)</p>
                  <p>${{ item.usedTicketForDecount }}</p>
                </div>
                <div
                  class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2"
                >
                  <p>第三方卡券(-)</p>
                  <p>${{ item.thirdPartTicketForDecount }}</p>
                </div>
                <div
                  class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2"
                >
                  <p>其他付款方式(-)</p>
                  <p>${{ item.otherPayWayForDecount }}</p>
                </div>
                <div
                  class="col-span-12 flex justify-between border-b border-dashed border-gray pb-2"
                >
                  <p>入金使用(-)</p>
                  <p>${{ item.walletUsedForDecount }}</p>
                </div>
                <div class="col-span-12 flex justify-between">
                  <p>營業現金應收</p>
                  <p>${{ item.businessCash }}</p>
                </div>
              </div>
              <ul class="my-2">
                <li
                  @click="item.isOpen = !item.isOpen"
                  @keypress="item.isOpen = !item.isOpen"
                  class="mb-2 flex items-center justify-between rounded-[10px] bg-[#efefef] p-2"
                >
                  <p class="text-lg">詳細資料</p>
                  <font-awesome-icon
                    icon="fa-regular fa-angle-up"
                    class="ccursor-pointer text-lg duration-200"
                    :class="{ 'rotate-180': item.isOpen }"
                  />
                </li>
                <ul
                  class="overflow-hidden rounded-[10px] bg-[#efefef] duration-200"
                  :class="{ 'max-h-[300vh] px-2 py-3': item.isOpen, 'max-h-[0px]': !item.isOpen }"
                >
                  <li>
                    <table class="w-full">
                      <thead>
                        <tr>
                          <th>設計師</th>
                          <th>項目</th>
                          <th>價格</th>
                          <th>互助人</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(staticItem, idx) in item.staticDetail"
                          :key="idx"
                          :class="{
                            'border-b border-dashed border-gray py-1.5 pb-2':
                              idx !== item.staticDetail.length - 1,
                          }"
                        >
                          <td class="p-1.5">{{ staticItem.designerName }}</td>
                          <td class="p-1.5">{{ staticItem.itemName }}</td>
                          <td class="p-1.5">${{ staticItem.price }}</td>
                          <td class="p-1.5">
                            <p v-for="(helperItem, idx2) in staticItem.helperList" :key="idx2">
                              {{ helperItem.helperName }}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                </ul>
              </ul>
            </li>
          </ul>

          <p
            v-if="!reviewResult.orders || reviewResult.orders.length === 0"
            class="text-center text-lg text-ml"
          >
            查無資料
          </p>
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'bill-report',
  description: '報表的帳單列表',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 帳單列表',
  },
  data() {
    return {
      modelConfig: {
        start: {
          timeAdjust: '00:00:00',
        },
        end: {
          timeAdjust: '23:59:59',
        },
      },
      pageOffset: 0,
      // searchDate: this.$dayjs('2022,11,16').add(0, 'month').format('YYYY-MM-DD'),//測試日期
      searchDate: this.$dayjs().add(0, 'month').format('YYYY-MM-DD'),
      date: '',
      reviewResult: {},
      showDetail: [],
    };
  },
  methods: {
    doRoute() {
      this.$router.push({ name: 'Punch' });
    },
    async getOrders() {
      if (!this.searchDate) return;
      const orderForCellPhoneResponse = await this.$api.getIsDisplayAllOrderForCellphone();
      let isGetIsDisplayAllOrderForCellphone = orderForCellPhoneResponse.data.data.getIsDisplayAllOrderForCellphone;
      isGetIsDisplayAllOrderForCellphone = false;
      const submitForm = {
        startDate: this.searchDate.getTime(),
        endDate: this.searchDate.getTime(),
        pageLimit: 20,
        pageOffset: this.pageOffset,
        isReserved: false,
      };

      if (!isGetIsDisplayAllOrderForCellphone) {
        submitForm.employeeId = this.userInfo.user.id;
      }

      const res = await this.$api.designerOrders(submitForm);
      const { data } = res.data;

      if (data.orders.orders.length > 0) {
        /* eslint-disable */
        data.orders.orders.forEach((item, idx) => {
          // 新增isopen資料
          item["isOpen"] = false;
          if (idx === data.orders.orders.length - 1) this.reviewResult = data.orders;
        });
        /* eslint-disable */
      } else this.reviewResult = data.orders;

      this.reviewResult["currentDate"] = this.searchDate;
    },
  },
  computed: {
    ...mapState("userInfo", ["userInfo"]),
    isReviewResult() {
      return this.reviewResult.length;
    },
    showMonth() {
      return `${this.$dayjs(this.reviewResult.currentDate).format("MM")}`;
    },
    showYear() {
      return `${this.$dayjs(this.reviewResult.currentDate).format("YYYY")}`;
    },
    // totalCount() {
    //   return (item) => {
    //     const reducer = (accumulator, curr) => +accumulator + +curr;
    //     const priceList = item.map((itemPrice) => itemPrice.price);
    //     return priceList.reduce(reducer);
    //   };
    // },
    currentMM() {
      let currentMonth = "";
      if (this.date) {
        currentMonth = this.$dayjs(this.date).format("MM");
      } else {
        currentMonth = this.$dayjs(new Date()).format("MM");
      }
      return currentMonth;
    },
    currentYYYY() {
      let currentYear = "";
      if (this.date) {
        currentYear = this.$dayjs(this.date).format("YYYY");
      } else {
        currentYear = this.$dayjs(new Date()).format("YYYY");
      }
      return currentYear;
    },
  },
};
</script>

<style></style>
