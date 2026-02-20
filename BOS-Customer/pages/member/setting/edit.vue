<template>
  <section id="firstPos">
    <h4 v-pre class="text-lg mb-3">選擇登入店家</h4>
    <div class="w-full bg-white border border-[#aeaeae] rounded-md overflow-hidden relative">
      <input @input="searchMerchants()" v-model="searchInput" type="text" placeholder="搜尋關鍵字"
        class="appearance-none bg-white w-full rounded-md py-1 px-3 text-[#666] focus:border-0 focus:outline-none" />
      <fa icon="fa-regular fa-magnifying-glass" class="absolute right-5 top-1/2 -translate-y-1/2" />
    </div>

    <!-- 偏好門市 -->
    <!-- 預設門市 -->
    <div v-if="isShowDefault && defaultMerchant.id" class="mt-4">
      <MemberGlobalCard :py="'py-4'" :px="'px-4'" data-aos="fade-up" data-aos-delay="100" data-aos-once="true"
        data-aos-duration="300" data-aos-anchor="#firstPos">
        <div @click="
          searchDesigner(defaultMerchant.id), selectStore(defaultMerchant)
        " class="grid grid-cols-12 items-center w-full">
          <div class="col-span-5 relative">
            <div
              class="w-5 h-5 rounded-full border-2 border-[#4ADE80] flex justify-center items-center duration-300 scale-0"
              :class="{ 'scale-100': isSelectedStore(defaultMerchant.id) }">
              <fa icon="fa-solid fa-check" class="text-[#4ADE80] text-xs" />
            </div>
            <h4 class="text-lg line-clamp-1 duration-300 absolute left-0 top-1/2 -translate-y-1/2"
              :class="{ 'left-8': isSelectedStore(defaultMerchant.id) }">
              {{ defaultMerchant.name }}
            </h4>
          </div>
          <div class="col-span-7">
            <p class="text-sm line-clamp-1">{{ defaultMerchant.address }}</p>
          </div>
        </div>
      </MemberGlobalCard>
    </div>

    <!-- 門市列表 -->
    <div v-if="merchants.length > 0 && !merchantsIsNull" class="w-full mt-4">
      <MemberGlobalCard v-for="(item, idx) in merchants" :key="item.id" :py="'py-4'" :px="'px-4'" data-aos="fade-up"
        :data-aos-delay="idx * 100" data-aos-once="true" data-aos-duration="300" data-aos-anchor="#firstPos">
        <div @click="searchDesigner(item.id), selectStore(item)" class="grid grid-cols-12 items-center w-full">
          <div class="col-span-5 relative">
            <div
              class="w-5 h-5 rounded-full border-2 border-[#4ADE80] flex justify-center items-center duration-300 scale-0"
              :class="{ 'scale-100': isSelectedStore(item.id) }">
              <fa icon="fa-solid fa-check" class="text-[#4ADE80] text-xs" />
            </div>
            <h4 class="text-lg line-clamp-1 duration-300 absolute left-0 top-1/2 -translate-y-1/2"
              :class="{ 'left-8': isSelectedStore(item.id) }">
              {{ item.name }}
            </h4>
          </div>
          <div class="col-span-7">
            <p class="text-sm line-clamp-1">{{ item.address }}</p>
          </div>
        </div>
      </MemberGlobalCard>
    </div>
    <div v-if="merchantsIsNull && !isShowDefault" class="mt-6 text-center text-sm text-slate-500">
      查無門市
    </div>

    <ItemLoading />

    <!-- 選擇喜好設計師 -->
    <h4 v-pre data-aos="fade-up" data-aos-delay="100" data-aos-duration="300" data-aos-once="true"
      data-aos-anchor="#firstPos" class="text-lg mt-12">
      選擇喜好設計師
    </h4>
    <ul data-aos="fade-up" data-aos-delay="100" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos"
      class="pl-7 pr-4 gap-4 mt-4 bg-white rounded-lg border border-[#aeaeae] shadow-[0px_2px_2px_rgba(0,0,0,0.25)] min-h-[96px]"
      :class="{ 'pt-4': designers.length === 0 }">
      <div v-if="searchingDesigners" class="min-h-[150px] w-full flex items-center justify-center">
        <div class="border-4 border-t-[#232D4E] rounded-full w-10 h-10 animate-spin-slow"></div>
      </div>

      <span v-if="designers.length === 0 && !searchingDesigners" class="text-[#aeaeae] text-sm">查無資料</span>

      <!-- 設計師列表 -->
      <li @click="selectDesigner(item.id)" v-for="(item, idx) in designers" :key="item.id" data-aos="fade"
        :data-aos-delay="100 + idx * 50" data-aos-duration="300" data-aos-once="true" data-aos-anchor="#firstPos"
        class="my-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <img :src="item.avatar" :alt="item.name"
              class="w-12 h-12 rounded-full object-cover object-center select-none pointer-events-none" />
            <h4 class="text-sm line-clamp-1">
              {{ item.name }}
              <span v-if="item.nickName">({{ item.nickName }})</span>
            </h4>
          </div>
          <div class="flex items-center gap-4 duration-300" :class="{
            'scale-100': favoriteInfo.designer === item.id,
            'scale-0': favoriteInfo.designer !== item.id,
          }">
            <p class="text-[#4ADE80] text-sm">已選</p>
            <div class="w-8 h-8 border-2 border-[#4ADE80] flex justify-center items-center rounded-full">
              <fa icon="fa-solid fa-check" class="text-sm text-[#4ADE80]" />
            </div>
          </div>
        </div>
      </li>
    </ul>

    <!-- 儲存設定按鈕 -->
    <button @click="saveFavorite"
      class="fixed bottom-24 left-[5%] w-[90%] py-2.5 shadow-md rounded-md duration-300 mt-5 flex items-center justify-center gap-2 z-10"
      :class="{
        'bg-[#bebebe] pointer-events-none': isChanging || !favoriteInfo.id,
        'bg-[#232D4E]': !isChanging,
      }">
      <fa v-if="isChanging" icon="fa-solid fa-spinner" class="animate-spin text-white" />
      <p class="text-lg text-white">儲存設定</p>
    </button>
  </section>
