<template>
  <main class="px-[1rem] pt-[51px]">
    <section class="main-header mb-3 flex">
      <div class="info">
        <h1 class="mb-3 text-left font-['Arial'] text-[39px] font-bold text-[#231815]">
          Hi,{{ userifo.displayLastName + userifo.displayFirstName }}
        </h1>
        <div class="flex">
          <C-Select
            :isFull="true"
            class="h-[30px] w-[160px] rounded-[10px] bg-white text-center font-[500] text-[#888]"
            :list="merchentList"
            v-model="selected"
            :placeholder="'選擇店家'"
            item-text="name"
            item-value="id"
            ><template>
              <img src="@/static/images/store.svg" alt="store" class="w-[20px] pl-1" /> </template
          ></C-Select>
          <a
            v-if="!isBindingLine"
            href="https://liff.line.me/1657658841-5ZXBn22E"
            class="ml-5 flex h-[25px] w-[25px] items-center justify-center"
          >
            <img src="@/static/images/line-nobind.svg" alt="linenobind" />
            <span class="hidden">.</span>
          </a>
          <p v-else class="ml-5 flex h-[25px] w-[25px] text-left">
            <img src="@/static/images/line.svg" alt="line" />
          </p>
          <div
            class="ml-3 flex h-[23px] w-[23px] items-center justify-center"
            @click="shareLink"
            @keypress="shareLink"
          >
            <img src="@/static/images/share.svg" alt="share" />
          </div>
        </div>
      </div>

      <div class="avatar" @click="isUserInfo = !isUserInfo" @keypress="isUserInfo = !isUserInfo">
        <font-awesome-icon
          v-if="!userAvatarImgUrl"
          icon="fa-regular fa-user"
          class="mt-[calc(50%-1.25rem)] text-4xl"
        />
        <img v-else :src="userAvatarImgUrl" :alt="userInfo ? userInfo.user.name : '大頭照'" />
      </div>
    </section>

    <div v-if="MerchantNewsTicker" class="newsTicker">
      <img src="@/static/images/volume.svg" alt="volume" class="mr-[0.5em]" />
      <div class="newsTickerText">
        <span>{{ MerchantNewsTicker }}</span>
      </div>
    </div>

    <section class="sect">
      <h2>功能選單</h2>
      <ul class="lists">
        <template v-for="(service, index) in servicesList">
          <li v-if="isAuthority(service.itemName)" :key="service.routeName + index">
            <div class="pic" @click="doRoute(service.routeName)" @keydown="doRoute(service.routeName)">
              <img :src="service.iconSrc" :alt="service.itemName" class="w-[40%]" />
            </div>
            <span>{{ service.itemName === "設計師日報表" ? "報表" : service.itemName }}</span>
          </li>
        </template>
      </ul>
    </section>

    <!-- <section class="sect">
      <h2 class="!pb-2">今日預約明細</h2>
      <h3>待審查({{ isReviewResult }})</h3>
      <p v-if="!isReviewResult" class="tracking-wider">目前沒有待審查的預約</p>
      <div
        v-else
        class="content"
        v-for="(reviewItem, index) in reviewResult"
        :key="`reviewItem${index}`"
        @click="doRouteOrder(reviewItem, true)"
        @keypress="doRouteOrder(reviewItem, true)"
      >
        <div class="number item">
          <img src="@/static/images/calendar-days-regular.svg" alt="calander" />
          <span>{{ reviewItem.orderDate | dateFmtROCMMDD }}</span>
        </div>
        <div class="number item !w-1/5">
          <img src="@/static/images/clock-regular.svg" alt="calander" />
          <span>{{ reviewItem.orderDate | dateFmtHm }}</span>
        </div>
        <div class="text item !w-1/5">
          <img src="@/static/images/users-light.svg" alt="calander" />
          <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{
            reviewItem.customerName || "--"
          }}</span>
        </div>
        <div class="status">
          <span>{{ reviewItem.status }}</span>
        </div>
        <div>
          <img src="@/static/images/arrow.svg" alt="arrow" class="arrow" />
        </div>
      </div>

      <h3>預約明細({{ isOrderResult }})</h3>
      <p v-if="!isOrderResult" class="tracking-wider">目前沒有待審查的預約</p>
      <div
        v-else
        class="content"
        v-for="(reviewItem, index) in orderResult"
        :key="`reviewItem${index}`"
        @click="doRouteOrder(reviewItem, false)"
        @keypress="doRouteOrder(reviewItem, false)"
      >
        <div class="number item">
          <img src="@/static/images/calendar-days-regular.svg" alt="calander" />
          <span>{{ reviewItem.orderDate | dateFmtROCMMDD }}</span>
        </div>
        <div class="number item !w-1/5">
          <img src="@/static/images/clock-regular.svg" alt="calander" />
          <span>{{ reviewItem.orderDate | dateFmtHm }}</span>
        </div>
        <div class="text item !w-1/5">
          <img src="@/static/images/users-light.svg" alt="calander" />
          <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{
            reviewItem.customerName || "--"
          }}</span>
        </div>
        <div class="status">
          <span>{{ reviewItem.status }}</span>
        </div>
        <div>
          <img src="@/static/images/arrow.svg" alt="arrow" class="arrow" />
        </div>
      </div>

      <span
        @click="doRoute('Order')"
        @keypress="doRoute('Order')"
        class="absolute top-4 right-4 select-none text-sm font-[500] text-[#888]"
        >查看全部<font-awesome-icon icon="fa-solid fa-angle-right" class="ml-1"
      /></span>
    </section> -->

    <C-Modal-Dialog v-model="isUserInfo" width="w-[80%]" class="user-info-list">
      <h2 class="text-center">個人資料</h2>
      <div class="avatar" @click="toggleAvatar()" @keypress="toggleAvatar">
        <font-awesome-icon v-if="!userAvatarImgUrl" icon="fa-regular fa-user" class="icon" />
        <img v-else :src="userAvatarImgUrl" :alt="userInfo ? userInfo.user.name : '大頭照'" />
      </div>
      <ul>
        <li>
          <label for="lastName">姓名 /</label>
          <div class="flex w-1/2" v-if="isNameEdit">
            <ValidationProvider
              ref="lastName"
              name="姓氏"
              rules="required"
              v-slot="{ errors }"
              class="mr-1"
            >
              <input
                id="lastName"
                type="text"
                v-model="userifo.lastName"
                :errors="errors"
                :class="{ '!border-[#f00]': errors[0] }"
              />
            </ValidationProvider>
            <ValidationProvider ref="firstName" name="姓名" rules="required" v-slot="{ errors }">
              <label for="firstName" class="hidden">名</label>
              <input
                id="firstName"
                type="text"
                v-model="userifo.firstName"
                :errors="errors"
                :class="{ '!border-[#f00]': errors[0] }"
              />
            </ValidationProvider>
          </div>
          <span v-else class="fix">{{ userifo.lastName + userifo.firstName }}</span>
          <!-- <font-awesome-icon class="icon" icon="fa-thin fa-pen"  v-if="!isNameEdit" @click="isNameEdit=!isNameEdit"/>
          <font-awesome-icon class="icon" icon="fa-thin fa-floppy-disk" v-else @click="userUpdateName()"/> -->

          <img
            v-if="!isNameEdit"
            src="@/static/images/pencel.svg"
            alt="pencel"
            class="icon w-[12px]"
            @click="isNameEdit = !isNameEdit"
            @keypress="isNameEdit = !isNameEdit"
          />
          <img
            v-else
            src="@/static/images/check-C8C9CA.svg"
            alt="check"
            class="icon w-[18px]"
            @click="userUpdateName()"
            @keypress="userUpdateName()"
          />
        </li>
        <li>
          <label for="nickName">暱稱 /</label>
          <ValidationProvider
            ref="nickName"
            v-if="isNickNameEdit"
            name="暱稱"
            rules="required"
            v-slot="{ errors }"
            class="w-1/2"
          >
            <input
              id="nickName"
              type="text"
              v-model="userifo.nickName"
              :errors="errors"
              :class="{ '!border-[#f00]': errors[0] }"
            />
          </ValidationProvider>
          <span v-else class="fix">{{ userifo.nickName }}</span>
          <img
            v-if="!isNickNameEdit"
            src="@/static/images/pencel.svg"
            alt="pencel"
            class="icon w-[12px]"
            @click="isNickNameEdit = !isNickNameEdit"
            @keypress="isNickNameEdit = !isNickNameEdit"
          />
          <img
            v-else
            src="@/static/images/check-C8C9CA.svg"
            alt="check"
            class="icon w-[18px]"
            @click="userUpdateNickName()"
            @keypress="userUpdateNickName()"
          />
        </li>
        <li>
          <label>性別 /</label>
          <ValidationProvider
            v-if="isGenderEdit"
            ref="gender"
            name="性別"
            rules="required"
            v-slot="{ errors }"
            class="w-1/2 border-b border-transparent text-left"
          >
            <input type="radio" id="MALE" value="MALE" v-model="userifo.gender" />
            <label for="MALE">男</label>
            <input type="radio" id="FEMALE" value="FEMALE" v-model="userifo.gender" />
            <label for="FEMALE">女</label>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
          <span v-else class="fix">{{ userifo.gender === "FEMALE" ? "女" : "男" }}</span>

          <img
            v-if="!isGenderEdit"
            src="@/static/images/pencel.svg"
            alt="pencel"
            class="icon w-[12px]"
            @click="isGenderEdit = !isGenderEdit"
            @keypress="isGenderEdit = !isGenderEdit"
          />
          <img
            v-else
            src="@/static/images/check-C8C9CA.svg"
            alt="check"
            class="icon w-[18px]"
            @click="userUpdateGender()"
            @keypress="userUpdateGender()"
          />
        </li>
        <li>
          <label for="birth">生日 /</label>

          <ValidationProvider
            v-if="isBirthEdit"
            ref="birthday"
            name="生日"
            rules="required"
            v-slot="{ errors }"
            class="w-1/2"
          >
            <VCCalendarSelect
              v-if="isBirthEdit"
              v-model="userifo.birthday"
              :placeholder="'選擇生日'"
              :errors="errors"
            ></VCCalendarSelect>
          </ValidationProvider>
          <span v-else class="fix">{{ userifo.birthday | dateFmtYYYYMMDD }}</span>
          <img
            v-if="!isBirthEdit"
            src="@/static/images/calendar.svg"
            alt="calendar"
            class="icon w-[12px]"
            @click="isBirthEdit = !isBirthEdit"
            @keypress="isBirthEdit = !isBirthEdit"
          />
          <img
            v-else
            src="@/static/images/check-C8C9CA.svg"
            alt="check"
            class="icon w-[18px]"
            @click="userUpdateBirthday()"
            @keypress="userUpdateBirthday()"
          />
        </li>
      </ul>

      <button @click="isPasswordEdit = !isPasswordEdit">
        修改密碼<img src="@/static/images/pencel.svg" alt="pencel" class="ml-4 w-[10px]" />
      </button>

      <font-awesome-icon
        icon="fa-regular fa-right-from-bracket"
        class="absolute left-[16px] top-[18px] text-[#888] opacity-50"
        @click="doLogout"
      />
    </C-Modal-Dialog>
    <C-Modal-Dialog v-model="isPasswordEdit" width="w-[75%]" class="psword">
      <h2>修改密碼</h2>
      <ul>
        <li>
          <ValidationProvider ref="newPassword" rules="required" v-slot="{ errors }">
            <label for="newPassword">新密碼 /</label>
            <input
              id="newPassword"
              type="password"
              v-model="userifo.newPassword"
              :errors="errors"
              :class="{ '!border-[#f00]': errors[0] }"
            />
          </ValidationProvider>
        </li>
        <li>
          <ValidationProvider ref="newPasswordCheck" rules="required" v-slot="{ errors }">
            <label for="newPasswordCheck">確認密碼 /</label>
            <input
              id="newPasswordCheck"
              type="password"
              v-model="userifo.newPasswordCheck"
              :errors="errors"
              :class="{ '!border-[#f00]': errors[0] }"
            />
          </ValidationProvider>
        </li>
      </ul>

      <button @click="changePasswordForCellphone()">
        確認 <img src="@/static/images/check.svg" alt="check" class="ml-1" />
      </button>
    </C-Modal-Dialog>

    <!--更換大頭貼 -->
    <C-Modal-Dialog
      width="w-[60%]"
      v-model="isAvatar"
      :animationCss="'animate__animated animate__fade animate__fast'"
    >
      <h2 class="pb-4 text-center text-[19px] font-[700] text-[#231815]">修改大頭照</h2>
      <form @submit.prevent="handleSubmitAvatar">
        <div>
          <div v-if="filechange" class="max-h-[50vh]">
            <img :src="imageBlob" ref="image" alt="" />
          </div>
        </div>
        <label for="uploadimg" class="mt-6 block">
          <div class="flex items-center justify-center rounded-md border border-dashed">
            <font-awesome-icon
              icon="fa-regular fa-upload"
              class="mr-2 text-[#B2B2B2]"
              @click="doRoute"
            />
            <span class="text-[#B2B2B2]">上傳大頭照</span>
          </div>
          <input type="file" id="uploadimg" @change="uploadFile" class="hidden" />
        </label>
        <C-Checkbox-Full
          label="上傳至所有店家"
          v-model="isGlobal"
          class="!justify-start pb-2 pt-4"
        ></C-Checkbox-Full>
        <C-Button-Wrap class="upload-avatar">
          <button @click="toggleAvatar">關閉</button>
          <button
            type="submit"
            class="!text-white"
            :class="[{ '!bg-[#ccc]': !imageBlob, '!bg-[#222C4C] ': imageBlob }]"
            :disabled="!imageBlob"
          >
            確認上傳
          </button>
        </C-Button-Wrap>
      </form>
    </C-Modal-Dialog>
  </main>
