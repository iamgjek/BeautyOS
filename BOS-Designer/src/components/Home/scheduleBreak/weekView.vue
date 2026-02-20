<template>
  <div class="rounded-[10px] bg-white p-4">
    <div class="flex items-center justify-between">
      <button class="h-[44px] w-[44px]" @click="preNextWeek(-7)">
        <font-awesome-icon icon="fa-solid fa-angle-left" class="text-[#718096]" />
      </button>
      <div class="font-bold" @click="backtoToday()" @keypress="backtoToday()">
        {{ $dayjs(weekLst[0]).format("MM") }}月 /
        <span class="text-xl">{{ $dayjs(weekLst[0]).format("YYYY") }}</span>
      </div>
      <button class="h-[44px] w-[44px]" @click="preNextWeek(7)">
        <font-awesome-icon icon="fa-solid fa-angle-right" class="text-[#718096]" />
      </button>
    </div>
    <!-- 星期 -->
    <div class="mb-3 flex border-b-2 border-dashed border-[#eee] pb-3">
      <div class="w-[7%]"></div>
      <div
        class="w-[13%] text-center text-[12px] font-bold text-[#B4B4B5]"
        v-for="(week, index) in weekNo"
        :key="index + 'weekNo'"
      >
        {{ week }}
      </div>
    </div>

    <!-- 日期 -->
    <div class="flex  pb-4 pt-2">
      <div class="w-[12%]"></div>
      <div
        :class="{ dot: $dayjs(item).format('YYYY-MM-DD') === $dayjs().format('YYYY-MM-DD') }"
        class="w-[13%] text-center font-arial text-[13px] font-bold"
        v-for="(item, index) in weekLst"
        :key="`week${index}`"
      >

        <p>{{ $dayjs(item).format("D") }}</p>
      </div>
    </div>

    <div class="flex">
    <!-- 這裡結束時間是動態抓八小時，如果未來有抽換，要重新處理 -->
      <div class="flex w-[12%] flex-col text-[12px]">
        <div v-for="(item, index) in 11" :key="index + 'clock'" class="clck leading-[40px]">
          {{ item + +startTime.split(':')[0] - 1 + ":"+startTime.split(':')[1] }}
          <!--  -->
        </div>
      </div>

      <div
        class="relative flex w-[13%] flex-col text-[12px]"
        v-for="(week, iidx) in attributes"
        :key="`week${iidx}`"
      >
        <!-- 畫表格 -->
        <div class="flex w-full flex-col text-[12px]">
          <div
            v-for="(item, index) in 11"
            :key="index + 'clock'"
            class="clock"
            :class="{ '!border-r-0': iidx === attributes?.length - 1 }"
          ></div>
        </div>
        <!-- 資料 -->

        <template v-for="(item, index) in week">
          <template v-if="item.data.length === 1">
          <!--  -->
            <p
              :key="`resultItem${index}`"
              :class="[
                item.data[0].customData.class,
                item.data[0].customData.specialClass,
                { 'items-center': item.data[0].customData.nameToDisplay.length < 4 }
              ]"
              class="absolute inset-x-1 box-border flex flex-col justify-center overflow-hidden rounded-[10px] text-center text-[10px]"
              @click="doRoute(item.data[0])"
              @keypress="doRoute(item.data[0])"
            >
              {{ item.data[0].customData.nameToDisplay }}
            </p>
          </template>

          <template v-if="morethanone(item.data)">
            <div :class="item.fatherClass" class="absolute inset-x-1 flex gap-1" :key="index">
              <p
                v-for="(order, i) in item.data"
                :key="`attributes-${i}`"
                :class="[
                  order.customData.class,
                  order.customData.specialClass,
                  `w-1/${item.data.length}`,
                ]"
                class="flex grow flex-col justify-center overflow-hidden rounded-[10px] text-center text-[10px] "
                @click="doRoute(order)"
                @keypress="doRoute(order)"
              >
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
      type: [Number, String],
    },
    weekLst: {
      type: [Array],
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
  mounted() {
    console.log(this.attributes);
  },
  data() {
    return {
      weekNo: ['Sun', 'Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sat'],
      startTime: localStorage.getItem('openingHours') ? localStorage.getItem('openingHours') : '10:00:00',
    };
  },
  methods: {
    morethanone(data) {
      return data.length > 1;
    },

    // 點擊的時候把當天的時間往上傳

    backtoToday() {
      // this.currentDay = this.$dayjs().format('YYYY-MM-DD');
      this.$emit('input', 0);
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
            title: `${attr.customData.nameToDisplay}`,
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
              // let bookingTimesPromiseArray = '';
              switch (attr.customData.type) {
                case 'RH':
                case 'HOLIDAY':
                  // bookingTimesPromiseArray = attr.customData.bookingTimes.map(
                  //   (item) => new Promise((resolve) => {
                  //     resolve(
                  //       this.$api.adminBookingTime({
                  //         designerId: this.userInfo.user.id,
                  //         datetime: item.time,
                  //         appointable: true,
                  //       }),
                  //     );
                  //   }),
                  // );
                  // await Promise.all(bookingTimesPromiseArray);
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
              this.showData = this.showData?.filter((item) => item.key !== attr.key);
            }
          });
      } else {
        this.$router.push({ name: 'ScheduleBreak-Detail', query: { id: attr.key } });
      }
    },
    preNextWeek(num) {
      this.$emit('input', this.value + num);
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
  },
};
</script>

<style>
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
.clck {
  transform: translateY(-20px);
  text-align: left;
}
.clock {
  @apply h-[40px]  border  relative border-b-0 border-l-0;
  line-height: 40px;
}

.clock::after {
  @apply border-b;
  content: "";
  position: absolute;
  bottom: 50%;
  border-style: dashed;
  left: 0;
  right: 0;
}
.clock span {
  position: absolute;
  top: -55%;
  left: 0;
  background-color: #fff;
  width: 22px;
}
</style>
