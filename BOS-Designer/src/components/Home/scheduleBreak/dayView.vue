<template>
  <div class="rounded-[10px] bg-white p-4">
    <div class="text-center font-bold" @click="backtoToday()" @keypress="backtoToday()">
      {{ handleShowData("MM") }} 月 / <span class="text-xl">{{ handleShowData("YYYY") }}</span>
    </div>

    <div class="flex items-center justify-between">
      <ul class="mb-3 flex grow items-center justify-center border-b-2 border-dashed border-[#eee] px-[30px] py-3">
        <li class="w-[14.2857%] text-center text-[12px] font-bold text-[#B4B4B5]" v-for="(week, index) in weekNo"
          :key="index + 'weekNo'">
          {{ week }}
        </li>
      </ul>
    </div>
    <div class="mb-10 flex items-center justify-between">
      <font-awesome-icon icon="fa-solid fa-angle-left" @click="preNextDay(-7)" class="w-[30px] text-[#718096]" />
      <ul class="flex grow items-center justify-center">
        <li :class="{ dot: $dayjs(week).format('YYYY-MM-DD') === $dayjs(currentDay).format('YYYY-MM-DD') }"
          class="w-[14.2857%] text-center text-[13px]" v-for="(week, index) in weekLst" @click="clickSelectDay(week)"
          @keypress="clickSelectDay(week)" :key="index">
          {{ $dayjs(week).format("D") }}
        </li>
      </ul>
      <font-awesome-icon icon="fa-solid fa-angle-right" @click="preNextDay(7)" class="w-[30px] text-[#718096]" />
    </div>

    <div class="mt-2">
      <!-- 表格身體測試 -->
      <div class="relative flex flex-col text-[12px]">
        <!-- 時間 -->
        <div class="clock" v-for="(item, index) in 11" :key="index + 'clock'">
          <span>     {{ item + +startTime.split(':')[0] - 1 + ":"+startTime.split(':')[1] }}</span>
        </div>

        <!-- top-0 h-[40px] -->
        <template v-for="(item, index) in attributes">
          <template v-if="item.data.length === 1">
            <p :key="`resultItem${index}`" :class="[item.data[0].customData.class, item.data[0].customData.specialClass]"
              class="absolute left-14 right-5 flex items-center justify-center overflow-hidden rounded-[10px] text-center"
              @click="doRoute(item.data[0])" @keypress="doRoute(item.data[0])">
              {{ item.data[0].customData.nameToDisplay }}
            </p>
          </template>

          <template v-if="morethanone(item.data)">
            <div :class="item.fatherClass" class="absolute left-14 right-5 flex gap-1" :key="index">
              <p v-for="(order, i) in item.data" :key="`attributes-${i}`" :class="[
                order.customData.class,
                order.customData.specialClass,
                `w-1/${item.data.length}`,
              ]"
                class="flex grow items-center justify-center overflow-hidden rounded-[10px] text-center "
                @click="doRoute(order)" @keypress="doRoute(order)">
                {{ order.customData.nameToDisplay }}
              </p>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    value: {
      type: [String, Date, Object],
      required: true,
    },
    weekLst: {
      type: [Array],
    },
    period: {
      type: Number,
    },
    attributes: {
      type: [Array],
      default: () => [],
    },
    isRegularHoliday: {
      type: [Array],
      default: () => [],
    },
    manaulUpdateFormResult: {
      type: [Function],
      required: true,
    },
  },
  data() {
    return {
      weekNo: ['Sun', 'Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sat'],
      startTime: localStorage.getItem('openingHours') ? localStorage.getItem('openingHours') : '10:00:00',
    };
  },
  mounted() {
    console.log(this.attributes);
  },
  // beforeDestroy() {
  //   this.$emit('input', this.$dayjs().format('YYYY-MM-DD'));
  // },
  methods: {
    morethanone(data) {
      return data.length > 1;
    },
    doRoute(attr) {
      const unRouteList = ['RH', 'HOLIDAY', 'EVENT'];
      if (unRouteList.includes(attr.customData.type)) {
        // 確認按鈕字樣，如果為"事件"，顯示刪除事件，預設為開放預約
        let confirmButtonText = '';
        let iconColor = '';
        let confirmButton = '';
        switch (attr.customData.type) {
          case 'EVENT':
            confirmButtonText = '刪除事件';
            iconColor = '#82BC95';
            confirmButton = '!bg-[#F48E8C]';
            break;
          // 排休
          case 'HOLIDAY':
            confirmButtonText = '開放預約';
            iconColor = '#F48E8C';
            confirmButton = '!bg-[#F6BA7B]';
            break;
          default: // 時段公休、整日公休
            confirmButtonText = '開放預約';
            iconColor = '#BEADE3';
            confirmButton = '!bg-[#F6BA7B]';
            break;
        }
        this.$swal
          .fire({
            icon: 'warning',
            iconColor,
            title: attr.customData.nameToDisplay,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText: '關閉',
            customClass: {
              confirmButton,
              cancelButton: '',
            },
          })
          .then(async (res) => {
            if (res.isConfirmed) {
              switch (attr.customData.type) {
                case 'RH':
                case 'HOLIDAY':
                  console.log(await this.$api.adminBookingTime({
                    designerId: this.userInfo.user.id,
                    datetime: attr.customData.start,
                    appointable: true,
                  }));
                  break;
                case 'EVENT':
                  await this.$api.deleteEvent({ eventId: attr.key });
                  break;
                default: // 時段公休、整日公休
                  break;
              }
              await this.manaulUpdateFormResult();
            }
          });
      } else {
        this.$router.push({ name: 'ScheduleBreak-Detail', query: { id: attr.key } });
      }
    },
    preNextDay(num) {
      // this.currentDay = this.$dayjs(this.$dayjs(this.currentDay).add(num, 'days')).format(
      //   'YYYY-MM-DD',
      // );
      this.$emit('changePeriod', this.period + num);
    },
    clickSelectDay(data) {
      this.currentDay = this.$dayjs(data).format('YYYY-MM-DD');
    },
    backtoToday() {
      this.currentDay = this.$dayjs().format('YYYY-MM-DD');
      this.$emit('changePeriod', 0);
    },
    handleShowData(dt) {
      // 如果顯示的區間 頭尾月份不同時
      // 判斷選擇的日期日不是在這區間，是的話顯示 選擇日期月份，不是的話顯示 區間第一天的月份
      // 預設回傳區間第一天的月份
      if (this.$dayjs(this.weekLst[0]).format(dt) !== this.$dayjs(this.weekLst[6]).format(dt)) {
        if (
          this.$dayjs(this.value).valueOf() >= this.$dayjs(this.weekLst[0]).valueOf()
          && this.$dayjs(this.value).valueOf() <= this.$dayjs(this.weekLst[6]).valueOf()
        ) {
          return this.$dayjs(this.value).format(dt);
        }
        this.$dayjs(this.weekLst[0]).format(dt);
      }
      return this.$dayjs(this.weekLst[0]).format(dt);
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),

    currentDay: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped>
.clock {
  @apply h-[40px] w-full ml-auto border border-x-0 relative border-b-0;
  line-height: 40px;
}

.clock::after {
  @apply border-b;
  content: "";
  position: absolute;
  bottom: 50%;
  border-style: dashed;
  left: 0px;
  right: 0;
}

.clock span {
  position: absolute;
  top: -55%;
  right: 100%;
  background-color: #fff;
  width: 3em;
  height: 4em;
  z-index: 1;
}

.dot {
  /* color: white; */
  position: relative;
  z-index: 1;
  color: #fff;
}

.dot::before {
  content: "";
  width: 2em;
  aspect-ratio: 1/1;
  position: absolute;
  background-color: #222c4c;
  border-radius: 50%;
  inset: 0;
  margin: auto;
  z-index: -1;
}
</style>
