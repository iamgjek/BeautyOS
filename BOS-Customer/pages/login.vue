<template>
<!-- 這頁是在處理，如果消費者直接帶入帶有店家ID、消費者ID參數網址登入時的動作 -->
  <section>
    <client-only v-if="!isLoading">
      <header v-pre class="w-full pb-4 fixed top-5 left-0 z-10">
        <div class="w-[90%] mx-auto">
          <h1>
            <img src="~/static/images/insideLogo.svg" alt="bos客戶預約系統" />
          </h1>
        </div>
      </header>
      <div
        class="flex flex-col w-full px-[10%] h-[100vh] overflow-x-hidden overflow-y-hidden gap-10 justify-center items-center bg-[#f1f1f1]"
      >
        <h2
          v-pre
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="100"
          data-aos-duration="700"
          class="text-black text-lg"
        >
          會員登入
        </h2>
        <div
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="250"
          data-aos-duration="700"
          class="flex flex-col w-full max-w-[450px] justify-start"
        >
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(login)">
              <label v-pre for="phoneInput" class="text-black text-sm"
                >手機：</label
              >
              <div class="form-group relative mb-10 mt-2">
                <ValidationProvider
                  name="手機"
                  rules="required|onlyNumber"
                  v-slot="{ errors }"
                  class="w-full"
                >
                  <input
                    ref="phoneRef"
                    v-model="member.phone"
                    onpaste="return false"
                    maxlength="10"
                    id="phoneInput"
                    type="tel"
                    class="w-full p-2.5 rounded-xl focus:outline-none border border-[#aeaeae]"
                    :class="{ 'ring-2 ring-[#ff4444]': errors.length > 0 }"
                  />
                  <span
                    v-if="errors.length > 0"
                    class="absolute left-3 md:left-10 -bottom-5 text-red-500 text-xs font-bold"
                    >{{ errors[0] }}</span
                  >
                </ValidationProvider>
              </div>

              <label
                v-pre
                for="verifyInput"
                class="text-black text-sm sm:text-black"
                >驗證碼：</label
              >
              <div class="form-group relative mt-2">
                <ValidationProvider
                  name="驗證碼"
                  rules="required|onlyNumber"
                  v-slot="{ errors }"
                  class="w-full"
                >
                  <input
                    v-model="member.verifyCode"
                    minlength="5"
                    maxlength="5"
                    id="verifyInput"
                    type="tel"
                    class="w-full p-2.5 rounded-xl focus:outline-none border border-[#aeaeae]"
                    :class="{ 'ring-2 ring-[#ff4444]': errors.length > 0 }"
                  />
                  <span
                    v-if="errors.length > 0"
                    class="absolute left-3 md:left-10 -bottom-5 text-red-500 text-xs font-bold"
                    >{{ errors[0] }}</span
                  >
                  <button
                    @click="getVerifyCode"
                    type="button"
                    :disabled="getCodeWaitingTimer || getingCode"
                    :class="{
                      'bg-[#FEB401]': !getCodeWaitingTimer,
                      'bg-[#bebebe]': getCodeWaitingTimer || getingCode,
                    }"
                    class="absolute right-0 bottom-0 h-full p-2.5 text-white text-sm rounded-[0_12px_12px_0] flex items-center gap-1"
                  >
                    <fa
                      v-if="getingCode"
                      icon="fa-solid fa-spinner"
                      class="animate-spin-slow"
                    />
                    取得驗證碼
                    <p v-if="getCodeWaitingTimer">
                      ({{ getCodeWaitingTimer }})
                    </p>
                  </button>
                </ValidationProvider>
              </div>
              <button
                :disabled="isLogin"
                type="submit"
                class="w-full py-3 text-white text-sm mt-10 bg-[#2f3549] rounded-xl shadow-md flex justify-center items-center gap-3 duration-300"
                :class="{ 'bg-[#555555]': isLogin }"
              >
                <fa
                  v-if="isLogin"
                  icon="fa-solid fa-spinner"
                  class="animate-spin-slow"
                />
                登入
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </client-only>
  </section>
