<template>
  <section id="firstPos" v-if="!isLoading" class="pb-14">
    <MemberGlobalCard
      :py="'py-5'"
      :px="'px-5'"
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="true"
      data-aos-anchor="#firstPos"
    >
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(customerSelfUpdate)">
          <div class="grid grid-cols-12 items-center text-sm gap-2.5">
            <!-- 姓名 -->
            <ValidationProvider
              name="姓名"
              rules="required|max:20"
              v-slot="{ errors }"
              class="col-span-12"
            >
              <div class="grid grid-cols-12 items-center">
                <div v-pre class="col-span-3">
                  <label for="nameInput"><p>姓名<sup class="ml-1" style="color:red">*</sup></p></label>
                </div>
                <div class="col-span-8 relative">
                  <input
                    id="nameInput"
                    type="text"
                    maxlength="20"
                    v-model="memberInfo.name"
                    class="p-2.5 border border-[#aeaeae] rounded-lg w-full"
                    :class="{ 'ring-2 ring-[#ff4444]': errors.length > 0 }"
                  />
                </div>
              </div>
            </ValidationProvider>

            <!-- 手機 -->
            <ValidationProvider
              name="手機"
              rules="required|onlyNumber"
              v-slot="{ errors }"
              class="col-span-12"
            >
              <div class="grid grid-cols-12 items-center">
                <div v-pre class="col-span-3">
                  <label for="phoneInput"><p>電話</p></label>
                </div>
                <div class="col-span-8 relative">
                  <input
                  disabled
                    id="phoneInput"
                    type="tel"
                    maxlength="10"
                    v-model="memberInfo.cellphone"
                    class="p-2.5 border border-[#aeaeae] rounded-lg w-full"
                    :class="{ 'ring-2 ring-[#ff4444]': errors.length > 0 }"
                  />
                </div>
              </div>
            </ValidationProvider>

            <div v-pre class="col-span-3"><p>暱稱</p></div>
            <div class="col-span-8">
              <input
                type="text"
                v-model="memberInfo.nickName"
                class="p-2.5 border border-[#aeaeae] rounded-lg w-full focus:outline-2 focus:outline-[#232D4E]"
              />
            </div>

            <div v-pre class="col-span-3 py-3"><p>性別<sup  class="ml-1" style="color:red">*</sup></p></div>
            <div class="col-span-8">
              <ValidationProvider
                rules="oneOf:MALE,FEMALE"
                :name="memberInfo.gender"
                v-slot="{ errors }"
              >
                <div class="flex items-center gap-7">
                  <div class="flex items-center gap-2">
                    <input
                      type="radio"
                      v-model="memberInfo.gender"
                      id="genderMale"
                      value="MALE"
                      class="hidden"
                    />
                    <label
                      for="genderMale"
                      class="w-[13px] h-[13px] rounded-full border border-[#aeaeae] p-[1px] relative after:content-[''] after:absolute after:w-[90%] after:h-[90%] after:left-[50%] after:translate-x-[-50%] after:top-[5%] after:rounded-full after:duration-300 after:scale-0"
                      :class="{
                        'after:border-[3px] after:border-[#232D4E] after:scale-100':
                          memberInfo.gender === 'MALE',
                      }"
                    ></label>
                    <label for="genderMale">男</label>
                  </div>

                  <div class="flex items-center gap-2">
                    <input
                      type="radio"
                      v-model="memberInfo.gender"
                      id="genderFemale"
                      value="FEMALE"
                      class="hidden"
                    />
                    <label
                      for="genderFemale"
                      class="w-[13px] h-[13px] rounded-full border border-[#aeaeae] p-[1px] relative after:content-[''] after:absolute after:w-[90%] after:h-[90%] after:left-[50%] after:translate-x-[-50%] after:top-[5%] after:rounded-full after:duration-300 after:scale-0"
                      :class="{
                        'after:border-[3px] after:border-[#232D4E] after:scale-100':
                          memberInfo.gender === 'FEMALE',
                      }"
                    ></label>
                    <label for="genderFemale">女</label>
                  </div>

                  <span class="text-red-500 font-bold" v-if="errors.length > 0"
                    >請輸入性別</span
                  >
                </div>
              </ValidationProvider>
            </div>

            <!-- email -->
            <ValidationProvider
              name="email"
              rules="email"
              v-slot="{ errors }"
              class="col-span-12"
            >
              <div class="grid grid-cols-12 items-center">
                <div v-pre class="col-span-3">
                  <label for="emailInput"><p>Email</p></label>
                </div>
                <div class="col-span-8 relative">
                  <input
                    id="emailInput"
                    type="email"
                    v-model="memberInfo.email"
                    class="p-2.5 border border-[#aeaeae] rounded-lg w-full"
                    :class="{ 'ring-2 ring-[#ff4444]': errors.length > 0 }"
                  />
                </div>
              </div>
            </ValidationProvider>

            <div v-pre class="col-span-3"><p>Line ID</p></div>
            <div class="col-span-8">
              <input
                type="text"
                v-model="memberInfo.lineId"
                class="p-2.5 border border-[#aeaeae] rounded-lg w-full"
              />
            </div>

            <div v-pre class="col-span-3"><p>生日</p></div>
            <div class="col-span-8">
              <v-date-picker
                locale="zh-TW"
                :first-day-of-week="2"
                v-model="memberInfo.birthday"
                mode="date"
              >
                <template v-slot="{ inputEvents, inputValue }">
                  <p
                    v-on="inputEvents"
                    class="flex w-full p-3 justify-between items-center gap-3 border border-[#aeaeae] rounded-lg"
                  >
                    <span v-formatDate="'date'">{{ inputValue }}</span>
                    <fa icon="fa-solid fa-calendar-days" class="text-base" />
                  </p>
                </template>
              </v-date-picker>
            </div>

            <div v-pre class="col-span-3"><p>地址</p></div>
            <div class="col-span-8">
              <input
                type="text"
                v-model="memberInfo.address"
                class="p-2.5 border border-[#aeaeae] rounded-lg w-full focus:outline-2 focus:outline-[#232D4E]"
              />
            </div>
          </div>
          <button
            type="submit"
            v-once
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-once="true"
            data-aos-anchor="#firstPos"
            data-aos-delay="200"
            class="w-full py-2.5 rounded-lg text-white text-lg bg-[#232D4E] absolute left-0 -bottom-16"
          >
            儲存修改
          </button>
        </form>
      </ValidationObserver>
    </MemberGlobalCard>
  </section>
