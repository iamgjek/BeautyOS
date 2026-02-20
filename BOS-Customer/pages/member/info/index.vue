<template>
  <section id="firstPos">
    <!-- 會員卡片 -->
    <div v-if="!itemIsLoading" data-aos="fade-up" data-aos-duration="300" data-aos-once="true" data-aos-delay="100" data-aos-anchor="#firstPos" class="w-full max-w-[500px] mb-3 mx-auto relative rounded-lg overflow-hidden aspect-video">
      <img v-if="!memberCard.membershipImage" src="/images/member/card-bg.webp" class="w-full h-full shadow-md object-cover object-center">
      <img v-else :src="memberCard.membershipImage" class="w-full h-full shadow-md object-cover object-center">
      
      <span v-if="memberCard.merchantname" class="absolute left-3 bottom-3 text-base tracking-widest font-serif" :style="`color: ${memberCard.membershipTextCoclor}`">{{ memberCard.merchantname }}</span>
      <span v-if="!memberCard.merchantname && merchant.name" class="absolute left-3 bottom-3 text-base tracking-widest font-serif text-white">{{ merchant.name }}</span>

      <div class="absolute right-3 bottom-3 flex items-center gap-1.5">
        <div v-if="memberCard.membershipTextCoclor" class="flex items-center" :style="`color: ${memberCard.membershipTextCoclor}`">
          <fa icon="fa-regular fa-circle-question" class="text-lg font-bold" />
        </div>
        <span v-if="memberCard.membershipTextCoclor" @click="openMemberRules()" class="text-base tracking-widest font-serif" :style="`color: ${memberCard.membershipTextCoclor}`">會籍說明</span>
      </div>
      
    </div>

    <!-- 會員資料 -->
    <MemberGlobalCard v-if="!isLoading && !itemIsLoading" data-aos="fade-up" data-aos-duration="300" data-aos-once="true" data-aos-delay="200" data-aos-anchor="#firstPos">
      <ul class="text-sm">
        <li class="py-2 relative after:content-[''] after:w-[calc(100%+24px)] after:h-[1px] after:bg-[#aeaeae] after:absolute after:left-[-12px] after:bottom-0">
          <div class="grid grid-cols-12">
            <div v-pre class="col-span-3">
              <p>姓名</p>
            </div>
            <div class="col-span-9">
              <p>{{ memberInfo.name }}</p>
            </div>
          </div>
        </li>
        <li class="py-2 relative after:content-[''] after:w-[calc(100%+24px)] after:h-[1px] after:bg-[#aeaeae] after:absolute after:left-[-12px] after:bottom-0">
          <div class="grid grid-cols-12">
            <div v-pre class="col-span-3">
              <p>電話</p>
            </div>
            <div class="col-span-9">
              <p>{{ memberInfo.cellphone }}</p>
            </div>
          </div>
        </li>
        <li class="py-2 relative after:content-[''] after:w-[calc(100%+24px)] after:h-[1px] after:bg-[#aeaeae] after:absolute after:left-[-12px] after:bottom-0">
          <div class="grid grid-cols-12">
            <div v-pre class="col-span-3">
              <p>暱稱</p>
            </div>
            <div class="col-span-9">
              <p>{{ memberInfo.nickName }}</p>
            </div>
          </div>
        </li>
        <li class="py-2 relative after:content-[''] after:w-[calc(100%+24px)] after:h-[1px] after:bg-[#aeaeae] after:absolute after:left-[-12px] after:bottom-0">
          <div class="grid grid-cols-12">
            <div v-pre class="col-span-3">
              <p>性別</p>
            </div>
            <div class="col-span-9">
              <p v-if="memberInfo.gender === 'MALE'">男</p>
              <p v-if="memberInfo.gender === 'FEMALE'">女</p>
            </div>
          </div>
        </li>
        <li class="py-2 relative after:content-[''] after:w-[calc(100%+24px)] after:h-[1px] after:bg-[#aeaeae] after:absolute after:left-[-12px] after:bottom-0">
          <div class="grid grid-cols-12">
            <div v-pre class="col-span-3">
              <p>Email</p>
            </div>
            <div class="col-span-9">
              <p>{{ memberInfo.email }}</p>
            </div>
          </div>
        </li>
        <li class="py-2 relative after:content-[''] after:w-[calc(100%+24px)] after:h-[1px] after:bg-[#aeaeae] after:absolute after:left-[-12px] after:bottom-0">
          <div class="grid grid-cols-12">
            <div v-pre class="col-span-3">
              <p>Line ID</p>
            </div>
            <div class="col-span-9">
              <p>{{ memberInfo.lineId }}</p>
            </div>
          </div>
        </li>
        <li class="py-2 relative after:content-[''] after:w-[calc(100%+24px)] after:h-[1px] after:bg-[#aeaeae] after:absolute after:left-[-12px] after:bottom-0">
          <div class="grid grid-cols-12">
            <div v-pre class="col-span-3">
              <p>生日</p>
            </div>
            <div class="col-span-9">
              <p v-formatDate="'date'">{{ memberInfo.birthday }}</p>
            </div>
          </div>
        </li>
        <li class="py-2">
          <div class="grid grid-cols-12">
            <div v-pre class="col-span-3">
              <p>地址</p>
            </div>
            <div class="col-span-9">
              <p>{{ memberInfo.address }}</p>
            </div>
          </div>
        </li>
      </ul>
    </MemberGlobalCard>

    <button v-if="!isLoading && !itemIsLoading" @click="$router.push('/member/info/edit')" data-mdb-ripple="true" data-mdb-ripple-color="light" data-aos="fade-up" data-aos-duration="300" data-aos-once="true" data-aos-delay="300" data-aos-anchor="#firstPos" class="w-full py-2.5 rounded-lg text-white text-lg bg-[#232D4E]">修改個人資料</button>

    <Modal :showModal="showMemberRules" :isMemberRules="true" @cancelModal="cancelModal($event)">
      <div v-if="memberCard.isHtml" v-html="memberCard.membershipComment"></div>
      <p v-else>{{ memberCard.membershipComment }}</p>
    </Modal>
  </section>
