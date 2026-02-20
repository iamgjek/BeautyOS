<template>
  <div>
    <section v-if="!isLoading" class="w-full max-w-[768px] mx-auto">
      <header class="w-full pb-4 fixed top-5 left-0 z-10">
        <div class="w-full mx-auto flex items-center gap-2 px-[5%]">
          <h1>
            <img src="~/static/images/insideLogo.svg" alt="bos客戶預約系統" />
          </h1>
          <!-- 跑馬燈 -->
          <!-- <div class="w-full border-[3px] border-[#232D4E] pl-7 rounded-lg overflow-hidden relative">
            <fa icon="fa-regular fa-volume" class="absolute top-1/2 -translate-y-1/2 left-1.5 text-lg text-[#232D4E]" />
            <div class="w-full py-3.5 px-5 rounded-lg overflow-hidden relative">
              <ul class="newsTicker absolute top-[2px]">
                <li class="whitespace-nowrap font-bold text-[#232D4E]">同去灣有動知代人智從了食速：風求是如使防對視。上血重水自他。者空年件畫是印鄉甚有，王利母！過油客更系房！同去灣有動知代人智從了食速：風求是如使防對視。</li>
              </ul>
            </div>
          </div> -->
        </div>
      </header>

      <!-- 大頭貼、姓名、電話 -->
      <div class="flex items-center gap-4 mb-4">
        <div
          @click="uploadImg()"
          class="w-[90px] h-[90px] relative rounded-full"
          :class="{
            'bg-[#AEAEAE] flex justify-center items-center': !member.imgUrl,
          }"
        >
          <fa
            v-if="!member.imgUrl"
            icon="fa-regular fa-user"
            class="text-white text-4xl"
          />
          <img
            v-else
            :src="member.imgUrl"
            :alt="member.name"
            class="w-full h-full object-cover rounded-full"
          />

          <div class="absolute right-0 bottom-0 w-5 h-5">
            <img src="/images/editPhoto.svg" alt="編輯大頭貼" />
          </div>
          <!-- TODO: pointer-events-none api補上時記得刪除 -->
          <label
            for="photoUploadInput"
            class="absolute left-0 top-0 w-full h-full pointer-events-none"
          ></label>
          <input
            type="file"
            id="photoUploadInput"
            accept="image/*"
            class="hidden"
          />
        </div>
        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-bold">{{ memberInfo.name }}</h3>
          <p class="text-sm">{{ memberInfo.cellphone }}</p>
        </div>
        <a
          v-if="!memberInfo.lineId"
          href="https://liff.line.me/1657658841-X5NOmAAW"
          class="text-slate-400 text-3xl text-center"
        >
          <fa icon="fa-brands fa-line" />
          <span class="text-sm block">綁定line帳號</span>
        </a>
        <div v-else class="text-green-600 text-3xl text-center">
          <fa icon="fa-brands fa-line" />
        </div>
      </div>
      <!-- <font-awesome-icon icon="fa-brands fa-line" /> -->
      <div id="firstPos">
        <!-- 近期預約 -->
        <MemberGlobalCard
          :height="'min-h-[157px]'"
          :px="'px-2.5'"
          :py="'py-4'"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-duration="300"
        >
          <div
            @click="$router.push('/member/appointmentRecord')"
            class="w-full h-full relative"
          >
            <h3 v-pre class="text-sm font-bold">近期預約 :</h3>
            <div v-if="appointmentRecord.length !== 0">
              <div
                v-pre
                class="grid grid-cols-12 py-2 text-[#0B4395] relative after:content-[''] after:absolute after:bottom-0 after:-left-2.5 after:w-[calc(100%+20px)] after:border-b-2 after:border-b-[#aeaeae] after:border-dotted"
              >
                <div class="col-span-6"><p class="text-sm">預約日期</p></div>
                <div class="col-span-3"><p class="text-sm">設計師</p></div>
                <div class="col-span-3"><p class="text-sm">狀態</p></div>
              </div>

              <div
                v-for="(item, idx) in appointmentRecord"
                :key="item.id"
                class="grid grid-cols-12 py-2 gap-1 text-sm relative after:content-[''] after:absolute after:bottom-0 after:-left-2.5 after:w-[calc(100%+20px)] after:duration-300 after:border-b-2 after:border-b-[#aeaeae] after:border-dotted appointmentRecordList"
                :class="{ hidden: idx > 4 }"
              >
                <div class="col-span-6">
                  <p
                    class="text-sm line-clamp-1 break-all"
                    v-formatDate="'time'"
                  >
                    {{ item.date }}
                  </p>
                </div>
                <div class="col-span-3">
                  <p
                    v-if="item.designer"
                    class="line-clamp-1 text-sm break-all"
                  >
                    {{ item.designer.nameForCustomerSide }}
                  </p>
                  <p v-else class="line-clamp-1 text-sm">不指定</p>
                </div>
                <div v-if="item.status !== '設計師已取消'" class="col-span-3">
                  <p
                    class="line-clamp-1 break-all text-sm"
                    :class="{
                      'text-[#FEB401]': item.status === '待審核',
                      'text-[#16A34A]': item.status === '預約成功',
                    }"
                  >
                    {{ item.status }}
                  </p>
                </div>
                <div v-else class="col-span-3">
                  <p class="line-clamp-1 break-all text-sm text-[#F43F5E]">
                    已取消
                  </p>
                </div>
              </div>
            </div>
            <!-- 無資料 -->
            <p
              v-if="!appointmentRecord.length"
              class="text-sm text-[#AEAEAE] mt-3"
            >
              目前無預約
            </p>
          </div>
          <div
            @click="$router.push('/member/appointmentRecord')"
            class="text-center mt-3"
            :class="{
              'absolute bottom-5 left-1/2 -translate-x-1/2':
                !appointmentRecord.length,
            }"
          >
            <p v-pre class="text-blue-400 text-sm">查看我的預約紀錄 >></p>
          </div>
        </MemberGlobalCard>

        <!-- menu -->
        <MemberGlobalCard
          v-for="(item, idx) in menuList"
          :key="item.id"
          :px="'px-0'"
          :py="'py-0'"
          data-aos="fade"
          data-aos-once="true"
          data-aos-anchor="#firstPos"
          :data-aos-delay="200 + idx * 50"
          data-aos-duration="300"
        >
          <button
            v-if="item.label !== '登出' && item.path"
            @click="$router.push(`${item.path}`)"
            data-mdb-ripple="true"
            data-mdb-ripple-color="#AEAEAE"
            type="button"
            class="text-sm py-4 px-6 flex gap-6 items-center w-full"
          >
            <fa :icon="item.icon" class="text-xl" />
            <p>{{ item.label }}</p>
          </button>
          <button
            v-if="item.label !== '登出' && item.url"
            @click="openNewWindow(item.url)"
            data-mdb-ripple="true"
            data-mdb-ripple-color="#AEAEAE"
            type="button"
            class="text-sm py-4 px-6 flex gap-6 items-center w-full"
          >
            <fa :icon="item.icon" class="text-xl" />
            <p>{{ item.label }}</p>
          </button>
          <button
            v-if="item.label === '登出'"
            @click="logOut()"
            data-mdb-ripple="true"
            data-mdb-ripple-color="#AEAEAE"
            type="button"
            class="text-sm py-4 px-6 flex gap-6 items-center w-full"
          >
            <fa :icon="item.icon" class="text-xl" />
            <p>{{ item.label }}</p>
          </button>
        </MemberGlobalCard>
      </div>
    </section>
  </div>
