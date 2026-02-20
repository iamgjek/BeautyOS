<template>
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'ScheduleBreak' }"></C-Back-Nav>
    <section class="relative p-4">
      <div class="relative mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">新增預約</h1>
      </div>
      <ValidationObserver
        ref="orderForm"
        class="block rounded-[20px] bg-white px-[1rem] py-[2rem] font-sans font-normal"
      >
        <div class="my-2 flex items-center gap-2 text-left">
          <p class="item-text">預約時間 <small>/</small></p>
          <div class="flex w-9/12 gap-1">
            <ValidationProvider
              ref="orderDate"
              name="日期"
              rules="required"
              v-slot="{ errors }"
              class="w-3/5"
            >
              <VCCalendarSelect
                :min-date="new Date()"
                :placeholder="'選擇日期'"
                v-model="orderDate"
                :errors="errors"
              ></VCCalendarSelect>
            </ValidationProvider>
            <ValidationProvider
              ref="timeList"
              name="時間"
              rules="required"
              v-slot="{ errors }"
              class="w-2/5"
            >
              <C-Select
                class="h-[34px] w-full rounded-md border border-[#F1F1F1]"
                :list="timeList"
                v-model="orderTime"
                :placeholder="'時間'"
                item-text="name"
                item-value="id"
                object-return
                :errors="errors"
              ></C-Select>
            </ValidationProvider>
          </div>
        </div>
        <div class="my-2 flex items-center gap-2 text-left">
          <p class="item-text">預約時長 <small>/</small></p>
          <div class="w-9/12">
            <!-- <ValidationProvider ref="timeCost" name="預約時長" rules="required" v-slot="{ errors }">
              <C-Select class="items-center rounded-[10px] border border-[#F1F1F1] bg-white font-[14px]" :isFull="true" :list="timeCostRange"
            v-model="timeCost" item-text="label" item-value="value" :errors="errors"></C-Select>
            </ValidationProvider> -->
            <ValidationProvider ref="timeCost" name="預約時長" rules="required" v-slot="{ errors }">
              <label for="timeCostInput"></label>
              <select id="timeCostInput" class="w-full items-center rounded-[10px] border border-[#F1F1F1] bg-white px-2 py-1 focus:border-[#F1F1F1] active:border-[#F1F1F1]" :value="timeCost" @input="updateTimeCost">
                <option v-for="option in timeCostRange" :value="option.value" :key="option.value">{{ option.label }}</option>
              </select>
              <div class="error-message" :errors="errors"></div>
            </ValidationProvider>
          </div>
        </div>

        <div class="my-2 flex items-center gap-2 text-left">
          <p class="item-text">姓名 <small>/</small></p>
          <div class="w-9/12">
            <ValidationProvider ref="name" name="姓名" rules="required" v-slot="{ errors }">
              <C-Input v-model="name" class="mb-0" :errors="errors" :disabled="$route.query.name">
                <template v-slot:endIcon v-if="!$route.query.name">
                  <font-awesome-icon
                    v-if="name !== ''"
                    @click="name = ''"
                    icon="fa-regular fa-xmark"
                    class="text-[#F38E8C]"
                  />
                </template>
              </C-Input>
            </ValidationProvider>
          </div>
        </div>

        <div class="my-2 flex items-center gap-2 text-left">
          <p class="item-text">電話 <small>/</small></p>
          <div class="w-9/12">
            <ValidationProvider ref="cellphone" name="電話" rules="required" v-slot="{ errors }">
              <C-Input
                v-model="cellphone"
                class="mb-0"
                :errors="errors"
                :disabled="$route.query.cellphone"
                type="tel"
                maxLength="10"
              >
                <template v-slot:endIcon v-if="!$route.query.cellphone">
                  <font-awesome-icon
                    v-if="cellphone !== ''"
                    @click="cellphone = ''"
                    icon="fa-regular fa-xmark"
                    class="text-[#F38E8C]"
                  />
                </template>
              </C-Input>
            </ValidationProvider>
          </div>
        </div>

        <div class="my-2 flex items-center gap-2 text-left">
          <p class="item-text">指定預約 <small>/</small></p>
          <div
            class="flex w-9/12 select-none flex-nowrap items-center gap-2 text-center text-[13px] text-white"
          >
            <span
              class="flex w-[60px] items-center justify-center rounded-full border border-[#7D9AC5] bg-[#7D9AC5] py-2"
              :class="{ '!border-[#F1F1F1] !bg-white !text-[#888]': !isOrderDesigner }"
              @click="isOrderDesigner = true"
              @keypress="isOrderDesigner = true"
            >
              指定
            </span>
            <span
              class="flex w-[80px] items-center justify-center rounded-full border border-[#7D9AC5] bg-[#7D9AC5] py-2"
              :class="{ '!border-[#F1F1F1] !bg-white !text-[#888]': isOrderDesigner }"
              @click="isOrderDesigner = false"
              @keypress="isOrderDesigner = false"
            >
              不指定
            </span>
          </div>
        </div>

        <div class="my-2 flex gap-2 text-left">
          <label class="item-text">留言給顧客 <small>/</small></label>
          <div class="relative flex w-9/12 flex-nowrap gap-1">
            <textarea
              name="remark"
              v-model="messageForCustomer"
              rows="3"
              class="block w-full rounded-md border border-[#F1F1F1] bg-white p-1.5 text-sm outline-none focus:shadow-lg"
            ></textarea>
            <font-awesome-icon
              v-if="messageForCustomer"
              @click="messageForCustomer = ''"
              icon="fa-regular fa-xmark"
              class="absolute bottom-1 right-2 text-[#F38E8C]"
            />
          </div>
        </div>

        <div class="my-2 flex gap-2 text-left">
          <label class="item-text">備註 <small>/</small></label>
          <div class="relative flex w-9/12 flex-nowrap gap-1">
            <textarea
              name="remark"
              v-model="remark"
              rows="3"
              class="block w-full rounded-md border border-[#F1F1F1] bg-white p-1.5 text-sm outline-none focus:shadow-lg"
            ></textarea>
            <font-awesome-icon
              v-if="remark !== ''"
              @click="remark = ''"
              icon="fa-regular fa-xmark"
              class="absolute bottom-1 right-2 text-[#F38E8C]"
            />
          </div>
        </div>
        <div class="my-2 flex gap-2 text-left">
        <C-Checkbox-Full
          label="服務時間關閉預約"
          v-model="isBookingCostUsing"
          class="!justify-start pb-2 pt-4"

        ></C-Checkbox-Full>
        </div>

        <div
          class="mx-auto mt-10 w-[100px] rounded-full bg-[#F6BA7B] px-4 py-2 text-center text-[13px] text-white"
          @click="doFormValidate"
          @keypress="doFormValidate"
        >
          新增預約
        </div>
      </ValidationObserver>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import VCCalendarSelect from '../../../components/general/VC-CalendarSelect.vue';