</template>

<script>
export default {
  name: "member-info-edit",
  data() {
    return {
      attributes: {
        content: "#FEB401",
      },
      memberInfo: {},
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading;
    },
  },
  methods: {
    getCustomerPersonalData() {
      this.$store.dispatch("loading/isLoading", true);

      const needKey =
        "name, cellphone, nickName, gender, email, lineId, birthday, address";

      this.api
        .getCustomerPersonalData(needKey)
        .then((res) => {
          this.memberInfo = res.data.getCustomerPersonalData;

          this.$store.dispatch("loading/isLoading", false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async customerSelfUpdate() {
      this.$store.dispatch("loading/isLoading", true);
      const isNewCustomer = JSON.parse(localStorage.getItem("isNewCustomer"));
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      const merchantId = merchant ? merchant.id : null;
      const inputData = {
        name: this.memberInfo.name,
        nickName: this.memberInfo.nickName,
        gender: this.memberInfo.gender,
        email: this.memberInfo.email?this.memberInfo.email:"",
        lineId: this.memberInfo.lineId?this.memberInfo.lineId:"",
        birthday: this.memberInfo.birthday
          ? new Date(this.memberInfo.birthday).getTime()
          : null,
        address: this.memberInfo.address?this.memberInfo.address:"",
      };
      let resp = await this.api.customerSelfUpdate(inputData, "category");
      if (resp.hasError) return;
      if (isNewCustomer && merchantId) {
       await this.api.applyCustomerPersoanlDataToMerchant({merchantId: merchantId});
      }
      this.$swal
        .fire({
          icon: "success",
          title: `<h3 class="text-2xl">編輯成功</h3>`,
          background: "#fff",
          iconColor: "#FEB401",
          timer: 1500,
          showConfirmButton: false,
        })
        .then(() => {
          if(merchantId)  this.$router.push("/member/appointment");
          else this.$router.push("/member/info");
        });

      if (isNewCustomer) localStorage.setItem("isNewCustomer", false);
    },
  },
  mounted() {
    this.getCustomerPersonalData();
  },
};
</script>
