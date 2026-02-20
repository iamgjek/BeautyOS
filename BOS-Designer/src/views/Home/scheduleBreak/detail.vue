<template>
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'ScheduleBreak' }"></C-Back-Nav>
    <section v-if="resultItem" class="relative p-4">
      <p class="mb-2 text-center text-lg font-semibold">
        {{ $route.query.isReview ? "預約內容" : "預約明細" }}
      </p>
      <div class="rounded-[20px] bg-white px-[1rem] py-[2rem] font-sans font-medium">
        <div class="item-row">
          <p class="text-title w-1/3">預約時間 <small>/</small></p>
          <p class="w-2/3" v-if="isEdit">
            <vc-date-picker v-model="resultItem.date" mode="dateTime" :minute-increment="30"
              :valid-hours="{ min: 10, max: 20 }" is24hr :min-date="$dayjs().format('YYYY-MM-DD')">
              <template v-slot="{ inputValue, inputEvents }">
                <input class="w-full rounded-md border border-[#F1F1F1] p-1.5 outline-none focus:shadow-lg"
                  placeholder="請選擇日期" :value="inputValue" v-on="inputEvents" />
              </template>
            </vc-date-picker>
          </p>
          <p class="w-1/3" v-if="!isEdit">{{ resultItem.date | dateFmtROCMMDD }}</p>
          <p class="w-1/3" v-if="!isEdit">{{ resultItem.date | dateFmtHm }}</p>
        </div>
        <div class="item-row">
          <p class="text-title w-1/3">預約時長 <small>/</small></p>

          <!-- <C-Select class=" w-2/3 items-center rounded-[10px] border border-[#F1F1F1] bg-white font-[14px]" :isFull="false" :list="timeCostRange" v-if="isEdit"
            v-model="resultItem.timeCost" item-text="label" item-value="value"></C-Select> -->
            <label for="timeCostInput"></label>
            <select id="timeCostInput" class="w-2/3 items-center rounded-[10px] border border-[#F1F1F1] bg-white" :value="resultItem.timeCost" v-if="isEdit" @input="updateTimeCost">
              <option value="" disabled>請選擇</option>
              <option v-for="option in timeCostRange" :value="option.value" :key="option.value">{{ option.label }}</option>
            </select>

          <p class="w-2/3" v-else>{{ transdata(resultItem.timeCost) }}</p>
        </div>

        <div class="item-row">
          <p class="text-title w-1/3">姓名 <small>/</small></p>
          <C-Input v-if="isEdit" v-model="resultItem.customer.name" :placeholder="'輸入客戶姓名'" class="!m-0 w-2/3"></C-Input>
          <p class="w-1/3" v-else>{{ resultItem.customer.name }}</p>
          <div class="w-1/3" v-if="!isEdit">
            <img src="@/static/images/users-light.svg" alt="users" class="inline-block w-[18px] cursor-pointer"
              @keypress="doRouteCustomer(resultItem.customer)" @click="doRouteCustomer(resultItem.customer)" />
          </div>

        </div>

        <div class="item-row">
          <p class="text-title w-1/3">電話 <small>/</small></p>
          <C-Input v-if="isEdit" v-model="resultItem.customer.cellphone" :placeholder="'輸入客戶姓名'"
            class="!m-0 w-2/3"></C-Input>
          <p class="w-2/3" v-else>{{ resultItem.customer.cellphone }}</p>
        </div>

        <div class="item-row">
          <p class="text-title w-1/3">設計師 <small>/</small></p>
          <p class="w-2/3">
            {{ resultItem.designer ? resultItem.designer.name : resultItem.designer }}
          </p>
        </div>
        <div class="item-row">
          <p class="text-title w-1/3">指定預約 <small>/</small></p>
          <div v-if="isEdit" class="font-normal">
            <!-- <div v-if="isEdit"> -->
            <span
              class="mr-2 inline-block w-[80px] select-none rounded-full border border-[#7D9AC5] bg-[#7D9AC5] py-1 text-center text-white"
              :class="{ '!border-[#F1F1F1] !bg-white !text-[#888]': !isDesignate }" @click="setDesignate(true)"
              @keypress="sIsDesignate(true)">
              指定
            </span>
            <span
              class="inline-block w-[80px] select-none rounded-full border border-[#7D9AC5] bg-[#7D9AC5] py-1 text-center text-white"
              :class="{ '!border-[#F1F1F1] !bg-white !text-[#888]': isDesignate }" @click="setDesignate(false)"
              @keypress="setDesignate(false)">
              不指定
            </span>
          </div>
          <p class="w-2/3" v-else>{{ resultItem.isDesignate ? "指定" : "不指定" }}</p>
        </div>
        <div class="item-row">
          <label class="text-title w-1/3">我的備註 <small>/</small></label>
          <div class="relative w-2/3">
            <textarea v-if="isEdit" name="remark" v-model="resultItem.remark" rows="3" class="text-area"></textarea>
            <p v-else>{{ resultItem.remark }}</p>
            <font-awesome-icon v-if="resultItem.remark !== '' && isEdit" @click="resultItem.remark = ''"
              icon="fa-regular fa-xmark" class="absolute bottom-2 right-2 text-rose-600" />
          </div>
        </div>
        <div class="item-row">
          <label class="text-title w-1/3">顧客備註 <small>/</small></label>
          <div class="relative w-2/3">
            <p name="remark" class="w-full">{{ resultItem.remarkForCustomer }}</p>
          </div>
        </div>
        <div class="item-row" :class="{ '!border-0': !isEdit }">
          <label class="text-title w-1/3">留言給顧客 <small>/</small></label>
          <div class="relative w-2/3">
            <textarea v-if="isEdit" name="messageForCustomer" v-model="resultItem.messageForCustomer" rows="3"
              class="text-area"></textarea>
            <p v-else>{{ resultItem.messageForCustomer }}</p>
            <font-awesome-icon v-if="resultItem.messageForCustomer !== '' && isEdit"
              @click="resultItem.messageForCustomer = ''" icon="fa-regular fa-xmark"
              class="absolute bottom-2 right-2 text-[#F38E8C]" />
          </div>
        </div>
        <div class="item-row" :class="{ '!border-0': !isEdit }">
          <C-Checkbox-Full
          label="服務時間關閉預約"
          v-model="resultItem.isBookingCostUsing"
          class="!justify-start pb-2 pt-4"
          :disabled="!isEdit"
        ></C-Checkbox-Full>
        </div>

        <div class="mt-6" v-if="resultItem.status !== '待審查' && resultItem.status !== '已完成' && isEdit">
          <div class="m-auto flex max-w-[475px] justify-around p-2">
            <div
              class="flex w-1/3 items-center justify-center gap-2 rounded-full bg-[#82BC94] px-[14px] py-2 text-sm text-white"
              @click="clickStatus(true, '預約成功')" @keypress="clickStatus(true, '預約成功')">
              <font-awesome-icon icon="fa-regular fa-circle-check"
                class="animate__animated animate__heartBeat animate__fast text-xl" v-if="resultItem.status === '預約成功'" />
              <span>接單</span>
            </div>
            <div
              class="flex w-1/3 items-center justify-center gap-2 rounded-full bg-[#F38E8C] px-[14px] py-2 text-sm text-white"
              @click="clickStatus(false, '設計師已取消')" @keypress="clickStatus(false, '設計師已取消')">
              <font-awesome-icon icon="fa-regular fa-circle-check"
                class="animate__animated animate__heartBeat animate__fast text-xl" v-if="resultItem.status === '設計師已取消'"
                @click="resultItem.status === '設計師已取消'" />
              <span>拒絕</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4" v-if="resultItem.status === '待審查'">
        <p class="text-center text-lg font-semibold">選擇審查狀態</p>
        <div class="m-auto flex max-w-[475px] justify-around p-2">
          <div class="w-1/3 rounded-full bg-[#82BC94] px-[14px] py-2 text-sm text-white" @click="toggleDialog('accept')"
            @keypress="toggleDialog('accept')">
            接單
          </div>
          <div class="w-1/3 rounded-full bg-[#F38E8C] px-[14px] py-2 text-sm text-white" @click="toggleDialog('reject')"
            @keypress="toggleDialog('reject')">
            拒絕
          </div>
        </div>
      </div>

      <!-- 非修改預約狀態 -->
      <div class="mt-4" v-if="resultItem.status !== '待審查' && resultItem.status !== '已完成' && !isEdit">
        <div class="m-auto flex max-w-[475px] justify-around p-2">
          <div
            class="flex w-1/3 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#82BC94] px-[14px] py-2 text-sm text-white"
            @click="updateVerifyBookingInput(true)" @keypress="updateVerifyBookingInput(true)">
            <font-awesome-icon icon="fa-regular fa-circle-check"
              class="animate__animated animate__heartBeat animate__fast text-xl" v-if="resultItem.status === '預約成功'" />
            <span>接單</span>
          </div>
          <div
            class="flex w-1/3 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#F38E8C] px-[14px] py-2 text-sm text-white"
            @click="updateVerifyBookingInput(false)" @keypress="updateVerifyBookingInput(false)">
            <font-awesome-icon icon="fa-regular fa-circle-check"
              class="animate__animated animate__heartBeat animate__fast text-xl" v-if="resultItem.status === '設計師已取消'"
              @click="resultItem.status === '設計師已取消'" />
            <span>拒絕</span>
          </div>
        </div>
      </div>

      <!-- 修改預約狀態 -->

      <!-- 修改預約狀態 -->

      <div class="mx-auto my-5 flex max-w-[475px] justify-around p-2" v-if="resultItem.status !== '0'">
        <div class="w-full rounded-full bg-[#F6BA7B] px-4 py-2 text-center text-white"
          @click="doSubmitEdit(), (isEdit = !isEdit)" @keypress="doSubmitEdit(), (isEdit = !isEdit)">
          {{ isEdit ? "儲存預約" : "修改預約" }}
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'schedule-edit',
  description: '預約單的審查',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 預約',
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      isEdit: false,
      resultItem: null,
      isDesignate: true,
      isApproval: null,

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
    };
  },
  activated() {
    this.init();
  },
  methods: {
    transdata(data) {
      if (data === 1) {
        return '半小時';
      } if (data === 2) {
        return '一個小時';
      } if (data === 3) {
        return '一個半小時';
      } if (data === 4) {
        return '兩個小時';
      } if (data === 5) {
        return '兩個半小時';
      } if (data === 6) {
        return '三個小時';
      } if (data === 7) {
        return '三個半小時';
      } if (data === 8) {
        return '四個小時';
      } if (data === 9) {
        return '四個半小時';
      } if (data === 10) {
        return '五個小時';
      } if (data === 11) {
        return '五個半小時';
      } if (data === 12) {
        return '六個小時';
      } if (data === 13) {
        return '六個半小時';
      } if (data === 14) {
        return '七個小時';
      } if (data === 15) {
        return '七個半小時';
      } if (data === 16) {
        return '八個小時';
      }
      return '';
    },
    setDesignate(data) {
      this.isDesignate = data;
    },
    async init() {
      await this.getOrder(this.$route.query.id);
    },
    doRoute() {
      // this.$router.push({ name: 'ScheduleBreak' });
      this.$router.go(-1);
    },
    doRouteCustomer(item) {
      this.$router.push({ name: 'Customer-UserInfo', query: { id: item.id } });
    },
    async getOrder(orderId) {
      const res = await this.$api.order({ orderId });
      const { data, errors } = res.data;
      if (errors) return {};
      if (data.order.status === '待審核') {
        this.isApproval = null;
      } else if (data.order.status === '預約成功') {
        this.isApproval = true;
      } else {
        this.isApproval = false;
      }
      // console.log(data.order);
      this.resultItem = data.order;
      this.isDesignate = data.order.isDesignate;
      this.isnotDesignate = !this.isDesignate;
      return res;
    },
    async doSubmitEdit() {
      if (!this.isEdit) return;
      const submit = {
        id: this.$route.query.id,
        remark: this.resultItem.remark,
        isDesignate: this.isDesignate,
        messageForCustomer: this.resultItem.messageForCustomer,
        date: new Date(this.resultItem.date).getTime(),
        customerCellphone: this.resultItem.customer.cellphone,
        customerName: this.resultItem.customer.name,
        timeCost: this.resultItem.timeCost,
        isBookingCostUsing: this.resultItem.isBookingCostUsing,
      };
      // console.log(submit);
      const resp = await this.$api.updateBooking(submit);
      const { data, errors } = resp.data;
      if (errors) return;
      this.resultItem = data.updateBooking;
      console.log('this.resultItem.stauts ', this.resultItem.status);
      console.log(this.isApproval);

      let defulatValue = null;
      if (this.resultItem.status === '預約成功') {
        defulatValue = true;
      } else {
        defulatValue = false;
      }

      if (this.isApproval !== defulatValue) {
        await this.updateVerifyBookingInput(this.isApproval);
      }

      this.$swal
        .fire({
          title: ' ',
          html: `<div class="flex items-center justify-center">
          <img src="/designer/assets/images/success.svg" alt="" class="inline-block mr-1" /><span>修改成功</span>
        </div>
        <br/>`,
          confirmButtonText: '回到列表',
          showConfirmButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton:
              '!w-[144px] !rounded-full !bg-[#F6BA7B] !px-[14px] !py-2 !text-sm !text-white !border-0 !shadow-[0_0_0_0_transparent]',
            closeButton: '!shadow-[0_0_0_0_transparent]',
          },
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.doRoute();
          }
        });
    },
    toggleDialog(actionType) {
      this.$swal
        .fire({
          input: 'text',
          title: ' ',
          html: `<div class="flex items-center justify-center">
          ${actionType === 'accept'
    ? '<img src="/designer/assets/images/success.svg" alt="" class="inline-block mr-1" /><span>確認接單</span>'
    : '<img src="/designer/assets/images/error.svg" alt="" class="inline-block mr-1" /><span>已拒絕</span>'
}
        </div>`,
          inputPlaceholder: '請輸入備註說明',
          confirmButtonText: '送出',
          showConfirmButton: true,
          showCloseButton: true,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster',
          },
          customClass: {
            confirmButton: '!w-[144px] !rounded !bg-second !px-[14px] !py-2 !text-sm !text-white',
          },
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.$swal
              .fire({
                showCloseButton: true,
                html: `<div class="flex items-center justify-center my-10">
              ${actionType === 'accept'
    ? '<img src="/designer/assets/images/success.svg" alt="" class="inline-block mr-1" /><span>接單成功</span>'
    : '<img src="/designer/assets/images/error.svg" alt="" class="inline-block mr-1" /><span>拒絕成功</span>'
}
            </div>`,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              })
              .then(() => {
                this.doRoute();
              });
          }
        });
    },
    clickStatus(isApproval, status) {
      this.isApproval = isApproval;
      this.resultItem.status = status;
    },
    async updateVerifyBookingInput(isApproval) {
      const submit = { orderId: this.resultItem.id, isApproval };
      const res = await this.$api.VerifyBookingInput(submit);
      const { errors } = res.data;
      if (errors) return;
      await this.getOrder(this.$route.query.id);
      // if (resultItem.status === '預約成功' && isApproval) return;
      // if (resultItem.status === '設計師已取消' && !isApproval) return;
      // const res = await this.$api.VerifyBookingInput({ orderId: resultItem.id, isApproval });
      // const { errors } = res.data;
      // if (errors) return;
      // await this.getOrder(this.$route.query.id);
    },
    updateTimeCost(event) {
      this.resultItem.timeCost = parseInt(event.target.value, 10);
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo']),
  },
};
</script>

<style lang="scss" scoped>
.item-row {
  @apply my-2 p-2 flex items-center border-b border-solid border-[#F1F1F1];
}

.text-title {
  @apply text-[#888] font-normal;
}

.text-area {
  @apply block w-full rounded-md border bg-white border-[#F1F1F1] p-1.5 text-sm outline-none focus:shadow-lg;
}
</style>