export default {
  components: { VCCalendarSelect },
  name: 'schedule-add',
  description: '預約的首頁',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 預約',
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      orderDate: new Date(),
      orderTime: '',
      name: '',

      cellphone: '',
      remark: '',
      messageForCustomer: '',
      isOrderDesigner: true,
      timeList: [],
      timeCostRange: [
        { label: '請選擇', value: 0 },
        { label: '半小時', value: 1 },
        { label: '一小時', value: 2 },
        { label: '一個半小時', value: 3 },
        { label: '兩小時', value: 4 },
        { label: '兩個半小時', value: 5 },
        { label: '三小時', value: 6 },
        { label: '三個半小時', value: 7 },
        { label: '四小時', value: 8 },
        { label: '四個半小時', value: 9 },
        { label: '五小時', value: 10 },
        { label: '五個半小時', value: 11 },
        { label: '六小時', value: 12 },
        { label: '六個半小時', value: 13 },
        { label: '七小時', value: 14 },
        { label: '七個半小時', value: 15 },
        { label: '八小時', value: 16 },
      ],
      timeCost: 0,
      isBookingCostUsing: true,
    };
  },
  methods: {
    // 如果qeury 有姓名與電話則帶入資料
    init() {
      if (this.$route.query.name) {
        this.name = this.$route.query.name;
      }
      if (this.$route.query.cellphone) {
        this.cellphone = this.$route.query.cellphone;
      }
    },
    doRoute(item) {
      this.$router.push({ name: item.name });
    },
    async doFormValidate() {
      const isValidForm = await this.$refs.orderForm.validate();
      if (!isValidForm) return;
      this.doDelivery();
    },
    async doDelivery() {
      const submitForm = {
        designerId: this.userInfo.user.id,
        dateTime: this.$dayjs(
          `${this.$dayjs(this.orderDate).format('YYYY-MM-DD')} ${this.orderTime.name}`,
        ).valueOf(),
        timeCost: this.timeCost,
        cellphone: this.cellphone,
        merchantId: this.currentMechantId,
        name: this.name,
        remark: this.remark,
        isDesignate: this.isOrderDesigner,
        messageForCustomer: this.messageForCustomer,
        isBookingCostUsing: this.isBookingCostUsing,
      };
      // console.log(submitForm);
      const resp = await this.$api.bookingV2(submitForm);
      // console.log(resp);
      const { errors } = resp.data;
      if (errors) return;
      this.fireSwalToOrder();
      // await this.getTimeList();
    },
    fireSwalToOrder() {
      this.$swal
        .fire({
          title: ' ',
          html: `<div class="flex items-center justify-center my-10">
          <img src="/designer/assets/images/success.svg" alt="" class="inline-block mr-1" /><span>新增成功</span>
        </div>`,
          confirmButtonText: '回列表',
          showConfirmButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton:
              '!w-[144px] !rounded-full !bg-[#F6BA7B] !px-[14px] !py-2 !text-sm !text-white !border-0 !shadow-[0_0_0_0_transparent]',
            closeButton: '!shadow-[0_0_0_0_transparent]',
          },
        })
        .then((res) => {
          this.name = ''; // 送出成功之後把資料清空
          this.cellphone = '';
          this.messageForCustomer = '';
          this.remark = '';

          if (res.isConfirmed) {
            this.cellphone = '';
            this.name = '';
            this.isOrderDesigner = true;
            this.messageForCustomer = '';
            this.remark = '';
            this.$router.go(-1);
            // this.doRoute({ name: 'ScheduleBreak' });
          }
        });
    },
    async getTimeList() {
      this.orderTime = ''; // 原本設計是只要重打就把時間清除為了把送出成功之後把資料清空
      // adjust sbbmitForm for different api by isOrderDesigner
      const submitForm = () => (this.isOrderDesigner
        ? {
          date: this.$dayjs(this.orderDate).valueOf(),
          storeId: this.currentMechantId,
          designerId: this.userInfo.user.id,
        }
        : {
          storeId: this.currentMechantId,
          date: this.$dayjs(this.orderDate).valueOf(),
        });
      // adjust response schema by isOrderDesigner
      const respDataSchema = 'getBookingTimes';
      const resp = await this.$api[respDataSchema](submitForm());
      const { data, errors } = resp.data;
      if (errors) return;
      this.timeList = Array.isArray(data[respDataSchema])
        ? data[respDataSchema].map((item, index) => ({
          name: this.$dayjs(item.time).isValid()
            ? this.$dayjs(item.time).format('HH:mm')
            : item.time,
          id: `bookingTime${index}`,
          disabled: false,
          // disabled: item.status !== '可預約',
        }))
        : [];
    },
    updateTimeCost(event) {
      this.timeCost = parseInt(event.target.value, 10);
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
  },
  watch: {
    orderDate: {
      immediate: true,
      handler() {
        this.getTimeList();
      },
    },
    $route: {
      immediate: true,
      handler() {
        if (this.$route.params.date) {
          const day = this.$dayjs(this.$route.params.date).format();
          this.orderDate = day;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.item-text {
  @apply text-[#888888] w-1/3;
}
</style>
