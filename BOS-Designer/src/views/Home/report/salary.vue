<template>
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'Report' }"></C-Back-Nav>

    <section class="relative p-4">
      <div class="mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">薪資條</h1>
      </div>
      <div class="center my-4 flex justify-between px-4">
        <p><strong>設計師：</strong> {{ designerName + " | " + GETTER_MECHANTNAME }}</p>
      </div>
      <div
        class="center mb-2 flex flex-wrap gap-2 rounded-[10px] bg-white px-[1rem] pb-[2rem] pt-[1rem] font-sans text-sm font-normal"
      >
        <h2 class="w-full">日期選擇</h2>
        <button class="rounded border border-ml/25 px-2 focus:outline-none" @click="lastMonth">
          上個月
        </button>
        <button class="rounded border border-ml/25 px-2 focus:outline-none" @click="thisMonth">
          本月
        </button>
        <month-picker-input
          lang="zh"
          :input-pre-filled="true"
          :default-month="+this.$dayjs().month() + 1"
          :default-year="+$dayjs(new Date()).format('YYYY')"
          v-model="date"
        />
      </div>
      <div class="rounded-[10px] bg-white px-[1rem] py-[2rem] font-sans font-normal">
        <div v-if="isDataEmpty" class="text-center">尚無資料</div>
        <template v-else>
          <div class="flex flex-wrap border-b border-dashed border-gray py-4 pb-2 text-sm">
            <div
              class="mb-2 flex w-4/12 md:w-2/12"
              v-for="(item, index) in increaseItem"
              :key="index"
            >
              <div class="w-[100px] pl-1">{{ item.itemName }}</div>
              <div class="w-[60px] pl-2 text-left">{{ item.price }}</div>
            </div>
          </div>

          <div class="flex flex-wrap border-b border-dashed border-gray py-4 pb-2 text-sm">
            <div
              class="mb-2 flex w-4/12 md:w-2/12"
              v-for="(item, index) in decreaseItem"
              :key="index"
            >
              <div class="w-[100px] pl-1">{{ item.itemName }}</div>
              <div class="w-[60px] pl-2">{{ item.price }}</div>
            </div>
          </div>
          <div class="my-5 flex flex-wrap bg-[#fff]/80 text-sm">
            <div class="mb-3 w-4/12 pl-1 md:w-[14.285714%]">
              <div class="mb-2 w-full">實領薪資</div>
              <div class="w-full">{{ summary }}</div>
            </div>
            <div class="mb-3 w-4/12 pl-1 md:w-[14.285714%]">
              <div class="mb-2 w-full">互助獲得(點)</div>
              <div class="w-full">{{ helperPointRetrieve }}</div>
            </div>
            <div class="mb-3 w-4/12 pl-1 md:w-[14.285714%]">
              <div class="mb-2 w-full">指定實業績</div>
              <div class="w-full">{{ designateTruthPerformance }}</div>
            </div>
            <div class="mb-3 w-4/12 pl-1 md:w-[14.285714%]">
              <div class="mb-2 w-full">不指定實業績</div>
              <div class="w-full">{{ nonDesignateTruthPerformance }}</div>
            </div>
            <div class="mb-3 w-4/12 pl-1 md:w-[14.285714%]">
              <div class="mb-2 w-full">特抽總業績</div>
              <div class="w-full">{{ specialTruthPerformance }}</div>
            </div>
            <div class="mb-3 w-4/12 pl-1 md:w-[14.285714%]">
              <div class="mb-2 w-full">總實業績</div>
              <div class="w-full">{{ truthPerformance }}</div>
            </div>
            <div class="mb-3 w-4/12 pl-1 md:w-[14.285714%]">
              <div class="mb-2 w-full">備註</div>
              <div class="w-full">{{ remark }}</div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { MonthPickerInput } from 'vue-month-picker';

export default {
  name: 'salary-report',
  description: '薪資條',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 薪資條',
  },
  components: {
    MonthPickerInput,
  },
  data() {
    return {
      date: this.$dayjs('2022,11,10').valueOf(),
      designerName: 'LinKen',
      increaseItem: [],
      decreaseItem: [],
      summary: 0,
      helperPointRetrieve: 0,
      designateTruthPerformance: 0,
      nonDesignateTruthPerformance: 0,
      specialTruthPerformance: 0,
      truthPerformance: 0,
      remark: '',
      isDataEmpty: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.getUserSalaryReport();
    },
    arrayEmpty(array) {
      return array.length === 0;
    },
    async getUserSalaryReport() {
      const input = {
        date: this.$dayjs(this.date.from).valueOf(),
        isCellphone: true,
      };
      const resp = await this.$api.userSalaryReport(input);
      const { data, errors } = JSON.parse(JSON.stringify(resp.data));
      if (errors) return;
      if (!this.arrayEmpty(data.userSalaryReport)) {
        this.isDataEmpty = false;
        this.setData(data.userSalaryReport[0]);
      } else {
        this.isDataEmpty = true;
      }
    },
    setData(data) {
      this.designerName = data.name;
      this.increaseItem = data.increaseItem;
      this.decreaseItem = data.decreaseItem;
      this.summary = data.summary;
      this.helperPointRetrieve = data.helperPointRetrieve;
      this.designateTruthPerformance = data.designateTruthPerformance;
      this.nonDesignateTruthPerformance = data.nonDesignateTruthPerformance;
      this.specialTruthPerformance = data.specialTruthPerformance;
      this.truthPerformance = data.truthPerformance;
      this.remark = data.remark;
    },
    // 本月
    thisMonth() {
      const dt = new Date(Date.now());
      const y = dt.getFullYear();
      const m = dt.getMonth() + 1;
      const firstDay = new Date(y, m - 1, 1);
      this.date = +firstDay;
    },
    // // 上個月
    lastMonth() {
      const dt = new Date(Date.now());
      const y = dt.getFullYear();
      const m = dt.getMonth();
      const firstDay = new Date(y, m - 1, 1);
      this.date = +firstDay;
    },
  },
  watch: {
    date() {
      this.getUserSalaryReport();
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
  },
};
</script>

<style scoped>
::v-deep .month-picker__year button {
  width: 2.5rem !important;
}

::v-deep .month-picker-input {
  width: 100%;
  padding: 5px 0.5rem;
}
::v-deep .month-picker__year button {
  background-color: #fcfcfc;
  border: none;
  top: 4px;
}
</style>
