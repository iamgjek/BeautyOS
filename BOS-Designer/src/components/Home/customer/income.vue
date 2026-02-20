<template>
  <div class="animate__animated animate__fadeIn animate__fast">
    <p
      class="before:contents-[''] relative my-3 pl-2 text-left before:absolute before:inset-0 before:inset-y-[2px] before:w-1 before:rounded-xl before:bg-ml"
    >
      入金餘額
    </p>

    <div class="rounded-[10px] bg-white px-[1rem] py-[2rem] font-sans font-normal">
      <div class="flex items-baseline text-second">
        <p class="flex items-center pl-2 text-[20px]">
          NT$
          <span class="ml-2">{{ walletCash }}</span>
        </p>
      </div>

      <div class="my-4 flex gap-2 text-ml">
        <button
          @click="(seletedTab = 1), switchAddEventListener()"
          :class="{ 'bg-ml text-white': seletedTab === 1 }"
          class="w-1/2 rounded-full border border-solid border-ml p-1 duration-150"
        >
          入金紀錄
        </button>
        <button
          @click="(seletedTab = 2), switchAddEventListener()"
          :class="{ 'bg-ml text-white': seletedTab === 2 }"
          class="w-1/2 rounded-full border border-solid border-ml p-1 duration-150"
        >
          入金使用
        </button>
      </div>

      <p v-if="resultList.length === 0 && seletedTab === 1" class="mt-20 text-sm text-stone-500">
        此客戶尚無入金紀錄
      </p>
      <p v-if="resultUseList.length === 0 && seletedTab === 2" class="mt-20 text-sm text-stone-500">
        此客戶尚無入金使用紀錄
      </p>

      <!-- 入金紀錄列表 -->
      <div class="animate__animated animate__fadeIn animate__slow" v-show="seletedTab === 1">
        <div
          class="px-2 pb-4"
          :class="{
            hidden: resultList.length === 0,
            'border-b border-solid border-primary/50': resultList.length > 1,
          }"
          v-for="(item, index) in resultList"
          :key="`consumption1${index}`"
        >
          <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
            <div class="w-2/5">日期</div>
            <div class="w-3/5">{{ $dayjs(item.date).format("YYYY/MM/DD") }}</div>
          </div>
          <!-- <div class="flex mb-2 pb-2 border-[#ccc] border-dashed">
          <div  class="w-2/5">實際付款金額</div>
          <div class="w-3/5">${{item.totalFee}}</div>
        </div> -->
          <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
            <div class="w-2/5">入金金額</div>
            <div class="w-3/5">${{ item.money }}</div>
          </div>
          <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
            <div class="w-2/5">設計師</div>
            <div class="w-3/5">{{ item.Maker.name }}</div>
          </div>
          <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
            <div class="w-2/5">付款方式</div>
            <div class="w-3/5">{{ item.payType }}</div>
          </div>
          <!-- <div class="flex mb-2 pb-2 border-[#ccc] border-dashed">
          <div  class="w-2/5">手續費負擔方</div>
          <div class="w-3/5">{{item.payMethodTaxi}}</div>
        </div> -->
          <div class="mb-2 flex pb-2">
            <div class="w-2/5">入金儲值手續費</div>
            <div class="w-3/5">{{ item.handlingFeeDecountPrice }}</div>
          </div>
          <!-- <div class="flex mb-2 pb-2 border-[#ccc] border-dashed">
          <div  class="w-2/5">備註</div>
          <div class="w-3/5">{{item.remark}}</div>
        </div> -->
        </div>
      </div>

      <!-- 使用紀錄列表 -->
      <div class="animate__animated animate__fadeIn animate__slow" v-show="seletedTab === 2">
        <div
          class="px-2 py-4"
          v-for="(item, index) in resultUseList"
          :class="{
            'border-b border-solid border-primary/50':
              resultUseList.length > 1 && index !== resultUseList.length - 1,
          }"
          :key="`consumption${index}`"
        >
          <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
            <div class="w-2/5">帳單編號</div>
            <div class="w-3/5">{{ item.orderNo }}</div>
          </div>
          <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
            <div class="w-2/5">帳單時間</div>
            <div class="w-3/5">{{ $dayjs(item.date).format("YYYY/MM/DD") }}</div>
          </div>
          <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
            <div class="w-2/5">設計師</div>
            <div class="w-3/5">{{ item.Designer.name }}</div>
          </div>
          <div class="mb-2 flex pb-2">
            <div class="w-2/5">使用金額</div>
            <div class="w-3/5">${{ item.money }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customer-component-income',
  mounted() {
    this.getWalletDepositRecords();
    this.getWallet();
  },
  // 元件離開時取消監聽
  deactivated() {
    window.removeEventListener('scroll', this.scrollGetAddRecords);
    window.removeEventListener('scroll', this.scrollGetUseRecords);
  },
  activated() {
    if (!this.addRecordsForm.isEnd && this.seletedTab === 1) window.addEventListener('scroll', this.scrollGetAddRecords);
    if (!this.usedRecordsForm.isEnd && this.seletedTab === 2) window.addEventListener('scroll', this.scrollGetUseRecords);
  },
  data() {
    return {
      seletedTab: 1,
      addRecordsForm: {
        pageOffset: 0,
        totalPage: 0,
        isEnd: false,
        isGetting: false,
      },
      usedRecordsForm: {
        pageOffset: 0,
        totalPage: 0,
        isEnd: false,
        isGetting: false,
      },
      resultList: [],
      resultUseList: [],
      walletCash: 0,
    };
  },
  methods: {
    // 切換 tab 時判斷是否需要監聽 scroll
    switchAddEventListener() {
      if (this.seletedTab === 1) {
        window.removeEventListener('scroll', this.scrollGetUseRecords);
        if (!this.addRecordsForm.isEnd) window.addEventListener('scroll', this.scrollGetAddRecords);
      } else {
        if (!this.usedRecordsForm.isEnd && this.resultUseList.length !== 0) window.addEventListener('scroll', this.scrollGetUseRecords);
        if (!this.usedRecordsForm.isEnd && this.resultUseList.length === 0) this.walletUseRecords();
        window.removeEventListener('scroll', this.scrollGetAddRecords);
      }
    },
    // 取得儲值紀錄
    async getWalletDepositRecords() {
      if (this.resultList.length === 0 && this.addRecordsForm.isEnd) return;

      const submitForm = {
        customerId: this.$route.query.id ? this.$route.query.id : '',
        pageLimit: 10,
        pageOffset: this.addRecordsForm.pageOffset,
        payType: [],
      };

      const res = await this.$api.walletDepositRecord(submitForm);
      const { data } = res.data;

      this.addRecordsForm.totalPage = Math.ceil(data.walletDepositRecord.totalCount / 10) - 1;
      this.addRecordsForm.isEnd = Math.ceil(data.walletDepositRecord.totalCount / 10) === 1;
      this.resultList = data.walletDepositRecord.record;

      if (this.addRecordsForm.pageOffset < this.addRecordsForm.totalPage) window.addEventListener('scroll', this.scrollGetAddRecords);
    },
    // 滾動加載儲值紀錄
    async scrollGetAddRecords() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if (
        !this.addRecordsForm.isEnd
        && !this.addRecordsForm.isGetting
        && scrollTop + windowHeight >= scrollHeight - 50
      ) {
        this.addRecordsForm.isGetting = true;
        this.addRecordsForm.pageOffset += 1;

        if (this.addRecordsForm.pageOffset >= this.addRecordsForm.totalPage) {
          this.addRecordsForm.isEnd = true;
          window.removeEventListener('scroll', this.scrollGetAddRecords);
        }

        const input = {
          customerId: this.$route.query.id ? this.$route.query.id : '',
          pageLimit: 10,
          pageOffset: this.addRecordsForm.pageOffset,
          payType: [],
        };

        const res = await this.$api.walletDepositRecord(input);
        const { data } = res.data;

        this.addRecordsForm.isGetting = false;
        this.resultList = this.resultList.concat(data.walletDepositRecord.record);
      }
    },
    // 取得使用紀錄
    async walletUseRecords() {
      if (this.resultUseList.length === 0 && this.usedRecordsForm.isEnd) return;

      const submitForm = {
        customerId: this.$route.query.id ? this.$route.query.id : '',
        pageLimit: 10,
        pageOffset: this.usedRecordsForm.pageOffset,
        payType: [],
      };

      const res = await this.$api.walletUseRecord(submitForm);
      const { data } = res.data;

      this.usedRecordsForm.totalPage = Math.ceil(data.walletUseRecord.totalCount / 10) - 1;
      this.usedRecordsForm.isEnd = Math.ceil(data.walletUseRecord.totalCount / 10) === 1;
      this.resultUseList = data.walletUseRecord.record;

      if (this.usedRecordsForm.pageOffset < this.usedRecordsForm.totalPage) window.addEventListener('scroll', this.scrollGetUseRecords);
    },
    // 滾動加載使用紀錄
    async scrollGetUseRecords() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if (
        !this.usedRecordsForm.isEnd
        && !this.usedRecordsForm.isGetting
        && scrollTop + windowHeight >= scrollHeight - 50
      ) {
        this.usedRecordsForm.isGetting = true;
        this.usedRecordsForm.pageOffset += 1;

        if (this.usedRecordsForm.pageOffset >= this.usedRecordsForm.totalPage) {
          this.usedRecordsForm.isEnd = true;
          window.removeEventListener('scroll', this.scrollGetUseRecords);
        }

        const submitForm = {
          customerId: this.$route.query.id ? this.$route.query.id : '',
          pageLimit: 10,
          pageOffset: this.usedRecordsForm.pageOffset,
          payType: [],
        };

        const res = await this.$api.walletUseRecord(submitForm);
        const { data } = res.data;

        this.usedRecordsForm.isGetting = false;
        this.resultUseList = this.resultUseList.concat(data.walletUseRecord.record);
      }
    },
    // 取得剩餘入金
    async getWallet() {
      const submitForm = {
        customerId: this.$route.query.id ? this.$route.query.id : '',
      };

      const res = await this.$api.customerWallet(submitForm);
      const { data } = res.data;

      this.walletCash = data.customerWallet;
    },
  },
};
</script>

<style></style>
