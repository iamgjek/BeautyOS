<template>
  <div class="animate__animated animate__fadeIn animate__fast">
    <div class="px-2">
      <div class="mt-2 flex border-b border-solid border-primary/50 text-left">
        <div class="w-6/12">服務／產品名稱</div>
        <div class="w-6/12 text-right">售價</div>
      </div>
      <div class="mt-1 flex items-center border-b border-solid border-primary/50 text-left">
        <!--
        <div class="w-1/12">
          <font-awesome-icon icon="fa-regular fa-circle-plus" class="text-lg" @click="toggleAddItem"/>
        </div>
        <div class="w-5/12">
          <C-Input v-model="form.ctx" :placeholder="'新增項目'" class="!mb-1"></C-Input>
        </div>
        <div class="w-4/12">
          <C-Input v-model="form.price" :placeholder="'新增價錢'" class="!mb-1"></C-Input>
        </div> -->
        <div class="w-1/12 mr-6">
          <C-Checkbox></C-Checkbox>
        </div>
        <div class="w-2/12 mr-2">
          <font-awesome-icon
            icon="fa-regular fa-circle-plus"
            class="text-lg"
            @click="toggleAddItem"
          /> 新增
        </div>
        <div class="w-2/12 mr-2">
          <font-awesome-icon icon="fa-solid fa-trash-can" /> 刪除
        </div>
        <div class="w-2/12 mr-2">
          <font-awesome-icon icon="fa-solid fa-up-from-bracket" /> 上架
        </div>
        <div class="w-2/12 mr-2">
          <font-awesome-icon icon="fa-solid fa-down-to-bracket" /> 下架
        </div>
      </div>
    </div>
    <div class="px-2">
      <C-Draggable
        :list="resultList"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <div
          class="mt-2 flex items-center gap-2 border-b border-solid border-primary/50 text-left"
          v-for="(item, index) in resultList"
          :key="`total${index}`"
        >
          <div class="w-2/12">
            <C-Checkbox></C-Checkbox>
          </div>
          <div class="w-5/12" :class="{ '!w-6/12': !item.isEdit }">
            <span v-if="!item.isEdit">{{ item.name }}</span>
            <C-Input v-else v-model="item.name" :placeholder="'新增項目'" class="!mb-1"></C-Input>
          </div>
          <div class="w-4/12 text-right" :class="{ '!w-5/12': !item.isEdit }">
            <span v-if="!item.isEdit">${{ item.price }}{{ item.isUp ? "up" : "" }}</span>
            <C-Input v-else v-model="item.price" :placeholder="'新增項目'" class="!mb-1"></C-Input>
          </div>
          <div class="w-2/12" v-if="item.isEdit">
            <C-Checkbox v-model="item.isUp" :label="'up'"></C-Checkbox>
          </div>
          <div v-if="!item.isEdit" @click="doDelete(item)" @keypress="doDelete(item)">
            <font-awesome-icon icon="fa-solid fa-trash-can" />
          </div>
          <div
            class="w-1/12"
            @click="item.isEdit = !item.isEdit"
            @keypress="item.isEdit = !item.isEdit"
          >
            <font-awesome-icon v-if="!item.isEdit" icon="fa-regular fa-pencil" class="text-lg" />
            <font-awesome-icon v-else icon="fa-regular fa-floppy-disk" class="text-lg" />
          </div>
        </div>
      </C-Draggable>
    </div>
    <p class="py-2">按住並滑動以變更順序</p>
  </div>
</template>

<script>
export default {
  name: 'customer-component-userInfo',
  data() {
    return {
      enabled: true,
      form: {
        ctx: '',
        price: '',
      },
      resultList: [
        // 染髮
        {
          id: 1,
          name: '染髮',
          price: '250',
          isUp: true,
          isEdit: false,
        },
        {
          id: 2,
          name: '健康洗髮(A級)',
          price: '300',
          isUp: true,
          isEdit: false,
        },
        {
          id: 3,
          name: '清涼沁透洗髮',
          price: '398',
          isUp: false,
          isEdit: false,
        },
        {
          id: 4,
          name: '剪髮',
          price: '600',
          isUp: true,
          isEdit: false,
        },
        {
          id: 5,
          name: '剪髮(Ａ級)',
          price: '1000',
          isUp: true,
          isEdit: false,
        },
        {
          id: 6,
          name: '單鍵燙',
          price: '2500',
          isUp: true,
          isEdit: false,
        },
        {
          id: 7,
          name: '雙鍵燙',
          price: '3000',
          isUp: true,
          isEdit: false,
        },
        {
          id: 8,
          name: 'AO燙',
          price: '3500',
          isUp: true,
          isEdit: false,
        },
        {
          id: 9,
          name: '專業染髮',
          price: '2000',
          isUp: true,
          isEdit: false,
        },
        {
          id: 10,
          name: '頭皮養護',
          price: '100',
          isUp: true,
          isEdit: false,
        },
        {
          id: 11,
          name: '接髮',
          price: '180',
          isUp: true,
          isEdit: false,
        },
      ],
    };
  },
  methods: {
    checkMove(e) {
      window.console.log(`Future index: ${e.draggedContext.futureIndex}`);
    },
    toggleAddItem() {},
    doDelete(item) {
      this.$swal
        .fire({
          title: ' ',
          html: `<div class="flex items-center justify-center my-10">
          <img src="/designer/assets/images/error.svg" alt="" class="inline-block mr-1" /><span>確定要刪除${item.name}嗎？</span>
        </div>`,
          confirmButtonText: '確認刪除',
          showConfirmButton: true,
          showCloseButton: true,
          customClass: {
            confirmButton: '!w-[144px] !rounded !bg-second !px-[14px] !py-2 !text-sm !text-white',
          },
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.resultList = this.resultList.filter((el) => el.id !== item.id);
            this.$swal.fire({
              title: ' ',
              html: `<div class="flex items-center justify-center my-10">
              <img src="/designer/assets/images/success.svg" alt="" class="inline-block mr-1" /><span>刪除成功</span>
            </div>`,
              showConfirmButton: false,
              showCloseButton: true,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        });
    },
  },
};
</script>

<style></style>
