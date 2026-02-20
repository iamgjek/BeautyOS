<template>
  <section v-if="!isLoading" id="firstPos">

    <div data-aos="fade" data-aos-duration="300" data-aos-once="true" data-aos-delay="100" data-aos-anchor="#firstPos" class="w-full p-4 flex items-center gap-4 border border-[#aeaeae] bg-white rounded-lg mt-3">
      <div class="w-6 h-6 flex justify-center items-center border-2 border-[#4ADE80] rounded-full">
        <fa icon="fa-solid fa-check" class="text-[#4ADE80]" />
      </div>
      <!-- <h4 class="text-sm line-clamp-1">已選設計師：{{ selectDesigner }} <span v-if="selectDesignerNickName && selectDesignerNickName !== 1">({{ selectDesignerNickName }})</span></h4> -->
      <h4 class="text-sm line-clamp-1">已選設計師：{{ selectDesigner }} </h4>
    </div>


    <!-- 選擇日期 -->
    <h4 class="text-sm text-[#666] font-bold mt-6 mb-2" data-aos="fade" data-aos-duration="300" data-aos-once="true" data-aos-delay="100" ata-aos-anchor="#firstPos">選擇日期<sup class="text-red-500"> *</sup></h4>
    <div class="w-full" data-aos="fade" data-aos-duration="300" data-aos-once="true" data-aos-delay="100" data-aos-anchor="#firstPos">
      <Calendar :filterOldDay="true" :disabledDate="disabledDate" :isGettingDate="isGettingDate" @selectDate="selectDate($event)" @changeMonth="changeMonth($event)" />
    </div>
    <!-- <v-date-picker v-model="userSelect.date" locale="zh-TW" :model-config="{ type: 'string', mask: 'YYYY/MM/DD' }" :disabled-dates="disableDate" :min-date='new Date()' :max-date="'2022/05/31'" is-expanded data-aos="fade" data-aos-duration="300" data-aos-once="true" ata-aos-anchor="#firstPos" class="border border-[#aeaeae] shadow-[0px_2px_2px_rgba(0,0,0,0.25)]" /> -->

    <!-- 選擇時段 -->
    <div data-aos="fade" data-aos-duration="300" data-aos-once="true" data-aos-delay="100" ata-aos-anchor="#firstPos">
      <h4 class="text-sm text-[#666] font-bold mt-6 mb-2">選擇時段<sup class="text-red-500"> *</sup></h4>
    </div>

    <div v-if="userSelect.date && bookingTimes" data-aos="fade" data-aos-duration="400" data-aos-once="true" data-aos-anchor="#firstPos" class="flex gap-2.5 mb-2.5">
      <button @click="selectRange = '早上'" class="text-sm py-2.5 w-full border border-[#aeaeae] rounded-md duration-300" :class="{'bg-[#FEB401] text-white': selectRange === '早上', 'bg-white': selectRange !== '早上'}">早上</button>
      <button @click="selectRange = '下午'" class="text-sm py-2.5 w-full border border-[#aeaeae] rounded-md duration-300" :class="{'bg-[#FEB401] text-white': selectRange === '下午', 'bg-white': selectRange !== '下午'}">下午</button>
      <button @click="selectRange = '晚上'" class="text-sm py-2.5 w-full border border-[#aeaeae] rounded-md duration-300" :class="{'bg-[#FEB401] text-white': selectRange === '晚上', 'bg-white': selectRange !== '晚上'}">晚上</button>
    </div>

    <!-- 指定設計師預約時段 -->
    <ul v-if="bookingTimes && isDesignation !== 1" data-aos="fade" data-aos-duration="300" data-aos-once="true" data-aos-delay="100" data-aos-anchor="#firstPos" class="p-2.5 border border-[#aeaeae] rounded-lg shadow-[0px_2px_2px_rgba(0,0,0,0.25)] bg-white">
      <li @click="selectTime(item)" v-for="(item, idx) in filterTimeRange" :key="item.time" data-aos="flip-up" data-aos-duration="300" :data-aos-delay="(idx * 50)" data-aos-once="true" data-aos-anchor="#firstPos" class="py-2.5 border-b-2 border-dotted border-b-[#aeaeae]" :class="{'border-none': (idx + 1) === filterTimeRange.length, 'pointer-events-none': filterOldTimes(item.time)}">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="h-3 w-3 rounded-full flex justify-center items-center duration-300" :class="{'bg-[#FEB401]': !item.isAppointment, 'bg-[#aeaeae]': item.isAppointment || filterOldTimes(item.time), 'bg-[#fff] border border-[#FEB401]': userSelect.time === item.time}">
              <fa icon="fa-solid fa-check" class="text-[8px] text-[#FEB401] duration-700 scale-0" :class="{'scale-100': userSelect.time === item.time}" />
            </div>
            <p v-formatDate="'onlyTime'" class="text-sm font-bold duration-300" :class="{'text-[#AEAEAE] pointer-events-none': item.status !== '可預約', 'text-[#3F3F46]': item.status === '可預約' && userSelect.time !== item.time, 'text-[#FEB401]': userSelect.time === item.time, 'text-[#bebebe]': filterOldTimes(item.time)}">{{ item.time }}</p>
          </div>
          <p v-if="item.status === '可預約' && userSelect.time !== item.time && !filterOldTimes(item.time)" data-aos="flip-up" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos" class="text-sm text-[#3F3F46]">尚可預約</p>
          <p v-if="item.status !== '可預約' && userSelect.time !== item.time && !filterOldTimes(item.time)" data-aos="flip-up" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos" class="text-sm text-[#aeaeae]">預約已滿</p>
          <p v-if="item.status === '可預約' && userSelect.time === item.time && !filterOldTimes(item.time)" data-aos="flip-up" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos" class="text-sm text-[#FEB401]">已選</p>
          <p v-if="filterOldTimes(item.time)" data-aos="flip-up" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos" class="text-sm text-[#bebebe]">不可預約</p>
        </div>
      </li>
      <li v-if="filterTimeRange.length === 0 && userSelect.date" class="text-center text-[#555] text-sm">此區間尚無時段可選</li>
    </ul>

    <!-- 不指定設計師預約時段 -->
    <ul v-if="bookingTimes && isDesignation === 1" data-aos="fade" data-aos-duration="300" data-aos-once="true" data-aos-delay="100" data-aos-anchor="#firstPos" class="p-2.5 border border-[#aeaeae] rounded-lg shadow-[0px_2px_2px_rgba(0,0,0,0.25)] bg-white">
      <li @click="selectTime(item)" v-for="(item, idx) in filterTimeRange" :key="item.time" data-aos="flip-up" data-aos-duration="300" :data-aos-delay="(idx * 50)" data-aos-once="true" data-aos-anchor="#firstPos" class="py-2.5 border-b-2 border-dotted border-b-[#aeaeae]" :class="{'border-none': (idx + 1) === filterTimeRange.length, 'pointer-events-none': filterOldTimes(item.time)}">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="h-3 w-3 rounded-full flex justify-center items-center duration-300" :class="{'bg-[#FEB401]': !item.isAppointment, 'bg-[#aeaeae]': item.isAppointment || filterOldTimes(item.time), 'bg-[#fff] border border-[#FEB401]': userSelect.time === item.time}">
              <fa icon="fa-solid fa-check" class="text-[8px] text-[#FEB401] duration-700 scale-0" :class="{'scale-100': userSelect.time === item.time}" />
            </div>
            <p v-formatDate="'onlyTime'" class="text-sm font-bold duration-300" :class="{'text-[#3F3F46]': userSelect.time !== item.time, 'text-[#FEB401]': userSelect.time === item.time, 'text-[#bebebe]': filterOldTimes(item.time)}">{{ item.time }}</p>
          </div>
          <p v-if="userSelect.time !== item.time && !filterOldTimes(item.time)" data-aos="flip-up" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos" class="text-sm text-[#3F3F46]">尚可預約</p>
          <p v-if="userSelect.time === item.time && !filterOldTimes(item.time)" data-aos="flip-up" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos" class="text-sm text-[#FEB401]">已選</p>
          <p v-if="filterOldTimes(item.time)" data-aos="flip-up" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos" class="text-sm text-[#bebebe]">不可預約</p>
        </div>
      </li>
      <li v-if="filterTimeRange.length === 0 && userSelect.date" class="text-center text-[#555] text-sm">此區間尚無時段可選</li>
    </ul>

    <p v-if="!bookingTimes" class="text-sm text-[#aeaeae]">請先選擇日期</p>

    <!-- @click="$router.push('/member/appointment/selectService')" -->
    <button @click="toSelectService()" :disabled="!userSelect.time || !userSelect.date" data-mdb-ripple="true" data-mdb-ripple-color="light" class="fixed bottom-24 left-[5%] w-[90%] mt-5 py-2.5 shadow-md rounded-md duration-300 flex items-center justify-center gap-4 z-0" :class="{'bg-[#aeaeae]': !userSelect.time || !userSelect.date, 'bg-[#232D4E]': userSelect.time && userSelect.date}">
      <p class="text-lg text-white">選擇服務項目</p>
      <fa icon="fa-solid fa-angle-right" class="text-white" />
    </button>

  </section>
</template>

<script>
import { cancelAllPending } from '@/utils/cancelToken.js'
export default {
  name: "appointment-selectDate",
  data() {
    return {
      disabledDate: [],
      userSelect: {
        date: '',
        time: ''
      },
      isGettingDate: false,
      bookingDate: [],
      bookingTimes: [],
      selectRange: '早上',
      morningRange: [],
      afterNoonRange: [],
      nightRange: []
    };
  },
  computed: {
    // 判斷是否為指定
    isDesignation() {
      return this.$store.state.appointmentData.designerId
    },
    isLoading() {
      return this.$store.state.loading.isLoading
    },
    selectDesigner() {
      return this.$store.state.appointmentData.designerName
    },
    selectDesignerNickName() {
      return this.$store.state.appointmentData.designerNickName
    },
    // 過濾選擇時段
    filterTimeRange() {
      switch(this.selectRange) {
        case '早上':
          return this.morningRange
        case '下午':
          return this.afterNoonRange
        case '晚上':
          return this.nightRange
      }
    }
  },
  methods: {
    // 取得月份的第一天和最後一天
    getMonthRange(year, month) {
      const firstDate = new Date(year, month, 1).getTime()
      const lastDate = new Date(year, month + 1, 1).getTime()
      return `${firstDate}, ${lastDate}`
    },
    // 取得設計師可預約日期
    getDesignerBookingTimesWithRange(input) {

      if (!this.$store.state.appointmentData.merchantId || !this.$store.state.appointmentData.designerId) {
        this.$store.dispatch('loading/isLoading', false)
        this.$router.push('/member/appointment')
        return
      }
      
      this.disabledDate = []

      this.api.getDesignerBookingTimesWithRange(input)
      .then((res) => {
        res.data.getDesignerBookingTimesWithRange.forEach((item) => {
          if (item.isRegularHoliday) this.disabledDate.push(item.date)
          else this.bookingDate.push(item)
        })

        this.$store.dispatch('loading/isLoading', false)
        this.isGettingDate = false
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // 變更月份
    changeMonth(date) {
      const designerId = this.$store.state.appointmentData.designerId

      if (designerId !== 1) {
        this.isGettingDate = true
  
        const monthRange = this.getMonthRange(date.getFullYear(), date.getMonth())
        const splitDate = monthRange.split(',')
  
        const input = {
          designerId: this.$store.state.appointmentData.designerId,
          storeId: this.$store.state.appointmentData.merchantId,
          dateRange: {
            startDate: splitDate[0],
            endDate: splitDate[1]
          }
        }
  
        this.getDesignerBookingTimesWithRange(input)
      }
      
    },
    // 選擇預約時段
    selectTime(item) {
      if (item.status !== '可預約') return
      this.userSelect.time = item.time
    },
    // 選擇日期
    selectDate(date) {
      this.morningRange = []
      this.afterNoonRange = []
      this.nightRange = []

      const designerId = this.$store.state.appointmentData.designerId

      // 假如為指定
      if (designerId !== 1) {
        this.userSelect.date = date
        this.bookingTimes = []
  
        const targetDate = this.bookingDate.find((item) => item.date === date)
        this.bookingTimes = targetDate?.bookingTimes

        if (this.bookingTimes) {
          this.bookingTimes.forEach((item) => {
            const hours = new Date(item.time).getHours()

            if (hours < 13) this.morningRange.push(item)
            if (hours >= 13 && hours < 18) this.afterNoonRange.push(item)
            if (hours >= 18) this.nightRange.push(item)
          })
        }
        
      }
      // 假如為不指定
      else {
        const newDate = new Date(date)
        const year = newDate.getFullYear()
        const month = newDate.getMonth()
        const monthDate = newDate.getDate()
        this.userSelect.date = date
        this.bookingTimes = []

        const merchant = JSON.parse(window.localStorage.getItem('merchant'))

        merchant.availableBookingTime.time.forEach((item) => {
          const splitTime = item.split(':')
          const bookingTimestamp = new Date(year, month, monthDate, splitTime[0], splitTime[1]).getTime()
          const data = {
            time: bookingTimestamp,
            status: '可預約'
          }
          if (splitTime[0] < 13) {
            this.morningRange.push(data)
          }
          if (splitTime[0] >= 13 && splitTime[0] < 18) {
            this.afterNoonRange.push(data)
          }
          if (splitTime[0] >= 18) {
            this.nightRange.push(data)
          }
        })
      }
    },
    // format日期
    forMatDate(obj) {
      if (obj < 10) return '0' + obj
      return obj
    },
    // 前往選擇服務項目頁面
    toSelectService() {

      const time = new Date(this.userSelect.time)
      const year = time.getFullYear()
      const month = this.forMatDate(time.getMonth() + 1)
      const date = this.forMatDate(time.getDate())
      const hours = this.forMatDate(time.getHours())
      const min = this.forMatDate(time.getMinutes())

      const data = {
        time: `${year}/${month}/${date} ${hours}:${min}`,
        timestamp: this.userSelect.time
      }

      this.$store.dispatch('appointmentData/handleSetTime', data)

      this.$router.push('/member/appointment/selectService')
    },
    // 過濾可預約時間是否為30分鐘以內
    filterOldTimes(time) {
      const newDate = Date.now()

      if ((newDate + 1800000) >= time) return true
      return false
    }
  },
  async mounted() {

    const designerId = this.$store.state.appointmentData.designerId

    // 假如為指定
    if (designerId !== 1) {
      this.isGettingDate = true
      this.$store.dispatch('loading/isLoading', true)
  
      if (!this.$store.state.appointmentData.merchantId || !this.$store.state.appointmentData.designerId) this.$router.push('/member/appointment')
      
      const date = new Date(Date.now())
      const monthRange = await this.getMonthRange(date.getFullYear(), date.getMonth())
      const splitDate = monthRange.split(',')
      
      const input = {
        designerId: this.$store.state.appointmentData.designerId,
        storeId: this.$store.state.appointmentData.merchantId,
        dateRange: {
          startDate: splitDate[0],
          endDate: splitDate[1]
        }
      }
  
      this.getDesignerBookingTimesWithRange(input)
    }

  }
}
</script>
