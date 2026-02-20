<template>
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'ScheduleBreak' }"></C-Back-Nav>
    <section class="relative p-4">
      <div class="relative mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">新增事件</h1>
      </div>
      <ValidationObserver
        ref="orderForm"
        class="block rounded-[20px] bg-white px-[1rem] py-[2rem] font-sans font-normal"
      >
        <div class="my-2 flex items-center gap-2 text-left">
          <p class="w-3/12">時間</p>
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
                class="h-[34px] w-full rounded-md border border-solid border-[#F1F1F1]"
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

        <!-- 事件說明 -->

        <div class="my-2 flex gap-2 text-left">
          <label class="w-3/12">事件說明</label>
          <div class="relative flex w-9/12 flex-nowrap gap-1">
            <textarea
              name="remark"
              id=""
              v-model="remark"
              rows="3"
              class="block w-full rounded-md border border-[#F1F1F1] bg-white p-1.5 text-sm outline-none focus:shadow-lg"
            ></textarea>
            <font-awesome-icon
              v-if="remark !== ''"
              @click="remark = ''"
              icon="fa-regular fa-xmark"
              class="absolute bottom-1 right-2 text-rose-600"
            />
          </div>
        </div>

        <div
          class="mx-auto mt-10 w-[100px] rounded-full bg-[#82BC95] px-4 py-2 text-center text-[13px] text-white"
          @click="doFormValidate"
          @keypress="doFormValidate"
        >
          新增事件
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
  name: 'schedule-event',
  description: '行事曆事件',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 事件',
  },
  data() {
    return {
      orderDate: new Date(),
      orderTime: '',
      name: '',
      cellphone: '',
      remark: '',
      isOrderDesigner: true,
      timeList: [],
    };
  },

  methods: {
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
        date: this.$dayjs(
          `${this.$dayjs(this.orderDate).format('YYYY-MM-DD')} ${this.orderTime.name}`,
        ).valueOf(),
        text: this.remark,
      };
      const resp = await this.$api.createEvent({ input: submitForm });
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
            confirmButton: '!w-[144px] !rounded !bg-second !px-[14px] !py-2 !text-sm !text-white',
          },
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.remark = '';
            this.doRoute({ name: 'ScheduleBreak' });
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
