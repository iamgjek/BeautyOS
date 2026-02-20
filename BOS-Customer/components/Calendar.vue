<template>
  <section>
    <div class="w-full bg-white p-4 rounded-lg border border-[#aeaeae] shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">

      <div class="flex justify-between items-center">
        <fa @click="month === 0 ? changeMonth(false) : month --, changeMonthAnimation()" icon="fa-solid fa-angle-left" class="p-4" />
        <div class="flex items-end gap-2">
          <p class="font-bold">{{ year - 1911 }}年</p>
          <p class="text-2xl font-bold">{{ month + 1 }}月</p>
        </div>
        <fa @click="month === 11 ? changeMonth(true) : month ++, changeMonthAnimation()" icon="fa-solid fa-angle-right" class="p-4" />
      </div>

      <div v-pre class="grid grid-cols-7 text-center">
        <div class="col-span-1 py-2">日</div>
        <div class="col-span-1 py-2">一</div>
        <div class="col-span-1 py-2">二</div>
        <div class="col-span-1 py-2">三</div>
        <div class="col-span-1 py-2">四</div>
        <div class="col-span-1 py-2">五</div>
        <div class="col-span-1 py-2">六</div>
      </div>

      <!-- 指定設計師用 -->
      <div v-if="designerId !== 1">
        <div v-if="isShow && !isGettingDate" class="grid grid-cols-7 text-center">
          <div v-for="push in monthFirstDay" :key="push + 'pushDay'" class="col-span-1 py-2"></div>
          <div
          @click="handleSelectDate(day)"
          v-for="day in monthInDays"
          :key="day + 'day'"
          class="col-span-1 py-2 rounded-full duration-300 relative z-10 after:content-[''] after:z-[-1] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-10 after:h-10 after:scale-0 after:bg-[#FEB401] after:rounded-full after:duration-300"
          :class="{'text-[#aeaeae] pointer-events-none': filterOldDate(day) || filterDayOffDate(day), 'text-[#FEB401]':  isToday(day), 'after:scale-100 text-[#fff]': filterSelectedDate(day)}">
            {{ day }}
          </div>
        </div>
        <div v-if="isGettingDate" class="w-full min-h-[150px] flex items-center justify-center">
          <div class="border-4 border-t-[#232D4E] rounded-full w-10 h-10 animate-spin-slow"></div>
        </div>
      </div>

      <!-- 不指定用 -->
      <div v-else>
        <transition>
          <div v-if="isShow && !isGettingDate" class="grid grid-cols-7 text-center">
            <div v-for="push in monthFirstDay" :key="push + 'pushDay'" class="col-span-1 py-2"></div>
            <div
            @click="handleSelectDate(day)"
            v-for="day in monthInDays"
            :key="day + 'day'"
            class="col-span-1 py-2 rounded-full duration-300 relative z-10 after:content-[''] after:z-[-1] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-10 after:h-10 after:scale-0 after:bg-[#FEB401] after:rounded-full after:duration-300"
            :class="{'text-[#aeaeae] pointer-events-none': filterOldDate(day) || filterDayOffDate(day), 'text-[#FEB401]':  isToday(day), 'after:scale-100 text-[#fff]': filterSelectedDate(day)}">
              {{ day }}
            </div>
          </div>
        </transition>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  props: {
    disabledDate: {
      type: Array,
      default: () => []
    },
    filterOldDay: {
      type: Boolean,
      default: () => false
    },
    isGettingDate: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      date: new Date().getDate(),
      selectDate: '',
      isShow: true
    }
  },
  computed: {
    monthInDays() {
      return new Date(this.year, this.month + 1, 0).getDate()
    },
    monthFirstDay() {
      return new Date(this.year, this.month, 1).getDay()
    },
    designerId() {
      return this.$store.state.appointmentData.designerId
    }
  },
  methods: {
    // 過濾已過日期
    filterOldDate(date) {
      const toDay = new Date()
      if (new Date(this.year, this.month, date) < new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate())) return true
      return false
    },
    // 過濾休假日期
    filterDayOffDate(date) {
      const newDate = new Date(this.year, this.month, date).getTime()
      return this.disabledDate.find((item) => item === newDate)
    },
    // 切換月份
    changeMonth(bool) {
      if (!bool) {
        this.year --
        this.month = 11
      } else {
        this.year ++
        this.month = 0
      }
    },
    // 切換月份動畫
    changeMonthAnimation() {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
      }, 300)
      this.$emit('changeMonth', new Date(this.year, this.month))
    },
    // 過濾今天日期
    isToday(date) {
      const toDay = new Date()
      if (new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate()).getTime() === new Date(this.year, this.month, date).getTime()) return true
      return false
    },
    // 過濾選擇到的日期
    filterSelectedDate(date) {
      if (new Date(this.year, this.month, date).getTime() === this.selectDate) return true
      return false
    },
    // 選擇日期
    handleSelectDate(date) {
      this.selectDate = new Date(this.year, this.month, date).getTime()
      this.$emit('selectDate', this.selectDate)
    }
  },
  mounted() {
    if (!this.disabledDate.find((item) => item === new Date(this.year, this.month, this.date).getTime())) {
      this.selectDate = new Date(this.year, this.month, this.date).getTime()
      this.$emit('selectDate', this.selectDate)
    }
  }
}
</script>
