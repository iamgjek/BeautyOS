<template>
    <transition :name="routeMetaTransition">
      <router-view></router-view>
    </transition>
</template>

<script>

export default {
  name: 'punch-root',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 打卡',
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
