<template>
  <section>
    <div
      class="flex flex-col fixed top-14 left-0 md:left-1/2 md:-translate-x-1/2 w-full max-w-[768px] px-[5%] h-[calc(100%-124px)] pb-20 overflow-y-auto"
    >
      <!-- 偏好門市 -->
      <h4 v-pre class="text-lg text-[#232D4E] mb-2.5 mt-7">門市</h4>
      <div class="w-full">
        <MemberGlobalCard
          :py="'py-4'"
          :px="'px-4'"
          :customCss="'shadow-none border border-[#aeaeae]'"
        >
          <div class="grid grid-cols-12 gap-2 items-center w-full">
            <div class="col-span-5 relative">
              <div
                data-aos="zoom-in"
                data-aos-once="true"
                data-aos-duration="500"
                data-aos-anchor="#firstPos"
                class="w-5 h-5 rounded-full border-2 border-[#4ADE80] flex justify-center items-center"
              >
                <fa icon="fa-solid fa-check" class="text-[#4ADE80] text-xs" />
              </div>
              <h4
                class="text-lg line-clamp-1 duration-300 absolute left-8 top-1/2 -translate-y-1/2"
              >
                {{ userSelect.merchantName }}
              </h4>
            </div>
            <div class="col-span-7">
              <p class="line-clamp-1 text-sm">{{ storeAddress }}</p>
            </div>
          </div>
        </MemberGlobalCard>
      </div>

      <!-- 選擇設計師 -->
      <h4 v-pre class="text-lg text-[#232D4E] mb-2.5 mt-9">
        選擇設計師<sup class="text-red-500"> *</sup>
      </h4>
      <MemberGlobalCard
        :px="'px-3'"
        :py="'py-6'"
        :customCss="'w-full border border-[#aeaeae]'"
        data-aos="fade-up"
        data-aos-deration="1000"
        data-aos-delay="300"
        data-aos-once="true"
        data-aos-anchor="#firstPos"
      >
        <div class="flex flex-col gap-4">
          <ul v-if="!searchingDesigners" class="flex flex-col gap-4 px-4">
            <!-- 設計師列表 -->
            <!-- 喜好設計師 -->
            <p
              v-if="defaultDesigner" v-show="defaultDesigner.id"
              class="text-[#666] text-xs mb-2 relative overflow-hidden after:content-[''] after:w-full after:h-[1px] after:bg-[#aeaeae] after:absolute after:left-16 after:top-1/2 after:-translate-y-1/2"
            >
              喜好設計師
            </p>
            <li
              v-if="defaultDesigner.id"
              @click="selectDesigner(defaultDesigner)"
              data-aos="fade"
              :data-aos-delay="200"
              data-aos-duration="300"
              data-aos-once="true"
              data-aos-anchor="#firstPos"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <img
                    :src="defaultDesigner.avatar"
                    :alt="defaultDesigner.nameForCustomerSide"
                    class="w-12 h-12 rounded-full object-cover object-center select-none pointer-events-none"
                  />
                  <h4 class="text-sm line-clamp-1">
                    {{ defaultDesigner.nameForCustomerSide }}
                  </h4>
                </div>
                <div
                  class="flex items-center gap-4 duration-300 scale-0"
                  :class="{ 'scale-100': isSelectDesigner(defaultDesigner.id) }"
                >
                  <p class="text-[#4ADE80] text-sm">已選</p>
                  <div
                    class="w-8 h-8 border-2 border-[#4ADE80] flex justify-center items-center rounded-full"
                  >
                    <fa
                      icon="fa-solid fa-check"
                      class="text-sm text-[#4ADE80]"
                    />
                  </div>
                </div>
              </div>
            </li>
            <!-- 非喜好設計師 -->
            <p
              v-if="defaultDesigner"
              class="text-[#666] text-xs mt-2 relative overflow-hidden after:content-[''] after:w-full after:h-[1px] after:bg-[#aeaeae] after:absolute after:left-16 after:top-1/2 after:-translate-y-1/2"
            >
              其他設計師
            </p>
            <li
              @click="selectDesigner(item)"
              v-for="(item, idx) in filterNonfavoriteDesigners"
              :key="item.id"
              data-aos="fade"
              :data-aos-delay="200 + idx * 50"
              data-aos-duration="300"
              data-aos-once="true"
              data-aos-anchor="#firstPos"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <img
                    v-if="item.nameForCustomerSide !== '不指定'"
                    :src="item.avatar"
                    :alt="item.nameForCustomerSide"
                    class="w-12 h-12 rounded-full object-cover object-center select-none pointer-events-none"
                  />
                  <div
                    v-else
                    class="w-12 h-12 rounded-full bg-[#c4c4c4] flex justify-center items-center"
                  >
                    <fa
                      icon="fa-solid fa-question"
                      class="text-white text-lg"
                    />
                  </div>
                  <h4 class="text-sm line-clamp-1">
                    {{ item.nameForCustomerSide }}
                  </h4>
                </div>
                <div
                  class="flex items-center gap-4 duration-300 scale-0"
                  :class="{ 'scale-100': isSelectDesigner(item.id) }"
                >
                  <p class="text-[#4ADE80] text-sm">已選</p>
                  <div
                    class="w-8 h-8 border-2 border-[#4ADE80] flex justify-center items-center rounded-full"
                  >
                    <fa
                      icon="fa-solid fa-check"
                      class="text-sm text-[#4ADE80]"
                    />
                  </div>
                </div>
              </div>
            </li>
            <!-- 不指定 -->
            <li
              @click="selectDesigner({ nameForCustomerSide: '不指定', id: 1 })"
              data-aos="fade"
              :data-aos-delay="200 + designers.length * 50"
              data-aos-duration="300"
              data-aos-once="true"
              data-aos-anchor="#firstPos"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-full bg-[#c4c4c4] flex justify-center items-center"
                  >
                    <fa
                      icon="fa-solid fa-question"
                      class="text-white text-lg"
                    />
                  </div>
                  <h4 class="text-sm">不指定</h4>
                </div>
                <div
                  class="flex items-center gap-4 duration-300 scale-0"
                  :class="{ 'scale-100': isSelectDesigner(1) }"
                >
                  <p class="text-[#4ADE80] text-sm">已選</p>
                  <div
                    class="w-8 h-8 border-2 border-[#4ADE80] flex justify-center items-center rounded-full"
                  >
                    <fa
                      icon="fa-solid fa-check"
                      class="text-sm text-[#4ADE80]"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div
            v-else
            class="min-h-[150px] w-full flex items-center justify-center"
          >
            <div
              class="border-4 border-t-[#232D4E] rounded-full w-10 h-10 animate-spin-slow"
            ></div>
          </div>
        </div>
      </MemberGlobalCard>
    </div>

    <button
      @click="toSelectDate()"
      class="w-[90%] mx-auto py-2.5 mt-5 shadow-md rounded-md duration-300 flex justify-center items-center gap-4 z-0 fixed bottom-24 left-1/2 -translate-x-1/2"
      :class="{
        'bg-[#aeaeae] pointer-events-none': !userSelect.designerId,
        'bg-[#232D4E]': userSelect.designerId,
      }"
    >
      <p class="text-lg text-white">選擇時段</p>
      <fa icon="fa-solid fa-angle-right" class="text-white" />
    </button>
  </section>
