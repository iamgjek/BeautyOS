<template>
  <span class="w-full">
    <!-- locale="zh-TW" -->
    <vc-date-picker
      v-model="date"
      :min-date="minDate"
      :masks="masks"
      class="relative flex w-full items-center justify-between"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <input
          class="w-full rounded-md border border-[#F1F1F1] bg-white px-2 py-1 placeholder:text-ml focus:outline-0"
          :placeholder="placeholder"
          :value="inputValue"
          v-on="inputEvents"
          :disabled="disabled"
          :class="[
            {
              'border-red-500 bg-red-50 text-red-500 text-red-900 placeholder:!text-red-700 dark:border-red-400 dark:bg-red-100':
                errorMsgStatus,
            },
            { 'bg-slate-100 placeholder:!text-ml': disabled },
          ]"
        />
        <font-awesome-icon
          icon="fa-solid fa-angle-left"
          class="absolute right-[0.5rem] top-[calc(50%-8px)] rotate-[-90deg] cursor-pointer"
        />
      </template>
    </vc-date-picker>
    <!-- <p v-if="errorMsgStatus" class="mt-2 text-left text-sm text-red-600 dark:text-red-500"><span class="font-medium">{{errors[0]}}</span> </p> -->
  </span>
</template>

<script>
export default {
  name: 'calender-selector',
  props: {
    value: {
      type: [String, Date, Object, Array],
    },
    placeholder: {
      type: String,
      default: '請選擇日期',
    },
    minDate: {
      type: [String, Date],
    },
    errors: {
      type: [Array],
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      masks: {
        input: 'YYYY-MM-DD',
      },
    };
  },
  computed: {
    date: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    errorMsgStatus() {
      return !this.hideErrors && this.errors.length > 0;
    },
  },
};
</script>

<style></style>
