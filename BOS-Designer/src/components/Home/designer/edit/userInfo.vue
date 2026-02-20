<template>
  <div class="animate__animated animate__fadeIn animate__fast">
    <div class="px-2">
      <div class="mt-2 flex gap-2 border-b border-solid border-primary/50 text-left">
        <div class="w-1/12"></div>
        <div class="w-6/12">服務／產品名稱</div>
        <div class="w-5/12 text-right">售價</div>
      </div>
    </div>
    <div class="px-2">
      <div class="mt-2 flex items-center gap-2 border-b border-solid border-primary/50 text-left" v-for="(item,index) in resultList" :key="`total${index}`">
        <div class="w-1/12">
          <C-Checkbox v-model="seleted"></C-Checkbox>
        </div>
        <div class="w-6/12">{{item.name}}</div>
        <div class="w-5/12 text-right">${{item.price}}{{item.isUp ? 'up': ''}}</div>
      </div>
      <div class="mt-2 flex items-center gap-2 border-b border-solid border-primary/50 text-left">
        <div class="w-1/12">
          <font-awesome-icon icon="fa-regular fa-circle-plus" class="text-lg" @click="toggleAddItem"/>
        </div>
        <div class="w-6/12">新增項目</div>
        <div class="w-5/12 text-right">新增價錢</div>
      </div>
    </div>

    <div class="fixed bottom-[100px] flex w-[calc(100%-24px)] items-center gap-4">
        <div class="w-full cursor-pointer bg-rejectText px-4 py-2 text-white" @click="doRoute({name: 'Coupon'})" @keypress="doRoute({name: 'Coupon'})">刪除勾選項目</div>
        <div class="w-full cursor-pointer bg-second px-4 py-2 text-white" @click="doDelivery" @keypress="doDelivery">儲存編輯</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'customer-component-userInfo',
  data() {
    return {
      seleted: [],
      resultList: [
        { name: '健康洗髮', price: '250', isUp: true },
        { name: '健康洗髮(A級)', price: '300', isUp: true },
        { name: '清涼沁透洗髮', price: '398', isUp: false },
        { name: '剪髮', price: '600', isUp: true },
        { name: '剪髮(Ａ級)', price: '1000', isUp: true },
      ],
    };
  },
  methods: {
    toggleAddItem() {

    },
  },
};
</script>

<style>

</style>
