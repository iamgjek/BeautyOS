<template>
  <section class="member__container absolute h-[calc(100%-122px)] w-full mt-14 pt-4 px-5 pb-8 overflow-y-auto overflow-x-hidden bg-[#f1f1f1]">
    <client-only>
      <nuxt-child />
    </client-only>
  </section>
</template>

<script>
export default {
  name: 'member',
  mounted() {
    document.body.addEventListener('dblclick', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })

    const vm = this
    const notToHomeList = ['member-info']
    window.addEventListener('popstate', () => {
      if (notToHomeList.includes(vm.$route.name)) vm.$router.push('/member')
    })

  }
}
</script>