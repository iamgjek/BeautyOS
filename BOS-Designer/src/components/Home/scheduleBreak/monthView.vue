<template>
  <div>
    <vc-date-picker locale="en" class="custom-calendar max-w-full p-4" is-expanded :value="''"
      :attributes="attributesfilterdByCategories" :masks="masks" @update:to-page="swipeMonth($event)">
      <template v-slot:header="{ year, month }">
        <div class="py-[0.55rem] text-center">
          <span class="text-[20px] font-bold">{{ month }}月 / {{ year }}</span>
        </div>
      </template>

      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col items-center justify-start" @click="dayClick(day.date, attributes)"
          @keypress="dayClick(day.date, attributes)">
          <p class="day-label relative my-2 w-full text-center font-arial text-sm font-bold" :class="[selectedDate === $dayjs(day.date).valueOf()
            ? ' after:contents-[``] text-white  after:absolute  after:inset-0 after:z-[-1]  after:m-auto after:h-[26px]  after:w-[26px] after:rounded-[50%] after:bg-[#222C4C]'
            : '',
          ]">
            {{ day.day }}
          </p>
          <div class="text-center text-[10px]">
            <template v-for="(attr) in attributes?.slice(0, 3)">
              <span class="mx-1 mb-1 block  break-all rounded-[5px] bg-ml p-1 text-white"
                :class="[attr.customData && attr.customData.class ? attr.customData.class : '']"
                :key="attr.key">{{attr.customData.nameToDisplay}}</span>
            </template>
            <span v-if="attributes?.length>3" class="mb-1 block  rounded-[5px]  px-2 py-1 ">+ {{ attributes?.length-3 }}</span>
          </div>
          <!-- <div>
          <template v-for="(attr, index) in attributes">
              <span v-if="attr.customData.display" :key="attr.key + index"
                class="m-[1.5px] inline-block h-[4px] w-[4px] rounded-[50%] text-center text-white content-['']"
                :class="[attr.customData && attr.customData.class ? attr.customData.class : '',
                  { 'pointer-events-none': !attr.customData }]"
                  @click="dayClick(day.date, attributes)"
                  @keypress="dayClick(day.date, attributes)">
              </span>
            </template>
          </div> -->

        </div>
      </template>
    </vc-date-picker>

    <div class="bdrop" v-if="isShowModal" @click="isShowModal = !isShowModal" @keypress="isShowModal = !isShowModal">
    </div>
    <div class="modal flex flex-col" v-if="isShowModal">
      <div class="modal-header">
        <h1 class="text-left font-bold">
          <span class="text-2xl">{{ getDay }}</span> /
          <span class="text-sm"> {{ getWeek }} </span>
        </h1>
        <div class="relative mt-auto flex justify-end">
          <button class="h-[25px] w-[25px] rounded-full bg-black text-center text-xl leading-[25px] text-[#fff]"
            @click="isDirect = !isDirect">
            +
          </button>
          <div class="bdrop" v-if="isDirect" @click="isDirect = !isDirect" @keypress="isDirect = !isDirect"></div>
          <div v-if="isDirect" class="absolute right-[10px] top-[120%] !z-10 mx-auto flex w-[110px] justify-end">
            <div class="relative w-full rounded-md bg-white">
              <div class="py-2 text-center text-black">
                <div class="w-full cursor-pointer text-sm">
                  <p class="my-3" @click="doRouteInside({ name: 'ScheduleBreak-Add' })"
                    @keydown="doRouteInside({ name: 'ScheduleBreak-Add' })">
                    新增預約
                  </p>
                  <p class="my-3" @click="doRouteInside({ name: 'ScheduleBreak-Event' })"
                    @keydown="doRouteInside({ name: 'ScheduleBreak-Event' })">
                    新增事件
                  </p>
                  <p class="my-3" @click="doRouteInside({ name: 'ScheduleBreak-List' })"
                    @keydown="doRouteInside({ name: 'ScheduleBreak-List' })">
                    我的排休
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-auto">
        <ul class="list">
          <li v-for="(attr, index) in showData" :key="attr.key + index" @click="doRoute(attr)" @keypress="doRoute(attr)">
            <div class="start-time font-arial font-bold text-[#231815]">
            <span>{{ $dayjs(attr.customData.start).format("HH:mm") }}</span>
            <span>{{ $dayjs(attr.customData.end).format("HH:mm") }}</span>

            </div>

            <div class="name">
              <span class="color" :class="[attr.customData.class]"></span>{{ attr.customData.designer }}
            </div>
            <div class="status">{{ attr.customData.nameToDisplay }}</div>
            <img src="@/static/images/rightArrow.svg" alt="rightArrow" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    value: {
      type: [Object, Array],
    },
    attributes: {
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
      // 打開新增預約和檢視行事曆的tooltip
      isDirect: false,
      isShowModal: false,
      getDay: null,
      getWeek: null,
      showData: [],
      selectedDate: this.$dayjs().startOf('day').valueOf(),
      masks: {
        weekdays: 'WWW',
      },
    };
  },
  mounted() {
  },
  methods: {
    dayClick(data, attributes) {
      const weekMap = new Map([
        [0, '星期天'],
        [1, '星期一'],
        [2, '星期二'],
        [3, '星期三'],
        [4, '星期四'],
        [5, '星期五'],
        [6, '星期六'],
      ]);

      this.selectedDate = this.$dayjs(data).valueOf();
      this.getDay = this.$dayjs(data).get('date');
      this.getWeek = weekMap.get(this.$dayjs(data).get('day'));
      this.showData = attributes;
      this.isShowModal = !this.isShowModal;
    },
    swipeMonth(e) {
      const starDate = this.$dayjs(`${e.year}/${e.month}/1`).startOf('month').valueOf();
      const endDate = this.$dayjs(`${e.year}/${e.month}/1`).endOf('month').valueOf();
      this.$emit('input', { start: starDate, end: endDate });
    },
    doRouteInside(item) {
      this.$router.push({ name: item.name, params: { date: this.selectedDate } });
      this.isDirect = !this.isDirect;
      this.isShowModal = !this.isShowModal;
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
                  await this.$api.adminBookingTime({
                    designerId: this.userInfo.user.id,
                    datetime: attr.customData.start,
                    appointable: true,
                  });
                  break;
                case 'EVENT':
                  await this.$api.deleteEvent({ eventId: attr.key });
                  break;
                default: // 時段公休、整日公休
                  break;
              }

              await this.manaulUpdateFormResult();
              this.showData = this.showData.filter((item) => item.key !== attr.key);
            }
          });
      } else {
        this.$router.push({ name: 'ScheduleBreak-Detail', query: { id: attr.key } });
      }
    },
    preNextMonth(num) {
      this.$emit('input', {
        start: this.$dayjs(this.$dayjs(this.propMonthlyOrdersDate.start).add(num, 'month'))
          .startOf('month')
          .format('YYYY-MM-DD'),
        end: this.$dayjs(this.$dayjs(this.propMonthlyOrdersDate.end).add(num, 'month'))
          .endOf('month')
          .format('YYYY-MM-DD'),
      });
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
    attributesfilterdByCategories() {
      return this.attributes;
    },
    dayFilter(attr) {
      return attr;
    },
    propMonthlyOrdersDate: {
      get() {
        return this.value;
      },
      set() {
        this.$emit('input', this.propMonthlyOrdersDate);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep.vc-container {
  border: none;
}

::v-deep .vc-arrow:hover {
  background-color: transparent;
}

::v-deep div[class^="vc-weekday"] {
  padding-bottom: 1rem !important;
  margin-bottom: 1rem !important;
  border-bottom: 2px solid #eee;
  border-style: dashed;
  color: #b4b4b5;
  font-size: 12px;
}

::v-deep .in-next-month {
  display: none;
}

.bdrop {
  position: fixed;
  inset: -900px;
  background-color: #0002;
  z-index: 1;
}

.modal {
  position: fixed;
  inset: 80px 30px 146px; //底下要再+ navbar的66px
  z-index: 1;
  background-color: #fff;
  box-shadow: 2px 2px 5px 3px #ccc;
  border-radius: 15px;
  padding: 20px;
}

.modal-header {
  border-bottom: 3px dotted #ccc;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.list li {
  display: flex;
  align-items: center;
  padding: 10px 5px;
  font-weight: bold;
  font-size: 13px;
}

.list .start-time {
  width: 20%;
  display: flex;
  flex-direction: column;
}

.list .name {
  position: relative;
  display: flex;
  width: 35%;
  color: #231815;
}

.list .status {
  color: #231815;
  width: 40%;
}

.list li .color {
  display: inline-block;
  width: 5px;
  height: 20px;
  border-radius: 3px;
  vertical-align: middle;
  margin-right: 5px;
}

.list li .time {
  position: absolute;
  top: calc(100% + 5px);
  left: 10px;
  color: #ccc;
  font-size: 12px;
  white-space: nowrap;
}

.list img {
  color: #888;
  margin-left: auto;
}
</style>
