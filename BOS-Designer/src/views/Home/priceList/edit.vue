<template>
 <C-Main-Block>
    <C-Back-Nav :title="'價目表'" :routeTarget="{name: 'PriceList'}"></C-Back-Nav>
    <section class="relative z-0 mt-[52px] p-3">
      <p class="my-4">編輯價目表</p>

      <ul class="scrollnone nav nav-tabs mb-4 flex list-none overflow-x-auto border-b border-solid border-primary pl-0">
        <li :class="[`${seletedTab === 'UserInfo' ? 'border-b-2 border-solid border-primary': ''}`]" @click="seletedTab = 'UserInfo'" @keypress="seletedTab = 'UserInfo'">
          <p class="whitespace-nowrap px-6 py-3 text-xs">洗／剪</p>
        </li>
        <li :class="[`${seletedTab === 'Consumption' ? 'border-b-2 border-solid border-primary': ''}`]"  @click="seletedTab = 'Consumption'" @keypress="seletedTab = 'Consumption'">
          <p  class="whitespace-nowrap px-6 py-3 text-xs">染髮</p>
        </li>
        <li :class="[`${seletedTab === 'Income' ? 'border-b-2 border-solid border-primary': ''}`]"  @click="seletedTab = 'Income'" @keypress="seletedTab = 'Income'">
          <p class="whitespace-nowrap px-6 py-3 text-xs">燙髮</p>
        </li>
        <li :class="[`${seletedTab === 'Coupon' ? 'border-b-2 border-solid border-primary': ''}`]"  @click="seletedTab = 'Coupon'" @keypress="seletedTab = 'Coupon'">
          <p class="whitespace-nowrap px-6 py-3 text-xs">護髮</p>
        </li>
        <li>
          <p class="whitespace-nowrap px-6 py-3 text-xs">
            <font-awesome-icon icon="fa-regular fa-circle-plus" class="text-lg" @click="toggleAdd"/>
          </p>
        </li>
      </ul>

      <div>
        <component :is="seletedTab"></component>
      </div>

    </section>
 </C-Main-Block>
</template>

<script>
import UserInfo from '@/components/Home/designer/edit/userInfo.vue';
import Consumption from '@/components/Home/designer/edit/consumption.vue';
import Income from '@/components/Home/designer/edit/income.vue';
import Coupon from '@/components/Home/designer/edit/coupon.vue';

export default {
  name: 'priceList-index',
  description: '價目表的首頁',
  metaInfo: {
    title: 'BeautyOS 設計師',
    titleTemplate: '%s | 價目表',
  },
  components: {
    Consumption, Coupon, Income, UserInfo,
  },
  data() {
    return {
      seletedTab: 'UserInfo',
      items: [
        { name: '洗／剪', componentId: 'UserInfo' },
        { name: '染髮', componentId: 'Consumption' },
        { name: '燙髮', componentId: 'Income' },
        { name: '護髮', componentId: 'Coupon' },
      ],
    };
  },
  methods: {
    doRoute() {
      this.$router.push({ name: 'Punch' });
    },
    toggleAdd() {
      this.$swal.fire({
        input: 'text',
        title: ' ',
        html:
        `<div class="flex items-center justify-center">
          <span>新增分類</span>
        </div>`,
        inputPlaceholder: '輸入標題．．．',
        confirmButtonText: '儲存',
        showConfirmButton: true,
        showCloseButton: true,
        focusConfirm: false,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp animate__faster',
        },
        customClass: {
          confirmButton: '!w-[144px] !rounded !bg-second !px-[14px] !py-2 !text-sm !text-white',
        },
      }).then((res) => {
        if (res.isConfirmed) {
          this.$swal.fire({
            showCloseButton: true,
            html:
            `<div class="flex items-center justify-center my-10">
              <img src="/designer/assets/images/success.svg" alt="" class="inline-block mr-1" /><span>新增成功</span>
            </div>`,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          }).then(() => {
            // this.doRoute();
          });
        }
      });
    },
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
.scrollnone{
  &::-webkit-scrollbar {
    display: none !important;
  }
}
</style>
