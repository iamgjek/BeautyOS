<template>
  <section v-if="!isLoading">

    <div class="w-full flex items-center justify-center gap-2 mt-5">
      <div class="w-4 h-4 rounded-full border border-[#4ADE80] flex justify-center items-center">
        <fa icon="fa-solid fa-check" class="text-[#4ADE80] text-xs" />
      </div>
      <p v-pre class="text-sm">預約明細</p>
    </div>

    <div class="w-full bg-white rounded-md shadow-md p-3 mt-3">
      <div class="grid grid-cols-12 text-sm gap-3 mt-3">
        <div v-pre class="col-span-3">日期</div>
        <div v-formatDate="'time'" class="col-span-9">{{ checkInfo.date }}</div>
        <div v-pre class="col-span-3">狀態</div>
        <div class="col-span-9 flex items-center gap-2" :class="{'text-[#FEB401]': checkInfo.status === '待確認', 'text-[#4ADE80]': checkInfo.status !== '待確認'}">{{ checkInfo.status }}<p v-if="checkInfo.status === '待確認'" class="text-[#666] text-[12px]">(待設計師確認後才算預約完成)</p></div>
        <div v-pre class="col-span-3">設計師</div>
        <div v-if="checkInfo.designer" class="col-span-9">{{ checkInfo.designer.nameForCustomerSide }}</div>
        <div v-else class="col-span-9">不指定</div>
        <div v-if="checkInfo.remarkForCustomer" class="col-span-3">備註</div>
        <div v-if="checkInfo.remarkForCustomer" class="col-span-9">{{ checkInfo.remarkForCustomer }}</div>
      </div>
      <button v-once @click="$router.push('/member/appointmentRecord')" class="w-full py-2 text-white bg-[#232D4E] mt-5">查看我的預約紀錄</button>
    </div>

  </section>
</template>

<script>
export default {
  name: 'appointment-check',
  data() {
    return {
      checkInfo: {},
      isLoading: true
    }
  },
  methods: {
    forMatDate(obj) {
      if (obj < 10) return '0' + obj
      return obj
    }
  },
  mounted() {
    const info = JSON.parse(window.localStorage.getItem('bookingData'))

    this.$store.dispatch('appointmentData/handleClearData')

    setTimeout(() => {
      if (info) {
        this.checkInfo = info
        this.isLoading = false

        window.localStorage.removeItem('bookingData')
      }
      else this.$router.push('/member/appointment')
    }, 300)
  }
}
</script>
