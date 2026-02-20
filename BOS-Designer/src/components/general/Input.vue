<template>
  <label class="mb-6 block">
    <p
      v-if="label"
      class="mb-2 block text-left text-sm font-bold"
      :class="{ 'text-red-700 dark:text-red-500': isHasError }"
    >
      {{ label }}:
    </p>
    <div
      class="flex items-center rounded-[10px] border bg-white"
      :class="[
        {
          ' border-red-500 bg-red-50 text-red-500 dark:border-red-400 dark:bg-red-100': isHasError,
          'drop-shadow-lg': isOnfocus,
          'bg-slate-100': disabled,
        },
        divClass,
      ]"
    >
      <span v-if="$slots.preIcon" class="ml-2 inline-block">
        <slot name="preIcon"></slot>
      </span>
      <input
        :value="value"
        ref="inputVal"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="doFunction"
        @focus="toggleFocus('focus')"
        @blur="toggleFocus('blur')"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readOnly"
        class="block w-full border-0 bg-transparent p-2 text-sm outline-none placeholder:text-ml focus:border-0"
        :class="[{ ' text-red-900 placeholder:text-red-700': isHasError }, inputClass]"
        :maxlength="maxLength"
      />
      <span v-if="$slots.endIcon" class="mr-2 flex gap-2">
        <slot name="endIcon"></slot>
      </span>
    </div>
    <transition name="collapseTransition">
      <p v-if="errorMsgStatus" class="mt-2 text-left text-sm text-red-600 dark:text-red-500">
        <span class="font-medium">{{ errors[0] }}</span>
      </p>
    </transition>
  </label>
</template>

<script>
export default {
  name: 'input-componenet',
  data() {
    return {
      isOnfocus: false,
    };
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: [String, Number],
    },
    placeholder: {
      type: [String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    readOnly: {
      type: Boolean,
      default: () => false,
    },
    errors: {
      type: [Array],
      default: () => [],
    },
    hideErrors: {
      type: [Boolean],
      default: false,
    },
    type: {
      type: [String],
      default: 'text',
    },
    inputClass: [String],
    divClass: {
      type: String,
      default: 'border-[#F1F1F1]',
    },
    maxLength: {
      type: [Number, String],
      default: () => '',
    },
  },
  methods: {
    toggleFocus(action) {
      if (action === 'blur') {
        this.isOnfocus = false;
      } else {
        this.isOnfocus = true;
      }
    },
    doFunction() {
      this.$refs.inputVal.blur();
      this.$emit('doFunction');
    },
  },
  computed: {
    errorMsgStatus() {
      return !this.hideErrors && this.errors.length > 0;
    },
    isHasError() {
      return this.errors.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped></style>
