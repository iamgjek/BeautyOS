<template>
  <div
    class="animate__animated animate__fadeIn animate__fast rounded-[10px] bg-white px-[1rem] py-[2rem] font-sans font-normal"
  >
    <div class="px-2" v-if="resultData">
      <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
        <div class="w-1/4">姓名</div>
        <div class="w-3/4">{{ resultData.name }}</div>
      </div>
      <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
        <div class="w-1/4">電話</div>
        <div class="w-3/4">{{ resultData.cellphone }}</div>
      </div>
      <!-- <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
        <div class="w-1/4">市話</div>
        <div class="w-3/4">{{ resultData.cellphone }}</div>
      </div> -->
      <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
        <div class="w-1/4">客戶暱稱</div>
        <div class="w-3/4">{{ resultData.nickName }}</div>
      </div>
      <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
        <div class="w-1/4">性別</div>
        <div class="w-3/4">{{ resultData.gender }}</div>
      </div>
      <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
        <div class="w-1/4">Email</div>
        <div class="w-3/4">{{ resultData.email }}</div>
      </div>
      <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
        <div class="w-1/4">Line ID</div>
        <div class="w-3/4">{{ resultData.lineId }}</div>
      </div>
      <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
        <div class="w-1/4">生日</div>
        <div class="w-3/4">
          {{
            resultData.birthday.year && resultData.birthday.year !== "0"
              ? `${resultData.birthday.year} / `
              : ""
          }}{{
            resultData.birthday.month && resultData.birthday.month !== "0"
              ? `${resultData.birthday.month} / `
              : "--."
          }}{{
            resultData.birthday.day && resultData.birthday.day !== "0"
              ? resultData.birthday.day
              : "--"
          }}
        </div>
      </div>
      <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
        <div class="w-1/4">地址</div>
        <div class="w-3/4">{{ resultData.address }}</div>
      </div>
      <div class="mb-2 flex border-b border-dashed border-[#ccc] pb-2">
        <div class="w-1/4">客戶來源</div>
        <div class="w-3/4">{{ resultData.source }}</div>
      </div>
    </div>

    <button
      class="mx-auto my-4 block rounded-full bg-ml px-4 py-2 text-sm text-white"
      @click="doRouter()"
    >
      新增預約
    </button>
  </div>
</template>

<script>
export default {
  name: 'customer-component-userInfo',
  data() {
    return {
      resultData: null,
    };
  },
  mounted() {
    this.getCustomer();
  },
  methods: {
    async getCustomer() {
      const resp = await this.$api.customer({ id: this.$route.query.id });
      const { data, errors } = resp.data;
      console.log(data);
      if (errors) return;
      this.resultData = data.customer;
    },

    doRouter() {
      this.$router.push({
        name: 'ScheduleBreak-Add',
        query: { name: this.resultData.name, cellphone: this.resultData.cellphone },
      });
    },
  },
};
</script>

<style></style>
