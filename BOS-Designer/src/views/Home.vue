<template>
  <!-- 控制首頁的頁尾   中間 animate__animated animate__fadeIn animate__slow animate__delay-2-->
  <div class="relative w-full pb-[66px]">
    <router-view></router-view>
    <C-Loading-Overlay v-model="isloading" :layerIndex="10"></C-Loading-Overlay>
    <div
      v-if="isHome"
      class="fixed bottom-0 z-10 flex w-full items-center justify-evenly bg-white py-4 shadow-[-5px_0px_5px_0_#ccc]"
    >
      <div
        v-if="isAuthority('行事曆')"
        @click="doRoute('ScheduleBreak')"
        @keydown="doRoute('ScheduleBreak')"
      >
        <img
          src="@/static/images/nav-calendar-full.svg"
          alt=""
          class="w-[24px]"
          v-if="$route.name === 'ScheduleBreak'"
        />
        <img src="@/static/images/nav-calendar.svg" alt="" class="w-[24px]" v-else />
      </div>

      <div v-if="isAuthority('打卡')" @click="doRoute('Punch')" @keydown="doRoute('Punch')">
        <img
          src="@/static/images/nav-clock-full.svg"
          alt=""
          class="w-[24px]"
          v-if="$route.name === 'Punch'"
        />
        <img src="@/static/images/nav-clock.svg" alt="" class="w-[24px]" v-else />
      </div>

      <div @click="doRoute('Home')" @keydown="doRoute('Home')">
        <img src="@/static/images/nav-home.svg" alt="" class="w-[34px]" />
      </div>

      <div
        v-if="isAuthority('設計師日報表')"
        @click="doRoute('Report')"
        @keydown="doRoute('Report')"
      >
        <img
          src="@/static/images/nav-report-full.svg"
          alt=""
          class="w-[24px]"
          v-if="$route.name === 'Report'"
        />
        <img src="@/static/images/nav-report.svg" alt="" class="w-[24px]" v-else />
      </div>

      <div class="relative" v-if="isAuthority('行事曆') || isAuthority('報表')">
        <img
          src="@/static/images/nav-more.svg"
          alt=""
          class="w-[24px]"
          @click="isloading = !isloading"
          @keypress="isloading = !isloading"
        />
        <div
          v-if="isloading"
          class="animate__animated animate__fadeInUp !z-3 absolute inset-x-[-10px] bottom-[250%] flex flex-col items-center justify-center rounded-full bg-white px-2 py-4"
        >
          <div
            v-if="isAuthority('預約總覽')"
            @click="doRoute('Order-list')"
            @keydown="doRoute('Order-list')"
            class="mb-[20px]"
          >
            <img
              src="@/static/images/nav-check-full.svg"
              alt=""
              class="w-[24px]"
              v-if="$route.name === 'Order-list'"
            />
            <img src="@/static/images/nav-check.svg" alt="" class="w-[24px]" v-else />
          </div>
          <div
            v-if="isAuthority('價目表設定')"
            @click="doRoute('PriceList')"
            @keydown="doRoute('PriceList')"
            :class="{ 'text-second': $route.name === 'PriceList' }"
          >
            <img
              src="@/static/images/nav-priceList-full.svg"
              alt=""
              class="w-[24px]"
              v-if="$route.name === 'PriceList'"
            />
            <img src="@/static/images/nav-priceList.svg" alt="" class="w-[24px]" v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'home-root',
  metaInfo: {
    title: 'BeautyOS 設計師',
  },
  mounted() {},
  data() {
    return {
      isloading: false,
    };
  },
  methods: {
    doRoute(routName) {
      this.isloading = false;
      this.$router.push({ name: routName });
    },
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId', 'userAuthorizeList']),
    isAuthority() {
      return (name) => this.userAuthorizeList.find((item) => item.pageName === name && item.authority);
    },
    isHome() {
      return this.$route.name !== 'Home';
    },
    routeMetaTransition() {
      return this.$route.meta.transition;
    },
  },
};
</script>

<style lang="scss"></style>
