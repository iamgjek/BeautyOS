<template>
  <transition :name="routeMetaTransition">
    <keep-alive :exclude="['order-add']">
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'scheduleBreak-root',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 行事曆',
  },
  computed: {
    routeMetaTransition() {
      return this.$route.meta.transition;
    },
  },
};
</script>

<style></style>
