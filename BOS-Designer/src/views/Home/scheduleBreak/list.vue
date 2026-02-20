<template>
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'ScheduleBreak' }"></C-Back-Nav>
    <section class="relative p-4">
      <h1 class="m-auto mb-4 text-center text-[17px] font-bold">我的排休</h1>

      <article class="rounded-[20px] bg-white px-[1rem] py-[2rem]">
        <!-- 箭頭區塊 -->
        <div class="flex items-center">
          <button class="h-[44px] w-[44px]" @click="preWeek">
            <font-awesome-icon icon="fa-solid fa-angle-left" class="text-[#718096]" />
          </button>
          <div class="ml-2 text-center font-arial font-bold">
            {{ handleShowData("MM") }} 月 /
            <span>{{ handleShowData("YYYY") }}</span>
          </div>
          <button @click="nextWeek" class="ml-auto h-[44px] w-[44px]">
            <font-awesome-icon icon="fa-solid fa-angle-right" class="text-[#718096]" />
          </button>
        </div>

        <div class="mt-2">
          <!-- 星期 -->
          <ul class="mb-3 mt-5 flex items-center justify-center border-b pb-3 pl-6">
            <li
              class="w-[14.2857%] text-center text-[12px] font-bold text-[#B4B4B5]"
              v-for="(week, index) in weekNo"
              :key="index + 'weekNo'"
            >
              {{ week }}
            </li>
          </ul>
          <!-- 日期 -->
          <ul class="flex items-center justify-center pb-4 pl-6">
            <li
              class="w-[14.2857%] text-center text-[12px] font-bold"
              :class="{
                dot: $dayjs(item).format('YYYY-MM-DD') === $dayjs().format('YYYY-MM-DD'),
              }"
              v-for="(item, index) in weekLst"
              :key="`week${index}`"
            >
              {{ $dayjs(item).format("D") }}
            </li>
          </ul>
          <!-- 勾勾 -->
          <ul class="flex items-center justify-center pb-2 pl-6">
            <li
              class="w-[14.2857%] text-center text-[12px] font-bold"
              v-for="(_, index) in 7"
              :key="index + 'val'"
              @click="toggleAllDate(BreakWrap[index], weekLst[index])"
              @keypress="toggleAllDate(BreakWrap[index], weekLst[index])"
            >
              <C-Checkbox-Full
                :value="BreakWrap[index]"
                :disabled="true"
                class="w-auto"
              ></C-Checkbox-Full>
            </li>
          </ul>
          <!-- body -->

          <ul
            class="time flex grow items-center justify-center"
            v-for="(item, index) in restructureScheduleTableWithTimeList"
            :key="`resultItem${index}`"
          >
            <li class="line">{{ item.isHide ? "" : item.time.split(":")[0] }}</li>
            <li
              class="line"
              @click="toggle(innerItem, index, innerIndex)"
              @keypress="toggle(innerItem, index, innerIndex)"
              v-for="(innerItem, innerIndex) in item.date"
              :key="`innerItem${innerIndex}`"
            >
              <img
                src="@/static/images/rest.svg"
                alt="rest"
                v-if="
                  innerItem &&
                  (innerItem.statusComment === '該時段排休' ||
                    innerItem.statusComment === '該時段公休' ||
                    innerItem.statusComment === '本日公休')
                "
              />
            </li>
          </ul>
        </div>

        <div>
          <p class="regular-rest-time">固定公休時間</p>
          <div class="flex flex-wrap gap-2">
            <template v-if="Array.isArray(regularHolidayList.allDay)">
              <div
                v-for="(holiday, index) in regularHolidayList.allDay"
                :key="`allholiday${index}`"
                class="flex items-center rounded-full border border-[B4B4B5] px-2 py-1 text-sm text-[#B4B4B5]"
              >
                <span>{{ holiday }}</span>
                <img
                  @click="toggleRemove('remove', holiday, true)"
                  @keypress="toggleRemove('remove', holiday, true)"
                  src="@/static/images/close.svg"
                  alt="close"
                  class="ml-3"
                />
              </div>
            </template>
            <template v-if="Array.isArray(regularHolidayList.specificTime)">
              <div
                v-for="(holiday, index) in regularHolidayList.specificTime"
                :key="`holiday${index}`"
                class="flex items-center rounded-full border border-[B4B4B5] px-2 py-1 text-sm text-[#B4B4B5]"
              >
                <span
                  >{{ holiday.week }} {{ holiday.startHour }}:{{
                    holiday.startMinute > 10 ? holiday.startMinute : `0${holiday.startMinute}`
                  }}~{{ holiday.endHour }}:{{
                    holiday.endMinute > 10 ? holiday.endMinute : `0${holiday.endMinute}`
                  }}
                </span>
                <img
                  @click="toggleRemove('remove', holiday, false)"
                  @keypress="toggleRemove('remove', holiday, false)"
                  src="@/static/images/close.svg"
                  alt="close"
                  class="ml-3"
                />
              </div>
            </template>
          </div>
        </div>

        <button
          class="mx-auto mt-4 block rounded-full bg-[#7D9AC5] px-4 py-2 text-[12px] text-white"
          v-ripple="100"
          @click="toggleSys"
        >
          設定整日／固定公休時間
        </button>
      </article>
    </section>

    <C-Modal-Dialog v-model="dialogStatus" width="left-[2rem] right-[2rem]">
      <h2 class="my-8 px-4 text-center text-[18px] font-bold text-[#231815]">
        設定整日 / 固定公休日期
      </h2>
      <div class="mb-4 flex justify-center gap-4">
        <button
          class="select-none rounded-full border border-[#EEEEEF] px-[20px] py-[6px] font-light text-[#888888] duration-300"
          :class="[{ '!border-0 bg-[#222C4C] !text-white': isAll }]"
          @click="isAll = true"
        >
          整日
        </button>
        <button
          class="select-none rounded-full border border-[#EEEEEF] px-[20px] py-[6px] font-light text-[#888888] duration-300"
          :class="[{ '!border-0 bg-[#222C4C] !text-white': !isAll }]"
          @click="isAll = false"
        >
          時段
        </button>
      </div>
      <div v-if="isAll" class="px-4">
        <C-Select
          class="w-full rounded-xl bg-[#F7F7F7] font-light text-[#888]"
          :list="timeRepeat"
          v-model="seletedTimeRepeat"
          :placeholder="'選擇固定公休星期'"
          item-text="label"
          item-value="value"
          :isFull="true"
        ></C-Select>
      </div>
      <div v-else class="px-4">
        <C-Select
          class="w-full rounded-xl bg-[#F7F7F7] font-light text-[#888888]"
          :list="timeRepeat"
          v-model="unAllSeletedTimeRepeat"
          :placeholder="'選擇固定公休星期'"
          item-text="label"
          item-value="value"
          :isFull="true"
        ></C-Select>
        <div class="my-2 flex gap-2">
          <C-Select
            class="w-full rounded-xl bg-[#F7F7F7] font-light text-[#888888]"
            :list="currentSetAllDatTimeRangeList"
            v-model="startTime"
            :placeholder="'開始時間'"
            :isFull="true"
          ></C-Select>
          <C-Select
            class="w-full rounded-xl bg-[#F7F7F7] font-light text-[#888888]"
            :list="currentSetAllDatTimeRangeList"
            v-model="endTime"
            :placeholder="'結束時間'"
            :isFull="true"
          ></C-Select>
        </div>
      </div>

      <button
        class="swal2-styled swal2-confirm btn-confirm !bg-[#7D9AC5]"
        v-ripple="100"
        @click="setRegularHoliday('add')"
      >
        確認
      </button>
    </C-Modal-Dialog>
  </C-Main-Block>
