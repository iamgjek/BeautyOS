<template>
  <nav class="pl-4 pt-[28px]">
    <button class="h-11 w-11" @click="doRoute">
      <font-awesome-icon icon="fa-solid fa-angle-left" class="text-2xl" />
    </button>

    <h3 class="gont text-center text-2xl leading-6">{{ title }}</h3>
  </nav>
</template>

<script>
export default {
  name: 'back-nav',
  description: '返回上一頁',
  props: {
    title: {
      type: [String],
    },
    routeTarget: {
      type: [String, Object],
      default: null,
    },
  },
  methods: {
    doRoute() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        // 無法跳轉 回到首頁
        this.$router.push({ name: 'Home' });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
