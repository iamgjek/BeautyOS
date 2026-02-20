<template>
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'Order' }"></C-Back-Nav>
    <section class="relative p-4">
      <div class="relative mb-4 flex">
        <h1 class="m-auto font-bold">列表查詢</h1>
      </div>
      <div class="sect mb-4 ">
        <div class="mb-4 flex items-center justify-between gap-2">
          <C-Input v-model="searchData" @doFunction="getOrders()" :placeholder="'搜尋姓名、電話、代號'"
            class="mb-0 w-full">
            <template v-slot:endIcon>
              <font-awesome-icon v-if="searchData" @click="getOrders(true)" icon="fa-regular fa-xmark"
                class="mr-4 text-rose-600" />
              <font-awesome-icon @click="getOrders()" icon="fa-regular fa-magnifying-glass" />
            </template>
          </C-Input>
        </div>

        <C-Checkbox-Full v-model="isEarlierRecordDisplay" class="!justify-start" label="顯示過往預約紀錄" />
      </div>
      <div class="sect">
        <div class="text-left text-sm">
          <h3>待審查({{ isReviewResult }})</h3>
          <div v-if="isReviewResult">
            <div v-for="(reviewItem, index) in reviewResult" :key="`reviewItem${index}`"
              @click="doRoute(reviewItem, true)" @keypress="doRoute(reviewItem, true)" class="content">
              <div class="number item">
                <img src="@/static/images/calendar-days-regular.svg" alt="calander" />
                <span>{{ reviewItem.orderDate | dateFmtROCMMDD }}</span>
              </div>
              <div class="number item">
                <img src="@/static/images/clock-regular.svg" alt="calander" />
                <span>{{ reviewItem.orderDate | dateFmtHm }}</span>
              </div>
              <div class="text item">
                <img src="@/static/images/users-light.svg" alt="calander" />
                <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{
                  reviewItem.customerName || "--"
                }}</span>
              </div>
              <div class="status">
                <span>{{ reviewItem.status }}</span>
              </div>
              <div>
                <img src="@/static/images/arrow.svg" alt="arrow" class="arrow" />
              </div>
            </div>
          </div>
          <div v-else class="my-3 pl-2">目前沒有待審查的預約</div>
        </div>

        <div class="text-left text-sm">
          <h3>預約明細({{ isOrderResult }})</h3>
          <div v-if="isOrderResult">
            <div v-for="(reviewItem, index) in orderResult" :key="`reviewItem${index}`"
              @click="doRoute(reviewItem, false)" @keypress="doRoute(reviewItem, false)" class="content">
              <div class="number item">
                <img src="@/static/images/calendar-days-regular.svg" alt="calander" />
                <span>{{ reviewItem.orderDate | dateFmtROCMMDD }}</span>
              </div>
              <div class="number item">
                <img src="@/static/images/clock-regular.svg" alt="calander" />
                <span>{{ reviewItem.orderDate | dateFmtHm }}</span>
              </div>
              <div class="text item">
                <img src="@/static/images/users-light.svg" alt="calander" />
                <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{
                  reviewItem.customerName || "--"
                }}</span>
              </div>
              <div class="status">
                <span>{{ reviewItem.status }}</span>
              </div>
              <div>
                <img src="@/static/images/arrow.svg" alt="arrow" class="arrow" />
              </div>
            </div>
          </div>
          <div v-else class="my-3 pl-2">目前沒有任何預約</div>
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>

export default {
  name: 'order-index',
  description: '預約的首頁',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 預約列表查詢',
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      searchData: '',
      isEarlierRecordDisplay: false,
      today: {
        start: this.$dayjs().startOf('d').valueOf(),
        end: this.$dayjs().endOf('d').valueOf(),
      },
      resultData: [],
    };
  },
  methods: {
    async init() {
      await this.getMonthlyOrders(this.isEarlierRecordDisplay, this.searchData);
    },
    async getMonthlyOrders(isEarlierRecordDisplay, customerKeyword) {
      const submit = {
        customerKeyword,
        isEarlierRecordDisplay,
      };
      const resp = await this.$api.getDesignerReservation(submit);
      const { data } = resp.data;
      this.resultData = data.getDesignerReservation;
    },
    async getOrders(clear = false) {
      this.searchData = clear ? '' : this.searchData;
      await this.getMonthlyOrders(this.isEarlierRecordDisplay, this.searchData);
    },
    doRoute(item, isReview) {
      console.log(item);
      this.$router.push({ name: 'ScheduleBreak-Detail', query: { id: item.orderId, isReview } });
    },

  },
  computed: {
    reviewResult() {
      return this.resultData.length >= 1 ? this.resultData.filter((order) => order.status === '待審核') : [];
    },
    orderResult() {
      return this.resultData.length >= 1 ? this.resultData.filter((order) => order.status !== '待審核') : [];
    },
    isReviewResult() {
      return this.reviewResult.length;
    },
    isOrderResult() {
      return this.orderResult.length;
    },

  },
  watch: {
    isEarlierRecordDisplay(val) {
      this.getMonthlyOrders(val, this.searchData);
    },
  },
};
</script>

<style lang="scss" scoped>
.sect {
  @apply flex flex-col rounded-[10px] bg-white px-[1rem] py-[2rem] relative;
}

.sect h2 {
  @apply p-4 text-left text-[#231815] font-[700] text-[19px];
}

/* 功能選單 */
.sect .lists {
  @apply flex w-full flex-wrap;
}

.sect .lists li {
  @apply flex flex-col items-center w-[22.7138643068%] mb-[6%] mx-[5.3097345133%];
}

.sect .lists span {
  @apply select-none whitespace-nowrap text-sm font-[500] text-[#231815];
}

@media screen and (min-width: 768px) {
  .sect .lists li {
    @apply w-[19.5355191%] mx-[2.7322404%];
  }
}

.sect .lists li .pic {
  @apply flex aspect-square w-full items-center justify-center rounded-full bg-[#F7F7F7] mb-2;
}

/* 預約明細類 */
.sect h3 {
  @apply text-left ml-4 relative text-[#231815] font-[500] text-[14px] before:content-[''] before:absolute before:top-[5px] before:left-[-8px] before:w-[3px] before:h-[70%] before:bg-[#231815] before:rounded-[5px];
}

.sect p {
  @apply mb-3 ml-[2em] pl-2 text-left text-[13px] font-[500] text-[#888];
}

.sect .content {
  @apply mb-2 select-none text-[13px] font-[500] text-[#231815] my-2 flex items-center justify-between rounded-lg bg-[#F7F7F7] p-2;
}

.sect .content .item {
  @apply flex w-3/12 items-center justify-center;
}

.sect .content .number {
  @apply font-[700] font-['Arial'];
}

.sect .content .text {
  @apply font-[500] justify-start;
}

.sect .content .status {
  @apply w-3/12 font-[500] overflow-hidden text-ellipsis whitespace-nowrap;
}

.sect .content img {
  @apply mr-1 w-[15px];
}

.sect .content .arrow {
  @apply w-[7px];
}
</style>