</template>

<script>
import {
  mapActions, mapState, mapGetters, mapMutations,
} from 'vuex';
import store from '@/store/index';
import { isJSON } from '@/utils/index';
import Cropper from 'cropperjs';
import VCCalendarSelect from '@/components/general/VC-CalendarSelect.vue';
import 'cropperjs/dist/cropper.css';

export default {
  components: { VCCalendarSelect },
  name: 'home-index',
  metaInfo: {
    title: 'BeautyOS 設計師',
  },
  data() {
    return {
      isAvatar: false,
      isUserInfo: false,
      isNameEdit: false,
      isNickNameEdit: false,
      isGenderEdit: false,
      isBirthEdit: false,
      isPasswordEdit: false,
      userifo: {
        displayLastName: '',
        displayFirstName: '',
        lastName: '',
        firstName: '',
        nickName: '',
        gender: '',
        birthday: new Date(0),
        newPassword: '',
        newPasswordCheck: '',
      },
      myCropper: null,
      afterImg: '',
      afterImgFile: null,
      selected: '',
      imageBlob: '',
      filechange: false,
      userAvatarImgUrl: '',
      isGlobal: false,
      merchentList: [],
      MerchantNewsTicker: '',
      isBindingLine: false,
      reviewResult: [],
      orderResult: [],
      servicesList: [
        {
          itemName: '預約總覽',
          routeName: 'Order-list',
          iconSrc: require('../../static/images/calendar-check-regular.svg'),
        },
        {
          itemName: '打卡',
          routeName: 'Punch',
          iconSrc: require('../../static/images/clock-regular.svg'),
        },
        {
          itemName: '行事曆',
          routeName: 'ScheduleBreak',
          iconSrc: require('../../static/images/calendar-days-regular.svg'),
        },
        {
          itemName: '價目表設定',
          routeName: 'PriceList',
          iconSrc: require('../../static/images/file-invoice-dollar-regular.svg'),
        },
        // { itemName: '發優惠券', routeName: 'Coupon', iconSrc: require('../../static/images/ticket-regular.svg') },
        // { itemName: '發紅利點數', routeName: 'Bonus', iconSrc: require('../../static/images/point.svg') },
        {
          itemName: '設計師日報表',
          routeName: 'Report',
          iconSrc: require('../../static/images/chart-mixed-solid.svg'),
        },
        {
          itemName: '客戶資料查詢',
          routeName: 'Customer',
          iconSrc: require('../../static/images/users-light.svg'),
        },
      ],
    };
  },
  computed: {
    ...mapState('userInfo', ['userInfo', 'currentMechantId', 'userAuthorizeList']),
    ...mapGetters('userInfo', ['GETTER_MECHANTNAME']),
    isAuthority() {
      return (name) => this.userAuthorizeList.find((item) => item.pageName === name && item.authority);
    },
    isReviewResult() {
      return this.reviewResult.length;
    },
    isOrderResult() {
      return this.orderResult.length;
    },
    merchantOpen() {
      return this.merchentList.filter((merchent) => merchent.id === this.selected)[0]?.openingHours;
    },
    merchantClose() {
      return this.merchentList.filter((merchent) => merchent.id === this.selected)[0]?.closingHours;
    },
    merchantPayload() {
      return {
        open: this.merchantOpen,
        close: this.merchantClose,
      };
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations(['setOPandED']),
    ...mapActions('userInfo', [
      'SET_USER_PROFILE',
      'SET_USER_CURRENT_MERCHANTID',
      'SET_USER_AUTHORIZELIST',
    ]),
    async init() {
      const [firstUserMerchant] = this.userInfo.user.merchants;
      this.selected = this.currentMechantId || firstUserMerchant.id || '';
    },
    async bindingLine() {
      let data = '';
      let errors = '';
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.has('code') ? urlParams.get('code') : null;
      if (code !== null && !this.isBindingLine) {
        const resp = await this.$api.userBindWithLine({ code });
        data = resp.data;
        errors = resp.errors;
        if (errors) return;
        if (data.data.userBindWithLine) {
          await this.getMe();
          this.$swal
            .fire({
              icon: 'success',
              html: '<p>Line 帳號綁定成功<br>畫面將重新載入</p>',
              showConfirmButton: false,
              showCancelButton: false,
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp animate__faster',
              },
              customClass: {
                container: '!z-[99999]',
              },
              timer: 3000,
              timerProgressBar: true,
            })
            .then(() => {
              window.location.href = new URL('/designer', window.location.href);
            });
        }
      }
    },
    async userUpdateName() {
      const isNameValid = await this.$refs.lastName.validate();
      const isfirstNameValid = await this.$refs.firstName.validate();
      if (!isNameValid.valid || !isfirstNameValid.valid) return;
      this.isNameEdit = !this.isNameEdit;
      const submitLastName = { lastName: this.userifo.lastName };
      const submitFirstName = { firstName: this.userifo.firstName };
      await Promise.all([
        this.$api.userUpdateLastName(submitLastName),
        this.$api.userUpdateFirstName(submitFirstName),
      ]);
      this.userifo.displayLastName = this.userifo.lastName;
      this.userifo.displayFirstName = this.userifo.firstName;

      const dt = JSON.parse(localStorage.getItem('ML_DESIGN'));
      dt.user.name = this.userifo.lastName + this.userifo.firstName;
      localStorage.setItem('ML_DESIGN', JSON.stringify(dt));
      const userInfo = localStorage.getItem('ML_DESIGN');
      store.dispatch('userInfo/SET_USER_PROFILE', JSON.parse(userInfo));
    },
    async userUpdateNickName() {
      const isValidForm = await this.$refs.nickName.validate();
      if (!isValidForm.valid) return;
      this.isNickNameEdit = !this.isNickNameEdit;
      const submit = { nickName: this.userifo.nickName };
      await this.$api.userUpdateNickName(submit);
    },

    async userUpdateGender() {
      const isValidForm = await this.$refs.gender.validate();
      if (!isValidForm.valid) return;
      this.isGenderEdit = !this.isGenderEdit;
      const submit = { gender: this.userifo.gender };
      await this.$api.userUpdateGender(submit);
    },
    async userUpdateBirthday() {
      const isValidForm = await this.$refs.birthday.validate();
      if (!isValidForm.valid) return;
      this.isBirthEdit = !this.isBirthEdit;
      const submit = { birthday: this.$dayjs(this.userifo.birthday).valueOf() };
      await this.$api.userUpdateBirthday(submit);
    },
    async changePasswordForCellphone() {
      const newPassword = await this.$refs.newPassword.validate();
      const newPasswordCheck = await this.$refs.newPasswordCheck.validate();
      if (!newPassword.valid || !newPasswordCheck.valid) return;

      this.isPasswordEdit = !this.isPasswordEdit;
      const submit = {
        input: {
          newPassword: this.userifo.newPassword,
          newPasswordCheck: this.userifo.newPasswordCheck,
        },
      };
      const resp = await this.$api.changePasswordForCellphone(submit);
      const { data } = resp.data;
      this.userifo.newPassword = '';
      this.userifo.newPasswordCheck = '';
      if (data.changePasswordForCellphone) {
        this.$swal.fire({
          icon: 'success',
          html: '<p>密碼更新成功<br></p>',
          showConfirmButton: false,
          showCancelButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster',
          },
          customClass: {
            container: '!z-[99999]',
          },
          timer: 3000,
          timerProgressBar: true,
        });
      }
    },

    async uploadFile(e) {
      this.filechange = false;
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          // convert image file to base64 string
          this.imageBlob = reader.result;
          this.filechange = true;
          this.$nextTick().then(() => {
            this.initCropper();
          });
        },
        false,
      );

      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    toggleAvatar() {
      this.isAvatar = !this.isAvatar;
      if (this.imageBlob !== '' && this.imageBlob !== null && this.isAvatar) {
        this.$nextTick().then(() => {
          this.initCropper();
        });
      } else {
        this.imageBlob = '';
      }
    },
    initCropper() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false,
        toggleDragModeOnDblclick: true,
      });
    },
    async handleSubmitAvatar() {
      this.afterImg = await this.myCropper
        .getCroppedCanvas({
          maxWidth: 300,
          maxHeight: 300,
          fillColor: '#fff',
          imageSmoothingQuality: 'high',
        })
        .toDataURL('image/jpeg');
      const res = await fetch(this.afterImg);
      const blob = await res.blob();
      this.afterImgFile = new File([blob], 'avatar.jpeg', { type: 'image/jpeg' });
      const resp = await this.$api.setUserAvatar(this.afterImgFile, this.isGlobal);

      const { errors } = resp.data;
      if (errors) return;

      this.afterImg = '';
      this.afterImgFile = null;
      await this.getMechants();
      this.toggleAvatar();
    },

    async shareLink() {
      const url = `${window.location.protocol}//${window.location.hostname}/login/?merchantId=${this.currentMechantId}&designerId=${this.userInfo.user.id}&openExternalBrowser=1`;

      if (navigator.share) {
        await navigator
          .share({
            title: '點選下方連結 預約我唷',
            url,
          })
          .then(() => console.log('success'))
          .catch((err) => {
            window.open(url);
            console.error(err);
          });
      } else {
        window.open(url);
      }
    },
    async getMonthlyOrders() {
      const submit = {
        dateRange: {
          startDate: this.$dayjs().startOf('day').valueOf(),
          endDate: this.$dayjs().endOf('day').valueOf(),
        },
        customerKeyword: '',
        isEarlierRecordDisplay: false,
      };
      const resp = await this.$api.getDesignerReservation(submit);
      const { data } = resp.data;
      this.reviewResult = data.getDesignerReservation.filter((order) => order.status === '待審核');
      this.orderResult = data.getDesignerReservation.filter((order) => order.status !== '待審核');
    },
    doRoute(routName) {
      this.$router.push({ name: routName });
    },
    doRouteOrder(item, isReview) {
      this.$router.push({ name: 'ScheduleBreak-Detail', query: { id: item.orderId, isReview } });
    },

    async getMechants() {
      const res = await this.$api.user({ id: this.userInfo.user.id });
      const { data, errors } = res.data;
      if (errors) return;
      this.merchentList = data.user.merchants;
      this.userAvatarImgUrl = data.user.avatar;
      this.isBindingLine = !!data.user.lineAccountId;
    },
    doLogout() {
      this.$swal
        .fire({
          icon: 'question',
          title: '您確定要登出嗎?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          customClass: {
            confirmButton: '!bg-second',
          },
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster',
          },
        })
        .then(async (res) => {
          if (res.isConfirmed) {
            const resp = await this.$api.userLogout();
            const { data, errors } = resp.data;
            if (errors) return;
            if (!data.userLogout) return;
            await this.SET_USER_PROFILE(null);
            this.$swal
              .fire({
                icon: 'success',
                title: '登出成功',
                showConfirmButton: false,
                showCancelButton: false,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown',
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp animate__faster',
                },
                timer: 3000,
                timerProgressBar: true,
              })
              .then(() => {
                this.$router.replace({ name: 'Login' });
              });
          }
        });
    },
    async getMe() {
      const resp = await this.$api.me();
      const { data, errors } = resp.data;
      if (errors) return;
      try {
        this.merchantIdentity = data.me.merchantIdentity;
        this.isBindingLine = !!data.me.lineAccountId;
        this.userifo.displayLastName = data.me.lastName;
        this.userifo.lastName = data.me.lastName;
        this.userifo.displayFirstName = data.me.firstName;
        this.userifo.firstName = data.me.firstName;
        this.userifo.nickName = data.me.nickName;
        this.userifo.gender = data.me.gender;
        this.userifo.birthday = data.me.birthday ? new Date(data.me.birthday) : new Date(0);
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
    async getMerchantNewsTicker() {
      const resp = await this.$api.getMerchantNewsTicker();
      const { data, errors } = resp.data;
      if (errors) return;
      try {
        this.MerchantNewsTicker = data.getMerchantNewsTicker;
      } catch {
        this.MerchantNewsTicker = '';
      }
    },

    permissionReportList() {
      return new Promise((resolve) => {
        const identityAuthorities = this.merchantAuthorities.find(
          (item) => item.id === this.merchantIdentity.authorityId,
        );
        const authorityList = identityAuthorities && isJSON(identityAuthorities.authoritySettings)
          ? JSON.parse(identityAuthorities.authoritySettings)
          : [];
        const reportList = authorityList.flatMap((authority) => (authority.pageTitle !== '設計師手機版 權限設定' ? [] : authority.pageAuthority));
        const permissionReportList = reportList.filter((item) => item.authority);
        resolve(permissionReportList);
      });
    },
    async swtichAuthority(value) {
      await Promise.all([
        this.bindingLine(),
        this.SET_USER_CURRENT_MERCHANTID(value),
        this.getMe(),
        this.getMerchantAuthorities(),
        this.getMerchantNewsTicker(),
        this.getMechants(),
      ]).then(async () => {
        // 設定店家開始與結束時間 (時間從computed篩出來)
        this.setOPandED(this.merchantPayload);
        const permissionReportList = await this.permissionReportList();
        this.SET_USER_AUTHORIZELIST(permissionReportList);
      });
    },
  },
  watch: {
    selected(value) {
      this.swtichAuthority(value);
    },
  },
};
</script>

