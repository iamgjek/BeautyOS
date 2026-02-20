<template>
  <section id="firstPos">
    <div v-once class="fixed left-0 top-0 w-full px-[10%] text-lg bg-white py-4 flex items-center">
      <fa @click="$router.push('/member')" icon="fa-solid fa-angle-left" class="text-2xl" />
      <h2 v-pre class="absolute top-1/2 translate-y-[-50%] left-[50%] translate-x-[-50%] text-lg font-bold">入金紀錄</h2>
    </div>

    <!-- 剩餘入金顯示 -->
    <div v-if="merchants.length > 0 && !isLoading" data-aos="fade-up" data-aos-duration="300" data-aos-once="true" data-aos-delay="100" data-aos-anchor="#firstPos" class="text-center mb-5 pb-5 relative after:content-[''] after:w-screen after:h-[1px] after:bg-[#232D4E] after:absolute after:left-[-6%] md:after:left-[-1.5%] after:bottom-0">
      <div class="w-full relative mb-5">
        <select @change="getWalletRecords()" v-if="merchants.length > 0" v-model="selectMerchantId" class="w-full p-3 text-center rounded-lg shadow-[0px_2px_2px_rgba(0,0,0,0.25)] bg-white appearance-none">
          <option v-for="item in merchants" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
        <fa icon="fa-regular fa-angle-down" class="absolute right-5 top-1/2 -translate-y-1/2" />
      </div>
      <h3 class="text-4xl text-[#FEB401] font-bold">${{ showCash }}</h3>
      <p v-pre class="text-sm mt-2">剩餘入金</p>
    </div>

    <!-- 入金列表 -->
    <ul v-if="addValueRecords.length > 0 && !isLoading" data-aos="fade-up" data-aos-duration="400" data-aos-once="true" data-aos-delay="200" data-aos-anchor="#firstPos" class="bg-white rounded-xl shadow-md text-sm">
      <li v-for="(item, idx) in addValueRecords" :key="item.id" data-aos="fade" :data-aos-delay="500 + (idx * 100)" data-aos-once="true" data-aos-duration="400" data-aos-anchor="#firstPos" class="px-6 py-5 border-b border-[#aeaeae]" :class="{'border-b-0': (idx + 1) === addValueRecords.length}">
        <div class="grid grid-cols-12 gap-4">

          <div v-pre class="col-span-5"><p>日期</p></div>
          <div class="col-span-7"><p v-formatDate="'time'">{{ item.date }}</p></div>

          <div v-pre class="col-span-5"><p>類別</p></div>
          <div class="col-span-7"><p>{{ item.type }}</p></div>

          <div v-if="item.type === '使用'" class="col-span-5"><p>訂單編號</p></div>
          <div v-if="item.type === '使用'" class="col-span-7"><p>{{ item.orderNo }}</p></div>

          <div v-pre class="col-span-5"><p>金額</p></div>
          <div class="col-span-7 flex gap-1" :class="{'text-[#16A34A]': item.type === '存入', 'text-[#F43F5E]': item.type !== '存入'}">
            <span v-if="item.type === '存入'">+</span>
            <span v-else>-</span>
            <span>${{ item.price }}</span>
          </div>

          <div v-pre class="col-span-5"><p>設計師</p></div>
          <div class="col-span-7"><p>{{ item.designerName }}</p></div>
          
          <div v-if="item.payType" class="col-span-5"><p>付款方式</p></div>
          <div v-if="item.payType" class="col-span-7"><p>{{ item.payType }}</p></div>

        </div>
      </li>
    </ul>

    <!-- 無資料 -->
    <ul v-if="addValueRecords.length === 0 && !isLoading" data-aos="fade-up" data-aos-once="true" data-aos-duration="500" data-aos-delay="150" class="bg-white rounded-lg min-h-[211px] shadow-md pt-10">
      <li class="text-center text-sm text-[#aeaeae]"><p>目前無資料</p></li>
    </ul>

  </section>
</template>

<script>
export default {
  name: 'addValue-index',
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
      cash: 0,
      showCash: 0,
      merchants: JSON.parse(window.localStorage.getItem('allMerchants')) || [],
      selectMerchantId: '',
      addValueRecords: []
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  },
  methods: {
    // 取得入金列表
    getWalletRecords() {
      this.$store.dispatch('loading/isLoading', true)

      this.cash = 0

      const id = this.selectMerchantId ? this.selectMerchantId : ''

      this.api.customerWalletRecords(id)
      .then((res) => {
        this.cash = res.data.customerWalletRecords.remainWallet
        this.addValueRecords = res.data.customerWalletRecords.walletRecord

        this.$store.dispatch('loading/isLoading', false)

        this.cashAnimation()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    cashAnimation() {
      if (this.cash >= 60) {
        const range = parseInt(this.cash / 60)
        const counterCash = setInterval(() => {
          this.showCash += range
          if (this.showCash >= this.cash) {
            this.showCash = (this.cash - 10)
            clearInterval(counterCash)
            const newCounterCash = setInterval(() => {
              this.showCash += 1
              if (this.showCash === (this.cash - 2)) {
                setTimeout(() => {
                  this.showCash += 1
                  setTimeout(() => {
                    this.showCash += 1
                  }, 500)
                }, 300)
                clearInterval(newCounterCash)
              }
            }, 100)
          }
        }, 10)
      } else if (this.cash >= 10 && this.cash < 60) {
        const range = parseInt(this.cash / 1)
        const counterCash = setInterval(() => {
          this.showCash += range
          if (this.showCash >= this.cash) {
            this.showCash = (this.cash - 10)
            clearInterval(counterCash)
            const newCounterCash = setInterval(() => {
              this.showCash += 1
              if (this.showCash === (this.cash - 2)) {
                setTimeout(() => {
                  this.showCash += 1
                  setTimeout(() => {
                    this.showCash += 1
                  }, 600)
                }, 300)
                clearInterval(newCounterCash)
              }
            }, 100)
          }
        }, 10)
      } else {
        if (this.cash <= 1) {
          this.showCash = this.cash
          return
        }
        const counterCash = setInterval(() => {
          this.showCash += 1
          if (this.showCash === (this.cash - 1)) {
            clearInterval(counterCash)
            setTimeout(() => {
              this.showCash += 1
            }, 500);
          }
        }, 100)
      }
    }
  },
  mounted() {
    const merchant = JSON.parse(window.localStorage.getItem('merchant'))
    this.selectMerchantId = this.merchants[0]?.id ? this.merchants[0]?.id : merchant?.id
    this.getWalletRecords()
  }
}
</script>
