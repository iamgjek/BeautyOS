<template>
  <div>
    <C-Loading-Overlay
      :value="value"
      @input="$emit('input', !value)"
      @doFunction="$emit('input', !value)"
      :layerIndex="10"
    ></C-Loading-Overlay>

    <transition name="fromleft">
      <div v-show="value">
        <div
          class="fixed inset-0 top-[140px] z-20 grid h-[calc(100%-140px)] w-full grid-cols-1 grid-rows-[37px_minmax(0,1fr)_62px] bg-white"
        >
          <p class="border-b border-solid border-ml p-2 text-sm">篩選</p>
          <div class="overflow-y-auto">
            <div class="p-[14px] pb-0">
              <p class="mb-1 pl-1 text-left">生日</p>
              <div class="flex gap-2">
                <div v-click-outside="showYear" class="month-picker-input-container !w-1/2">
                  <C-Input
                    v-model="propsSearchAdvanceCtx.year"
                    placeholder="請輸入年分"
                    divClass="border-ml/50"
                    type="tel"
                    max-length="3"
                  >
                    <template v-slot:endIcon>
                      <font-awesome-icon
                        v-if="propsSearchAdvanceCtx.year !== ''"
                        @click="propsSearchAdvanceCtx.year = ''"
                        icon="fa-regular fa-xmark"
                        class="text-rose-600"
                      />
                    </template>
                  </C-Input>
                </div>
                <div v-click-outside="showMonth" class="month-picker-input-container !w-1/2">
                  <label @click="isMonthToggle = true" @keypress="isMonthToggle = true">
                    <C-Input
                      v-model="propsSearchAdvanceCtx.month"
                      divClass="border-ml/50"
                      placeholder="請選擇月"
                      :readOnly="true"
                    >
                      <template v-slot:endIcon>
                        <font-awesome-icon
                          v-if="propsSearchAdvanceCtx.month !== ''"
                          @click="propsSearchAdvanceCtx.month = ''"
                          icon="fa-regular fa-xmark"
                          class="text-rose-600"
                        />
                      </template>
                    </C-Input>
                    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
                    <input
                      type="text"
                      placeholder="請選擇月"
                      readonly
                      class="month-picker-input hidden"
                    />
                  </label>
                  <month-picker
                    v-show="isMonthToggle"
                    @change="showDateMonth"
                    :no-default="true"
                    :show-year="false"
                    lang="zh"
                    class="z-50"
                  ></month-picker>
                </div>
              </div>
            </div>

            <p class="border-b border-solid border-ml p-2 text-sm"></p>

            <div class="m-4 flex gap-2 text-ml">
              <button
                @click="seletedTab = 1"
                :class="[`${seletedTab === 1 ? 'bg-ml text-white' : ''}`]"
                class="w-1/2 rounded-full border border-solid border-ml p-1 duration-500"
              >
                消費區間
              </button>
              <button
                @click="seletedTab = 2"
                :class="[`${seletedTab === 2 ? 'bg-ml text-white' : ''}`]"
                class="w-1/2 rounded-full border border-solid border-ml p-1 duration-500"
              >
                基準日期
              </button>
            </div>

            <div
              class="animate__animated animate__fadeIn animate__fast p-[14px] pb-0"
              v-if="seletedTab === 1"
            >
              <p class="mb-1 pl-1 text-left">區間</p>
              <div class="mb-4 flex gap-2">
                <C-Select
                  class="w-full rounded-md border border-solid border-ml/50"
                  :list="custRange"
                  v-model="dateRecent"
                  :disabled="baseDate !== null || aheadbackSelected !== '' || dateNunm !== ''"
                  :placeholder="'消費區間'"
                  item-text="label"
                  item-value="value"
                  :isFull="true"
                  object-return
                ></C-Select>
              </div>
            </div>

            <div
              class="animate__animated animate__fadeIn animate__fast p-[14px] pb-0"
              v-if="seletedTab === 2"
            >
              <p class="mb-1 pl-1 text-left">基準日期</p>
              <div class="mb-4 flex gap-2">
                <C-vc-calendar-select
                  class="w-full rounded-md border border-solid border-ml/50"
                  :placeholder="'選擇日期'"
                  v-model="baseDate"
                  :disabled="dateRecent.value !== 0"
                ></C-vc-calendar-select>
              </div>
              <p class="mb-1 pl-1 text-left">往前往後</p>
              <div class="mb-4 flex gap-2">
                <C-Select
                  class="w-full rounded-md border border-solid border-ml/50"
                  :list="aheadback"
                  v-model="aheadbackSelected"
                  :disabled="dateRecent.value !== 0"
                  item-text="label"
                  item-value="value"
                ></C-Select>
              </div>
              <p class="mb-1 pl-1 text-left">天數</p>
              <div class="flex gap-2">
                <C-Input
                  class="mb-1 w-full"
                  divClass="border-ml/50"
                  type="tel"
                  v-model="dateNunm"
                  :placeholder="'請輸入消費區間的天數'"
                  :disabled="dateRecent.value !== 0"
                ></C-Input>
              </div>
            </div>

            <p class="border-b border-solid border-ml p-2 text-sm"></p>
            <div class="p-[14px] pb-0">
              <p class="mb-1 w-full pl-1 text-left">偏好設計師</p>
              <div class="mb-4 flex gap-2">
                <C-Select
                  class="w-full rounded-md border border-solid border-ml/50"
                  :isFull="true"
                  :list="preferDesigner"
                  v-model="preferDesignerSelected"
                  item-text="name"
                  item-value="id"
                ></C-Select>
              </div>
              <p class="mb-1 w-full pl-1 text-left">最近設計師</p>
              <div class="mb-4 flex gap-2">
                <C-Select
                  class="w-full rounded-md border border-solid border-ml/50"
                  :isFull="true"
                  :list="latestDesigner"
                  v-model="latestDesignerSelected"
                  item-text="name"
                  item-value="id"
                ></C-Select>
              </div>
            </div>

            <p class="border-b border-solid border-ml p-2 text-sm"></p>
            <div class="p-[14px] pb-0">
              <p class="mb-1 pl-1 text-left">來店消費</p>
              <div class="flex gap-2">
                <!-- <C-Checkbox-Full v-model="propsSearchAdvanceCtx.customerIsCome" :label="'來店消費'"></C-Checkbox-Full> -->
                <input
                  type="radio"
                  id="all"
                  :value="null"
                  v-model="propsSearchAdvanceCtx.customerIsCome"
                />
                <label for="all">全部</label>
                <br />
                <input
                  type="radio"
                  id="had"
                  :value="true"
                  v-model="propsSearchAdvanceCtx.customerIsCome"
                />
                <label for="had">有</label>
                <br />
                <input
                  type="radio"
                  id="havent"
                  :value="false"
                  v-model="propsSearchAdvanceCtx.customerIsCome"
                />
                <label for="havent">無</label>
              </div>
              <br />
            </div>
          </div>

          <div class="mx-[14px] my-3 flex justify-around gap-3">
            <button
              class="w-1/2 rounded-full border border-solid border-ml px-[14px] py-2 text-sm text-black"
              @click="clearFunction"
            >
              <span>清除所有搜尋</span>
            </button>
            <button
              class="w-1/2 rounded-full bg-ml px-[14px] py-2 text-sm text-white"
              @click="doFunction"
            >
              <span>搜尋</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { MonthPicker } from 'vue-month-picker';