<style scoped>
.main-header .info {
  @apply w-[70.796460%];
}
.main-header .avatar {
  @apply ml-auto w-[22.12389%] max-w-[90px] md:w-[15%] aspect-square self-center overflow-hidden rounded-full bg-slate-300 object-cover shadow-[3px_3px_3px_0_#ccc];
}
/* 區塊共用 */
.sect {
  @apply flex flex-col rounded-[20px] bg-white mb-3 pb-[10px] relative;
}
.sect h2 {
  @apply p-4 text-left  text-[#231815] font-[700] text-[19px];
}
/* 功能選單 */
.sect .lists {
  @apply flex w-full flex-wrap;
}
.sect .lists li {
  @apply flex flex-col items-center w-[22.7138643068%] mb-[6%] mx-[5.3097345133%];
}
.sect .lists span {
  @apply select-none whitespace-nowrap text-sm font-[500] text-[#231815] tracking-wider;
}
@media screen and (min-width: 768px) {
  .sect .lists li {
    @apply w-[19.5355191%] mx-[2.7322404%];
  }
}
.sect .lists li .pic {
  @apply flex aspect-square w-full  items-center !justify-center rounded-full bg-[#F7F7F7] mb-2;
}

/* 預約明細類 */
.sect h3 {
  @apply text-left ml-8  relative text-[#231815] font-[500]
  before:content-[''] before:absolute before:top-[5px] before:left-[-8px]
  before:w-[3px] before:h-[70%] before:bg-[#231815] before:rounded-[5px];
}

.sect p {
  @apply mb-3 ml-[2em] pl-2 text-left text-[13px] font-[500] text-[#888];
}
.sect .content {
  @apply mb-2 select-none text-[13px] font-[500] text-[#231815]
  mx-4 my-2 flex items-center justify-between rounded-lg bg-[#F7F7F7] p-2;
}
.sect .content .item {
  @apply flex w-3/12 items-center justify-center;
}

.sect .content .number {
  @apply font-[700] font-['Arial'];
}

.sect .content .text {
  @apply font-[500] overflow-hidden text-ellipsis whitespace-nowrap justify-start;
}
.sect .content .status {
  @apply w-3/12 font-[500] overflow-hidden text-ellipsis whitespace-nowrap;
}
.sect .content img {
  @apply mr-1 w-[15px];
}
.sect .content .arrow {
  @apply w-[7px];
}
.user-info-list .avatar {
  @apply absolute inset-x-0 top-[-50px] m-auto h-[120px] w-[120px] overflow-hidden rounded-full bg-slate-300 object-cover shadow-[3px_3px_3px_0_#ccc];
}
.user-info-list h2 {
  @apply pt-16 pb-4 text-[1.75rem] font-[700] text-[#231815];
}

.user-info-list .avatar .icon {
  @apply mt-[calc(50%-1.25rem)] text-4xl;
}
.user-info-list li,
.psword li span {
  @apply mb-4 px-3 py-2 flex bg-[#F7F7F7] rounded-[0.75rem] justify-start items-center;
}

.user-info-list li > label {
  @apply mr-3 w-1/4 text-left;
}
.user-info-list li .icon {
  @apply ml-auto;
}

.user-info-list li .fix {
  @apply text-[#231815] font-[700] py-0 px-[2px] border-b-[2px] border-transparent;
}

.user-info-list li input,
.psword li input {
  @apply bg-inherit border-b-[2px] border-[#ccc] px-0  w-full;
}
.user-info-list li input[type="radio"],
.user-info-list li input[type="radio"] + label {
  @apply mr-[10px] w-auto;
}
.user-info-list li input,
.psword li input {
  @apply focus:outline-none;
}

.user-info-list button {
  @apply my-4 ml-auto  rounded-full border border-[#eee]  py-[9px] px-[26px] text-sm  flex items-center justify-center text-[#888888];
}

.psword {
  @apply mb-[30px];
}
.psword h2 {
  @apply pb-4 text-[19px] font-[700] text-[#231815];
}
.psword li label {
  @apply w-3/5 text-left text-[#888] font-[500];
}

.psword button {
  @apply m-auto flex items-center justify-center rounded-full bg-[#222D4D] px-[23px] py-[6px] text-[12px] text-white;
}

.newsTicker {
  @apply mb-8 flex w-full items-center rounded-[10px] bg-white py-1 px-4 text-left;
}
.newsTickerText {
  @apply w-full relative self-start h-[28px] overflow-hidden whitespace-nowrap
  text-left;
}

.newsTickerText span {
  @apply absolute pl-[100%] text-[13px] text-[#888] font-[700] leading-[28px] animate-[marquee_15s_linear_infinite];
}

.upload-avatar button {
  @apply rounded-full border border-solid border-[#EEEEEF] bg-white  py-2 px-6 text-sm  leading-tight text-primary shadow-md;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
