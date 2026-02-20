<template>
 <C-Main-Block>
    <!--  :title="`${GETTER_MECHANTNAME !== '' ? GETTER_MECHANTNAME + ' - ' : ''}打卡`" :routeTarget="{name: 'Punch'}" -->
    <C-Back-Nav :routeTarget="{ name: 'Punch' }"></C-Back-Nav>
    <!-- rounded-[20px] bg-white px-[1rem] py-[2rem] font-sans font-medium -->
    <section class="relative p-4 font-sans font-medium">
      <h1 class="mb-4 text-center font-bold">打卡清單</h1>
      <div class="rounded-[20px] bg-white px-[1rem] py-[2rem]">
        <div class="month-p relative mb-4 flex items-center justify-between gap-2">
          <!--  -->
          <month-picker-input
            lang="zh"
            :input-pre-filled="true"
            :default-month="+this.$dayjs().month() + 1"
            :default-year="+$dayjs(new Date()).format('YYYY')"
            @change="showDate"
            class="!w-full font-arial text-[16px] font-bold"
            :months="month"
            date-format="%n / %Y"
          />
          <!-- <div class="bdrop"></div> -->
        </div>
        <div
          class="text-sm"
          v-if="
            Array.isArray(ListHasResultAttendanceRecords) &&
            ListHasResultAttendanceRecords.length > 0
          "
        >
          <div
            v-for="(item, key) in ListHasResultAttendanceRecords"
            :key="`resultAttendance${key}`"
            class="text-[12px] font-normal"
          >
            <div class="punch-day">{{ item.date | dateFmtMMDDdddot }}</div>
            <div
              v-for="(clockInRecordItem, clockInRecordIndex) in item.clockInRecord"
              :key="`clockInRecordItem${clockInRecordIndex}`"
              class="mb-2 rounded-[10px] bg-[#F7F7F7] p-2"
            >
              <!-- {{clockInRecordItem}} -->
              <template v-if="clockInRecordItem.in">
                <div class="section-block">
                  <!-- 時間 -->
                  <div class="item-clock clock-width">
                    <img src="@/static/images/smallClock.svg" alt="smallClock" class="icon" />
                    {{ clockInRecordItem.in.time | dateFmtHm }}
                  </div>
                  <!-- 項目 -->
                  <div class="punch-width">
                    <font-awesome-icon icon="fa-light fa-briefcase" class="icon-punch icon" />上班
                  </div>
                  <div class="local-width">
                    <font-awesome-icon icon="fa-light fa-location-dot" class="icon-local icon" />
                    <span
                      :class="[
                        { 'text-[#81BC95]': clockInRecordItem.in.distanceValue === 'LOWERTHAN25' },
                        {
                          'text-[#F6BA7A]': clockInRecordItem.in.distanceValue === 'BETWEEN25AND50',
                        },
                        {
                          'text-[#F38E8C]':
                            clockInRecordItem.in.distanceValue === 'MORETHAN50' ||
                            clockInRecordItem.in.distanceValue === 'NULL',
                        },
                      ]"
                      >{{ alternate(clockInRecordItem.in.distanceValue) }}</span
                    >
                  </div>
                  <div
                    class="item-delay delay-width"
                    :class="{ 'text-rejectText': item.lateMinutes > 0 }"
                  >
                    <img
                      src="@/static/images/smallClockAlert.svg"
                      alt="smallClockAlert"
                      class="icon"
                    />{{ clockInRecordIndex === 0 ? item.lateMinutes + "分" : "----" }}
                  </div>
                  <div class="status-width">
                    <img
                      src="@/static/images/lateCheck.svg"
                      alt="lateCheck"
                      class="icon-status"
                      v-if="item.isLate"
                    />
                    <img
                      src="@/static/images/successCheck.svg"
                      alt="successCheck"
                      class="icon-status"
                      v-else
                    />
                  </div>
                </div>
              </template>
              <template v-if="clockInRecordItem.breakRecord">
                <template v-for="(breakRecord, breakRecordIndex) in clockInRecordItem.breakRecord">
                  <div
                    class="section-block"
                    v-if="breakRecord.start"
                    :key="`breakRecordSatrt${breakRecordIndex}`"
                  >
                    <div class="item-clock clock-width">
                      <img src="@/static/images/smallClock.svg" alt="smallClock" class="icon" />
                      {{ breakRecord.start.time | dateFmtHm }}
                    </div>

                    <div class="punch-width">
                      <font-awesome-icon
                        icon="fa-light fa-person-walking"
                        class="icon-punch icon"
                      /><span class="text-[#788CBF]">外出</span>
                    </div>
                    <div class="local-width">
                      <font-awesome-icon icon="fa-light fa-location-dot" class="icon-local icon" />
                      <span
                        :class="[
                          {
                            'text-[#81BC95]': clockInRecordItem.in.distanceValue === 'LOWERTHAN25',
                          },
                          {
                            'text-[#F6BA7A]':
                              clockInRecordItem.in.distanceValue === 'BETWEEN25AND50',
                          },
                          {
                            'text-[#F38E8C]':
                              clockInRecordItem.in.distanceValue === 'MORETHAN50' ||
                              clockInRecordItem.in.distanceValue === 'NULL',
                          },
                        ]"
                        >{{ alternate(clockInRecordItem.in.distanceValue) }}</span
                      >
                    </div>

                    <div class="item-delay delay-width">
                      <img
                        src="@/static/images/smallClockAlert.svg"
                        alt="smallClockAlert"
                        class="icon"
                      />----
                    </div>
                    <div class="status-width">
                      <img
                        src="@/static/images/successCheck.svg"
                        class="icon-status"
                        alt="successCheck"
                      />
                    </div>
                  </div>

                  <div
                    class="section-block"
                    v-if="breakRecord.end"
                    :key="`breakRecordEnd${breakRecordIndex}`"
                  >
                    <div class="item-clock clock-width">
                      <img src="@/static/images/smallClock.svg" alt="smallClock" class="icon" />{{
                        breakRecord.end.time | dateFmtHm
                      }}
                    </div>
                    <div class="punch-width">
                      <font-awesome-icon
                        icon="fa-light fa-person-walking"
                        class="icon-punch icon"
                      /><span class="text-[#788CBF]">歸來</span>
                    </div>
                    <div class="local-width">
                      <font-awesome-icon icon="fa-light fa-location-dot" class="icon-local icon" />
                      <span
                        :class="[
                          {
                            'text-[#81BC95]': clockInRecordItem.in.distanceValue === 'LOWERTHAN25',
                          },
                          {
                            'text-[#F6BA7A]':
                              clockInRecordItem.in.distanceValue === 'BETWEEN25AND50',
                          },
                          {
                            'text-[#F38E8C]':
                              clockInRecordItem.in.distanceValue === 'MORETHAN50' ||
                              clockInRecordItem.in.distanceValue === 'NULL',
                          },
                        ]"
                        >{{ alternate(clockInRecordItem.in.distanceValue) }}</span
                      >
                    </div>
                    <div class="item-delay delay-width">
                      <img
                        src="@/static/images/smallClockAlert.svg"
                        alt="smallClockAlert"
                        class="icon"
                      />0分
                    </div>
                    <div class="status-width">
                      <img
                        src="@/static/images/lateCheck.svg"
                        alt="lateCheck"
                        class="icon-status"
                        v-if="breakRecord.end.isLate"
                      />
                      <img
                        src="@/static/images/successCheck.svg"
                        alt="successCheck"
                        class="icon-status"
                        v-else
                      />
                    </div>
                  </div>
                </template>
              </template>
              <template v-if="clockInRecordItem.out">
                <div class="section-block">
                  <div class="item-clock clock-width">
                    <img src="@/static/images/smallClock.svg" alt="smallClock" class="icon" />
                    {{ clockInRecordItem.out.time | dateFmtHm }}
                  </div>
                  <div class="punch-width">
                    <font-awesome-icon icon="fa-light fa-briefcase" class="icon-punch icon" />
                    下班
                  </div>
                  <div class="local-width">
                    <font-awesome-icon icon="fa-light fa-location-dot" class="icon-local icon" />
                    <span
                      :class="[
                        { 'text-[#81BC95]': clockInRecordItem.in.distanceValue === 'LOWERTHAN25' },
                        {
                          'text-[#F6BA7A]': clockInRecordItem.in.distanceValue === 'BETWEEN25AND50',
                        },
                        {
                          'text-[#F38E8C]':
                            clockInRecordItem.in.distanceValue === 'MORETHAN50' ||
                            clockInRecordItem.in.distanceValue === 'NULL',
                        },
                      ]"
                      >{{ alternate(clockInRecordItem.in.distanceValue) }}</span
                    >
                  </div>
                  <div class="item-delay delay-width">
                    <img
                      src="@/static/images/smallClockAlert.svg"
                      alt="smallClockAlert"
                      class="icon"
                    />
                    0分
                  </div>
                  <div class="status-width">
                    <img
                      src="@/static/images/lateCheck.svg"
                      alt="lateCheck"
                      class="icon-status"
                      v-if="item.isLeaveEarly"
                    />
                    <img
                      src="@/static/images/successCheck.svg"
                      alt="successCheck"
                      class="icon-status"
                      v-else
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div v-else class="mt-3 flex items-center justify-center text-xl text-[#ccc]">
          <p>查無資料</p>
        </div>
      </div>
    </section>
    </C-Main-Block>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { MonthPickerInput } from 'vue-month-picker';

