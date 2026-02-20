<template>
  <section>
    <div class="w-full bg-white rounded-md relative" :class="[height, px, py, mx, my, customCss, {'shadow-[0px_0px_4px_1px_#F1FF99]': isEdit, 'shadow-[0px_2px_2px_rgba(0,0,0,0.25)]': !isEdit}]">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: () => false
    },
    height: {
      type: String,
      default: () => 'min-h-[40px]'
    },
    py: {
      type: String,
      default: () => 'py-3'
    },
    px: {
      type: String,
      default: () => 'px-3'
    },
    my: {
      type: String,
      default: () => 'mb-2.5'
    },
    mx: {
      type: String,
      default: () => ''
    },
    customCss: {
      type: String,
      default: () => ''
    }
  },
  name: 'MemberGlobalCard'
}
</script>
