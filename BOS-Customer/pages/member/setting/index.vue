<template>
  <section id="firstPos" v-if="!isLoading">

    <!-- 喜好門市 -->
    <div class="flex flex-col fixed top-20 left-0 md:left-1/2 md:-translate-x-1/2 w-full max-w-[768px] px-[5%] h-[calc(100%-202px)] overflow-y-auto overflow-x-hidden">
      <h3 v-pre data-aos="fade" data-aos-once="true" data-aos-delay="100" data-aos-duration="500" data-aos-anchor="#firstPos" class="text-lg my-4">目前登入店家</h3>
      <MemberGlobalCard :py="'py-3'" :px="'px-5'" data-aos="fade" data-aos-once="true" data-aos-delay="200" data-aos-duration="500" data-aos-anchor="#firstPos">
        <div class="grid grid-cols-12 items-center gap-2">
          <div class="col-span-4">
            <h4 class="text-base line-clamp-1">{{ defaultMerchant.name }}</h4>
          </div>
          <div class="col-span-7">
            <p class="text-sm line-clamp-1">{{ defaultMerchant.address }}</p>
          </div>
        </div>
      </MemberGlobalCard>

      <!-- 喜好設計師 -->
      <h3 v-pre class="text-lg mt-7 mb-4" data-aos="fade" data-aos-once="true" data-aos-delay="300" data-aos-duration="500" data-aos-anchor="#firstPos">喜好設計師</h3>
      <MemberGlobalCard :py="'py-5'" :px="'px-5'" data-aos="fade-up" data-aos-once="true" data-aos-delay="400" data-aos-duration="500" data-aos-anchor="#firstPos">
        <ul class="flex flex-col gap-4" data-aos="fade" data-aos-once="true" data-aos-delay="700" data-aos-duration="500" data-aos-anchor="#firstPos">
          <li v-if="defaultDesigner.name && defaultDesigner.avatar">
            <div class="flex items-center gap-4">
              <img :src="defaultDesigner.avatar" :alt="defaultDesigner.name" class="h-12 w-12 rounded-full object-cover select-none pointer-events-none">
              <h4 class="text-sm line-clamp-1">{{ defaultDesigner.name }} <span v-if="defaultDesigner.nickName">({{ defaultDesigner.nickName }})</span></h4>
            </div>
          </li>
          <li v-else>
            <p class="text-[#bebebe] text-center my-5">暫無喜好設計師</p>
          </li>
        </ul>
      </MemberGlobalCard>
      <button v-once @click="$router.push('/member/setting/edit')" data-mdb-ripple="true" data-mdb-ripple-color="light" data-aos="zoom-in" data-aos-once="true" data-aos-delay="900" data-aos-duration="300" data-aos-anchor="#firstPos" class="text-white rounded-md bg-[#232D4E] py-2.5 w-full mt-auto"><p class="text-lg">修改偏好</p></button>
    </div>

  </section>
</template>

<script>
export default {
  name: 'setting-index',
  data() {
    return {
      favoriteInfo: {
        designers: {id: 1, label: 'Nina', imgUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'},
      },
      defaultMerchant: {},
      defaultDesigner: {}
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  },
  methods: {
    // 取得喜好門市、設計師、所有門市
    customerGetCurrentMerchantSetting() {
      this.api.customerGetCurrentMerchantSetting()
      .then((res) => {
        if (!res.data.hasError) {
          this.defaultMerchant = res.data.customerGetCurrentMerchantSetting.currentMerchant
          this.defaultDesigner = res.data.customerGetCurrentMerchantSetting.preferDesigner || ''

          console.log(this.defaultDesigner)
        }
        window.localStorage.setItem('allMerchants', JSON.stringify(res.data.customerGetCurrentMerchantSetting.consumedMerchants))
        window.localStorage.setItem('merchant', JSON.stringify(res.data.customerGetCurrentMerchantSetting.currentMerchant))
        if (res.data.customerGetCurrentMerchantSetting.preferDesigner) {
          window.localStorage.setItem('preferDesigner', JSON.stringify(res.data.customerGetCurrentMerchantSetting.preferDesigner))
        }

        this.$store.dispatch('loading/isLoading', false)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  async mounted() {
    this.$store.dispatch('loading/isLoading', true)
    await this.customerGetCurrentMerchantSetting()
  }
}
</script>
