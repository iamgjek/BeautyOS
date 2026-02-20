<template>
  <C-Main-Block>
    <C-Back-Nav></C-Back-Nav>
    <section class="p-4">
      <div class="relative mb-4 flex">
        <font-awesome-icon icon="fa-regular fa-filter-list" class="absolute left-4 text-2xl"
          @click="isActiveFilter = !isActiveFilter" />
        <h1 class="m-auto font-bold tracking-widest text-[#231815]">
          <!-- {{ GETTER_MECHANTNAME !== "" ? GETTER_MECHANTNAME + " - " : "" }} -->
          行事曆
        </h1>
        <div class="btn-group absolute right-12">
          <button @click="setShowType('0')" :class="{ 'bg-[#ddd]': showType == '0' }">月</button>
          <button @click="setShowType('1')" :class="{ 'bg-[#ddd]': showType == '1' }">週</button>
          <button @click="setShowType('2')" :class="{ 'bg-[#ddd]': showType == '2' }">日</button>
        </div>
        <font-awesome-icon icon="fa-regular fa-circle-plus" class="absolute right-4 text-2xl"
          @click="isDirect = !isDirect" />
        <C-Loading-Overlay v-model="isDirect" @doFunction="isDirect = !isDirect" :layerIndex="10"></C-Loading-Overlay>
        <div v-if="isDirect" class="absolute right-[30px] top-[80%] !z-10 mx-auto flex w-[110px] justify-end">
          <div class="relative w-full rounded-md bg-white">
            <div class="py-2 text-center text-black">
              <div class="w-full cursor-pointer text-sm">
                <p class="my-3" @click="doRoute('ScheduleBreak-Add'), (isDirect = !isDirect)"
                  @keydown="doRoute('ScheduleBreak-Add'), (isDirect = !isDirect)">
                  新增預約
                </p>
                <p class="my-3" @click="doRoute('ScheduleBreak-Event'), (isDirect = !isDirect)"
                  @keydown="doRoute('ScheduleBreak-Event'), (isDirect = !isDirect)">
                  新增事件
                </p>
                <p class="my-3" @click="doRoute('ScheduleBreak-List'), (isDirect = !isDirect)"
                  @keydown="doRoute('ScheduleBreak-List'), (isDirect = !isDirect)">
                  我的排休
                </p>
                <!-- <p class=" m-[8px] text-left" @click="doRoute('ScheduleBreak-Duotone'),isDirect = !isDirect" @keydown="doRoute('ScheduleBreak-Duotone'),isDirect = !isDirect">排休清單</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 月模式 -->
      <MonthView v-if="showType === '0'" v-model="monthlyOrdersDate" :attributes="filterIsEvent"  :manaulUpdateFormResult="manaulUpdateFormResult"></MonthView>

      <!-- 周模式 -->
      <WeekView v-if="showType === '1'" v-model="period" :weekLst="weekLst"
        :attributes="formatResultOfWeek"
        :isRegularHoliday="restructureScheduleTableWithisRegualrHoliday" :manaulUpdateFormResult="manaulUpdateFormResult">
      </WeekView>

      <!-- 單日模式 -->
      <DayView v-if="showType === '2'" v-model="today" :period="periodforDay" :weekLst="weekLstforDayMode"
        :manaulUpdateFormResult="manaulUpdateFormResult" :attributes="handleData"
        :isRegularHoliday="restructureScheduleTableWithisRegualrHoliday" @changePeriod="changeDayPeriod"></DayView>
    </section>

    <!-- 過濾條件 -->
    <C-Loading-Overlay v-model="isActiveFilter" @doFunction="isActiveFilter = !isActiveFilter"
      :layerIndex="10"></C-Loading-Overlay>
    <transition name="fromleft">
      <div v-show="isActiveFilter">
        <div
          class="fixed inset-0 top-[180px] z-20 grid h-[calc(100%-180px)] w-full grid-cols-1 grid-rows-[37px_minmax(0,1fr)_62px] bg-white">
          <p class="border-b border-solid border-primary p-2 text-sm">顯示行事曆</p>
          <div class="p-[14px]">

            <p class="text-left font-semibold">選擇類別</p>
            <div class="mb-8">
              <div class="flex items-center gap-2" v-if="isAuthToAll && isAuthority('全店行事曆')">
                <C-Checkbox-Full v-model="seletedAll" class="!inline-block !w-full"
                  label="全店行事曆"></C-Checkbox-Full>
              </div>
              <div class="flex items-center gap-2">
                <C-Checkbox-Full v-model="isSpecified"  class="!inline-block !w-full"
                  label="指定預約"></C-Checkbox-Full>
              </div>
              <div class="flex items-center gap-2">
                <C-Checkbox-Full v-model="isNotSpecified" class="!inline-block !w-full"
                  label="不指定預約"></C-Checkbox-Full>
              </div>
              <div class="flex items-center gap-2">
                <C-Checkbox-Full v-model="isHOLIDAY" class="!inline-block !w-full"
                  label="排休"></C-Checkbox-Full>
              </div>
              <div class="flex items-center gap-2">
                <C-Checkbox-Full v-model="isRH"  class="!inline-block !w-full"
                  label="公休"></C-Checkbox-Full>
              </div>
              <div class="flex items-center gap-2">
                <C-Checkbox-Full v-model="isEVENT" class="!inline-block !w-full"
                  label="事件"></C-Checkbox-Full>
              </div>
            </div>
          </div>
          <div class="mx-[14px] my-3 flex justify-around gap-3">
            <div class="w-full rounded-full bg-second px-[14px] py-2 text-center text-sm text-white"
              @click="isActiveFilter = !isActiveFilter" @keypress="isActiveFilter = !isActiveFilter">
              <span>關閉</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </C-Main-Block>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import MonthView from '@/components/Home/scheduleBreak/monthView.vue';
