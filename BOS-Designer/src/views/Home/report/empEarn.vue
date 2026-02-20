<template>
  <!-- 測試資料日期 選擇 2022/12/13 如後端清掉資料，再聯繫名留工程師 -->
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'Report' }"></C-Back-Nav>
    <section class="relative p-4">
      <div class="mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">互助日報表</h1>
      </div>
      <div class="flex items-center gap-2 px-4">
        <span>日期：</span>
        <vc-date-picker v-model="searchDate" mode="date" :max-date="$dayjs().format('YYYY-MM-DD')">
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="w-[150px] rounded border border-ml/20 px-2 py-1 focus:outline-none"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </vc-date-picker>
      </div>
      <div class="my-4 flex items-center justify-between px-4 text-primary">
        <p class="text-[16px]">
          {{ $dayjs(searchDate).format("MM") }}月/ {{ $dayjs(searchDate).format("DD") }}日
        </p>
        <p>設計師 {{ userInfo.user.name }}</p>
      </div>
      <div class="rounded-[10px] bg-white px-[1rem] py-[2rem] font-sans text-sm font-normal">
        <div class="break-words" v-if="reportResult">
          <div class="base-item bg-txt">
            <div class="w-1/12">#</div>
            <div class="w-4/12">項目</div>
            <div class="w-3/12 text-right">設計師</div>
            <div class="w-2/12 text-right">金額</div>
            <div class="w-2/12 text-right">點</div>
          </div>
          <div
            v-for="(hpRecord, index) in reportResult.helperRecord"
            :key="`hpRecord${index}`"
            class="base-item"
          >
            <div class="w-1/12">#{{ hpRecord.orderNo }}</div>
            <div class="w-4/12">{{ hpRecord.itemName }}</div>
            <div class="w-3/12 text-right">{{ hpRecord.designer?.nameForReport }}</div>
            <div class="w-2/12 text-right">
              {{ handlePrice(hpRecord.point, hpRecord.price, hpRecord.designer) }}
            </div>
            <div class="w-2/12 text-right">{{ hpRecord.point }}</div>
          </div>
          <div class="base-item total">
            <div class="w-2/12">合計</div>
            <div class="w-8/12 text-right">
              {{ reportResult.helperRecordPriceSummary }}
            </div>
            <div class="w-2/12 text-right">
              {{ reportResult.helperRecordPointSummary }}
            </div>
          </div>
          <div class="base-item bg-txt">
            <div class="w-2/5"></div>
            <div class="w-2/5 text-right">日合計</div>
            <div class="w-1/5 text-right">累計</div>
          </div>
          <template v-if="reportResult">
            <div class="base-item">
              <div class="w-2/5">互助獲得金額(不含點)</div>
              <div class="w-2/5 text-right">
                {{ reportResult.summaryCurrentDay.priceRetrieveWithoutPoint }}
              </div>
              <div class="w-1/5 text-right">
                {{ reportResult.summaryTillNow.priceRetrieveWithoutPoint }}
              </div>
            </div>
            <div class="base-item">
              <div class="w-2/5">
                互助獲得(點)點數<span v-if="isHelperPointPriceDisplay">/換算金額</span>
              </div>
              <div class="w-2/5 text-right">
                <span>{{ reportResult.summaryCurrentDay.priceRetrieveFromPoint }}</span>
                <span v-if="isHelperPointPriceDisplay"
                  >/{{ reportResult.summaryCurrentDay.point }}</span
                >
              </div>
              <div class="w-1/5 text-right">
                <span>{{ reportResult.summaryTillNow.priceRetrieveFromPoint }}</span>
                <span v-if="isHelperPointPriceDisplay"
                  >/{{ reportResult.summaryTillNow.point }}</span
                >
              </div>
            </div>
            <div class="base-item">
              <div class="w-2/5">店販業績</div>
              <div class="w-2/5 text-right">
                {{ checkMathRound(reportResult.summaryCurrentDay.productPerformance) }}
              </div>
              <div class="w-1/5 text-right">
                {{ checkMathRound(reportResult.summaryTillNow.productPerformance) }}
              </div>
            </div>
            <div class="base-item">
              <div class="w-2/5">店販抽成</div>
              <div class="w-2/5 text-right">
                {{ checkMathRound(reportResult.summaryCurrentDay.productRake) }}
              </div>
              <div class="w-1/5 text-right">
                {{ checkMathRound(reportResult.summaryTillNow.productRake) }}
              </div>
            </div>
            <div class="base-item">
              <div class="w-2/5">會員卡業績</div>
              <div class="w-2/5 text-right">
                {{ checkMathRound(reportResult.summaryCurrentDay.membershipPerformance) }}
              </div>
              <div class="w-1/5 text-right">
                {{ checkMathRound(reportResult.summaryTillNow.membershipPerformance) }}
              </div>
            </div>
            <div class="base-item">
              <div class="w-2/5">會員卡抽成</div>
              <div class="w-2/5 text-right">
                {{ checkMathRound(reportResult.summaryCurrentDay.membershipRake) }}
              </div>
              <div class="w-1/5 text-right">
                {{ checkMathRound(reportResult.summaryTillNow.membershipRake) }}
              </div>
            </div>
          </template>
        </div>
        <div v-else class="text-bold text-center text-xl">尚無資料</div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'emp-Earn',
  description: '報表的互助日報表',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 互助日報表',
  },
  data() {
    return {
      searchDate: this.$dayjs('2022/12/13').valueOf(),
      reportResult: null,
      isUsingMathRoundInDesignerDailyReport: false,
      isHelperPointPriceDisplay: null,
      isRefresh: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await Promise.all([
        this.getIsUsingMathRoundInDesignerDailyReport(),
        this.getPriceDisplayOnDailyReportDefault(),
      ]).then(async () => {
        await this.getHelperDailyReport();
      });
    },
    // 日報表是否顯示「金額」欄位 取isHelperPointPriceDisplay
    async getPriceDisplayOnDailyReportDefault() {
      const resp = await this.$api.getPriceDisplayOnDailyReportDefault();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isHelperPointPriceDisplay = data.getPriceDisplayOnDailyReportDefault.isHelperPointPriceDisplay;
    },
    // 取得互助日資料
    async getHelperDailyReport() {
      const submitForm = {
        input: {
          helperIds: this.userInfo.user.id,
          date: this.$dayjs(this.searchDate).valueOf(),
        },
      };
      const resp = await this.$api.helperDailyReport(submitForm);
      const { data, errors } = JSON.parse(JSON.stringify(resp.data));
      if (errors) return;
      this.reportResult = data?.helperDailyReport[0];
      // 測試資料
      // this.reportResult?.helperRecord.push({
      //   orderNo: '10', designer: { nameForReport: '測試設計師' }, price: 0, point: 10, itemName: '測試點數>1，金額=0',
      // }, {
      //   orderNo: '11', designer: { nameForReport: '測試設計' }, price: 111, point: 10, itemName: '測試點數>1，金額>0',
      // }, {
      //   orderNo: '12', designer: { nameForReport: '測試設計' }, price: 0, point: 0, itemName: '測試點數=1，金額>0',
      // });
      // console.log(data);
    },
    // 取得是否使用四捨五入到整數
    async getIsUsingMathRoundInDesignerDailyReport() {
      const resp = await this.$api.getIsUsingMathRoundInDesignerDailyReport();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isUsingMathRoundInDesignerDailyReport = data.getIsUsingMathRoundInDesignerDailyReport;
    },
    checkMathRound(value) {
      return this.isUsingMathRoundInDesignerDailyReport ? Math.round(value) : value;
    },
    isMatchPriceDsply(point, price) {
      // 加個否定成顯示條件  //isHelperPointPriceDisplay=false且 點數!=0 、金額=0，隱藏
      return !(!this.isHelperPointPriceDisplay && point && !price);
    },
    isPriceUsingMathRound(designer) {
      // 如果沒有designer 且 要MathRound為真時 ，要四捨五入金額
      return !designer && this.isUsingMathRoundInDesignerDailyReport;
    },
    handlePrice(point, price, designer) {
      // 先處理不顯示金額的狀況
      if (!this.isMatchPriceDsply(point, price)) return '';
      if (this.isPriceUsingMathRound(designer)) return this.checkMathRound(price);

      return price;
    },
  },
  watch: {
    searchDate() {
      if (!this.searchDate) return;
      this.getHelperDailyReport();
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
  },
};
</script>

<style>
.base-item {
  @apply flex items-center justify-between  p-2 border-b border-dashed border-gray pb-2;
}
.base-item.total {
  @apply border-0;
}
.base-item.bg-txt {
  @apply border-0;
}
.bg-txt {
  @apply bg-ml p-2 text-white rounded-[5px];
}
</style>
