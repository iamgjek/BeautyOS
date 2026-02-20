<template>
  <section>
    <transition name="fade">
      <div v-if="showModal" class="fixed w-screen h-screen bg-black opacity-25 top-0 left-0 z-40"></div>
    </transition>
    <transition name="fade">
      <div v-if="showModal" @click="cancelModalEmit($event)" class="fixed w-full h-full top-0 left-0 px-[5%] flex justify-center items-center z-40 cancel shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
        <div data-aos="flip-left" data-aos-duration="400" class="w-full max-w-[768px] max-h-[80vh] overflow-y-auto bg-white rounded-md p-5 relative z-[-1]">

          <!-- 關閉按鈕 -->
          <button @click="cancelModalEmit($event)" v-if="showCancelBtn" class="absolute right-5 top-5 cancel">
            <fa @click="cancelModalEmit($event)" icon="fa-solid fa-xmark" class="text-3xl cancel" />
          </button>

          <!-- 是否為會籍說明 -->
          <div v-if="isMemberRules" class="flex justify-center items-center gap-1.5 mb-5 mt-10">
            <fa icon="fa-regular fa-circle-question" class="text-xl" />
            <span class="text-lg font-bold">會籍說明</span>
          </div>

          <slot></slot>

        </div>
      </div>
    </transition>
      
  </section>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    showModal: {
      type: Boolean,
      default: () => false
    },
    isMemberRules: {
      type: Boolean,
      default: () => false
    },
    showCancelBtn: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    cancelModalEmit(e) {
      this.$emit('cancelModal', e)
    }
  }
}
</script>
