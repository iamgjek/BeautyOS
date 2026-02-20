<template>
  <section>
    <transition name="fade">
      <div @click="stopProp()" v-if="isLoading" class="fixed w-full h-screen top-0 left-0 flex items-center justify-center pointer-events-none z-50 bg-white/50  backdrop-blur-[1px]">
        <div class="border-[5px] border-[#e2e2e2] border-t-[5px] border-t-[#232D4E] rounded-full w-10 h-10 animate-spin-slow"></div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  }
}
</script>