</template>

<script>
import { removeToken } from "@/plugins/cookies";
export default {
  name: "member-index",
  head() {
    return {
      meta: [
        {
          name: "theme-color",
          content: "#f1f1f1",
        },
      ],
    };
  },
  data() {
    return {
      menuList: [
        {
          id: 1,
          label: "會員資料",
          icon: "fa-regular fa-user",
          path: "/member/info",
        },
        {
          id: 2,
          label: "服務紀錄",
          icon: "fa-regular fa-sack-dollar",
          path: "/member/consumption",
        },
        {
          id: 3,
          label: "我的卡券",
          icon: "fa-regular fa-ticket",
          path: "/member/ticket",
        },
        // {id: 4, label: '我的優惠券', icon: 'fa-solid fa-ticket', path: '/member/coupon'},
        {
          id: 5,
          label: "入金紀錄",
          icon: "fa-regular fa-circle-dollar",
          path: "/member/addValue",
        },
        {
          id: 6,
          label: "紅利點數",
          icon: "fa-regular fa-circle-p",
          path: "/member/customerBonus",
        },
        {
          id: 7,
          label: "偏好設定",
          icon: "fa-regular fa-heart",
          path: "/member/setting",
        },
        { id: 8, label: "線上商城", icon: "fa-regular fa-bag-shopping" },
        { id: 9, label: "服務滿意度調查", icon: "fa-regular fa-envelope" },
        {
          id: 10,
          label: "登出",
          icon: "fa-regular fa-arrow-right-from-bracket",
        },
      ],
      isDisplay: {},
      memberInfo: {},
      appointmentRecord: [],
      member: {
        imgUrl: "",
      },
      count: 0,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading;
    },
  },
  methods: {
    getUrl() {
      this.handleUrl("線上商城", "shopURL");
      this.handleUrl("服務滿意度調查", "rankingURL");
    },
    handleUrl(label, urlName) {
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      let url = merchant ? merchant[urlName] : "";
      if (!url) {
        this.menuList = this.menuList.filter((item) => item.label != label);
      } else {
        this.menuList.map((item) => {
          if (item.label === label) item.url = url;
        });
      }
    },
    handleDisplay() {
      let hideList = [];
      let needHandleDisplayList = new Map([
        ["ServiceRecord", "服務紀錄"],
        ["TicketRecord", "我的卡券"],
        ["WalletRecord", "入金紀錄"],
        ["BonusRecord", "紅利點數"],
      ]);
      needHandleDisplayList.forEach((value, key) => {
        if (!this.isDisplay[key]) hideList.push(value);
      });
      this.menuList = this.menuList.filter(
        (item) => !hideList.includes(item.label)
      );
    },
    bindindLine() {
      if (this.$route.query.code && this.memberInfo.lineId !== "null") {
        this.api.customerBindWithLine(this.$route.query.code).then((res) => {
          if (res.data.customerBindWithLine) this.getMemberInfoAndRecored();
          this.$swal.fire({
            icon: "success",
            html: "<p>Line 帳號綁定成功",
            background: "#fff",
            timer: 3000,
            showConfirmButton: false,
          });
          this.$router.push({ path: "/", query: {} });
        });
      }
    },
    // 登出
    logOut() {
      this.$swal
        .fire({
          html: `<p class="text-lg text-[#232D4E] font-bold">確定要登出嗎?</p>`,
          showCancelButton: true,
          confirmButtonText: "登出",
          confirmButtonColor: "#232D4E",
          cancelButtonText: "取消",
        })
        .then((result) => {
          if (result.isConfirmed) {
            removeToken();
            window.localStorage.clear();

            this.$swal
              .fire({
                icon: "success",
                title: '<h3 class="text-2xl">會員已登出</h3>',
                background: "#fff",
                iconColor: "#FEB401",
                timer: 1500,
                showConfirmButton: false,
              })
              .then(() => {
                // this.$cookieMethods.removeToken()
                this.$router.push("/");
                setTimeout(() => {
                  location.reload();
                }, 100);
              });
          }
        });
    },
    async getMemberInfoAndRecored() {
      try {
        const merchant = JSON.parse(localStorage.getItem("merchant"));
        const soreid = JSON.stringify(merchant.id);
        const recordNeedKey = "no, date, designer{nameForCustomerSide}, status";
        const [records, memberInfo, isDisplay] = await Promise.all([
          this.api.getAllCustomerReservationRecords(recordNeedKey),
          this.api.getCustomerPersonalData("name cellphone lineId"),
          this.api.getCustomerSidePageDisplayForCellphone(soreid),
        ]);

        if (memberInfo.hasError || isDisplay.hasError) {
          removeToken();
          this.$router.push("/");
          return;
        }
        this.$store.commit(
          "customerSidePageDisplay/updateisDisplay",
          isDisplay.data.getCustomerSidePageDisplayForCellphone
        );

        this.isDisplay = this.$store.state.customerSidePageDisplay.isDisplay;
        this.appointmentRecord =
          records.data.getCustomerReservationRecords.orders;
        this.memberInfo = memberInfo.data.getCustomerPersonalData;
        this.$store.dispatch("loading/isLoading", false);
      } catch (err) {
        console.log(err);
      }
    },
    // 上傳大頭貼
    uploadImg() {
      this.$swal.fire({
        icon: "warning",
        title: `<h3 class="text-2xl">功能尚未開放<br>Coming Soon</h3>`,
        background: "#fff",
        iconColor: "#FEB401",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    openNewWindow(url) {
      window.open(url);
    },
  },
  async mounted() {
    this.$store.dispatch("loading/isLoading", true);
    await this.getMemberInfoAndRecored();
    this.getUrl();
    this.bindindLine();
    this.handleDisplay();
  },
};
</script>
<style>
.newsTicker {
  animation: newsTickerAnimate linear 25s infinite;
}
@keyframes newsTickerAnimate {
  from {
    left: 100%;
    transform: translateX(0%);
  }
  to {
    left: 0%;
    transform: translateX(-100%);
  }
}
</style>
