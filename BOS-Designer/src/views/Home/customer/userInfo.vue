<template>
  <C-Main-Block>
    <C-Back-Nav :routeTarget="{ name: 'Customer' }"></C-Back-Nav>
    <section class="relative p-4">
      <div class="mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">客戶資料查詢</h1>
      </div>
      <ul
        class="scrollnone nav nav-tabs mb-4 flex list-none overflow-x-auto border-b border-solid border-primary pl-0"
      >
        <li
          :class="[`${seletedTab === 'UserInfo' ? 'border-b-2 border-solid border-primary' : ''}`]"
          @click="seletedTab = 'UserInfo'"
          @keypress="seletedTab = 'UserInfo'"
        >
          <p class="whitespace-nowrap p-3">個人資料</p>
        </li>
        <li
          :class="[
            `${seletedTab === 'Consumption' ? 'border-b-2 border-solid border-primary' : ''}`,
          ]"
          @click="seletedTab = 'Consumption'"
          @keypress="seletedTab = 'Consumption'"
        >
          <p class="whitespace-nowrap p-3">服務紀錄</p>
        </li>
        <li
          :class="[`${seletedTab === 'Income' ? 'border-b-2 border-solid border-primary' : ''}`]"
          @click="seletedTab = 'Income'"
          @keypress="seletedTab = 'Income'"
        >
          <p class="whitespace-nowrap p-3">入金紀錄</p>
        </li>
        <li
          :class="[`${seletedTab === 'Coupon' ? 'border-b-2 border-solid border-primary' : ''}`]"
          @click="seletedTab = 'Coupon'"
          @keypress="seletedTab = 'Coupon'"
        >
          <p class="whitespace-nowrap p-3">卡券紀錄</p>
        </li>
      </ul>

      <keep-alive>
        <component :is="seletedTab"></component>
      </keep-alive>
    </section>
  </C-Main-Block>
</template>

<script>
import {
  UserInfo, Consumption, Income, Coupon,
} from '@/components/Home/customer/index';

export default {
  name: 'customer-userInfo',
  description: '客戶資料查詢的個人資料頁',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 客戶資料查詢',
  },
  components: {
    Consumption,
    Coupon,
    Income,
    UserInfo,
  },
  data() {
    return {
      seletedTab: 'UserInfo',
      items: [
        { name: '個人資料', componentId: 'UserInfo' },
        { name: '服務紀錄', componentId: 'Consumption' },
        { name: '入金紀錄', componentId: 'Income' },
        { name: '卡券紀錄', componentId: 'Coupon' },
      ],
    };
  },
  methods: {
    doRoute(name) {
      this.$router.push({ name });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.scrollnone {
  &::-webkit-scrollbar {
    display: none !important;
  }
}
</style>
