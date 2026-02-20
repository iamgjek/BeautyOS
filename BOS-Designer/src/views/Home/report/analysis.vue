<template>
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'Report' }"></C-Back-Nav>

    <section class="relative p-4">
      <div class="mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">設計師業績分析報表</h1>
      </div>
      <div class="my-4 flex items-center justify-between px-4">
        <div>
          <p><strong>設計師：</strong> {{ dReport.designerName + " | " + GETTER_MECHANTNAME }}</p>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center gap-2 rounded-[10px] bg-white px-[1rem] py-[2rem] font-sans font-normal"
      >
        <h2 class="w-full text-sm">日期選擇</h2>
        <div class="flex gap-2 text-sm">
          <button class="btn-class" @click="setMonth(0)">本月</button>
          <button class="btn-class" @click="setMonth(1)">上個月</button>
          <button class="btn-class" @click="setDay(2)">前天</button>
          <button class="btn-class" @click="setDay(1)">昨天</button>
          <button class="btn-class" @click="setDay(0)">今天</button>
        </div>
        <div class="flex gap-2 text-sm">
          <vc-date-picker v-model="startDate" mode="date" :max-date="$dayjs().format('YYYY-MM-DD')">
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="btn-class w-[114px]"
                placeholder="起始日"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </vc-date-picker>
          <vc-date-picker v-model="endDate" mode="date" :max-date="$dayjs().format('YYYY-MM-DD')">
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="btn-class w-[114px]"
                :value="inputValue"
                placeholder="結束日"
                v-on="inputEvents"
              />
            </template>
          </vc-date-picker>
        </div>
        <h2 class="w-full text-sm">虛實業績</h2>
        <div class="flex gap-2 text-sm">
          <button class="btn-class" @click="setDsplyRef('TRUTH')">實業績</button>
          <button class="btn-class" @click="setDsplyRef('FAKE')">虛業績</button>
        </div>
      </div>

      <div
        class="my-3 overflow-x-auto rounded-[10px] bg-white px-[1rem] py-[2rem] text-left font-sans text-sm font-normal"
      >
        <div class="w-[768px] break-words md:w-full">
          <div class="sheet rounded-[5px] bg-ml text-white">
            <div class="w-1/12">總業績</div>
            <div class="w-1/12">總客數</div>
            <div class="w-1/12">平均客單價</div>
            <div class="w-1/12">指定數</div>
            <div class="w-1/12">指定數%</div>
            <div class="w-1/12">不指定數</div>
            <div class="w-1/12">不指定%</div>
            <div class="w-1/12">店販業績</div>
            <div class="w-1/12">店販業績比%</div>
            <div class="w-1/12">會員卡業績</div>
            <div class="w-1/12">會員卡業績比%</div>
          </div>

          <div class="sheet">
            <div class="w-1/12">{{ Math.round(dReport.totalPerformance) }}</div>
            <div class="w-1/12">{{ Math.round(dReport.totalOrderCount) }}</div>
            <div class="w-1/12">{{ Math.round(dReport.orderAveragePrice) }}</div>
            <div class="w-1/12">{{ Math.round(dReport.orderDesignateCount) }}</div>
            <div class="w-1/12">{{ Math.round(dReport.orderDesignatePercentage) }}%</div>
            <div class="w-1/12">{{ Math.round(dReport.orderNonDesignateCount) }}</div>
            <div class="w-1/12">{{ secondDecimalPoint(dReport.orderNonDesignatePercentage) }}%</div>
            <div class="w-1/12">{{ Math.round(dReport.productPerformance) }}</div>
            <div class="w-1/12">
              {{ secondDecimalPoint(dReport.productPerformancePercentage) }}%
            </div>
            <div class="w-1/12">{{ Math.round(dReport.membershipPerformance) }}</div>
            <div class="w-1/12">
              {{ secondDecimalPoint(dReport.membershipPerformancePercentage) }}%
            </div>
          </div>

          <!-- 第二部分 -->
          <div class="sheet rounded-[5px] bg-ml text-white">
            <div class="w-1/12">項目</div>
            <div class="w-1/12">客數</div>
            <div class="w-1/12">客數比%</div>
            <div class="w-1/12">指定數</div>
            <div class="w-1/12">指定數%</div>
            <div class="w-1/12">不指定數</div>
            <div class="w-1/12">不指定%</div>
            <div class="w-1/12">單項業績</div>
            <div class="w-1/12">業績比%</div>
            <div class="w-1/12">平均單價</div>
          </div>
          <template v-if="serviceTypeAnalyzeList.length">
            <div
              class="sheet"
              v-for="serviceTypeAnalyze in serviceTypeAnalyzeList"
              :key="serviceTypeAnalyze.typeName"
            >
              <div class="w-1/12">{{ serviceTypeAnalyze.typeName }}</div>
              <div class="w-1/12">{{ serviceTypeAnalyze.orderTypeCount }}</div>
              <div class="w-1/12">
                {{ secondDecimalPoint(serviceTypeAnalyze.orderTypePercentage) }}%
              </div>
              <div class="w-1/12">{{ serviceTypeAnalyze.orderTypeDesignateCount }}</div>
              <div class="w-1/12">
                {{ secondDecimalPoint(serviceTypeAnalyze.orderTypeDesignatePercentage) }}%
              </div>
              <div class="w-1/12">{{ serviceTypeAnalyze.orderTypeNonDesignateCount }}</div>
              <div class="w-1/12">
                {{ secondDecimalPoint(serviceTypeAnalyze.orderTypeNonDesignatePercentage) }}%
              </div>
              <div class="w-1/12">
                {{ Math.round(serviceTypeAnalyze.currentOrderTypePerformance) }}
              </div>
              <div class="w-1/12">
                {{ secondDecimalPoint(serviceTypeAnalyze.currentOrderTypePerformancePercentage) }}%
              </div>
              <div class="w-1/12">
                {{ Math.round(serviceTypeAnalyze.currentOrderTypeAveragePrice) }}
              </div>
            </div>
            <!-- 合計 -->
            <div class="sheet">
              <div class="w-1/12"><strong>合計</strong></div>
              <!-- 客數 -->
              <div class="w-1/12">
                {{ countTotal("orderTypeCount", false) }}
              </div>
              <!-- 客數比% -->
              <div class="w-1/12">100%</div>
              <!-- 指定數 -->
              <div class="w-1/12">
                {{ countTotal("orderTypeDesignateCount", false) }}
              </div>
              <!-- 指定數% -->
              <div class="w-1/12">
                {{ designatePercentageTotal("orderTypeDesignateCount") }}
                %
              </div>
              <!-- 不指定數 -->
              <div class="w-1/12">
                {{ countTotal("orderTypeNonDesignateCount", false) }}
              </div>
              <!-- 不指定% -->
              <div class="w-1/12">
                {{ designatePercentageTotal("orderTypeNonDesignateCount") }}%
              </div>
              <!-- 單項業績 -->
              <div class="w-1/12">
                {{ countTotal("currentOrderTypePerformance", false) }}
              </div>
              <!-- 業績比 -->
              <div class="w-1/12">100%</div>
              <!-- 平均單價 -->
              <div class="w-1/12">
                {{ countTotal("currentOrderTypeAveragePrice", false) }}
              </div>
            </div>
          </template>
          <div
            v-else
            class="my-3 flex items-center justify-center border-solid border-primary/50 p-1"
          >
            <strong>尚無資料</strong>
          </div>
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'analysis-report',
  description: '報表的設計師業績分析報表',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 設計師業績分析表',
  },
  data() {
    return {
      startDate: this.$dayjs().valueOf(),
      endDate: this.$dayjs().valueOf(),
      displayReference: 'TRUTH',
      serviceTypeAnalyzeList: [],
      dReport: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.getDesignerPerforamnceAnalyzeReport();
    },
    setMonth(count) {
      this.startDate = this.$dayjs().subtract(count, 'month').startOf('month').valueOf();
      this.endDate = this.$dayjs().subtract(count, 'month').endOf('month').valueOf();
    },
    setDay(count) {
      this.startDate = this.$dayjs().subtract(count, 'day').valueOf();
      this.endDate = this.$dayjs().subtract(count, 'day').valueOf();
    },
    async getDesignerPerforamnceAnalyzeReport() {
      const submit = {
        input: {
          startDate: this.$dayjs(this.startDate).valueOf(),
          endDate: this.$dayjs(this.endDate).valueOf(),
        },
        displayReference: this.displayReference,
        designerIds: this.userInfo.user.id,
      };
      const resp = await this.$api.designerPerforamnceAnalyzeReport(submit);
      const { data, errors } = JSON.parse(JSON.stringify(resp.data));
      if (errors) return;
      this.dReport = data?.designerPerforamnceAnalyzeReport[0];
      this.serviceTypeAnalyzeList = data?.designerPerforamnceAnalyzeReport[0].serviceTypeAnalyze;
    },
    // 虛實業績設定：預設實 -TRUTH , 虛- FAKE
    setDsplyRef(data) {
      this.displayReference = data;
      this.getDesignerPerforamnceAnalyzeReport();
    },
    // 取到小數點第二位
    secondDecimalPoint(val) {
      const result = Math.round((val + Number.EPSILON) * 100) / 100;
      return result;
    },
    /**
     * propertyKey：欲累加的變數名稱
     * isSecondDecimalPoint：傳出結果是否需要取到小數第二位，若否取到整數
     */
    countTotal(propertyKey, isSecondDecimalPoint) {
      const result = this.serviceTypeAnalyzeList.reduce(
        (p, n) => ({ [propertyKey]: p[propertyKey] + n[propertyKey] }),
        { [propertyKey]: 0 },
      )[propertyKey];
      return isSecondDecimalPoint ? this.secondDecimalPoint(result) : Math.round(result);
    },

    // designate：指定數或不指定數的參數，指定數輸入orderTypeDesignateCount，不指定數輸入orderTypeNonDesignateCount
    // 公式：(指定數or不指定數 / (指定數+ 不指定數))*100
    designatePercentageTotal(designate) {
      const result = (this.countTotal(designate, false)
          / (this.countTotal('orderTypeDesignateCount', false)
            + this.countTotal('orderTypeNonDesignateCount', false)))
        * 100;
      return this.secondDecimalPoint(result);
    },
  },
  watch: {
    startDate() {
      if (!this.startDate) return;
      console.log(this.$dayjs(this.startDate).valueOf());
      this.getDesignerPerforamnceAnalyzeReport();
    },
    endDate() {
      if (!this.endDate) return;
      console.log(this.$dayjs(this.endDate).valueOf());
      this.getDesignerPerforamnceAnalyzeReport();
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
  },
};
</script>
<style scoped>
.btn-class {
  @apply rounded border px-2 py-1  focus:outline-none;
}
.sheet {
  @apply mb-1 flex items-center justify-between border-b border-dashed border-gray p-2;
}

.bg-ml.sheet,
.sheet:last-of-type,
.sheet:nth-child(2) {
  @apply border-0;
}
</style>
