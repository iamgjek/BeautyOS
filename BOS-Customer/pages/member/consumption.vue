<template>
  <section id="firstPos" class="w-full max-w-[768px] mx-auto">
    <div v-once class="fixed left-0 top-0 w-full px-[10%] text-lg bg-white py-4 flex items-center">
      <fa @click="$router.push('/member')" icon="fa-solid fa-angle-left" class="text-2xl" />
      <h2 v-pre class="absolute top-1/2 translate-y-[-50%] left-[50%] translate-x-[-50%] text-lg font-bold">服務記錄</h2>
    </div>

    <!-- 消費紀錄list -->
    <ul id="orderList" v-if="orders.length > 0 && !isLoading" data-aos="fade-up" data-aos-duration="300" data-aos-once="true" class="rounded-md shadow-md bg-white mt-3 text-sm">
      <li v-for="(item, idx) in orders" :key="item.id" data-aos="fade" data-aos-delay="200" data-aos-once="true" data-aos-duration="400" data-aos-anchor="#firstPos" class="py-4 px-6" :class="{'border-b border-[#aeaeae]': (idx + 1) !== orders.length}">
        <div class="grid grid-cols-12 items-center gap-4">
          <div v-pre class="col-span-5"><p>帳單編號</p></div>
          <div class="col-span-7"><p>{{ item.no }}</p></div>

          <div v-pre class="col-span-5"><p>帳單時間</p></div>
          <div class="col-span-7"><p v-formatDate="'time'">{{ item.date }}</p></div>

          <div v-pre class="col-span-5"><p>設計師</p></div>
          <div class="col-span-7">
            <p v-if="item.designer" class="line-clamp-1">{{ item.designer.nameForCustomerSide }}</p>
            <p v-else>不指定</p>
          </div>

          <div v-pre class="col-span-5"><p>指定</p></div>
          <div class="col-span-7">
            <p v-if="item.isDesignate">Y</p>
            <p v-else>N</p>
          </div>

          <!-- <div v-if="item.serviceOrders.length > 0" class="col-span-5"><p>服務消費</p></div>
          <div v-if="item.serviceOrders.length > 0" class="col-span-7">
            <div class="flex items-center gap-1">
              <span v-for="service in item.serviceOrders" :key="service.id">{{ service.name }}</span>
            </div>
          </div> -->

          <div v-pre class="col-span-5"><p>服務消費</p></div>
          <div class="col-span-7 flex items-center gap-2">
            <p class="text-[#FEB401] text-lg font-bold">${{ item.serviceFakeTotal }}</p>
          </div>

          <div v-pre class="col-span-5"><p>店販消費</p></div>
          <div class="col-span-7 flex items-center gap-2">
            <p class="text-[#FEB401] text-lg font-bold">${{ item.productFakeTotal }}</p>
          </div>

          <div v-pre class="col-span-5"><p>預收卡販賣</p></div>
          <div class="col-span-7 flex items-center gap-2">
            <p class="text-[#FEB401] text-lg font-bold">${{ item.ticketSellIntoPerformance + item.ticketSellNotIntoPerformance }}</p>
          </div>

          <div v-pre class="col-span-5"><p>預收卡使用</p></div>
          <div class="col-span-7 flex items-center gap-2">
            <p class="text-[#FEB401] text-lg font-bold">${{ item.useTicketTotal }}</p>
          </div>

          <div v-pre class="col-span-5"><p>會員卡販賣</p></div>
          <div class="col-span-7 flex items-center gap-2">
            <p class="text-[#FEB401] text-lg font-bold">${{ item.membershipFakeTotal }}</p>
          </div>

          <div v-pre class="col-span-5"><p>實際支付現金</p></div>
          <div class="col-span-7 flex items-center gap-2">
            <p class="text-[#FEB401] text-lg font-bold">${{ item.businessCash }}</p>
          </div>
            
        </div>
      </li>
    </ul>
    <!-- 滾動加載Loading -->
    <ItemLoading />

    <ul v-if="orders.length === 0 && !isLoading" data-aos="zoom-in" data-aos-duration="300" class="rounded-md min-h-[200px] shadow-md bg-white mt-3 text-sm flex items-center justify-center">
      <li v-pre>
        <p>目前尚無紀錄</p>
      </li>
    </ul>

  </section>
</template>

<script>
export default {
  name: 'member-consumption',
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
      orders: [],
      totalPage: 0,
      currentPage: 0,
      isGetting: false,
      isEnd: false
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  },
  methods: {
    // 取得紀錄
    getRecords() {
      
      this.$store.dispatch('loading/isLoading', true)

      this.$api.getCustomerConsumptionRecords(this.currentPage)
      .then((res) => {
        this.totalPage = Math.ceil(res.data.getCustomerConsumptionRecords.totalCount / 20)

        if (this.totalPage <= 1) this.isEnd = true
        if (this.totalPage > 1) {
          const container = document.querySelector('.member__container')
          container.addEventListener('scroll', this.scrollGetRecords)
        }

        this.orders = res.data.getCustomerConsumptionRecords.orders

        this.$store.dispatch('loading/isLoading', false)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // 滾動取得紀錄
    async scrollGetRecords() {
      const orderList = document.querySelector('#orderList')
      const triggerDistance = 200
      const distance = orderList.getBoundingClientRect().bottom - window.innerHeight

      if (!this.isGetting && !this.isEnd && distance < triggerDistance) {
        this.$store.dispatch('itemLoading/isLoading', true)

        this.isGetting = true
        this.isEnd = false
        this.currentPage ++

        if (this.currentPage === (this.totalPage - 1)) {
          this.isEnd = true
          const container = document.querySelector('.member__container')
          container?.removeEventListener('scroll', this.scrollGetRecords)
        }

        await this.$api.getCustomerConsumptionRecords(this.currentPage)
        .then((res) => {
          res.data.getCustomerConsumptionRecords.orders.forEach((item) => {
            const date = new Date(item.date)
            const dateFormat = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

            item['dateFormat'] = dateFormat
          })
          // 使用 concat 測試
          this.orders = this.orders.concat(res.data.getCustomerConsumptionRecords.orders)
          this.isGetting = false
          
          this.$store.dispatch('itemLoading/isLoading', false)
        })
        .catch((err) => {
          this.isGetting = false
          console.log(err)
        })

      }
    }
  },
  mounted() {
    this.getRecords()
  },
  beforeDestroy() {
    const vm = this
    const container = document.querySelector('.member__container')
    if (container) {
      container?.removeEventListener('scroll', vm.scrollGetRecords)
    }
  }
}
</script>
