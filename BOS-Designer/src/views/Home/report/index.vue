<template>
  <C-Main-Block>
    <C-Back-Nav></C-Back-Nav>
    <section class="relative p-4">
      <div class="mb-4 flex">
        <h1 class="m-auto text-[17px] font-bold">報表</h1>
      </div>
      <div class="rounded-[20px] bg-white px-[1rem] py-[2rem] font-sans font-normal text-primary">
        <template v-for="(item, index) in reportList">
          <div
            v-if="isAuthority(item.label)"
            :key="`reportList${index}`"
            @click="doRoute(item.name)"
            @keypress="doRoute(item.name)"
            class="mb-2 flex cursor-pointer items-center justify-between border-b border-dashed border-gray pb-2 pr-2 last-of-type:border-0"
          >
            {{ item.label }}
            <font-awesome-icon icon="fa-solid fa-angle-right" />
          </div>
        </template>
      </div>
    </section>
  </C-Main-Block>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'priceList-index',
  description: '報表的首頁',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 報表',
  },
  data() {
    return {
      reportList: [
        { label: '設計師日報表', name: 'Report-daily-report' },
        { label: '訂單紀錄', name: 'Report-bill' },
        { label: '抽成報表', name: 'Report-profit-cut' },
        { label: '互助日報表', name: 'Report-emp-earn' },
        { label: '設計師業績分析表', name: 'Report-analysis' },
        { label: '薪資條', name: 'Report-salary' },
        { label: '店販抽成明細', name: 'Report-draw-detail' },
      ],
    };
  },
  mounted() {},
  methods: {
    doRoute(name) {
      this.$router.push({ name });
    },
  },
  computed: {
    ...mapState('userInfo', ['userAuthorizeList']),
    isAuthority() {
      return (name) => this.userAuthorizeList.find((item) => item.pageName === name && item.authority);
    },
  },
};
</script>

<style></style>