</template>

<script>
export default {
  name: "appointment-index",
  data() {
    return {
      designers: [],
      searchingDesigners: false,
      storeAddress: "",
      userSelect: {
        merchantId: "",
        merchantName: "",
        designerId: "",
        designerName: "",
      },
    };
  },

  methods: {
    // 搜尋設計師
    searchDesigner(id) {
      this.searchingDesigners = true;
      this.designers = [];

      this.api
        .customerGetMerchantDesigners(id)
        .then((res) => {
          if (!res.data.hasError) {
            this.designers = res.data.customerGetMerchantDesigners;
            this.searchingDesigners = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 選擇設計師
    selectDesigner(item) {
      this.userSelect.designerId = item.id;
      this.userSelect.designerName = item.nameForCustomerSide;
      this.userSelect.designerNickName = item.nickName ? item.nickName : 1;
    },
    isSelectDesigner(id) {
      if (this.userSelect.designerId === id) return true;
      return false;
    },
    toSelectDate() {
      const data = {
        merchantId: this.userSelect.merchantId,
        merchantName: this.userSelect.merchantName,
        designerId: this.userSelect.designerId,
        designerName: this.userSelect.designerName,
        designerNickName: this.userSelect.designerNickName,
      };
      // console.log(data);
      this.$store.dispatch(
        "appointmentData/handleSetDesignerAndMerchant",
        data
      );

      const preferDesigner = { id: data.designerId, name: data.designerName, nickName: data.designerNickName, avatar: ""};
      localStorage.setItem('preferDesigner', JSON.stringify(preferDesigner));

      this.$router.push("/member/appointment/selectDate");
    },
  },
  computed: {
    filterNonfavoriteDesigners() {
      if (this.defaultDesigner.id)
        return this.designers.filter(
          (item) => item.id !== this.defaultDesigner.id
        );
      return this.designers;
    },
    defaultDesigner() {
      let des = window.localStorage.getItem("preferDesigner");
      if (des != "null") {
        if (des != "") {
          des = JSON.parse(window.localStorage.getItem("preferDesigner"));
          return (this.designers.filter((designer) => designer.id === des.id)[0] || {});
        } else {
          return this.designers = [];
        }
      } else {
        return this.designers = [];
      }
    },
  },
  mounted() {
    const merchant = JSON.parse(window.localStorage.getItem("merchant"));
    let id = merchant?.id || "";
    this.searchDesigner(id);

    this.userSelect.merchantName = merchant.name || "";
    this.userSelect.merchantId = merchant.id || "";
    this.storeAddress = merchant.address || "";

    // this.defaultDesigner = JSON.parse(window.localStorage.getItem('preferDesigner')) || ''

    if (this.defaultDesigner) this.selectDesigner(this.defaultDesigner);
  }
};
</script>
