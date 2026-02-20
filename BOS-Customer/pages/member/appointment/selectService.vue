<template>
  <section v-if="!isGlobalLoading" id="firstPos">
    <div
      class="w-full p-4 flex gap-4 border border-[#aeaeae] bg-white rounded-lg mt-3"
    >
      <div
        class="w-6 h-6 flex justify-center items-center border-2 border-[#4ADE80] rounded-full"
      >
        <fa icon="fa-solid fa-check" class="text-[#4ADE80]" />
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-sm line-clamp-1">已選設計師：{{ selectDesigner }}</p>
        <p class="text-sm">已選時段 : {{ selectTime }}</p>
      </div>
    </div>

    <!-- 選擇服務項目 -->
    <h4 v-if="checkHasServiceItem" class="text-[#666] font-bold mt-4 mb-2">
      選擇服務項目
    </h4>
    <p v-if="checkHasServiceItem" class="text-xs text-[#aeaeae] mb-2.5">
      價目僅供參考，實際價錢以設計師現場報價為準
    </p>
    <div
      v-if="checkHasServiceItem"
      class="w-full px-2.5 pb-5 rounded-lg shadow-[0px_2px_2px_rgba(0,0,0,0.25)] bg-white border border-[#aeaeae]"
    >
      <ul class="flex relative overflow-x-auto overflow-y-hidden">
        <li
          class="text-center text-lg flex-none border-b border-b-black service__tab-all"
        >
          <button
            @click="(selectTab = 'all'), (selectTabId = '')"
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="#3c4d86"
            class="w-full h-full px-4 pb-4 pt-5"
          >
            全部
          </button>
        </li>
        <li
          v-for="(tab, idx) in serviceItem"
          :key="tab.id"
          class="text-center text-lg flex-none border-b border-b-black"
          :class="[`service__tab-${idx + 1}`]"
        >
          <button
            @click="(selectTab = idx + 1), (selectTabId = tab.id)"
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="#3c4d86"
            class="w-full h-full px-4 pb-4 pt-5"
          >
            {{ tab.name }}
          </button>
        </li>
        <div
          :style="switchTabStyle"
          class="absolute bottom-[-1px] left-0 h-1 bg-black duration-300"
        ></div>
      </ul>

      <div v-if="filterServiceList.length > 0">
        <ul class="mt-6">
          <li class="px-2 pb-3 border-b border-b-[#aeaeae]">
            <div class="flex justify-between">
              <div class="col-span-10">
                <p class="text-sm">服務/產品名稱</p>
              </div>
              <div class="col-span-2"><p class="text-sm">售價</p></div>
            </div>
          </li>
        </ul>
        <transition-group tag="ul" name="fade">
          <li
            @click="selectServiceFn(list)"
            v-for="list in filterServiceList"
            :key="list.id"
            class="px-2 py-3 border-b border-b-[#aeaeae]"
          >
            <div class="flex justify-between">
              <div class="col-span-10 relative pr-4">
                <fa
                  icon="fa-regular fa-circle-plus"
                  class="absolute left-0 top-1/2 -translate-y-1/2 duration-300 scale-0"
                  :class="{ 'scale-100': !isSelectedService(list.id) }"
                />
                <fa
                  icon="fa-regular fa-circle-minus"
                  class="text-[#FEB401] absolute left-0 top-1/2 -translate-y-1/2 duration-300 scale-0"
                  :class="{ 'scale-100': isSelectedService(list.id) }"
                />
                <p
                  class="text-sm duration-300 translate-x-6 line-clamp-1 text-ellipsis overflow-hidden"
                  :class="{ 'text-[#FEB401]': isSelectedService(list.id) }"
                >
                  {{ list.name }}
                </p>
              </div>
              <div class="col-span-2">
                <p
                  class="text-sm duration-300 pl-4"
                  :class="{ 'text-[#FEB401]': isSelectedService(list.id) }"
                >
                  <span v-if="(list.highestPrice) == null">${{ list.lowestPrice }}up</span>
                  <span v-if="(list.highestPrice) == (list.lowestPrice)">${{ list.lowestPrice}}</span>
                  <span v-if="(list.highestPrice) !== (list.lowestPrice) && (list.highestPrice) !== null">${{ list.lowestPrice }}-${{ list.highestPrice}}</span>
                </p>
              </div>
            </div>
          </li>
        </transition-group>
      </div>

      <p v-else class="text-center text-stone-500 text-sm mt-5">
        該類別暫無服務項目
      </p>
    </div>

    <transition name="fade">
      <div v-if="selectService.length > 0">
        <h4 v-pre class="text-[#666] font-bold mt-4 mb-3">已選項目 :</h4>
        <transition-group
          tag="ul"
          name="fade"
          class="flex flex-wrap items-center gap-5 mb-10"
        >
          <li
            v-for="item in selectService"
            :key="item.id"
            class="bg-[#FEB401] py-2 px-3 text-sm text-white rounded-xl relative"
          >
            <div
              @click="cancelService(item)"
              class="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-[#aeaeae] flex justify-center items-center"
            >
              <fa icon="fa-solid fa-xmark" class="text-white text-sm" />
            </div>
            {{ item.name }}
          </li>
        </transition-group>
      </div>
    </transition>

    <!-- 備註 -->
    <h4 v-pre class="text-[#666] font-bold mt-4 mb-2">備註</h4>
    <textarea
      rows="4"
      v-model="remarkForCustomer"
      placeholder="其他需求 ? 留言給設計師吧 !"
      class="w-full p-3 rounded-md shadow-[0px_2px_2px_rgba(0,0,0,0.25)] border border-[#aeaeae]"
    ></textarea>

    <!-- 選擇客戶來源 -->
    <h4 v-pre class="text-[#666] font-bold mt-4 mb-2">
      您是從哪裡得知我們的？
    </h4>
    <div class="w-full relative">
      <select
        v-model="selectReference"
        class="appearance-none w-full py-2.5 px-4 rounded-lg shadow-[0px_2px_2px_rgba(0,0,0,0.25)] bg-white"
      >
        <option value="" selected disabled>請選擇</option>
        <option v-for="item in customerReference" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <fa
        icon="fa-regular fa-angle-down"
        class="absolute right-5 top-1/2 -translate-y-1/2"
      />
    </div>

    <button
      v-if="designerId !== 1"
      @click="handleBooking()"
      class="fixed bottom-24 left-[5%] w-[90%] py-2.5 text-white text-lg rounded-md mt-10 duration-300 z-0"
      :class="{
        'bg-[#232D4E]': !isLoading,
        'bg-[#bebebe] pointer-events-none': isLoading,
      }"
    >
      <fa v-if="isLoading" icon="fa-solid fa-spinner" class="animate-spin" />
      送出預約
    </button>

    <button
      v-else
      @click="handleNonDesignationBooking()"
      class="fixed bottom-24 left-[5%] w-[90%] py-2.5 text-white text-lg rounded-md mt-10 duration-300 z-0"
      :class="{
        'bg-[#232D4E]': !isLoading,
        'bg-[#bebebe] pointer-events-none': isLoading,
      }"
    >
      <fa v-if="isLoading" icon="fa-solid fa-spinner" class="animate-spin" />
      送出預約
    </button>
  </section>
