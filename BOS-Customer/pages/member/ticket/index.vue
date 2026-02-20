<template>
  <section id="firstPos" class="w-full max-w-[768px] mx-auto">
    <div v-once class="fixed left-0 top-0 w-full px-[10%] text-lg bg-white py-4 flex items-center">
      <fa @click="$router.push('/member')" icon="fa-solid fa-angle-left" class="text-2xl" />
      <h2 v-pre class="absolute top-1/2 translate-y-[-50%] left-[50%] translate-x-[-50%] text-lg font-bold">我的卡券</h2>
    </div>

    <div v-if="merchants.length > 0 && !isLoading" data-aos="zoom-in" data-aos-duration="300" data-aos-once="true">
      <div class="w-full relative mb-5">
        <select @change="getCoupons()" v-if="merchants.length > 0" v-model="selectStore" class="w-full p-3 text-center rounded-lg shadow-[0px_2px_2px_rgba(0,0,0,0.25)] bg-white appearance-none">
          <option v-for="item in merchants" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
        <fa icon="fa-regular fa-angle-down" class="absolute right-5 top-1/2 -translate-y-1/2" />
      </div>
    </div>

    <!-- 有資料 -->
    <div v-if="tickets.length > 0 && !isLoading" id="position">
      <Ticket v-for="(item, idx) in tickets" :key="item.couponId + idx" @openRecord="handleOpenRecord($event)" :id="item.couponId" :idx="idx" :title="item.couponName" :canUse="item.totalCount" :used="item.usedCount" :price="item.singleCouponPrice" :totalPrice="(item.singleCouponPrice * item.totalCount)" :time="item.boughtDate" data-aos="zoom-in" :data-aos-delay="100 + (idx * 100)" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#position" />
    </div>

    <!-- 無資料 -->
    <ul v-if="tickets.length === 0 && !isLoading" data-aos="fade-up" data-aos-once="true" data-aos-duration="500" data-aos-delay="150" class="bg-white rounded-lg min-h-[211px] shadow-md pt-10">
      <li class="text-center text-sm text-[#aeaeae]"><p>目前無資料</p></li>
    </ul>

    <!-- 卡券使用紀錄彈窗 -->
    <Modal :showModal="showRecord" @cancelModal="cancelModal">
      <h3 class="text-center font-bold mt-10">{{ cacheRecord.couponName }}</h3>
      <table v-if="cacheRecord.usedCount && cacheRecord.usageRecord.length > 0" class="w-full text-left mt-5 text-sm">
        <thead v-pre>
          <tr>
            <th class="text-center">項次</th>
            <th>使用日期</th>
            <th class="text-center">使用張數</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in cacheRecord.usageRecord" :key="item.usedDate">
            <td class="text-center">{{ idx + 1 }}</td>
            <td><p v-formatDate="'time'">{{ item.usedDate }}</p></td>
            <td class="text-center">{{ item.usageCount }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="cacheRecord.usedCount && cacheRecord.usageRecord.length > 0" class="mt-10">
        <div class="grid grid-cols-12 w-full gap-2 text-sm">
          <div v-pre class="col-span-9 text-right">可用次數 :</div>
          <div class="col-span-3">{{ cacheRecord.remainingCount }}/{{ cacheRecord.totalCount }}</div>
          <div v-pre class="col-span-9 text-right">總金額 :</div>
          <div class="col-span-3">${{ cacheRecord.singleCouponPrice * cacheRecord.totalCount }}</div>
        </div>
      </div>
      <div v-else>
        <p class="text-[#bebebe] text-center my-5 text-sm">此卡券尚無使用紀錄</p>
      </div>
    </Modal>

  </section>
</template>

<script>
export default {
  name: 'member-ticket',
  head() {
    return {
      meta: [
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]
    }
  },
  data() {
    return {
      tickets: [],
      merchants: JSON.parse(window.localStorage.getItem('allMerchants')) || [],
      selectStore: '',
      showRecord: false,
      cacheRecord: {}
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  },
  methods: {
    handleOpenRecord(idx) {
      this.cacheRecord = this.tickets.find((item, index) => idx === index)
      this.showRecord = true
    },
    cancelModal(e) {
      e.stopPropagation()
      const classList = Array.from(e.target.classList)
      const isCancel = classList.includes('cancel')
      if (isCancel || e.target.nodeName === 'path') this.showRecord = false
    },
    getCoupons() {
      this.tickets = []

      this.$store.dispatch('loading/isLoading', true)

      const id = this.selectStore ? this.selectStore : ''

      this.api.customerCouponBalanceReport(id)
      .then((res) => {
        this.tickets = res.data.customerCouponBalanceReport.length > 0 ? res.data.customerCouponBalanceReport[0].data : []
        this.$store.dispatch('loading/isLoading', false)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    const merchant = JSON.parse(window.localStorage.getItem('merchant'))

    if (this.merchants[0]) {
      this.selectStore = this.merchants[0].id ? this.merchants[0].id : merchant?.id
      this.getCoupons()
    }
  }
}
</script>
