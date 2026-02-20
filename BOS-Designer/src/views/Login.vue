<template>
  <main class="relative box-border h-[calc(var(--vh,1vh)*100)] w-full overflow-auto">
    <section class="bg-corporate absolute inset-0 m-auto h-full w-full max-w-[475px] overflow-auto bg-cover bg-center bg-no-repeat md:rounded-2xl">
      <nav class="relative mt-[41px] w-full p-[21px]">
        <img src="@/static/images/Group.svg" alt="">
        <div class="animate__animated animate__fadeInUp animate__slow mb-[85px] mt-[41px] text-lg font-bold animation-delay-300">設計師登入</div>
      </nav>
      <div class="animate__animated animate__fadeInUp animate__slow m-auto box-border h-fit w-full max-w-[475px] px-[21px]">
        <ValidationObserver ref="loginForm">
          <form>
            <ValidationProvider ref="form.userAccount" name="帳號" rules="required" v-slot="{ errors }">
              <C-Input @doFunction="$refs.code.$el.focus()" type="tel" v-bind="{label: '帳號'}" v-model="form.userAccount" :errors="errors"></C-Input>
            </ValidationProvider>
            <ValidationProvider ref="form.userpwd" name="密碼" rules="required" v-slot="{ errors }">
              <C-Input @doFunction="doLogin" v-bind="{label:'密碼' ,type:inputType}" ref="code" v-model="form.userpwd" :errors="errors">
                <template v-slot:endIcon>
                  <font-awesome-icon :icon="inputType === 'text'? 'eye-slash': 'eye'" @click="togglePwd" ></font-awesome-icon>
                </template>
              </C-Input>
            </ValidationProvider >

            <div class=" flex items-center justify-end gap-2">
              <p class="">保持登入</p>
              <div class="flex  flex-nowrap gap-1 text-left">
                <C-Checkbox v-model="form.isKeepLogin" class="!ml-0 !w-fit"></C-Checkbox>
              </div>
            </div>

            <C-Button-Wrap>
              <button @click.prevent="doLogin" v-ripple="100" type="button" class="w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">登入</button>
            </C-Button-Wrap>
          </form>
        </ValidationObserver>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import { isJSON } from '@/utils/index';

export default {
  name: 'login-page',
  metaInfo: {
    title: 'BeautyOS 設計師',
  },
  mounted() {
  },
  data() {
    return {
      form: {
        userAccount: '',
        userpwd: '',
        isKeepLogin: true,
      },
      inputType: 'password',
      merchantIdentity: {},
      merchantAuthorities: [],
    };
  },

  methods: {
    ...mapActions('userInfo', ['SET_USER_PROFILE', 'SET_USER_CURRENT_MERCHANTID', 'SET_USER_AUTHORIZELIST']),
    async doLogin() {
      const isValidForm = await this.$refs.loginForm.validate();
      if (!isValidForm) return;
      this.$api.userLoginV2({
        cellphone: this.form.userAccount, password: this.form.userpwd, isKeepLogin: this.form.isKeepLogin, isCellphoneLogin: true,
      }).then(async (res) => {
        const { data, errors } = res.data;
        if (errors) return;
        const isSetUserProfile = await this.SET_USER_PROFILE(data.userLoginV2);
        console.log(data.userLoginV2);
        await this.SET_USER_CURRENT_MERCHANTID(data.userLoginV2.user.merchants[0].id);
        await this.getMe();
        await this.getMerchantAuthorities();
        const permissionReportList = await this.permissionReportList();
        await this.SET_USER_AUTHORIZELIST(permissionReportList);
        if (isSetUserProfile) {
          this.$router.replace('/');
        }
      });
    },
    async getMe() {
      const resp = await this.$api.me();
      const { data, errors } = resp.data;
      if (errors) return;
      try {
        this.merchantIdentity = data.me.merchantIdentity;
      } catch {
        this.merchantIdentity = {};
      }
    },
    async getMerchantAuthorities() {
      const resp = await this.$api.getMerchantAuthorities();
      const { data, errors } = resp.data;
      if (errors) return;
      try {
        this.merchantAuthorities = data.getMerchantAuthorities;
      } catch {
        this.merchantAuthorities = [];
      }
    },
    permissionReportList() {
      return new Promise((resolve) => {
        const identityAuthorities = this.merchantAuthorities.find((item) => item.id === this.merchantIdentity.authorityId);
        const authorityList = identityAuthorities && isJSON(identityAuthorities.authoritySettings) ? JSON.parse(identityAuthorities.authoritySettings) : [];
        const reportList = authorityList.flatMap((authority) => (authority.pageTitle !== '設計師手機版 權限設定'
          ? []
          : authority.pageAuthority));
        const permissionReportList = reportList.filter((item) => item.authority);
        resolve(permissionReportList);
      });
    },
    togglePwd() {
      if (this.inputType === 'text') {
        this.inputType = 'password';
      } else {
        this.inputType = 'text';
      }
    },
  },
};
</script>

<style lang="scss">
</style>
