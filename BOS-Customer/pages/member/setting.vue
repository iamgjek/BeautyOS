<template>
  <section class="w-full max-w-[768px] mx-auto pb-20">
    <div v-once class="fixed left-0 top-0 w-full px-[10%] text-lg bg-white py-4 flex items-center">
      <fa @click="$router.go(-1)" icon="fa-solid fa-angle-left" class="text-2xl" />
      <h2 v-pre class="absolute top-1/2 translate-y-[-50%] left-[50%] translate-x-[-50%] text-lg font-bold">偏好設定</h2>
    </div>
    <nuxt-child />
  </section>
</template>

<script>
export default {
  name: 'setting',
  head() {
    return {
      meta: [
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]
    }
  },
}
</script>