import WeekView from '@/components/Home/scheduleBreak/weekView.vue';
import DayView from '@/components/Home/scheduleBreak/dayView.vue';

export default {
  name: 'schedule-index',
  description: '行事曆的首頁',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 行事曆',
  },
  components: {
    MonthView,
    WeekView,
    DayView,
  },
  data() {
    return {

      // 打開過濾條件
      isActiveFilter: false,
      // 打開新增預約和檢視行事曆的tooltip
      isDirect: false,
      // 是否有權限可以檢視全店的預約內容
      isAuthToAll: false,
      // 打設計師預約清單的 result
      designerBookingList: [],
      // 全店預約
      seletedAll: false,
      isSpecified: true,
      isNotSpecified: true,
      isHOLIDAY: true,
      isRH: true,
      isEVENT: true,

      // 不同的檢視模式 '0' 月模式 '1' 周模式 '2' 日模式
      showType: '1',
      // 用於周模式中切換 周模式的時間，得以每周每周切換
      period: 0,
      periodforDay: 0,
      // 月模式月份的切換
      monthlyOrdersDate: {
        start: this.$dayjs().startOf('month').valueOf(),
        end: this.$dayjs().endOf('month').valueOf(),
      },

      orderDate: {
        start: null,
        end: null,
      },

      // 日模式日期的切換
      today: this.$dayjs(),
      // 用於月模式的過濾後的內容
      attributes: [],
      formatResult: [],
      timeListOfBookings: [],
      // 畫面是否初始
      isInitialLoad: true,
    };
  },
  async created() {
    if (!localStorage.getItem('scheduleShowType')) {
      localStorage.setItem('scheduleShowType', this.showType);
    } else {
      this.showType = localStorage.getItem('scheduleShowType');
    }
    this.setDate(this.showType);
    await this.getIsMerchantScheduleDisplay();
  },
  mounted() {
  },
  methods: {
    // 初始化

    // (留著)取得是否有權限檢視全部的預約
    async getIsMerchantScheduleDisplay() {
      const resp = await this.$api.getIsMerchantScheduleDisplay();
      const { data, errors } = resp.data;
      if (errors) return;
      this.isAuthToAll = data.getIsMerchantScheduleDisplay;
    },

    // 取得設計師行事曆資料
    /// dateRange {startDate,endDate}, isDADC
    async getDesignerCalendar() {
      const submit = {
        dateRange: {
          startDate: this.orderDate.start,
          endDate: this.orderDate.end,
        },
        isDADC: this.seletedAll,
      };

      const rsp = await this.$api.getDesignerCalendar(submit);

      const newResult = rsp.data.data.getDesignerCalendar.map((item, index) => {
        let className = '';
        switch (item.type) {
          case 'RH':
            className = 'bg-[#7D9AC5] text-white';
            break;
          case 'HOLIDAY':
            className = 'bg-[#F48E8C] text-white';
            break;
          case 'RESERVATION':
            className = 'bg-[#F6BA7B] text-white';
            break;
          case 'EVENT':
            className = 'bg-[#82BC95] text-white';
            break;
          default:
            className = '';
            break;
        }
        const customData = {
          nameToDisplay: item.nameToDisplay,
          class: className,
          type: item.type,
          designer: this.userInfo.user.name,
          start: item.startTime,
          end: item.endTime,
          timeCost: item.timeCost,
          isDesignate: item.isDesignate,

        };

        return {
          key: item.ids.length ? item.ids[0] : `${item.type}-${index}`,
          customData,
          dates: item.startTime,
        };
      });
      this.formatResult = [...newResult];
      console.log('this.formatResult', this.formatResult);
    },
    // 手動更新表單資料
    async manaulUpdateFormResult() {
      await this.getDesignerCalendar();
    },

    handleSort(data) {
      return data.sort((a, b) => a.customData.start - b.customData.start);
    },

    // 切換路由
    doRoute(item) {
      this.$router.push({ name: item });
    },
    setDate(value) {
      switch (value) {
        case '0':
          this.orderDate.start = this.monthlyOrdersDate.start;
          this.orderDate.end = this.monthlyOrdersDate.end;
          break;
        case '1':
          this.orderDate.start = this.weekLst[0].valueOf();
          this.orderDate.end = this.weekLst[6].valueOf();
          break;
        case '2':
          this.orderDate.start = this.$dayjs(this.today).startOf('day').valueOf();
          this.orderDate.end = this.$dayjs(this.today).endOf('day').valueOf();
          break;
        default:
          break;
      }
    },
    // 更改模式 '0' 月模式 '1' 周模式 '2' 日模式
    setShowType(num) {
      localStorage.setItem('scheduleShowType', num);
      this.showType = num;
    },
    // 日模式更改期間 (一週一週改)
    changeDayPeriod(data) {
      this.periodforDay = data;
    },
  },

  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId', 'userAuthorizeList']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
    // 判斷是否有權限開啟全店設計師
    isAuthority() {
      return (name) => this.userAuthorizeList.find((item) => item.pageName === name && item.authority);
    },
    restructureScheduleTableWithisRegualrHoliday() {
      return this.formatResult.filter((item) => item.customData.type === 'RH');
    },
    // 篩選指定
    filterIsSpecified() {
      return this.isSpecified ? this.formatResult : this.formatResult.filter((item) => item.customData.isDesignate !== true);
    },
    // 篩選不指定
    filterIsNotSpecified() {
      return this.isNotSpecified ? this.filterIsSpecified : this.filterIsSpecified.filter((item) => item.customData.isDesignate !== false);
    },
    // 篩選公休
    filterIsRH() {
      return this.isRH ? this.filterIsNotSpecified : this.filterIsNotSpecified.filter((item) => item.customData.type !== 'RH');
    },
    // 篩選排休
    filterIsHOLIDAY() {
      return this.isHOLIDAY ? this.filterIsRH : this.filterIsRH.filter((item) => item.customData.type !== 'HOLIDAY');
    },
    // 篩選事件
    // 月模式做到這邊即可
    filterIsEvent() {
      return this.isEVENT ? this.filterIsHOLIDAY : this.filterIsHOLIDAY.filter((item) => item.customData.type !== 'EVENT');
    },
    // 處理時間重複
    handleOverlapping() {
      // 深拷貝
      const data = JSON.parse(JSON.stringify(this.filterIsEvent));
      const groups = [];

      for (let i = 0; i < data.length; i++) {
        // eslint-disable no-plusplus
        const time1 = data[i];
        if (time1.isProcessed) continue; // 跳過已處理過的時間

        const currentGroup = [time1];
        for (let j = i + 1; j < data.length; j++) {
          const time2 = data[j];
          if (time2.isProcessed) {
            continue;
          } // 跳過已處理過的時間

          if (
          // 判斷時間是否重疊
            (time2.customData.start >= time1.customData.start && time2.customData.start < time1.customData.end)
                || (time2.customData.end > time1.customData.start && time2.customData.end <= time1.customData.end)
                || (time2.customData.start <= time1.customData.start && time2.customData.end >= time1.customData.end)
          ) {
            currentGroup.push(time2);
            time2.isProcessed = true; // 標記已處理過的時間
          }
        }
        groups.push({ data: currentGroup });
      }
      return groups;
    },
    // 處理每筆資料應該長多高、距離時間高度
    // 日模式處理到這裡就好，因為日模式的資料只有一天，所以不用繼續處理下面 splitDay 的問題
    handleData() {
      const data = JSON.parse(JSON.stringify(this.handleOverlapping));
      const Hight = 20;
      const res = [];
      // todo: 確認如果時間是幾點半的時候怎麼處理
      const startTime = localStorage.getItem('openingHours') || '10:00:00';
      data.forEach((item) => {
        // 一個單位有多筆的時候
        if (item.data.length > 1) {
          // 定義區塊離頂端有多遠
          // 因為起始時間只知道時間，所以要抓物件第一筆的時間format 時 起始時間寫死，取valueOf 來比較
          item.fatherClass = `top-[${(+this.$dayjs(item.data[0].customData.start).diff(
            this.$dayjs(this.$dayjs(item.data[0].customData.start).format(`YYYY-MM-DD ${startTime}`).valueOf()),
            'minute',
          ) * 2) / 3 + 1}px]`;
          // item.fatherClass = 'top-20';
          item.data.forEach((dt, i) => {
            if (i === 0) {
              dt.customData.specialClass = `mt-[1px] h-[${dt.customData.timeCost * Hight - 3}px]`;
            } else {
              dt.customData.specialClass = `mt-[${(+this.$dayjs(dt.customData.start).diff(item.data[0].customData.start, 'minute') * 2) / 3 + 1
              }px] h-[${dt.customData.timeCost * Hight - 3}px]`;
            }
          });
          res.push(item);
        }
        // 一個單位只有一筆的時候
        if (item.data.length === 1) {
          item.fatherClass = '';
          const dt = item.data[0];
          // top定義離頂端有多遠 (該物件起始時間 距離startTime 分鐘)
          // 每30分鐘高度為20px，預計會算出30的倍數，乘2除3後會算出高度，
          // h-定義高度，高度算完為了讓物件不要貼邊，-3像素
          dt.customData.specialClass = `
          top-[${(+this.$dayjs(dt.customData.start).diff(this.$dayjs(this.$dayjs(dt.customData.start).format(`YYYY-MM-DD ${startTime}`).valueOf()), 'minute') * 2) / 3 + 2}px] h-[${dt.customData.timeCost * Hight - 3}px]`;
          res.push(item);
        }
      });
      return res;
    },
    // 將資料以星期分類 //預設只有週模式的資料會用到
    splitDay() {
      const sun = [];
      const mon = [];
      const thu = [];
      const wed = [];
      const thir = [];
      const fri = [];
      const sat = [];
      this.handleData.forEach((data) => {
        switch (this.$dayjs(data.data[0].dates).day()) {
          case 0:
            sun.push(data);
            break;
          case 1:
            mon.push(data);
            break;
          case 2:
            thu.push(data);
            break;
          case 3:
            wed.push(data);
            break;
          case 4:
            thir.push(data);
            break;
          case 5:
            fri.push(data);
            break;
          case 6:
            sat.push(data);
            break;
          default:
            break;
        }
      });
      return [sun, mon, thu, wed, thir, fri, sat];
    },
    // 週模式處理資訊
    formatResultOfWeek() {
      const result = [];
      this.splitDay.forEach((data) => {
        // 處理每個星期的資料
        if (data.length) {
          result.push(data);
        } else {
          result.push([]);
        }
      });
      return result;
    },

    // 週模式日期呈現
    weekLst() {
      return [
        this.$dayjs().startOf('day').day(this.period),
        this.$dayjs().startOf('day').day(this.period + 1),
        this.$dayjs().startOf('day').day(this.period + 2),
        this.$dayjs().startOf('day').day(this.period + 3),
        this.$dayjs().startOf('day').day(this.period + 4),
        this.$dayjs().startOf('day').day(this.period + 5),
        this.$dayjs().endOf('day').day(this.period + 6),
      ];
    },
    // 日模式日期呈現
    weekLstforDayMode() {
      return [
        this.$dayjs().startOf('day').day(this.periodforDay),
        this.$dayjs().startOf('day').day(this.periodforDay + 1),
        this.$dayjs().startOf('day').day(this.periodforDay + 2),
        this.$dayjs().startOf('day').day(this.periodforDay + 3),
        this.$dayjs().startOf('day').day(this.periodforDay + 4),
        this.$dayjs().startOf('day').day(this.periodforDay + 5),
        this.$dayjs().endOf('day').day(this.periodforDay + 6),
      ];
    },
  },
  watch: {
    async $route(to) {
      if (to.name === 'ScheduleBreak') {
        await this.getDesignerCalendar();
      }
    },
    seletedAll() {
      this.getDesignerCalendar();
    },

    orderDate: {
      deep: true,
      async handler() {
        // 偵測深度日期如果更變，就主動呼叫API
        await this.getDesignerCalendar();
      },
    },
    monthlyOrdersDate: {
      deep: true,
      handler(value) {
        this.orderDate.start = value.start;
        this.orderDate.end = value.end;
      },
    },
    weekLst: {
      deep: true,
      handler(value) {
        this.orderDate.start = value[0].valueOf();
        this.orderDate.end = value[6].valueOf();
      },
    },
    today: {
      deep: true,
      handler(value) {
        this.orderDate.start = this.$dayjs(value).startOf('day').valueOf();
        this.orderDate.end = this.$dayjs(value).endOf('day').valueOf();
      },
    },
    showType: {
      handler(value) {
        // 切換模式，先把原本資料清掉，不然呼叫api過程，資料會預先呈現在背景
        this.formatResult = [];
        this.setDate(value);
      },
    },
  },
};
</script>

<style scoped>
.btn-group button {
  @apply border-primary;
  width: 1.5em;
  border: 1px solid;
}

.btn-group button:nth-child(1) {
  border-radius: 5px 0 0 5px;
}

.btn-group button:nth-child(2) {
  border-right: 0;
  border-left: 0;
}

.btn-group button:nth-child(3) {
  border-radius: 0 5px 5px 0;
}
</style>
