<template>
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'Report' }"></C-Back-Nav>
    <section class="relative p-4">
      <div class="mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">設計師抽成報表</h1>
      </div>
      <div class="flex items-center gap-2 px-4">
        <p class="whitespace-nowrap">日期：</p>
        <month-picker-input
          lang="zh"
          :input-pre-filled="true"
          :default-month="+this.$dayjs().month() + 1"
          :default-year="+$dayjs(new Date()).format('YYYY')"
          @change="showDate"
          class="!w-full"
        />
      </div>

      <!-- <div class="my-4 flex items-center justify-between">
          <div class="flex items-baseline">
            <p class="mr-1 text-[24px] font-bold">{{ currentYYYY }}年</p>
            <p>{{ currentMM }}月</p>
          </div>
          <div>
            <p>設計師 {{ userInfo.user.name }}</p>
          </div>
        </div> -->

      <div class="my-4 flex items-center justify-between px-4 text-primary">
        <p class="text-[16px]">{{ currentYYYY }}年/{{ currentMM }}月</p>
        <p>設計師 {{ userInfo.user.name }}</p>
      </div>

      <div class="rounded-[10px] bg-white px-[1rem] py-[2rem] font-sans font-normal">
        <div v-for="(reviewItem, index) in reviewResult" :key="`reviewItem${index}`">
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>服務虛業績</div>
            <div>{{ reviewItem.salesAnalytics.servicePerformanceFakeTotal }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">扣業績 - 付款手續費</div>
            <div>{{ reviewItem.salesAnalytics.serviceThirdPartHandlingFeeOnSales }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">扣業績 - 扣項</div>
            <div>{{ reviewItem.salesAnalytics.servicePerformanceDecountItem }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>服務實業績</div>
            <div>{{ reviewItem.salesAnalytics.truthPerformanceWithoutHelper }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">實業績 - 指定</div>
            <div>
              {{
                reviewItem.salesAnalytics.servicePerformanceDesignateTruthTotalBeforeHelperDecount
              }}
            </div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">實業績 - 不指定</div>
            <div>
              {{
                reviewItem.salesAnalytics
                  .servicePerformanceNonDesignateTruthTotalBeforeHelperDecount
              }}
            </div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">扣業績 - 使用互助</div>
            <div>{{ reviewItem.salesAnalytics.servicePerformanceDecountHelperUsagePrice }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>服務實業績 - 扣使用互助</div>
            <div>{{ reviewItem.salesAnalytics.servicePerformanceTruthTotal }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">指定(實) - 扣互助</div>
            <div>{{ reviewItem.salesAnalytics.servicePerformanceDesignateTruthTotal }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">不指定(實) - 扣互助</div>
            <div>{{ reviewItem.salesAnalytics.servicePerformanceNonDesignateTruthTotal }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>服務換算抽成</div>
            <div>{{ reviewItem.salesAnalytics.servicePerformanceRake }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">指定抽成</div>
            <div>{{ reviewItem.salesAnalytics.servicePerformanceDesignateRake }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">不指定抽成</div>
            <div>{{ reviewItem.salesAnalytics.servicePerformanceNonDesignateRake }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">特殊抽成</div>
            <div>{{ reviewItem.salesAnalytics.specialRake }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">扣薪水 - 付款手續費</div>
            <div>{{ reviewItem.salesAnalytics.serviceThirdPartHandlingFeeOnSalary }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">扣薪水 - 扣項</div>
            <div>{{ reviewItem.salesAnalytics.serviceSalaryDecountItem }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">扣薪水 - 使用互助</div>
            <div>{{ reviewItem.salesAnalytics.serviceSalaryDecountHelperUsagePrice }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>服務應領金額</div>
            <div>{{ reviewItem.salesAnalytics.serviceSalaryShouldBePaid }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>店販業績</div>
            <div>{{ reviewItem.salesAnalytics.productPerformanceFakeTotal }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">扣業績 - 付款手續費</div>
            <div>{{ reviewItem.salesAnalytics.productThirdPartHandlingFeeOnSales }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">店販業績 扣手續費</div>
            <div>{{ reviewItem.salesAnalytics.productPerformanceTruthTotal }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>店販抽成</div>
            <div>
              {{
                reviewItem.salesAnalytics.productRakeByCost +
                reviewItem.salesAnalytics.productRakeByFixed +
                reviewItem.salesAnalytics.productRakeByPrice
              }}
            </div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div class="ml-[2rem]">扣薪水 - 付款手續費</div>
            <div>{{ reviewItem.salesAnalytics.productThirdPartHandlingFeeOnSalary }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>互助獲得 - 金額</div>
            <div>{{ reviewItem.salesAnalytics.helperRetrievePriceNoPoint }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>互助獲得 - 點數/換算金額</div>
            <div>
              {{ reviewItem.salesAnalytics.helperRetrievePoint }}/{{
                reviewItem.salesAnalytics.helperRetrievePriceOnlyPoint
              }}
            </div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>互助獲得 - 點數</div>
            <div>{{ reviewItem.salesAnalytics.helperPointPaid }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>互助獲得 - 金額</div>
            <div>{{ reviewItem.salesAnalytics.helperPricePaid }}</div>
          </div>
          <div class="flex justify-between border-b border-dashed border-gray p-2">
            <div>扣入金手續費</div>
            <div>{{ reviewItem.salesAnalytics.walletDepositHandlingFeeByDesigner }}</div>
          </div>
          <div class="flex justify-between p-2 font-bold">
            <div>總應該薪資</div>
            <div>{{ reviewItem.salesAnalytics.totalSalaryShouldBePaid }}</div>
          </div>
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';
import { MonthPickerInput } from 'vue-month-picker';

export default {
  name: 'profit-cut',
  description: '報表的設計師抽成報表',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 設計師抽成報表',
  },
  components: {
    MonthPickerInput,
  },
  data() {
    return {
      date: {
        from: null,
        to: null,
        month: null,
        year: 2022,
      },
      reviewResult: [],
    };
  },
  mounted() {},
  methods: {
    async getUserRakeReport() {
      const submitForm = {
        date: {
          startDate: this.$dayjs(this.date.from).startOf('month').valueOf(),
          endDate: this.$dayjs(this.date.to).add(-1, 'day').endOf('month').valueOf(),
        },
        designerIds: [this.userInfo.user.id],
      };
      const resp = await this.$api.userRakeReport(submitForm);
      const { data, errors } = resp.data;
      if (errors) return;
      this.reviewResult = data.userRakeReport;
      console.log(data.userRakeReport);
    },
    showDate(date) {
      this.date = date;
    },
    doRoute() {
      this.$router.push({ name: 'Punch' });
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
    totalCount() {
      return (item) => {
        const reducer = (accumulator, curr) => +accumulator + +curr;
        const priceList = item.map((itemPrice) => itemPrice.price);
        return priceList.reduce(reducer);
      };
    },
    currentMM() {
      let currentMonth = '';
      currentMonth = this.$dayjs(this.date.from).format('MM');
      return currentMonth;
    },
    currentYYYY() {
      let currentYYYY = '';
      currentYYYY = this.$dayjs(this.date.from).format('YYYY');
      return currentYYYY;
    },
  },
  watch: {
    date: {
      deep: true,
      handler() {
        this.getUserRakeReport();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .month-picker-input {
  width: 100%;
  padding: 0.5rem;
}
::v-deep .month-picker__month.selected {
  background-color: #3c5091;
}
::v-deep .month-picker__year button {
  background-color: #fcfcfc;
  border: none;
  top: 4px;
}
</style>
