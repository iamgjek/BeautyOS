<template>
  <section id="firstPos" class="w-full max-w-[768px] mx-auto">
    <!-- title -->
    <div
      v-once
      class="fixed left-0 top-0 w-full px-[10%] text-lg bg-white py-4 flex items-center"
    >
      <fa
        @click="$router.go(-1)"
        icon="fa-solid fa-angle-left"
        class="text-2xl"
      />
      <h2
        v-pre
        class="absolute top-1/2 translate-y-[-50%] left-[50%] translate-x-[-50%] text-lg font-bold"
      >
        預約記錄
      </h2>
    </div>

    <!-- 類別 -->
    <div class="flex justify-center gap-5 text-sm mt-3 mb-4 px-4">
      <button
        @click="(selectTab = '未完成'), (currentPage = 0), getNotDoneOrders()"
        class="rounded-xl py-2 w-1/2 bg-white border border-[#232D4E] shadow-[0_5px_5px_rgba(0,0,0,0.2)] duration-300"
        :class="{
          'bg-[#232D4E] shadow-none': selectTab === '未完成',
        }"
      >
        未完成
      </button>
      <button
        @click="(selectTab = '已結束'), (currentPage = 0), getDoneOrders()"
        class="rounded-xl py-2 w-1/2 bg-white border border-[#232D4E] shadow-[0_5px_5px_rgba(0,0,0,0.2)] duration-300"
        :class="{
          'bg-[#232D4E] shadow-none': selectTab === '已結束',
        }"
      >
        已結束
      </button>
    </div>

    <!-- 預約記錄列表 -->
    <div id="orderList" v-if="appointmentRecord.length > 0">
      <MemberGlobalCard
        v-for="item in appointmentRecord"
        :key="item.id"
        data-aos="zoom-in"
        data-aos-anchor="#firstPos"
        data-aos-once="true"
        data-aos-duration="300"
        :isEdit="item.isEdit"
      >
        <div class="grid grid-cols-4 gap-3">
          <div v-pre class="col-span-1">
            <p class="text-sm mt-1">預約日期</p>
          </div>
          <div class="col-span-3">
            <p v-formatDate="'time'" class="text-lg font-bold">
              {{ item.date }}
            </p>
          </div>
          <div v-pre class="col-span-1"><p class="text-sm">狀態</p></div>
          <div
            class="col-span-3 flex items-center gap-2"
            :class="{
              'text-[#FEB401]': item.status === '未完成',
              'text-[#16A34A]':
                item.status === '預約成功' || item.status === '已完成',
              'text-[#F43F5E]':
                item.status === '設計師已拒絕' ||
                item.status === '設計師已取消',
            }"
          >
            <p v-if="item.status !== '設計師已取消'">{{ item.status }}</p>
            <span v-if="item.status === '設計師已取消'">已取消</span
            ><span class="text-xs text-[#666]" v-if="item.status === '未完成'"
              >(待設計師確認後才算預約完成)</span
            >
          </div>
          <div v-pre class="col-span-1"><p class="text-sm">設計師</p></div>
          <div class="col-span-3">
            <p v-if="item.designer" class="text-sm line-clamp-1">
              {{ item.designer.nameForCustomerSide }}
              <!-- <span v-if="item.designer.nickName"
                >({{ item.designer.nickName }})</span
              > -->
            </p>
            <p v-else class="text-sm">不指定</p>
          </div>
          <div v-if="item.remarkForCustomer" class="col-span-1">
            <p class="text-sm">備註</p>
          </div>
          <div v-if="item.remarkForCustomer" class="col-span-3">
            <p class="text-sm">{{ item.remarkForCustomer }}</p>
          </div>

          <div v-if="item.messageForCustomer" class="col-span-1">
            <p class="text-sm">設計師留言</p>
          </div>
          <div v-if="item.messageForCustomer" class="col-span-3">
            <p class="text-sm">{{ item.messageForCustomer }}</p>
          </div>

          <div v-if="item.isEdit" class="col-span-1">
            <div class="flex items-center gap-1 mt-5">
              <fa icon="fa-light fa-pen" class="text-[#aeaeae] text-xs" />
              <p class="text-[#aeaeae] text-xs">已修改</p>
            </div>
          </div>
        </div>

        <button
          @click="$router.push('/member/appointment')"
          v-if="
            item.status === '設計師已取消' ||
            item.status === '設計師已拒絕' ||
            item.status === '已完成'
          "
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          class="w-full mt-4 py-2 text-white text-sm bg-[#FEB401]"
        >
          <p class="text-sm">重新預約</p>
        </button>
        <button
          @click="cancelReservation(item.id, item.date, item.designer)"
          v-else
          class="w-full mt-4 py-2 text-white text-sm flex items-center justify-center gap-2"
          :class="{
            hidden: isHidden(item),
            'bg-[#F43F5E]': isCancel !== item.id,
            'bg-[#bebebe]': isCancel === item.id,
          }"
        >
          <fa
            v-if="isCancel === item.id"
            icon="fa-solid fa-spinner"
            class="animate-spin"
          />
          <p class="text-sm">取消預約</p>
        </button>
        <button class="question" @click="getQuestionAnswer(item.id)">？</button>
      </MemberGlobalCard>
      <ItemLoading />
    </div>

    <!-- 無資料顯示 -->
    <div v-if="appointmentRecord.length === 0 && !isLoading">
      <MemberGlobalCard
        :customCss="'min-h-[200px] flex items-center justify-center'"
        data-aos="zoom-in"
        data-aos-once="true"
        data-aos-duration="300"
      >
        <p class="text-[#555]">目前尚無紀錄</p>
      </MemberGlobalCard>
    </div>
  </section>