</template>

<script>
export default {
  name: 'member-info',
  data() {
    return {
      memberCard: {},
      memberInfo: {},
      showMemberRules: false,
      merchant: JSON.parse(window.localStorage.getItem('merchant')) || {id: ''}
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    },
    itemIsLoading() {
      return this.$store.state.itemLoading.isLoading
    }
  },
  methods: {
    // 開啟會籍說明
    openMemberRules() {
      this.showMemberRules = true
    },
    // 關閉會籍說明
    cancelModal(e) {
      e.stopPropagation()
      
      const classList = Array.from(e.target.classList)
      const isCancel = classList.includes('cancel')

      if (isCancel || e.target.nodeName === 'path') this.showMemberRules = false
    },
    // 取得用戶資料
    getCustomerPersonalData() {

      this.$store.dispatch('loading/isLoading', true)

      const needKey = 'name, cellphone, nickName, gender, email, lineId, birthday, address'

      this.api.getCustomerPersonalData(needKey)
      .then((res) => {
        this.memberInfo = res.data.getCustomerPersonalData

        this.$store.dispatch('indexCache/handleSetUserInfo', res.data.getCustomerPersonalData)
        this.$store.dispatch('loading/isLoading', false)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // 取得會員卡片
    customerMembershipRecord() {
      this.$store.dispatch('itemLoading/isLoading', true)

      this.api.customerMembershipRecord(this.merchant?.id)
      .then((res) => {
        // 判斷是否為 html 格式
        if (res.data.customerMembershipRecord.unExpired[0]) {
          if (
            res.data.customerMembershipRecord.unExpired[0].membershipComment.indexOf('<p') === -1 &&
            res.data.customerMembershipRecord.unExpired[0].membershipComment.indexOf('<img') === -1) {
              res.data.customerMembershipRecord.unExpired[0]['isHtml'] = false
          } else {
            res.data.customerMembershipRecord.unExpired[0]['isHtml'] = true
          }
          this.memberCard = res.data.customerMembershipRecord.unExpired[0]
        }

        this.$store.dispatch('itemLoading/isLoading', false)

      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getCustomerPersonalData()
    this.customerMembershipRecord()
  }
}
</script>
