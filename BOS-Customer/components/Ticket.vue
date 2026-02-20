<template>
  <section>
    <div class="w-full bg-white rounded-lg shadow-[0px_2px_2px_rgba(0,0,0,0.25)] mb-2.5">
      <div class="grid grid-cols-12">
        <div class="col-span-4 text-white font-bold relative bg-[#FEB401]">
          <div class="absolute h-[calc(100%+20px)] w-2.5 top-0 -left-2.5 bg-[#f1f1f1] z-40"></div>
          <div class="absolute h-2 5 w-2.5 -bottom-2.5 left-0 bg-[#f1f1f1] z-40"></div>
          <div class="absolute w-5 h-5 rounded-full -left-2.5 -top-2.5 bg-[#f1f1f1]"></div>
          <div class="absolute w-5 h-5 rounded-full -left-2.5 -top-2.5 translate-y-[26px] bg-[#f1f1f1] shadow-[inset_-1px_1px_2px_1px_rgba(0,0,0,0.25)]"></div>
          <div class="absolute w-5 h-5 rounded-full -left-2.5 -top-2.5 translate-y-[52px] bg-[#f1f1f1] shadow-[inset_-1px_1px_2px_1px_rgba(0,0,0,0.25)]"></div>
          <div class="absolute w-5 h-5 rounded-full -left-2.5 -top-2.5 translate-y-[78px] bg-[#f1f1f1] shadow-[inset_-1px_1px_2px_1px_rgba(0,0,0,0.25)]"></div>
          <div class="absolute w-5 h-5 rounded-full -left-2.5 -top-2.5 translate-y-[104px] bg-[#f1f1f1] shadow-[inset_-1px_1px_2px_0px_rgba(0,0,0,0.25)]"></div>
          <div class="w-full h-full flex justify-center items-center py-2 pl-4 flex-nowrap gap-1">
            <p class="text-xs mt-1">NT$</p>
            <p class="text-lg">{{ price }}/次</p>
          </div>
        </div>
        <div class="col-span-8 py-2 px-1">
          <h4 class="font-bold line-clamp-1">{{ title }}</h4>
          <span class="text-[#666] text-sm">可用次數：{{ canUse - used }}/{{ canUse }} (總金額:{{ totalPrice }})</span>
          <div class="w-full border-b border-b-[#DDD]"></div>
          <p class="text-[#666] text-xs mt-2">購買日期：<span v-formatDate="'date'">{{ time }}</span></p>
          <div class="flex justify-end items-center gap-1">
            <fa @click="openRecord(idx)" icon="fa-regular fa-circle-info" class="text-xs text-[#57CDFF]" />
            <span @click="openRecord(idx)" class="text-xs text-[#57CDFF]">使用紀錄</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Ticket-index',
  props: {
    id: {
      type: String,
      default: () => 0
    },
    idx: {
      type: Number,
      default: () => 0
    },
    title: {
      type: String,
      default: () => ''
    },
    price: {
      type: Number,
      default: () => 0
    },
    totalPrice: {
      type: Number,
      default: () => 0
    },
    canUse: {
      type: Number,
      default: () => 0
    },
    used: {
      type: Number,
      default: () => 0
    },
    time: {
      type: Number,
      default: () => 0
    }
  },
  methods: {
    openRecord(idx) {
      this.$emit('openRecord', idx)
    }
  }
}
</script>