</template>

<script>
import time from '@/assets/constant/time';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'ScheduleBreak-holiday',
  description: '行事曆的排休',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 排休',
  },
  data() {
    return {
      seletedBreak: {
        sunDate: false,
        monDate: false,
        tueDate: false,
        wedDate: false,
        thuDate: false,
        friDate: false,
        satDate: false,
      },
      seletedTimeRepeat: '',
      unAllSeletedTimeRepeat: '',
      timeList: time,
      designerBookingList: [],
      period: 0,
      timeRepeat: [
        { label: '星期日', value: 'SUNDAY' },
        { label: '星期一', value: 'MONDAY' },
        { label: '星期二', value: 'TUESDAY' },
        { label: '星期三', value: 'WEDNESDAY' },
        { label: '星期四', value: 'THURSDAY' },
        { label: '星期五', value: 'FRIDAY' },
        { label: '星期六', value: 'SATURDAY' },
      ],
      weekNo: ['Sun', 'Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sat'],
      isAll: true,
      startTime: '',
      endTime: '',
      regularHolidayList: [],
      dialogStatus: false,
      seleted: false,
    };
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    async init() {
      await Promise.all([this.getDesignerBookingTimesWithRange(), this.getRegularHoliday()]);
    },
    doRoute() {
      this.$router.push({ name: 'Punch' });
    },
    toggleRemove(type, holiday, isAllDay) {
      this.$swal
        .fire({
          html: `
        <div class="flex items-center justify-center pt-8 ">
            <span class="text-[18px] text-bold">確定要刪除嗎？</span>
            </div>


        `,
          confirmButtonText: '確認',
          cancelButtonText: '取消',
          showConfirmButton: true,
          showCancelButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!bg-[#F6BA7B]',
          },
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.setRegularHoliday(type, holiday, isAllDay);
          }
        });
    },
    async setRegularHoliday(type, holiday, isAllDay) {
      const submitForm = {
        designerId: this.userInfo.user.id,
        week: [],
        weekSpecificTime: [],
      };
      if (type === 'remove') {
        if (isAllDay) {
          submitForm.week = this.regularHolidayList.allDay.filter(
            (resultHoliday) => resultHoliday !== holiday,
          );
          submitForm.weekSpecificTime = this.regularHolidayList.specificTime;
        } else {
          submitForm.week = this.regularHolidayList.allDay;
          const weekSpecificTime = JSON.parse(JSON.stringify(this.regularHolidayList.specificTime));
          const removeIndex = this.regularHolidayList.specificTime.findIndex(
            (item) => item.week === holiday.week
              && +item.startHour === holiday.startHour
              && +item.startMinute === holiday.startMinute
              && +item.endHour === holiday.endHour
              && +item.endMinute === holiday.endMinute,
          );
          if (removeIndex !== -1) {
            weekSpecificTime.splice(removeIndex, 1);
            submitForm.weekSpecificTime = weekSpecificTime;
          }
        }
      }
      if (type === 'add') {
        if (this.isAll) {
          let week = [];
          if (this.seletedTimeRepeat !== '') {
            week = this.regularHolidayList.allDay.concat(this.seletedTimeRepeat);
          } else {
            this.$swal.fire({
              icon: 'warning',
              title: '請選擇星期',
              showConfirmButton: false,
              showCloseButton: true,
              timer: 3000,
              timerProgressBar: true,
            });
            return;
          }
          submitForm.week = [...new Set(week)];
          submitForm.weekSpecificTime = this.regularHolidayList.specificTime;
        } else {
          let weekSpecificTime = JSON.parse(JSON.stringify(this.regularHolidayList.specificTime));
          if (this.unAllSeletedTimeRepeat !== '' && this.startTime !== '' && this.endTime !== '') {
            const weekSpecificTimeTemp = {
              week: this.unAllSeletedTimeRepeat,
              startHour: +this.startTime.split(':')[0],
              startMinute: +this.startTime.split(':')[1],
              endHour: +this.endTime.split(':')[0],
              endMinute: +this.endTime.split(':')[1],
            };
            const status = weekSpecificTime.find(
              (item) => item.week === weekSpecificTimeTemp.week
                && +item.startHour === weekSpecificTimeTemp.startHour
                && +item.startMinute === weekSpecificTimeTemp.startMinute
                && +item.endHour === weekSpecificTimeTemp.endHour
                && +item.endMinute === weekSpecificTimeTemp.endMinute,
            );
            if (!status) {
              weekSpecificTime = weekSpecificTime.concat(weekSpecificTimeTemp);
            }

            submitForm.weekSpecificTime = weekSpecificTime;
            submitForm.week = this.regularHolidayList.allDay;
          } else {
            this.$swal.fire({
              icon: 'warning',
              title: '請選擇星期與時間',
              showConfirmButton: false,
              showCloseButton: true,
              timer: 3000,
              timerProgressBar: true,
            });
            return;
          }
        }
      }
      const resp = await this.$api.setRegularHoliday(submitForm);
      const { data, errors } = resp.data;
      if (errors) return;
      console.log(data);
      this.seletedTimeRepeat = '';
      this.dialogStatus = false;
      this.$swal.fire({
        title: ' ',
        html: `<div class="flex items-center justify-center ">
          <img src="/designer/assets/images/success.svg" alt="" class="inline-block mr-1" /><span>設定成功</span>
        </div>`,
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
          confirmButton: '!w-[144px] !rounded !bg-second !px-[14px] !py-2 !text-sm !text-white',
        },
        timerProgressBar: true,
        timer: 2500,
      });
      this.getDesignerBookingTimesWithRange();
      this.getRegularHoliday();
    },
    async getDesignerBookingTimesWithRange() {
      const submitForm = {
        designerId: this.userInfo.user.id,
        storeId: this.currentMechantId,
        dateRange: {
          startDate: this.$dayjs(this.weekLst[0]).valueOf(),
          endDate: this.$dayjs(this.weekLst[6]).valueOf(),
        },
      };
      const resp = await this.$api.getDesignerBookingTimesWithRange(submitForm);
      const { data, errors } = resp.data;
      if (errors) return;
      this.designerBookingList = data.getDesignerBookingTimesWithRange;
    },
    toggleSys() {
      this.dialogStatus = !this.dialogStatus;
    },
    toggleAllDate(status, dateTime) {
      console.log(status);
      console.log(dateTime);
      this.$swal
        .fire({
          showCloseButton: true,
          html: `<div class="flex items-center justify-center">
              <img src="/designer/assets/images/${
  status ? 'success' : 'error'
}.svg" alt="" class="inline-block mr-1" /><span> ${
  status ? '開啟' : '關閉'
}全日預約</span>
            </div>`,
          showConfirmButton: true,
          confirmButtonText: '確認',
          closeButtonText: '拒絕',
          customClass: {
            confirmButton: '!w-[144px] !rounded !bg-second !px-[14px] !py-2 !text-sm !text-white',
          },
        })
        .then(async (res) => {
          if (res.isConfirmed) {
            const submitForm = {
              designerId: this.userInfo.user.id,
              datetime: this.$dayjs(this.$dayjs(dateTime).format('YYYY-MM-DD')).valueOf(),
              appointable: status,
            };
            const resp = await this.$api.adminBookingTimeWholeDay(submitForm);
            const { errors } = resp.data;
            if (errors) return;
            await this.getDesignerBookingTimesWithRange();
          }
        });
    },
    toggle(innerItem) {
      // here
      if (!innerItem) return;
      this.$swal
        .fire({
          showCloseButton: true,
          html: `<div class="flex items-center justify-center pt-8 ">
            <span class="text-[18px] text-bold">我要${
  innerItem.statusComment === null ? '關閉' : '開啟'
}預約</span>
            </div>`,
          showConfirmButton: true,
          confirmButtonText: '確認',
          cancelButtonText: '拒絕',
          showCancelButton: true,
          customClass: {
            confirmButton: '!bg-[#f6ba7b]',
            cancelButton: '',
          },
        })
        .then(async (res) => {
          if (res.isConfirmed) {
            // this.resultList[index].date[innerIndex] = innerItem === '' ? true : '';
            await this.$api.adminBookingTime({
              designerId: this.userInfo.user.id,
              datetime: innerItem.time,
              appointable: innerItem.statusComment !== null,
            });
            await this.getDesignerBookingTimesWithRange();
            // this.$forceUpdate();
          }
        });
    },
    // async doAdminBookingTime() {

    // },
    async getRegularHoliday() {
      const resp = await this.$api.getRegularHolidaySetting({ userId: this.userInfo.user.id });
      const { data, errors } = resp.data;
      if (errors) return;
      this.regularHolidayList = data.getRegularHolidaySetting;
      console.log(this.regularHolidayList);
    },
    preWeek() {
      this.period -= 7;
    },
    nextWeek() {
      this.period += 7;
    },
    setTimeList() {
      // this.designerBookingList.flatMap((designerBookingListItem)=> ())
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
  watch: {
    seletedBreak: {
      handler(value, valuenew) {
        console.log(value, valuenew);
      },
    },
    weekLst: {
      deep: true,
      handler() {
        this.getDesignerBookingTimesWithRange();
      },
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
    weekLst() {
      return [
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD 00:00:00')).day(this.period),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD')).day(this.period + 1),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD')).day(this.period + 2),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD')).day(this.period + 3),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD')).day(this.period + 4),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD')).day(this.period + 5),
        this.$dayjs(this.$dayjs().format('YYYY-MM-DD 23:59:59')).day(this.period + 6),
      ];
    },
    restructureScheduleTableWithTimeList() {
      let timeList = [];
      let uniqueTimeList = [];
      let restructureScheduleTableWithTimeList = [];
      timeList = this.designerBookingList.flatMap((designerBookingListItem) => (!designerBookingListItem.bookingTimes
        ? []
        : designerBookingListItem.bookingTimes.flatMap((bookingTimesItem) => (!bookingTimesItem
          ? []
          : [
            this.$dayjs(bookingTimesItem.time).isValid()
              ? this.$dayjs(bookingTimesItem.time).format('HH:mm')
              : [],
          ]))));
      uniqueTimeList = [...new Set(timeList)];

      const [sun, mon, tue, wed, thu, fri, sat] = this.designerBookingList;

      restructureScheduleTableWithTimeList = uniqueTimeList.flatMap((HHmm) => {
        let [sunDate, monDate, tueDate, wedDate, thuDate, friDate, satDate] = [];
        sunDate = sun.bookingTimes.find((item) => this.$dayjs(item.time).format('HH:mm') === HHmm);
        monDate = mon.bookingTimes.find((item) => this.$dayjs(item.time).format('HH:mm') === HHmm);
        tueDate = tue.bookingTimes.find((item) => this.$dayjs(item.time).format('HH:mm') === HHmm);
        wedDate = wed.bookingTimes.find((item) => this.$dayjs(item.time).format('HH:mm') === HHmm);
        thuDate = thu.bookingTimes.find((item) => this.$dayjs(item.time).format('HH:mm') === HHmm);
        friDate = fri.bookingTimes.find((item) => this.$dayjs(item.time).format('HH:mm') === HHmm);
        satDate = sat.bookingTimes.find((item) => this.$dayjs(item.time).format('HH:mm') === HHmm);
        return [
          {
            time: HHmm,
            isHide: HHmm.split(':')[1] === '30',
            date: [sunDate, monDate, tueDate, wedDate, thuDate, friDate, satDate],
          },
        ];
      });
      console.log(restructureScheduleTableWithTimeList);
      return restructureScheduleTableWithTimeList;
    },
    BreakWrap() {
      const BreakWrap = this.designerBookingList.flatMap((item) => (Array.isArray(item.bookingTimes) && item.bookingTimes.length > 0
        ? [item.bookingTimes.every((innerItem) => innerItem.statusComment !== null)]
        : [false]));
      return BreakWrap;
    },
    currentSetAllDatTimeRangeList() {
      let currentSetAllDatTimeRangeList = [];
      if (Array.isArray(this.restructureScheduleTableWithTimeList)) {
        currentSetAllDatTimeRangeList = this.restructureScheduleTableWithTimeList.map(
          (item) => item.time,
        );
      }

      return currentSetAllDatTimeRangeList;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  @apply w-[12.5%] border border-solid border-primary text-center;
}

.time:nth-child(even) .line {
  @apply border-t border-b;
  border-bottom-style: dashed;
}
.time .line {
  @apply w-[14.2857%] border-r first-of-type:w-[1.5rem] h-8 leading-8 text-center first-of-type:border-t-0 first-of-type:border-b-0 first-of-type:border-r-0 last-of-type:border-r-0 text-[#B4B4B5] flex items-center justify-center;
}
.time .line img {
  aspect-ratio: 1/1;
  height: 1.5rem;
}

.line:first-of-type {
  font-size: 10px;
  transform: translateY(-50%);
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
.regular-rest-time {
  @apply my-4;
  position: relative;
  text-indent: 0.5em;
}
.regular-rest-time::before {
  content: "";
  position: absolute;
  width: 2px;
  top: 3px;
  bottom: 3px;
  left: 0;
  border-radius: 2px;
  background-color: #000;
}

.swal2-styled.swal2-confirm.btn-confirm {
  background-color: #7d9ac5;
  display: block;
  width: 95px;
  margin: 1.5rem auto 1rem;
}
</style>
