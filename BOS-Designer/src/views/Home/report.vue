<template>
    <transition :name="routeMetaTransition">
      <router-view></router-view>
    </transition>
</template>

<script>
export default {
  name: 'report-root',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 報表',
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
