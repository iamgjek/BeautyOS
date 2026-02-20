<template>
  <!-- 測試資料 2022/12/26 -->
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'Report' }"></C-Back-Nav>
    <section class="relative p-4">
      <div class="mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">設計師日報表</h1>
      </div>

      <div class="rounded-[20px] bg-white px-[1rem] py-[2rem] font-sans font-normal text-primary">
        <div class="flex items-center gap-2">
          <p>日期：</p>
          <vc-date-picker v-model="searchDate" mode="date">
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="w-[150px] rounded border border-ml/20 px-2 py-1 focus:outline-none"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </vc-date-picker>
        </div>

        <div v-for="(item, idx) in reviewResult" :key="idx" class="text-left text-sm">
          <template v-if="!idx">
            <div class="my-4 flex items-center justify-between">
              <p>{{ currentMM }}月/{{ currentDD }}日</p>
              <p>設計師 {{ item.user.name }}</p>
            </div>
          </template>
          <div>
            <template v-if="!idx">
              <div
                class="flex items-center justify-center rounded-[5px] border-b border-primary/50 bg-ml p-2 text-center text-white"
              >
                <div class="w-1/5 text-left">單號</div>
                <div class="w-1/5">類別</div>
                <div class="w-1/5">項目</div>
                <div class="w-1/5">金額</div>
                <div class="w-1/5">業績</div>
              </div>
            </template>
            <div
              v-for="(orderRecordItem, index) in item.orderRecord"
              :key="`orderRecordItem-${index}`"
              class="flex items-center justify-center border-b border-dashed border-gray p-2 text-center last-of-type:border-0"
            >
              <div class="w-1/5 text-left">
                {{ orderRecordItem.orderNo }}<span v-if="orderRecordItem.designation">*</span>
              </div>
              <div class="w-1/5 text-left">{{ orderRecordItem.category }}</div>
              <div class="w-1/5">{{ orderRecordItem.itemName }}</div>
              <div class="w-1/5">{{ mathRound(orderRecordItem.fakePerformance) }}</div>
              <div class="w-1/5">{{ mathRound(orderRecordItem.truthPerformance) }}</div>
            </div>

            <!-- 合計 -->

            <template v-if="idx === reviewResult.length - 1">
              <div class="flex items-center justify-center p-2">
                <div class="w-1/5">合計</div>
                <div class="w-1/5"></div>
                <div class="w-1/5"></div>
                <div class="w-1/5 font-bold">
                  <span v-if="priceDisplayOnDailyReportDefault.isPriceDisplayOnDailyReport">{{
                    mathRound(item.currentFakeSummary)
                  }}</span>
                </div>
                <div class="w-1/5 font-bold">{{ mathRound(item.currentTruthSummary) }}</div>
              </div>
              <div class="mt-4">
                <ul>
                  <li
                    class="grid grid-cols-12 rounded-[5px] border-b border-primary/50 bg-ml p-2 text-center text-white"
                  >
                    <div class="col-span-6"></div>
                    <div class="col-span-3 text-right">日合計</div>
                    <div class="col-span-3 text-right">累計</div>
                  </li>
                </ul>

                <ul>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                    v-if="
                      priceDisplayOnDailyReportDefault.isPriceDisplayOnDailyReport &&
                      !(
                        item.currentDay.performanceFakeTotal === 0 &&
                        item.tillNow.performanceFakeTotal === 0
                      )
                    "
                  >
                    <div class="col-span-6">金額(虛)</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.currentDay.performanceFakeTotal) }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.tillNow.performanceFakeTotal) }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                    v-if="
                      isZeroValueHiddenOnDailyReport
                        ? !(
                            item.currentDay.performanceTruthTotal === 0 &&
                            item.tillNow.performanceTruthTotal === 0
                          )
                        : true
                    "
                  >
                    <div class="col-span-6">實業績</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.currentDay.performanceTruthTotal) }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.tillNow.performanceTruthTotal) }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                    v-if="
                      isZeroValueHiddenOnDailyReport
                        ? !(
                            item.currentDay.performanceDesignateTruthTotal === 0 &&
                            item.tillNow.performanceDesignateTruthTotal === 0
                          )
                        : true
                    "
                  >
                    <div class="col-span-6">指定實業績</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.currentDay.performanceDesignateTruthTotal) }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.tillNow.performanceDesignateTruthTotal) }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                  >
                    <div class="col-span-6">特殊抽成</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.currentDay.performanceWithSpecialRake) }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.tillNow.performanceWithSpecialRake) }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                  >
                    <div class="col-span-6">店販金額</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.currentDay.productFakeTotal) }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.tillNow.productFakeTotal) }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                  >
                    <div class="col-span-6">店販抽成</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.currentDay.productRake) }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.tillNow.productRake) }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                  >
                    <div class="col-span-6">互助使用(不含點)</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.currentDay.helperPaidPrice) }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.tillNow.helperPaidPrice) }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                  >
                    <div class="col-span-6">互助使用(點)</div>
                    <div class="col-span-3 pr-2 text-right">
                      <span>{{ mathRound(item.currentDay.helperPaidPoint) }}</span>
                      <template v-if="priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay">
                        /
                        <span>{{ mathRound(item.currentDay.helperPaidPriceFromPoint * -1) }}</span>
                      </template>
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      <span>{{ mathRound(item.tillNow.helperPaidPoint) }}</span>
                      <template v-if="priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay">
                        /
                        <span>{{
                          mathRound(item.tillNow.helperPaidPriceFromPoint * -1) * -1
                        }}</span>
                      </template>
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                    v-if="
                      isDisplayHelperRetrieveInDailyReport &&
                      !(item.currentDay.helpGetNoPoint === 0 && item.tillNow.helpGetNoPoint === 0)
                    "
                  >
                    <div class="col-span-6">互助獲得金額(不含點)</div>
                    <div class="col-span-3 pr-2 text-right">
                      <!-- 1 -->
                      <template v-if="priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay">
                        <span>
                          {{ mathRound(item.currentDay.helpGetNoPoint) }}
                        </span>
                      </template>
                      <template v-else> 0 </template>
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      <!-- 4 -->
                      <template v-if="priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay">
                        <span>
                          {{ mathRound(item.tillNow.helpGetNoPoint) }}
                        </span>
                      </template>
                      <template v-else> 0 </template>
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                    v-if="
                      isDisplayHelperRetrieveInDailyReport &&
                      !(
                        item.currentDay.helperRetrievePoint === 0 &&
                        item.tillNow.helperRetrievePoint === 0
                      )
                    "
                  >
                    <div class="col-span-6">互助獲得(點)點數/換算金額</div>
                    <div class="col-span-3 pr-2 text-right">
                      <span>{{ mathRound(item.currentDay.helperRetrievePoint) }}</span>
                      <template v-if="priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay">
                        / <span> {{ mathRound(item.currentDay.helperRetrievePrice) }}</span>
                      </template>
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      <span>{{ mathRound(item.tillNow.helperRetrievePoint) }}</span>
                      <template v-if="priceDisplayOnDailyReportDefault.isHelperPointPriceDisplay">
                        / <span>{{ mathRound(item.tillNow.helperRetrievePrice) }}</span>
                      </template>
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                    v-if="
                      isZeroValueHiddenOnDailyReport
                        ? !(
                            item.currentDay.orderTotalCount === 0 &&
                            item.tillNow.orderTotalCount === 0
                          )
                        : true
                    "
                  >
                    <div class="col-span-6">總客數</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.currentDay.orderTotalCount) }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.tillNow.orderTotalCount) }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                    v-if="
                      isZeroValueHiddenOnDailyReport
                        ? !(
                            item.currentDay.designateOrderCount === 0 &&
                            item.tillNow.designateOrderCountl === 0
                          )
                        : true
                    "
                  >
                    <div class="col-span-6">指定客</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.currentDay.designateOrderCount) }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.tillNow.designateOrderCount) }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                    v-if="
                      isZeroValueHiddenOnDailyReport
                        ? !(
                            item.currentDay.nonDesignateOrderCount === 0 &&
                            item.tillNow.nonDesignateOrderCount === 0
                          )
                        : true
                    "
                  >
                    <div class="col-span-6">不指定客</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.currentDay.nonDesignateOrderCount) }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.tillNow.nonDesignateOrderCount) }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                    v-if="
                      isZeroValueHiddenOnDailyReport
                        ? !(
                            !countMath(
                              item.currentDay.performanceFakeTotal,
                              item.currentDay.orderTotalCount
                            ) &&
                            !countMath(
                              item.tillNow.performanceFakeTotal,
                              item.tillNow.orderTotalCount
                            )
                          )
                        : true
                    "
                  >
                    <div class="col-span-6">客單價</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{
                        countMath(
                          item.currentDay.performanceFakeTotal,
                          item.currentDay.orderTotalCount
                        )
                      }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{
                        countMath(item.tillNow.performanceFakeTotal, item.tillNow.orderTotalCount)
                      }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                    v-if="
                      isZeroValueHiddenOnDailyReport
                        ? !(
                            item.currentDay.orderTypeCount === 0 &&
                            item.tillNow.orderTypeCount === 0
                          )
                        : true
                    "
                  >
                    <div class="col-span-6">客項次(服務)</div>
                    <div class="col-span-3 pr-2 text-right">
                      <span>{{ mathRound(item.currentDay.orderTypeCount) }}</span>
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{ mathRound(item.tillNow.orderTypeCount) }}
                    </div>
                  </li>
                  <li
                    class="grid grid-cols-12 border-b border-dashed border-gray p-2 last-of-type:border-0"
                    v-if="
                      isZeroValueHiddenOnDailyReport
                        ? !(
                            !countMath(
                              item.currentDay.performanceFakeTotal,
                              item.currentDay.orderTypeCount
                            ) &&
                            !countMath(
                              item.tillNow.performanceFakeTotal,
                              item.tillNow.orderTypeCount
                            )
                          )
                        : true
                    "
                  >
                    <div class="col-span-6">平均項次單價</div>
                    <div class="col-span-3 pr-2 text-right">
                      {{
                        countMath(
                          item.currentDay.performanceFakeTotal,
                          item.currentDay.orderTypeCount
                        )
                      }}
                    </div>
                    <div class="col-span-3 pr-2 text-right">
                      {{
                        countMath(item.tillNow.performanceFakeTotal, item.tillNow.orderTypeCount)
                      }}
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </div>
        <p v-if="!reviewResult.length" class="mt-10 text-center font-sans font-bold">查無資料</p>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'daily-Report',
  description: '報表的設計師日報表',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 設計師日報表',
  },
  data() {
    return {
      date: '',
      searchDate: this.$dayjs().valueOf(),
      reviewResult: {},
      currentTruthSummary: 0,
      isDisplayHelperRetrieveInDailyReport: false,
      isUsingMathRoundInDesignerDailyReport: false,
      isZeroValueHiddenOnDailyReport: false,
      priceDisplayOnDailyReportDefault: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await Promise.all([
        this.getIsDisplayHelperRetrieveInDailyReport(),
        this.getIsUsingMathRoundInDesignerDailyReport(),
        this.getIsZeroValueHiddenOnDailyReport(),
        this.getPriceDisplayOnDailyReportDefault(),
      ]).then(() => {});
      await this.getDesignerDailyReport();
    },
    async getIsDisplayHelperRetrieveInDailyReport() {
      const resp = await this.$api.getIsDisplayHelperRetrieveInDailyReport();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isDisplayHelperRetrieveInDailyReport = data.getIsDisplayHelperRetrieveInDailyReport;
    },
    // 是否四捨五入
    async getIsUsingMathRoundInDesignerDailyReport() {
      const resp = await this.$api.getIsUsingMathRoundInDesignerDailyReport();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isUsingMathRoundInDesignerDailyReport = data.getIsUsingMathRoundInDesignerDailyReport;
    },
    async getIsZeroValueHiddenOnDailyReport() {
      const resp = await this.$api.getIsZeroValueHiddenOnDailyReport();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isZeroValueHiddenOnDailyReport = data.getIsZeroValueHiddenOnDailyReport;
    },
    async getPriceDisplayOnDailyReportDefault() {
      const resp = await this.$api.getPriceDisplayOnDailyReportDefault();
      const { data, errors } = resp.data;
      if (errors) return;
      this.priceDisplayOnDailyReportDefault = data.getPriceDisplayOnDailyReportDefault;
    },
    doRoute() {
      this.$router.push({ name: 'Punch' });
    },
    async getDesignerDailyReport() {
      this.totalFakePerformance = 0;
      this.totalTruthPerformance = 0;

      const resp = await this.$api.designerDailyReport({
        date: this.$dayjs(this.searchDate).valueOf(),
        designerIds: [this.userInfo.user.id],
      });
      const { data, errors } = resp.data;

      if (errors) return [];

      this.reviewResult = Array.isArray(data.designerDailyReport) ? data.designerDailyReport : [];

      if (this.reviewResult.length > 0) {
        this.reviewResult = this.reviewResult.map((resultItem) => {
          let { totalFakePerformance = 0, totalTruthPerformance = 0, ...others } = resultItem; // eslint-disable-line

          others.orderRecord.forEach((orderItem) => {
            totalFakePerformance += orderItem.fakePerformance;
            totalTruthPerformance += orderItem.truthPerformance;
          });

          return {
            totalFakePerformance,
            totalTruthPerformance,
            ...others,
          };
        });
      }

      return resp;
    },
    // 四捨五入到小數點第一位
    countMath(parameter1, parameter2) {
      return this.isUsingMathRoundInDesignerDailyReport
        ? Math.round(+parameter1 / +parameter2)
        : (+parameter1 / +parameter2).toFixed(1);
    },
    // 四捨五入到小數點第二位
    mathRound(data) {
      return this.isUsingMathRoundInDesignerDailyReport
        ? Math.round(+data)
        : Math.round((+data + Number.EPSILON) * 100) / 100;
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
    totalCount() {
      return (item) => {
        const reducer = (accumulator, curr) => +accumulator + +curr;
        const priceList = item.map((itemPrice) => itemPrice.price);
        return priceList.length > 0 ? priceList.reduce(reducer) : 0;
      };
    },

    currentMM() {
      let currentMonth = '';
      if (this.searchDate) {
        currentMonth = this.$dayjs(this.searchDate).format('MM');
      } else {
        currentMonth = this.$dayjs(new Date()).format('MM');
      }
      return currentMonth;
    },
    currentDD() {
      let currentDay = '';
      if (this.searchDate) {
        currentDay = this.$dayjs(this.searchDate).format('DD');
      } else {
        currentDay = this.$dayjs(new Date()).format('DD');
      }
      return currentDay;
    },
  },
  watch: {
    searchDate() {
      this.getDesignerDailyReport();
    },
  },
};
</script>

<style></style>