export default {
  name: 'DefaultFilterWrap',
  components: { MonthPicker },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    searchAdvanceCtx: {
      type: Object,
      required: true,
    },
  },
  beforeUpdate() {
    this.latestDesigner = this.propsSearchAdvanceCtx.designer.latestDesigner;
    this.preferDesigner = this.propsSearchAdvanceCtx.designer.preferDesigner;
    console.log(this.latestDesigner);
    console.log(this.preferDesigner);
  },
  data() {
    return {
      seletedTab: 1,
      isYearToggle: false,
      isMonthToggle: false,
      baseDate: null,
      dateNunm: '',
      dateYYYY: '',
      dateMM: '',
      aheadbackSelected: '',
      dateRecent: { label: '請選擇', value: 0 },
      custRange: [
        { label: '請選擇', value: 0 },
        { label: '最近三個月', value: 1 },
        { label: '最近六個月', value: 2 },
        { label: '最近十二個月', value: 3 },
      ],
      aheadback: [
        { label: '請選擇', value: '' },
        { label: '往前', value: 'LESSTHAN' },
        { label: '往後', value: 'GREATERTHAN' },
      ],
      latestDesignerSelected: '',
      latestDesigner: [],
      preferDesignerSelected: '',
      preferDesigner: [],
    };
  },
  methods: {
    doFunction() {
      if (this.baseDate !== null || this.aheadbackSelected !== '' || this.dateNunm !== '') {
        if (this.baseDate !== null && this.aheadbackSelected !== '' && this.dateNunm !== '') {
          this.$emit('doFunction');
        } else {
          const errMsgList = [
            `${this.baseDate === null ? '基準日期' : ''}`,
            `${this.aheadbackSelected === '' ? '往前往後' : ''}`,
            `${this.dateNunm === '' ? '天數' : ''}`,
          ];
          const errMsg = errMsgList
            .filter((item) => item !== '')
            .toString()
            .replace(',', '/');
          console.log(errMsg);
          this.$swal.fire({
            icon: 'info',
            title: `請選擇 ${errMsg}`,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      } else {
        this.$emit('doFunction');
      }
    },
    clearFunction() {
      this.dateNunm = '';
      this.baseDate = null;
      this.aheadbackSelected = '';
      this.latestDesignerSelected = '';
      this.preferDesignerSelected = '';
      this.dateRecent = { label: '請選擇', value: 0 };
      this.$forceUpdate();
      this.$emit('clearFunction');
    },
    showYear() {
      this.isYearToggle = false;
    },
    showMonth() {
      this.isMonthToggle = false;
    },
    showDateYear(date) {
      this.propsSearchAdvanceCtx.year = date.year;
    },
    showDateMonth(date) {
      this.propsSearchAdvanceCtx.month = date.month;
      this.showMonth();
    },
  },
  watch: {
    dateRecent: {
      deep: true,
      handler(item) {
        const currentFirstDay = this.$dayjs().startOf('month');
        const actions = new Map([
          [0, { startDate: '', endDate: '' }],
          [
            1,
            {
              endDate: this.$dayjs(currentFirstDay).valueOf(),
              startDate: this.$dayjs(currentFirstDay).add(-3, 'month').valueOf(),
            },
          ],
          [
            2,
            {
              endDate: this.$dayjs(currentFirstDay).valueOf(),
              startDate: this.$dayjs(currentFirstDay).add(-6, 'month').valueOf(),
            },
          ],
          [
            3,
            {
              endDate: this.$dayjs(currentFirstDay).valueOf(),
              startDate: this.$dayjs(currentFirstDay).add(-12, 'month').valueOf(),
            },
          ],
        ]);
        this.propsSearchAdvanceCtx.consumptionRange.startDate = actions.get(item.value).startDate;
        this.propsSearchAdvanceCtx.consumptionRange.endDate = actions.get(item.value).endDate;
      },
    },
    baseDate() {
      this.propsSearchAdvanceCtx.baseDateRange.baseDate = this.$dayjs(this.baseDate).isValid()
        ? this.$dayjs(this.$dayjs(this.baseDate).startOf('day')).valueOf()
        : '';
    },
    aheadbackSelected(value) {
      this.propsSearchAdvanceCtx.baseDateRange.toDate = value;
    },
    dateNunm(value) {
      this.propsSearchAdvanceCtx.baseDateRange.dayNumber = value;
    },
    seletedTab() {
      this.clearFunction();
    },
    latestDesignerSelected(value) {
      this.propsSearchAdvanceCtx.designer.latestDesignerSelected = value;
    },
    preferDesignerSelected(value) {
      this.propsSearchAdvanceCtx.designer.preferDesignerSelected = value;
    },
  },
  computed: {
    propsSearchAdvanceCtx: {
      get() {
        return this.searchAdvanceCtx;
      },
      set(value) {
        console.log(value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.month-picker-input-container {
  position: relative;
}

.month-picker-input {
  padding: 0.5em 0.5em;
  font-size: 0.85em;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  transition: all 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.month-picker-input:focus {
  border-color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.month-picker__container {
  position: absolute;
  top: 3.5em;
}
</style>
