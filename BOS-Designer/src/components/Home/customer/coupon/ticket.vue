<template>
  <section>
    <div class="mb-2.5 w-full rounded-lg bg-white shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
      <div class="grid grid-cols-12">
        <div
          class="relative col-span-4 font-bold text-white"
          :class="{ 'bg-[#FEB401]': canUse > 0, 'bg-[#aeaeae]': canUse === 0 }"
        >
          <div class="absolute -left-2.5 top-2 h-5 w-5 rounded-full bg-white">1</div>
          <div class="absolute -left-2.5 top-[2.5rem] h-5 w-5 rounded-full bg-white">3</div>
          <div class="absolute -left-2.5 top-[4.5rem] h-5 w-5 rounded-full bg-white">5</div>
          <div class="flex h-full items-center">
            <div class="flex w-full items-baseline justify-center px-4 py-2">
              <p class="text-xs">NT$</p>
              <p class="text-2xl">{{ price }}</p>
            </div>
          </div>
        </div>
        <div class="col-span-8 p-2 text-left">
          <h4 class="font-bold">{{ title }}</h4>
          <p class="mb-1 text-sm text-[#666]">
            可用次數：{{ canUse - used }}/{{ canUse }}(總金額:{{ totalPrice }})
          </p>
          <div class="w-full border-b border-b-[#DDD]"></div>
          <p class="mb-1 text-xs text-[#666]">購買日期：{{ $dayjs(time).format("YYYY/MM/DD") }}</p>
          <div class="flex items-center justify-end gap-1">
            <font-awesome-icon
              @click="openRecord(id)"
              @keypress="openRecord(id)"
              icon="fa-regular fa-circle-info"
              class="text-xs text-[#57CDFF]"
            />
            <span @click="openRecord(id)" @keypress="openRecord(id)" class="text-xs text-[#57CDFF]"
              >使用紀錄</span
            >
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
      default: () => '',
    },
    title: {
      type: String,
      default: () => '',
    },
    price: {
      type: Number,
      default: () => 0,
    },
    totalPrice: {
      type: Number,
      default: () => 0,
    },
    canUse: {
      type: Number,
      default: () => 0,
    },
    used: {
      type: Number,
      default: () => 0,
    },
    time: {
      type: Number,
      default: () => 0,
    },
  },
  methods: {
    openRecord(id) {
      this.$emit('openRecord', id);
    },
  },
};
</script>
