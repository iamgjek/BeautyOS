<template>
  <!-- <transition name="faInOut"> -->
  <div v-if="value">
    <!-- shield -->
    <!-- <C-Loading-Overlay :value="value" :layerIndex="2" @click="$emit('input',false)" @keypress="$emit('input',false)"></C-Loading-Overlay> -->
    <!-- bg-[#F1F0F7]/80 -->
    <div
      class="fixed inset-0 z-[11] bg-[#000]/40"
      @click="$emit('input', false)"
      @keypress="$emit('input', false)"
    ></div>
    <div class="fixed inset-0 z-[11] m-auto rounded-[20px] bg-white p-4" :class="[width, height]">
      <slot></slot>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
export default {
  name: 'modal-dialog',
  description: '客製話彈窗',
  props: {
    layerIndex: {
      type: Number,
      default: 10,
    },
    value: {
      type: Boolean,
    },
    width: {
      type: String,
      default: 'w-fit',
    },
    height: {
      type: String,
      default: 'h-fit',
    },
    animationCss: {
      type: String,
      default: 'animate__animated animate__fadeIn animate__fast',
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