</template>

<script>
import { cacelPendingForBookingRecords } from "@/utils/cancelToken.js";
export default {
  name: "member-appointmentRecord",
  head() {
    return {
      meta: [
        {
          name: "theme-color",
          content: "#ffffff",
        },
      ],
    };
  },
  data() {
    return {
      appointmentRecord: [],
      selectTab: "未完成",
      currentPage: 0,
      totalPage: 0,
      isGetting: false,
      isEnd: false,
      getting: "",
      isCancel: "",
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading;
    },
  },
  methods: {
    // 取得未完成紀錄
    async getNotDoneOrders() {
      if (this.getting === "notDoneOrders") return;
      this.getting = "notDoneOrders";

      cacelPendingForBookingRecords();

      this.$store.dispatch("loading/isLoading", true);

      this.appointmentRecord = [];
      this.isEnd = false;
      this.currentPage = 0;

      const needKey =
        "id, no, date, designer{name, nickName, nameForCustomerSide}, status, remarkForCustomer, messageForCustomer, troubleShooting";
      await this.api
        .getNotDoneCustomerReservationRecords(needKey, this.currentPage)
        .then((res) => {
          this.appointmentRecord =
            res.data.getCustomerReservationRecords.orders;
          // 計算總頁數
          this.totalPage = Math.ceil(
            res.data.getCustomerReservationRecords.totalCount / 20
          );
          // 判斷是否可滾動加載
          if (this.totalPage <= 1) this.isEnd = true;
          if (this.totalPage > 1) {
            const container = document.querySelector(".member__container");
            container.addEventListener("scroll", this.scrollGetOrders);
          }

          console.log(this.appointmentRecord);

          this.getting = "";
          this.$store.dispatch("loading/isLoading", false);
        })
        .catch((err) => {
          this.getting = "";
          console.log(err);
        });
    },
    // 取得完成紀錄
    async getDoneOrders() {
      if (this.getting === "dontOrders") return;
      this.getting = "dontOrders";

      cacelPendingForBookingRecords();

      this.$store.dispatch("loading/isLoading", true);

      this.appointmentRecord = [];
      this.isEnd = false;
      this.currentPage = 0;

      const needKey =
        "id, no, date, designer{name, nickName, nameForCustomerSide}, status, remarkForCustomer,messageForCustomer";

      await this.api
        .getDoneCustomerReservationRecords(needKey, this.currentPage)
        .then((res) => {
          this.appointmentRecord =
            res.data.getCustomerReservationRecords.orders;
          this.totalPage = Math.ceil(
            res.data.getCustomerReservationRecords.totalCount / 20
          );

          if (this.totalPage <= 1) this.isEnd = true;
          if (this.totalPage > 1) {
            const container = document.querySelector(".member__container");
            container.addEventListener("scroll", this.scrollGetOrders);
          }

          this.getting = "";
          this.$store.dispatch("loading/isLoading", false);
        })
        .catch((err) => {
          this.getting = "";
          console.log(err);
        });
    },
    // 滾動加載
    scrollGetOrders() {
      const orderList = document.querySelector("#orderList");
      const triggerDistance = 200;
      const distance =
        orderList.getBoundingClientRect().bottom - window.innerHeight;

      if (!this.isGetting && !this.isEnd && distance < triggerDistance) {
        this.$store.dispatch("itemLoading/isLoading", true);
        this.isGetting = true;
        this.isEnd = false;
        this.currentPage++;

        if (this.currentPage === this.totalPage - 1) {
          this.isEnd = true;
          const container = document.querySelector(".member__container");
          container?.removeEventListener("scroll", this.scrollGetOrders);
        }

        const needKey =
          "id, no, date, designer{name, nickName, nameForCustomerSide}, status, remarkForCustomer";

        switch (this.selectTab) {
          case "未完成":
            this.api
              .getNotDoneCustomerReservationRecords(needKey, this.currentPage)
              .then((res) => {
                this.appointmentRecord = this.appointmentRecord.concat(
                  res.data.getCustomerReservationRecords.orders
                );
                // 計算總頁數
                this.totalPage = Math.ceil(
                  res.data.getCustomerReservationRecords.totalCount / 20
                );
                // 判斷是否可滾動加載
                if (this.totalPage <= 1) this.isEnd = true;

                this.isGetting = false;
                this.$store.dispatch("itemLoading/isLoading", false);
              })
              .catch((err) => {
                this.isGetting = false;
                console.log(err);
              });
            break;
          case "已結束":
            this.api
              .getDoneCustomerReservationRecords(needKey, this.currentPage)
              .then((res) => {
                this.appointmentRecord = this.appointmentRecord.concat(
                  res.data.getCustomerReservationRecords.orders
                );
                // 計算總頁數
                this.totalPage = Math.ceil(
                  res.data.getCustomerReservationRecords.totalCount / 20
                );
                // 判斷是否可滾動加載
                if (this.totalPage <= 1) this.isEnd = true;

                this.isGetting = false;
                this.$store.dispatch("itemLoading/isLoading", false);
              })
              .catch((err) => {
                this.isGetting = false;
                console.log(err);
              });
            break;
        }
      }
    },
    // 判斷隱藏取消預約按鈕
    isHidden(item) {
      const toDay = Date.now();
      if (
        item.date < toDay &&
        (item.status === "預約成功" || item.status === "未完成")
      )
        return true;
      return false;
    },
    // 取消預約
    cancelReservation(orderId, timestamp, designerName) {
      const newDate = new Date(timestamp);
      const year = newDate.getFullYear();
      const month = this.formatDate(newDate.getMonth() + 1);
      const date = this.formatDate(newDate.getDate());
      const hours = this.formatDate(newDate.getHours());
      const min = this.formatDate(newDate.getMinutes());

      const name = designerName?.name ? designerName?.name : "不指定";

      this.$swal
        .fire({
          html: `<p class="text-lg">確定要取消<br>
        <span class="text-[#FEB401] font-bold">${year}/${month}/${date} ${hours}:${min} ${name}</span>
        的預約嗎？
        </p>`,
          showCancelButton: true,
          confirmButtonText: "取消預約",
          confirmButtonColor: "#232D4E",
          cancelButtonText: "取消",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.isCancel = orderId;

            this.api
              .customerCancelReservation(orderId)
              .then((res) => {
                console.log(res);
                this.isCancel = "";
                if (!res.hasOwnProperty("errors")) {
                  this.appointmentRecord = this.appointmentRecord.filter(
                    (item) => item.id !== orderId
                  );
                  this.$swal.fire({
                    icon: "success",
                    title: `<h3 class="text-2xl">取消預約成功</h3>`,
                    background: "#fff",
                    iconColor: "#FEB401",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                } else {
                  this.$swal.fire({
                    icon: "error",
                    html: res.errors[0].message,
                    background: "#fff",
                    iconColor: "#F43F5E",
                    showConfirmButton: true,
                  });
                }
              })
              .catch((err) => {
                this.isCancel = "";
                console.log(err);
              });
          }
        });
    },
    getQuestionAnswer(id) {
      let goalarray = this.appointmentRecord.filter((item) => {
        return item.id === id;
      });
      let troubleShooting = goalarray ? goalarray[0].troubleShooting : "";
      this.$swal.fire({
        html: troubleShooting,
        background: "#fff",
        iconColor: "#232D4E",
        showConfirmButton: true,
      });
    },
    // 轉換日期
    formatDate(obj) {
      if (obj < 10) return `0${obj}`;
      return obj;
    },
  },
  mounted() {
    this.getNotDoneOrders();
  },
  beforeDestroy() {
    const vm = this;
    const container = document.querySelector(".member__container");
    if (container) {
      container?.removeEventListener("scroll", vm.scrollGetOrders);
    }
  },
};
</script>
<style>
.question {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-weight: bold;
  border-radius: 50%;
  position: absolute;
  border: 2px solid #000;
  color: #000;
  top: 10px;
  right: 10px;
}
</style>
