<template>
    <transition :name="routeMetaTransition">
      <router-view></router-view>
    </transition>
</template>

<script>
export default {
  name: 'customer-root',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 客戶資料查詢',
  },
  computed: {
    routeMetaTransition() {
      return this.$route.meta.transition;
    },
  },
};
</script>

<style>

</style>