</template>
<script>
import { getToken } from "@/plugins/cookies.js";
export default {
  name: "login",
  data() {
    return {
      member: {
        phone: "",
        verifyCode: "",
      },
      isLogin: false,
      getingCode: false,
      getCodeWaitingTimer: null,
      token: getToken() || "",
      merchantId: "",
      designerId: "",
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading;
    },
  },
  methods: {
    getVerifyCode() {
      if (!this.member.phone) {
        return this.$swal
          .fire({
            icon: "warning",
            title: `<h3 class="text-2xl">請輸入手機號碼</h3>`,
            background: "#fff",
            iconColor: "#FEB401",
            timer: 1500,
            showConfirmButton: false,
          })
          .then(() => {
            setTimeout(() => {
              const phoneRef = this.$refs.phoneRef;
              phoneRef.focus();
            }, 300);
          });
      }

      this.getingCode = true;

      this.$api
        .customerLoginSMSWithTKN(this.member.phone)
        .then((res) => {
          this.getingCode = false;
          this.getCodeWaitingTimer = 60;

          const timer = setInterval(() => {
            if (this.getCodeWaitingTimer <= 1) {
              clearInterval(timer);
              this.getCodeWaitingTimer = null;
            } else {
              this.getCodeWaitingTimer--;
            }
          }, 1000);

          if (!res.hasError) {
            this.$swal.fire({
              icon: "success",
              title: `<h3 class="text-2xl">已傳送簡訊至<span class="text-[#FEB401]">${this.member.phone}</span></h3>`,
              background: "#fff",
              iconColor: "#FEB401",
              timer: 1500,
              showConfirmButton: false,
            });
          } else {
            clearInterval(timer);
            this.getCodeWaitingTimer = null;
          }
        })
        .catch((err) => {
          clearInterval(timer);
          this.getCodeWaitingTimer = null;
          this.getingCode = false;
          console.log(err);
          this.$swal.fire({
            icon: "error",
            title: `<h3 class="text-2xl">發生錯誤，請稍後再試</h3>`,
            background: "#fff",
            iconColor: "#FEB401",
            timer: 1500,
            showConfirmButton: false,
          });
        });
    },


    //帶入網址時，尚未東入時執行
    login() {
      if (this.isLogin) return;
      this.isLogin = true;
      const input = {
        cellphone: this.member.phone,
        code: this.member.verifyCode,
      };
      const needKey = `
        token,
        name,
        cellphone,
        isNewCustomer
        merchants{
          id,
          name,
          address,
          availableBookingTime{
            time
          }
        },
        currentMerchant{
          id,
          name,
          address,
          shopURL,
          rankingURL,
          availableBookingTime{
            time
          }
        }
      `;

      this.$api
        .customerVerifySMSWithTKN(input, needKey)
        .then((res) => {
          if (!res.hasError) {
            this.$cookieMethods.setToken(res.data.customerVerifySMSWithTKN.token);
            localStorage.setItem("allMerchants",JSON.stringify(res.data.customerVerifySMSWithTKN.merchants));
            localStorage.setItem("isNewCustomer",JSON.stringify(res.data.customerVerifySMSWithTKN.isNewCustomer));
            let isNewCustomerAndNomerchant =JSON.parse(localStorage.getItem("isNewCustomer"))?true:false
            localStorage.setItem("isNewCustomerAndNomerchant", isNewCustomerAndNomerchant);


            // 假如有 query string 的話更新使用者的喜好店家
            this.api.updateCustomerCuttentMerchant(this.merchantId)
              .then(async (res) => {
                if(res.hasError) throw res.errors
                //如果有連結有帶設計師ID
                if (this.designerId) {
                  await this.api
                    .updateCustomerPreferDesigner(
                      this.designerId,
                      this.merchantId
                    )
                    .then(async () => {
                      await this.api
                        .customerGetCurrentMerchantSetting()
                        .then(async(res) => {
                          if (!res.data.hasError) {
                            const dt =res.data.customerGetCurrentMerchantSetting;
                            this.setLocalStorage(dt)
                            this.isChanging = false;
                            await this.alertLoginSuccess();
                            this.saveDataAndDoRouter();
                          }
                        });
                    });
                } 
                //如果連結沒有設計師ID=>只處理店家
                else {
                  await this.api
                    .customerGetCurrentMerchantSetting()
                    .then(async(res) => {
                      if (!res.data.hasError) {
                        const dt = res.data.customerGetCurrentMerchantSetting;
                        this.setLocalStorage(dt);
                        this.isChanging = false;
                        await this.alertLoginSuccess();
                        this.saveDataAndDoRouter();
                      }
                    });
                }
              }).catch((err) => {
                this.isLogin = false;
                console.log(err);
              });


          } else {
            this.isLogin = false;
          }
        })
        .catch((err) => {
          this.isLogin = false;
          console.log(err);
        });
    },

    //帶入網址時，已經是登入狀態執行
    updateCurrentMerchantAndDesigner() {
      this.api.updateCustomerCuttentMerchant(this.merchantId)
        .then(async () => {
          if (!this.designerId) {
            await this.ifhasLoginGetCurrentMerchantSetting()
            return ;
          }
          await this.api.updateCustomerPreferDesigner(this.designerId, this.merchantId)
          .then(async() => {
            await this.ifhasLoginGetCurrentMerchantSetting()
          });
          
        })
        .catch((err) => {
          this.isLogin = false;
          console.log(err);
        });
    },
    //登入狀態時必須取得目前資料
   async ifhasLoginGetCurrentMerchantSetting(){
        await this.api.customerGetCurrentMerchantSetting()
            .then((res) => {
              if (!res.data.hasError) {
                const dt = res.data.customerGetCurrentMerchantSetting;
                this.setLocalStorage(dt)
                this.saveDataAndDoRouter();
              }
            });   
    },
    setLocalStorage(dt){
      localStorage.setItem("allMerchants",JSON.stringify(dt.consumedMerchants));
      localStorage.setItem("merchant",JSON.stringify(dt.currentMerchant));
      localStorage.setItem("preferDesigner",JSON.stringify(dt.preferDesigner));
    },
   async alertLoginSuccess(){
     await this.$swal
          .fire({
            icon: "success",
            title: '<h3 class="text-2xl">登入成功</h3>',
            background: "#fff",
            iconColor: "#FEB401",
            timer: 1500,
            showConfirmButton: false,
          })
    },
    saveDataAndDoRouter(){
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      const designer = JSON.parse(localStorage.getItem("preferDesigner"));
      const data = {
        merchantId: merchant.id,
        merchantName: merchant.name,
        designerId: designer ? designer.id : "",
        designerName: designer ? designer.name : "",
        designerNickName: designer? designer.nickName: "",
      };
      this.$store.dispatch("appointmentData/handleSetDesignerAndMerchant",data);
      this.isLogin = false;
      this.$router.push("/member/appointment");
    }
  },

  mounted() {
    this.$store.dispatch("loading/isLoading", true);

    this.merchantId = this.$route.query.merchantId || "";
    this.designerId = this.$route.query.designerId || "";

    if (!this.token) this.$store.dispatch("loading/isLoading", false);
    else this.updateCurrentMerchantAndDesigner();
  },
};
</script>
