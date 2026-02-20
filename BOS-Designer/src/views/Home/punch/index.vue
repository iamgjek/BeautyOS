<template>
  <C-Main-Block>
    <C-Back-Nav></C-Back-Nav>
    <section class="relative p-4">
      <div class="relative mb-4 flex">
        <div @click="doRoute" @keypress="doRoute" class="absolute left-4">
          <font-awesome-icon icon="fa-solid fa-bars" />
        </div>
        <h1 class="m-auto text-[17px] font-bold">打卡</h1>
      </div>

      <div class="rounded-[10px] bg-white px-[1rem] py-[2rem] font-sans font-medium">
        <div class="my-2 text-center font-arial text-[18px] tracking-wider text-primary">
          {{ currentTime | dateFmtdot }} <small>{{ currentTime | dateFmtdd }}</small>
        </div>
        <div class="mb-3 text-center font-arial text-7xl font-bold tracking-wider text-primary">
          {{ currentTime | dateFmtHm }}
        </div>

        <div class="flex items-center justify-center gap-4 text-[13px]">
          <p :class="locationInfoClass">
            <font-awesome-icon icon="fa-light fa-location-dot" class="mr-3" />{{ locationInfo }}
          </p>
          <font-awesome-icon
            icon="fa-regular fa-arrows-rotate"
            @click="reFreshLocation"
            class="text-primary"
          />
        </div>

        <div
          class="my-7 flex justify-center gap-4 text-center font-normal"
          :class="{ 'mb-3': clockInRecordInList && isHasNotClockout }"
        >
          <div
            class="select-none rounded-full bg-[#222D4D] px-8 py-2 text-[15px] text-white"
            @click="doAttendance('CLOCKIN')"
            @keypress="doAttendance('CLOCKIN')"
          >
            上班打卡
          </div>
          <div
            class="select-none rounded-full bg-[#222D4D] px-8 py-2 text-[15px] text-white"
            @click="doAttendance('CLOCKOUT')"
            @keypress="doAttendance('CLOCKOUT')"
          >
            下班打卡
          </div>
        </div>
        <div
          class="mb-7 flex justify-center gap-4 text-center font-normal"
          v-if="clockInRecordInList && isHasNotClockout"
        >
          <div
            class="select-none rounded-full bg-[#788CBF] px-8 py-2 text-[15px] text-white"
            @click="doOutPunch(true), doAttendance('BREAKSTART')"
            @keypress="doOutPunch(true), doAttendance('BREAKSTART')"
          >
            外出打卡
          </div>
          <div
            class="select-none rounded-full bg-[#788CBF] px-8 py-2 text-[15px] text-white"
            @click="doOutPunch(false), doAttendance('BREAKEND')"
            @keypress="doOutPunch(false), doAttendance('BREAKEND')"
          >
            歸來打卡
          </div>
        </div>

        <template v-if="isDailyClockInRecordHasClockInRecord">
          <div
            class="text-left"
            v-for="(recordItem, index) in dailyClockInRecord.clockInRecord"
            :key="index"
            :class="{ 'mb-6': isDailyClockInRecordHasClockInRecord }"
          >
            <div
              class="上下班時間 mb-1 flex justify-between rounded-xl bg-[#F7F7F7] px-4 py-2"
              @click="recordItem.open = !recordItem.open"
              @keypress="recordItem.open = !recordItem.open"
            >
              <div class="flex w-1/2 text-[13px]">
                <h3 class="mr-2 whitespace-nowrap text-[#888888]">
                  <font-awesome-icon icon="fa-light fa-briefcase" class="inline-block w-[18px]" />
                  上班時間 /
                </h3>
                <p
                  v-if="recordItem.in"
                  class="inline-block w-full font-arial font-bold decoration-black/20"
                >
                  {{ timstampToMinSec(recordItem.in["time"]) }}
                </p>
                <p v-else class="font-normal text-[#C8C9CA]">尚未打卡</p>
              </div>
              <div class="flex w-1/2 text-[13px]">
                <h3 class="mr-2 whitespace-nowrap text-[#888888]">下班時間 /</h3>
                <p
                  v-if="recordItem.out"
                  class="inline-block w-full font-arial font-bold decoration-black/20"
                >
                  {{ timstampToMinSec(recordItem.out["time"]) }}
                </p>
                <p v-else class="inline-block w-full font-normal text-[#C8C9CA]">尚未打卡</p>
                <img src="@/static/images/downArrow.svg" alt="downArrow" />
              </div>
            </div>
            <div class="外出打卡時間" v-if="recordItem.open">
              <div class="rounded-xl bg-[#F7F7F7] px-4 py-2">
                <template v-if="recordItem.breakRecord.length">
                  <div
                    class="mb-2 flex justify-between last:mb-0"
                    v-for="(rcd, idx) in recordItem.breakRecord"
                    :key="idx"
                  >
                    <div class="flex w-1/2 text-[13px]">
                      <h3 class="mr-2 whitespace-nowrap text-[#888888]">
                        <font-awesome-icon
                          icon="fa-light fa-person-walking"
                          class="inline-block w-[21px]"
                        />外出時間 /
                      </h3>
                      <!-- <p>
                        {{ rcd.start ? $dayjs(rcd.start.time).format("HH:mm") : "未有紀錄" }}
                      </p> -->
                      <p v-if="rcd.start" class="font-arial font-bold">
                        {{ $dayjs(rcd.start.time).format("HH:mm") }}
                      </p>
                      <p v-else class="font-normal text-[#C8C9CA]">未有紀錄</p>
                    </div>
                    <div class="flex w-1/2 text-[13px]">
                      <h3 class="mr-2 whitespace-nowrap text-[#888888]">歸來時間 /</h3>
                      <p v-if="rcd.end" class="font-arial font-bold">
                        {{ $dayjs(rcd.end.time).format("HH:mm") }}
                      </p>
                      <p v-else class="font-normal text-[#C8C9CA]">未有紀錄</p>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="text-center text-[12px] text-[#C8C9CA]">未有打卡紀錄</div>
                </template>
              </div>

              <!-- <p class="flex break-all">
                <span class="mr-2 whitespace-nowrap font-bold">外出時間:</span>
                <span class="inline-block w-full underline decoration-black/20">
                  {{
                    timstampListToMinSecConcatText(recordItem.breakRecord, "start") === ""
                      ? "未有打卡紀錄"
                      : timstampListToMinSecConcatText(recordItem.breakRecord, "start")
                  }}
                </span>
              </p>
              <p class="flex break-all">
                <span class="mr-2 whitespace-nowrap font-bold">歸來時間:</span>
                <span class="inline-block w-full underline decoration-black/20">
                  {{
                    timstampListToMinSecConcatText(recordItem.breakRecord, "end") === ""
                      ? "未有打卡紀錄"
                      : timstampListToMinSecConcatText(recordItem.breakRecord, "end")
                  }}
                </span>
              </p> -->
            </div>
          </div>
        </template>
        <!-- ---------------------------- -->

        <template v-else>
          <div class="mb-2 flex justify-between rounded-xl bg-[#F7F7F7] px-4 py-2 text-[12px]">
            <div class="flex w-1/2">
              <h3 class="mr-2 whitespace-nowrap text-[#888888]">
                <font-awesome-icon icon="fa-light fa-briefcase " /> 上班時間 /
              </h3>
              <p class="inline-block w-full font-normal text-[#C8C9CA]">尚未打卡</p>
            </div>
            <div class="flex w-1/2">
              <h3 class="mr-2 whitespace-nowrap text-[#888888]">下班時間 /</h3>
              <p class="inline-block w-full font-normal text-[#C8C9CA]">尚未打卡</p>
            </div>
          </div>
        </template>
        <!-- ---------------------------- -->
        <div class="mt-7 flex gap-4">
          <div class="w-1/2 rounded-2xl bg-[#82BC94] py-2 text-center text-white">
            <p class="font-normal">本月總打卡天數</p>
            <p class="mx-2 font-arial text-3xl font-bold">
              {{ monthlyAttendanceCount }}<span class="ml-1 font-sans text-sm font-normal">天</span>
            </p>
          </div>

          <div class="w-1/2 rounded-2xl bg-[#F38E8C] py-2 text-center text-white">
            <p class="font-normal">遲到總分鐘數</p>
            <p class="mx-2 font-arial text-3xl font-bold">
              {{ monthlyAttendanceLateCount
              }}<small class="ml-1 font-sans text-sm font-normal">分</small>
            </p>
          </div>
        </div>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'punch-index',
  description: '打卡的首頁',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 打卡',
  },
  data() {
    return {
      resultItem: {},
      resultAttendance: {},
      punchStart: '',
      punchEnd: '',
      outPunchStart: '',
      outPunchEnd: '',
      locationInfo: '',
      // 時間
      currentTimeIntervalKey: '',
      currentTime: this.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
      dailyClockInRecord: {},
      isloading: false,
    };
  },
  mounted() {
    this.currentTimeIntervalKey = setInterval(() => {
      this.currentTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);
    this.init();
  },
  methods: {
    async init() {
      await Promise.all([
        this.getAttendanceRecords(),
        this.getDailyClockInRecord(),
        this.reFreshLocation(),
      ]).then(() => {});
    },
    // 刷新定位資訊
    async reFreshLocation() {
      const { latitude, longitude } = await this.geoFindMe();
      const resp = await this.$api.checkGPSStatus({
        latitude: latitude ? `${latitude}` : latitude,
        longitude: longitude ? `${longitude}` : longitude,
      });
      const { data, errors } = resp.data;
      if (errors) return;
      console.log(data.checkGPSStatus);
      const actions = new Map([
        ['NULL', { locationInfo: '無GPS座標' }],
        ['LOWERTHAN25', { locationInfo: '距離 < 25m' }],
        ['BETWEEN25AND50', { locationInfo: '距離 25m-50m' }],
        ['MORETHAN50', { locationInfo: '距離 > 50m' }],
      ]);
      this.locationInfo = actions.get(data.checkGPSStatus.status)
        ? actions.get(data.checkGPSStatus.status).locationInfo
        : '無GPS座標';

      // this.locationInfo = '目標距離 < 25m';
    },
    // 取得打卡清單
    async getDailyClockInRecord() {
      const resp = await this.$api.dailyClockInRecord({
        date: this.$dayjs().valueOf(),
        designerId: this.userInfo.user.id,
      });
      const { data, errors } = resp.data;
      if (errors) return;
      const [dailyClockInRecord = {}] = data.dailyClockInRecord;
      this.dailyClockInRecord = dailyClockInRecord;

      this.dailyClockInRecord.clockInRecord = this.dailyClockInRecord.clockInRecord.map(
        (currentValue) => ({ open: false, ...currentValue }),
      );
      console.log(this.dailyClockInRecord.clockInRecord);
      // this.dailyClockInRecord.clockInRecord.foreach((item) => {
      //   console.log(item);
      // });
    },
    async getAttendanceRecords() {
      const sumbitAttendanceRecordsForm = {
        userId: this.userInfo.user.id,
        dateRange: {
          startDate: this.$dayjs(new Date()).startOf('month').valueOf(),
          endDate: this.$dayjs(new Date()).endOf('month').valueOf(),
        },
        pageLimit: 1000,
      };
      const resp = await this.$api.attendanceRecords(sumbitAttendanceRecordsForm);
      const { data, errors } = resp.data;
      if (errors) return;
      this.resultAttendance = data.attendanceRecords;
    },
    doRoute() {
      this.$router.push({ name: 'Punch-list' });
    },
    geoFindMe() {
      return new Promise((resolve) => {
        let { latitude, longitude } = {};
        const success = (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        };
        const error = () => {
          latitude = null;
          longitude = null;
          resolve({ latitude, longitude });
        };
        if (!navigator.geolocation) {
          this.$swal.fire({
            icon: 'warning',
            title: '請開起與授權GPS定位功能',
            showConfirmButton: true,
            showCancelButton: true,
          });
          resolve({ latitude: null, longitude: null });
        } else {
          navigator.geolocation.getCurrentPosition(success, error);
        }
      });
    },
    async doAttendance(statusType) {
      await this.reFreshLocation();
      const { latitude, longitude } = await this.geoFindMe();
      const resp = await this.$api.userClockIn({
        userIds: [this.userInfo.user.id],
        status: statusType,
        checkinType: 'CELLPHONE',
        GPSLocation: latitude ? { latitude: `${latitude}`, longitude: `${longitude}` } : null,
      });
      const { data, errors } = resp.data;
      await this.getAttendanceRecords();
      if (errors) return;
      await this.getDailyClockInRecord();
      if (data.userClockIn) {
        this.$swal.fire({
          showCloseButton: true,
          icon: 'success',
          title: '打卡成功',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    },
    doOutPunch(status) {
      if (status) {
        this.outPunchStart = this.$dayjs().format('HH:mm');
      } else {
        this.outPunchEnd = this.$dayjs().format('HH:mm');
      }
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId']),
    monthlyAttendanceCount() {
      let count = 0;
      if (this.resultAttendance[0] && Array.isArray(this.resultAttendance[0].attendanceRecord)) {
        count = this.resultAttendance[0].attendanceRecord.filter(
          (recordItem) => Object.prototype.hasOwnProperty.call(recordItem, 'clockInRecord')
            && Array.isArray(recordItem.clockInRecord)
            && recordItem.clockInRecord.length > 0,
        ).length;
      }
      return count;
    },
    monthlyAttendanceLateCount() {
      let count = 0;
      count = this.resultAttendance[0] ? this.resultAttendance[0].totalLateMinutes : 0;
      return count;
    },
    currentMerchantName() {
      const currentMerchant = this.userInfo?.user?.merchants.find(
        (item) => item.id === this.currentMechantId,
      );
      return currentMerchant ? currentMerchant.name : '';
    },
    clockInRecordInList() {
      let clockInRecordInListContent = '';
      const { clockInRecord = [] } = this.dailyClockInRecord;
      clockInRecordInListContent = clockInRecord
        .flatMap((RecordItem) => (RecordItem.in ? this.$dayjs(RecordItem.in).format('HH:mm') : ''))
        .toString();
      return clockInRecordInListContent;
    },
    timstampToMinSec() {
      return (timestamp) => (this.$dayjs(timestamp).isValid() ? this.$dayjs(timestamp).format('HH:mm') : timestamp);
    },
    timstampListToMinSecConcatText() {
      return (timstampList, type) => timstampList
        .flatMap((timstampListItem) => [
          timstampListItem[type] && this.$dayjs(timstampListItem[type].time).isValid()
            ? this.$dayjs(timstampListItem[type].time).format('HH:mm')
            : [],
        ])
        .toString();
    },
    isHasNotClockout() {
      let isHasNotClockout = false;
      const { clockInRecord = [] } = this.dailyClockInRecord;
      isHasNotClockout = clockInRecord.some(
        (clockInRecordItem) => clockInRecordItem && clockInRecordItem.out === null,
      );
      return isHasNotClockout;
    },
    isDailyClockInRecordHasClockInRecord() {
      return (
        this.dailyClockInRecord.clockInRecord && this.dailyClockInRecord.clockInRecord.length > 0
      );
    },
    locationInfoClass() {
      return {
        'text-[#81BC95]': this.locationInfo === '距離 < 25m',
        'text-[#F6BA7A]': this.locationInfo === '距離 25m-50m',
        'text-[#F38E8C]': this.locationInfo === '距離 > 50m' || this.locationInfo === '無GPS座標',
      };
    },
  },
  beforeDestroy() {
    clearInterval(this.currentTimeIntervalKey);
  },
};
</script>

<style></style>