</template>

<script>
export default {
  name: "appointment-selectService",
  data() {
    return {
      serviceItem: [],
      selectTab: "all",
      selectTabId: "",
      selectService: [],
      remarkForCustomer: "",
      isLoading: false,
      customerReference: [],
      selectReference: "",
      checkHasServiceItem: false,
      designerServiceIds: [],
    };
  },
  computed: {
    designerId() {
      return this.$store.state.appointmentData.designerId;
    },
    selectDesigner() {
      return this.$store.state.appointmentData.designerName;
    },
    selectTime() {
      return this.$store.state.appointmentData.time;
    },
    // 計算 tab 選擇到時的底部動畫寬度以及位置
    switchTabStyle() {
      switch (this.selectTab) {
        case "all":
          return `left: 0px; width: 68px;`;
        default:
          const selectIdx = this.selectTab;
          let tabWidth = document.querySelector(
            `.service__tab-${selectIdx}`
          ).clientWidth;
          let offsetLeft = document.querySelector(
            `.service__tab-${selectIdx}`
          ).offsetLeft;
          return `left: ${offsetLeft}px; width: ${tabWidth}px;`;
      }
    },
    // 過濾服務類別項目
    filterServiceList() {
      switch (this.selectTabId) {
        case "":
          let allList = [];

          this.serviceItem.forEach((item) => {
            item.bookingItem.forEach((bookingItem) =>
              allList.push(bookingItem)
            );
          });

          return allList;
        default:
          const list = this.serviceItem.find(
            (item) => item.id === this.selectTabId
          );

          return list.bookingItem;
      }
    },
    isGlobalLoading() {
      return this.$store.state.loading.isLoading;
    },
  },
  methods: {
    // 選擇服務
    selectServiceFn(item) {
      const isSelected = this.selectService
        .map((mapItem) => mapItem.id)
        .includes(item.id);
      if (isSelected) {
        this.selectService = this.selectService.filter(
          (filterItem) => filterItem.id !== item.id
        );
      } else {
        this.selectService.push(item);
      }
    },
    // 判斷服務是否選擇
    isSelectedService(id) {
      return this.selectService.map((item) => item.id).includes(id);
    },
    // 取消選擇服務
    cancelService(item) {
      this.selectService = this.selectService.filter(
        (filterItem) => filterItem.id !== item.id
      );
    },
    // 判斷 vuex 裡所有欄位有沒有值
    // async checkAppointmentData() {
    //   const data = Object.values(this.$store.state.appointmentData);
    //   return await data.every((item) => item);
    // },
    // 預約
    handleBooking() {
      if (this.isLoading) return;

      // 組合字串用
      let str = "";

      if (this.selectService.length > 0) {
        this.selectService.forEach((item, idx) => {
          if (idx !== this.selectService.length - 1) {
            str += `${item.name}、`;
          } else {
            str += `${item.name} `;
          }
        });
      }

      this.isLoading = true;

      let cellphone = this.$store.state.indexCache.userInfo.cellphone;
      let name = this.$store.state.indexCache.userInfo.name;

      if (!cellphone || !name) {
        this.api
          .getCustomerPersonalData("name cellphone")
          .then((res) => {
            this.$store.dispatch(
              "indexCache/handleSetUserInfo",
              res.data.getCustomerPersonalData
            );

            cellphone = this.$store.state.indexCache.userInfo.cellphone;
            name = this.$store.state.indexCache.userInfo.name;

            const input = {
              designerId: this.$store.state.appointmentData.designerId,
              dateTime: this.$store.state.appointmentData.timestamp,
              cellphone: this.$store.state.indexCache.userInfo.cellphone,
              merchantId: this.$store.state.appointmentData.merchantId,
              name: this.$store.state.indexCache.userInfo.name,
              reference: this.selectReference,
              remarkForCustomer: (str += this.remarkForCustomer),
              designerServiceIds: this.selectService.map((item) => item.id),
            };
            // console.log('handleBooking ', input);
            this.api
              .bookingV2(input)
              .then((res) => {
                if (!res.hasOwnProperty("errors")) {
                  window.localStorage.setItem(
                    "bookingData",
                    JSON.stringify(res.data.bookingV2)
                  );

                  this.$swal
                    .fire({
                      icon: "success",
                      title: `<h3 class="text-2xl">預約申請成功</h3>`,
                      background: "#fff",
                      iconColor: "#FEB401",
                      timer: 1500,
                      showConfirmButton: false,
                    })
                    .then(() => {
                      this.isLoading = false;
                      this.$router.push("/member/appointment/check");
                    });
                } else {
                  this.$router.push("/member/appointment/selectDate");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const input = {
          designerId: this.$store.state.appointmentData.designerId,
          dateTime: this.$store.state.appointmentData.timestamp,
          cellphone: cellphone,
          merchantId: this.$store.state.appointmentData.merchantId,
          name: name,
          reference: this.customerReference,
          remarkForCustomer: (str += this.remarkForCustomer),
          designerServiceIds: this.selectService.map((item) => item.id),
        };
        // console.log('handleBooking else ', input);
        this.api
          .bookingV2(input)
          .then((res) => {
            if (!res.hasOwnProperty("errors")) {
              window.localStorage.setItem(
                "bookingData",
                JSON.stringify(res.data.bookingV2)
              );
              this.$swal
                .fire({
                  icon: "success",
                  title: `<h3 class="text-2xl">預約申請成功</h3>`,
                  background: "#fff",
                  iconColor: "#FEB401",
                  timer: 1500,
                  showConfirmButton: false,
                })
                .then(() => {
                  this.isLoading = false;
                  this.$router.push("/member/appointment/check");
                });
            } else {
              this.$router.push("/member/appointment/selectDate");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 預約(不指定)
    handleNonDesignationBooking() {
      if (this.isLoading) return;

      this.isLoading = true;

      let cellphone = this.$store.state.indexCache.userInfo.cellphone;
      let name = this.$store.state.indexCache.userInfo.name;

      if (!cellphone || !name) {
        this.api
          .getCustomerPersonalData("name cellphone")
          .then((res) => {
            this.$store.dispatch(
              "indexCache/handleSetUserInfo",
              res.data.getCustomerPersonalData
            );

            cellphone = this.$store.state.indexCache.userInfo.cellphone;
            name = this.$store.state.indexCache.userInfo.name;

            const input = {
              bookingDate: this.$store.state.appointmentData.timestamp,
              cellphone: this.$store.state.indexCache.userInfo.cellphone,
              customerName: this.$store.state.indexCache.userInfo.name,
              storeId: this.$store.state.appointmentData.merchantId,
              remarkForCustomer: this.remarkForCustomer,
              designerServiceIds: this.selectService.map((item) => item.id),
            };
            // console.log('handleNonDesignationBooking ',input);

            this.api
              .nonDesignationBooking(input)
              .then((res) => {
                if (!res.data.hasErro) {
                  window.localStorage.setItem(
                    "bookingData",
                    JSON.stringify(res.data.nonDesignationBooking)
                  );

                  this.$swal
                    .fire({
                      icon: "success",
                      title: `<h3 class="text-2xl">預約申請成功</h3>`,
                      background: "#fff",
                      iconColor: "#FEB401",
                      timer: 1500,
                      showConfirmButton: false,
                    })
                    .then(() => {
                      this.isLoading = false;
                      this.$router.push("/member/appointment/check");
                    });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const input = {
          bookingDate: this.$store.state.appointmentData.timestamp,
          cellphone: this.$store.state.indexCache.userInfo.cellphone,
          customerName: this.$store.state.indexCache.userInfo.name,
          storeId: this.$store.state.appointmentData.merchantId,
          remarkForCustomer: this.remarkForCustomer,
          designerServiceIds: this.selectService.map((item) => item.id),
        };
        // console.log('handleNonDesignationBooking else ',input);

        this.api
          .nonDesignationBooking(input)
          .then((res) => {
            window.localStorage.setItem(
              "bookingData",
              JSON.stringify(res.data.nonDesignationBooking)
            );
            this.$swal
              .fire({
                icon: "success",
                title: `<h3 class="text-2xl">預約申請成功</h3>`,
                background: "#fff",
                iconColor: "#FEB401",
                timer: 1500,
                showConfirmButton: false,
              })
              .then(() => {
                this.isLoading = false;
                this.$router.push("/member/appointment/check");
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 取得設計師服務項目
    getBookingItemCategoryForCustomer() {
      const input = {
        storeId: this.$store.state.appointmentData.merchantId,
        designerId: this.$store.state.appointmentData.designerId,
      };

      this.api
        .getBookingItemCategoryForCustomer(input)
        .then((res) => {
          if (!res.data.hasError) {
            // 排序服務類別
            res.data.getBookingItemCategoryForCustomer =
              res.data.getBookingItemCategoryForCustomer.sort((a, b) => {
                return a["sort"] - b["sort"];
              });

            this.serviceItem = res.data.getBookingItemCategoryForCustomer;

            let count = 0;

            this.serviceItem.forEach((item) => {
              // 排序服務項目
              item.bookingItem.sort((a, b) => a["sort"] - b["sort"]);
              if (item?.bookingItem.length !== 0) count++;
            });

            if (count) this.checkHasServiceItem = true;
          }

          this.$store.dispatch("loading/isLoading", false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 取得客戶來源選項
    getCustomerReference() {
      this.api
        .getCustomerReference()
        .then((res) => {
          if (!res.data.hasError) {
            this.customerReference = res.data.getCustomerReference;
          }

          const designerId = this.$store.state.appointmentData.designerId;

          if (designerId === 1)
            this.$store.dispatch("loading/isLoading", false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async mounted() {
    // const isNull = await this.checkAppointmentData();

    // if (!isNull) this.$router.push("/member/appointment");
    // else {
    //   this.$store.dispatch("loading/isLoading", true);

    //   const designerId = this.$store.state.appointmentData.designerId;

    //   if (designerId !== 1) {
    //     this.getBookingItemCategoryForCustomer();
    //   }

    //   this.getCustomerReference();
    // }
    const designerId = this.$store.state.appointmentData.designerId;

    if (designerId !== 1) {
      this.getBookingItemCategoryForCustomer();
    }

    this.getCustomerReference();
  },
};
</script>
