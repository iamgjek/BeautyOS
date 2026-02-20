<template>
    <transition :name="routeMetaTransition">
      <router-view></router-view>
    </transition>
</template>

<script>

export default {
  name: 'order-root',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 預約',
  },
  data() {
    return {
    };
  },
  methods: {
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
