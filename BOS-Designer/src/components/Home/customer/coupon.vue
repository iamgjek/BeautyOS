<template>
  <div class="animate__animated animate__fadeIn animate__fast">
    <div class="animate__animated animate__fadeIn animate__slow">
      <div
        v-if="resultList.length > 0"
        id="position"
        class="rounded-[10px] bg-white px-[1rem] py-[2rem] text-center font-sans font-normal text-ml"
      >
        <Ticket
          v-for="(item, idx) in resultList"
          :key="item.couponId"
          @openRecord="handleOpenRecord($event)"
          :id="item.couponId"
          :title="item.couponName"
          :canUse="item.totalCount"
          :used="item.usedCount"
          :price="item.singleCouponPrice"
          :totalPrice="item.totalCount * item.singleCouponPrice"
          :time="item.boughtDate"
          data-aos="zoom-in"
          :data-aos-delay="idx * 100"
          data-aos-duration="300"
          data-aos-once="true"
          data-aos-anchor="#position"
        />
      </div>

      <div
        v-else
        class="rounded-[10px] bg-white px-[1rem] py-[2rem] text-center font-sans font-normal text-ml"
      >
        <p>尚無使用紀錄</p>
      </div>
    </div>

    <C-Modal-Dialog
      v-model="showRecord"
      :animationCss="'animate__animated animate__flipInY animate__fast'"
    >
      <h3 class="mt-10 text-center font-bold">染髮卡券</h3>
      <table
        v-if="recordDetail.usedCount && recordDetail.usedCount !== 0"
        class="mt-5 w-full text-left text-sm"
      >
        <thead v-pre>
          <tr>
            <th class="text-center">項次</th>
            <th>使用日期</th>
            <th class="text-center">使用張數</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in recordDetail.usageRecord" :key="idx">
            <td class="text-center">{{ idx + 1 }}</td>
            <td>{{ $dayjs(item.usedDate).format("YYYY/MM/DD HH:MM") }}</td>
            <td class="text-center">{{ item.usageCount }}</td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="recordDetail.usedCount && recordDetail.usedCount !== 0"
        class="mt-10 grid w-full grid-cols-12 gap-2 text-sm"
      >
        <div v-pre class="col-span-9 text-right">可用次數 :</div>
        <div class="col-span-3">
          {{ recordDetail.totalCount - recordDetail.usedCount }}/{{ recordDetail.totalCount }}
        </div>
        <div v-pre class="col-span-9 text-right">總金額 :</div>
        <div class="col-span-3">
          ${{ recordDetail.totalCount * recordDetail.singleCouponPrice }}
        </div>
      </div>
      <p v-else class="mx-10 mb-14 mt-10 text-center text-stone-500">此卡券尚無使用紀錄</p>
    </C-Modal-Dialog>
  </div>
</template>

<script>
import Ticket from '@/components/Home/customer/coupon/ticket.vue';

export default {
  name: 'customer-component-coupon',
  components: {
    Ticket,
  },
  mounted() {
    this.getCoupons();
  },
  data() {
    return {
      resultList: [],
      showRecord: false,
      recordDetail: {},
    };
  },
  methods: {
    handleOpenRecord(id) {
      this.recordDetail = this.resultList.find((item) => item.couponId === id);
      this.showRecord = true;
    },
    async getCoupons() {
      const res = await this.$api.customerCouponBalanceReport(this.$route.query.id);
      const { data } = res;

      this.resultList = data.data.customerCouponBalanceReport[0]
        ? data.data.customerCouponBalanceReport[0].data
        : [];
    },
  },
};
</script>

<style></style>
