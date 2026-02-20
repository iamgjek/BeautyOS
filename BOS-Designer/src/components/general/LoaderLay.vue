<template>
  <div v-if="loadingArray.length > 0">
    <div class=" fixed left-0 top-0 z-[9999] h-full w-full bg-black/10 blur-[5px] backdrop-blur-[1px]">
    </div>
    <div  class="loader fixed inset-0 z-[10000] m-auto h-[70px] w-[70px] rounded-[60px] border-[10px] border-[#aaa]  border-t-transparent"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Loading-Async',
  computed: {
    ...mapState('config', ['loadingArray']),
    isReportPage() {
      const reportPageList = ['Report-daily-report', 'Report-bill', 'Report-profit-cut', 'Report-emp-earn'];
      return reportPageList.includes(this.$route.name);
    },
  },
};
</script>
<style lang="scss" scoped>
.loader {
  animation: load 1s linear infinite;
}
@keyframes load {
  100% {transform: rotate(360deg);}
}
</style>