export default {
  name: 'punch-list',
  description: '打卡列表',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 打卡',
  },
  components: {
    MonthPickerInput,
  },
  data() {
    return {
      resultAttendance: [],
      date: {
        from: null,
        to: null,
        month: null,
        year: null,
      },
      month: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await Promise.all([this.getAttendanceRecords()]).then(() => {});
    },
    async getAttendanceRecords() {
      const sumbitAttendanceRecordsForm = {
        userId: this.userInfo.user.id,
        dateRange: {
          startDate: this.$dayjs(this.date.from).startOf('month').valueOf(),
          endDate: this.$dayjs(this.date.to).add(-1, 'day').endOf('month').valueOf(),
        },
        pageLimit: 1000,
      };
      const resp = await this.$api.attendanceRecords(sumbitAttendanceRecordsForm);
      const { data, errors } = resp.data;
      if (errors) return;
      const [resultAttendance = {}] = data.attendanceRecords;

      this.resultAttendance = resultAttendance.attendanceRecord
        ? resultAttendance.attendanceRecord
        : [];
    },
    doRoute() {
      this.$router.push({ name: 'Punch' });
    },
    showDate(date) {
      this.date = date;
      this.getAttendanceRecords();
    },
    alternate(data) {
      const actions = new Map([
        ['NULL', '無GPS座標'],
        ['LOWERTHAN25', '距離 < 25m'],
        ['BETWEEN25AND50', '距離 25m-50m'],
        ['MORETHAN50', '距離 > 50m'],
      ]);
      const date = actions.get(data);

      return date;
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
    ListHasResultAttendanceRecords() {
      const ListHasResultAttendanceRecords = this.resultAttendance.filter(
        (records) => Array.isArray(records.clockInRecord) && records.clockInRecord.length > 0,
      );
      console.log(ListHasResultAttendanceRecords);
      return ListHasResultAttendanceRecords;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .month-picker-input {
  padding: 0rem 1rem 1rem;
  width: 100%;
  border: solid #eee;
  border-width: 0 0 2px 0;
  border-radius: 0px;
}

::v-deep .month-picker-input:focus {
  box-shadow: none;
}

::v-deep .month-picker__month {
  border-radius: 100px;
  padding: 0.2rem 0;
  color: #cacaca;
  border: none;
  margin-bottom: 5px;
}
::v-deep .month-picker__month.selected {
  background-color: #222c4c;
  color: #fff;
  box-shadow: none;
}
::v-deep .month-picker__container {
  top: 100%;
  z-index: 1;
  border-radius: 20px;
  box-shadow: 1px 2px 5px rgb(0 0 0 / 10%);
  width: 100%;
  left: 0;
  right: 0;
  margin: auto;
  padding: 1rem;
  background-color: #fff !important;
}

::v-deep .month-picker__container button {
  background-color: #fff;
  border: none;
  top: 21px;
  width: 30px;
}
::v-deep .month-picker__container p {
  background-color: #fcfcfc;
}

::v-deep .month-picker__year {
  box-shadow: none;
}

::v-deep .month-picker {
  border-radius: 0 0 20px 20px;
  box-shadow: none;
}

.month-p::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border: solid #222c4c;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  right: 25px;
  bottom: 29px;
  pointer-events: none;
}

.punch-day {
  @apply mt-4 mb-1 ml-2  p-2  text-left text-[#222C4C] text-[14px] relative font-arial font-bold;
}

.punch-day::before {
  content: "";
  position: absolute;
  width: 2px;
  top: 0.5rem;
  bottom: 0.5rem;
  background-color: #222c4c;
  left: 0;
  border-radius: 5px;
}

.section-block {
  @apply mb-2 pb-2 flex items-center   text-left;
}

.section-block:not(:last-child) {
  @apply border-primary border-b border-[#ccc] border-dashed;
}

.section-block:last-child {
  @apply mb-0 pb-0;
}

.item-clock {
  @apply flex justify-center text-center font-arial font-bold;
}

.icon {
  @apply mr-1;
}
.icon-punch {
  @apply inline-block w-[15px] text-[15px];
}

.icon-local {
  @apply text-[15px];
}
.icon-status {
  @apply m-auto;
}

.item-delay {
  @apply flex  items-center;
}

.clock-width {
  @apply w-1/6 mr-2;
}
.punch-width {
  @apply w-1/6 mr-1;
}
.local-width {
  @apply w-[35%];
}
.delay-width {
  @apply w-[15%];
}
.status-width {
  @apply w-[10%] m-auto;
}
</style>