</template>

<script>
import { cancelAllPending } from "@/utils/cancelToken.js";
export default {
  name: "setting-edit",
  data() {
    return {
      designers: [],
      favoriteInfo: {
        id: "",
        name: "",
        designer: "",
      },
      defaultMerchant: {},
      merchants: [],
      merchantsIsNull: true,
      searchInput: "",
      isShowDefault: true,
      searchingDesigners: false,
      isChanging: false,
    };
  },
  methods: {
    // 搜尋門市 // 延遲請求
    searchMerchants() {
      let lastTimeVal = this.searchInput;

      setTimeout(() => {
        if (lastTimeVal === this.searchInput) {
          cancelAllPending();

          this.merchants = [];
          this.merchantsIsNull = false;
          this.isShowDefault = false;
          this.$store.dispatch("itemLoading/isLoading", true);

          const input = this.searchInput.trim();

          if (!input) {
            this.isShowDefault = true;
            this.$store.dispatch("itemLoading/isLoading", false);
            return;
          }

          this.api
            .getAllMerchants(input)
            .then((res) => {
              if (res.data.getAllMerchants.length === 0)
                this.merchantsIsNull = true;

              this.merchants = res.data.getAllMerchants;
              this.$store.dispatch("itemLoading/isLoading", false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, 500);
    },
    // 搜尋門市可預約設計師
    searchDesigner(id) {
      if (this.favoriteInfo.id === id) return;

      cancelAllPending();

      this.searchingDesigners = true;
      this.designers = [];

      this.api
        .customerGetMerchantDesigners(id)
        .then((res) => {
          this.designers = res.data.customerGetMerchantDesigners;
          this.searchingDesigners = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 選擇門市
    selectStore(item) {
      if (this.favoriteInfo.id === item.id) return;
      this.favoriteInfo.designer = "";
      this.favoriteInfo.id = item.id;
      this.favoriteInfo.name = item.name;
    },
    // 選擇設計師
    selectDesigner(id) {
      this.favoriteInfo.designer = id;
    },
    // 判斷選取到的門市
    isSelectedStore(id) {
      if (this.favoriteInfo.id === id) {
        return true;
      } else {
        return false;
      }
    },
    // 修改偏好
    // 變更完設定後要再打一隻取得 defaultMarchant 的api (customerGetCurrentMerchantSetting)，否則第一次沒有店家的會員不能跳頁面
    saveFavorite() {
      this.isChanging = true;
      let sameMerchant = this.favoriteInfo.id == this.defaultMerchant.id;

      //沒選設計師、沒更新店家
      if (!this.favoriteInfo.designer && sameMerchant) {
        //直接取得目前設定
        // this.customerGetCurrentMerchantSetting();

        // 更新設計師
        this.api
          .updateCustomerPreferDesigner("", this.favoriteInfo.id)
          .then(() => {
            this.customerGetCurrentMerchantSetting();
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //沒選設計師、更新店家
      if (!this.favoriteInfo.designer && !sameMerchant) {
        //更新店家設定
        this.api
          .updateCustomerCuttentMerchant(this.favoriteInfo.id)
          .then((res) => {
            if (res.data.hasError) throw res.errors;
            this.customerGetCurrentMerchantSetting();
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //選設計師、更新店家
      if (this.favoriteInfo.designer && !sameMerchant) {
        //先更新店家
        this.api
          .updateCustomerCuttentMerchant(this.favoriteInfo.id)
          .then((res) => {
            if (res.data.hasError) throw res.errors;
            // 再更新設計師
            this.api
              .updateCustomerPreferDesigner(this.favoriteInfo.designer, this.favoriteInfo.id)
              .then(() => {
                this.customerGetCurrentMerchantSetting();
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //選設計師、沒更新店家
      if (this.favoriteInfo.designer && sameMerchant) {
        this.api.updateCustomerPreferDesigner(this.favoriteInfo.designer, this.favoriteInfo.id)
          .then(() => {
            this.customerGetCurrentMerchantSetting();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 取得預設門市、設計師、所有門市
    customerGetCurrentMerchantSetting() {
      //取得是否新客且無店家
      let isNewCustomerAndNomerchant = JSON.parse(
        localStorage.getItem("isNewCustomerAndNomerchant")
      );
      window.localStorage.clear();
      this.api
        .customerGetCurrentMerchantSetting()
        .then((res) => {
          if (!res.data.hasError) {
            let resData = res.data.customerGetCurrentMerchantSetting
            localStorage.setItem("allMerchants", JSON.stringify(resData.consumedMerchants));
            localStorage.setItem("merchant", JSON.stringify(resData.currentMerchant));
            localStorage.setItem("preferDesigner", JSON.stringify(resData.preferDesigner));
            this.isChanging = false;

            this.$swal
              .fire({
                icon: "success",
                title: '<h3 class="text-2xl">已儲存偏好設定</h3>',
                background: "#fff",
                iconColor: "#FEB401",
                timer: 1500,
                showConfirmButton: false,
              })
              .then(() => {
                if (isNewCustomerAndNomerchant) {
                  this.$router.push("/member/appointment");
                } else {
                  this.$router.push("/member/setting");
                }
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // 取得門市設計師資料
    let merchant = JSON.parse(window.localStorage.getItem("merchant")) || {};

    if (merchant?.id) this.searchDesigner(merchant?.id);

    // 取得預設門市資料
    this.defaultMerchant = merchant;
    // 選擇門市
    this.selectStore(this.defaultMerchant);
  },
};
</script>
