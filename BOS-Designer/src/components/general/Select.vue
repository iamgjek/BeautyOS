<template>
  <div>
    <label :for="uuid" @click.stop="isFocus = !isFocus" @keypress="isFocus = !isFocus">
      <div
        class="flex h-full w-full flex-nowrap items-center justify-between overflow-hidden rounded-[10px] p-2"
        :class="{
          'border-red-500 bg-red-50 text-red-700 dark:border-red-400 dark:bg-red-100':
            errorMsgStatus,
          'text-gray-400 bg-slate-100 ': disabled,
        }"
      >
        <template>
          <slot></slot>
        </template>
        <div class="overflow-hidden text-ellipsis whitespace-nowrap">
          <span v-if="value">{{ valueContext }}</span>
          <span v-else>{{ placeholder }}</span>
        </div>
        <!-- <font-awesome-icon icon="fa-solid fa-angle-down" /> -->
        <font-awesome-icon icon="fa-solid fa-angle-down" class="text-sm text-primary" />
      </div>
    </label>
    <!-- @focus="isFocus = true" -->
    <input
      :id="uuid"
      :value="value"
      type="text"
      v-click-outside="focusOut"
      :disabled="disabled"
      readonly
      class="absolute h-0 w-0"
    />
    <transition name="slideInDown">
      <div v-if="isFocus" class="relative z-[9999]">
        <ul
          class="absolute mt-2 rounded-md border border-solid border-[#ccc] bg-white"
          :class="{ 'inset-x-0': isFull }"
        >
          <font-awesome-icon
            v-if="isFocus"
            icon="fa-solid fa-triangle"
            class="absolute left-3 mt-[-12px] text-sm text-[#ccc]"
          />
          <font-awesome-icon
            v-if="isFocus"
            icon="fa-solid fa-triangle"
            class="absolute left-3 mt-[-11px] text-sm text-white"
          />
          <span class="mt-2 inline-block max-h-60 overflow-y-auto" :class="{ 'w-full': isFull }">
            <template v-if="Array.isArray(list) && list.length > 0">
              <li
                v-for="(item, index) in list"
                :key="`${uuid}${index}`"
                class="px-5 py-2 leading-4"
                :class="[
                  {
                    'bg-gray-200/50': isSeletedItem(item),
                    'pointer-events-none cursor-not-allowed opacity-50':
                      item.hasOwnProperty('disabled') && item.disabled,
                  },
                ]"
                @click="setVal(item)"
                @keypress="setVal(item)"
              >
                {{ itemText ? item[`${itemText}`] : item }}
              </li>
            </template>
            <template v-else>
              <li
                class="bg-gray-200/50 pointer-events-none cursor-not-allowed px-5 py-2 leading-4 opacity-50"
              >
                無資料
              </li>
            </template>
          </span>
        </ul>
      </div>
    </transition>
    <transition name="collapseTransition">
      <p v-if="errorMsgStatus" class="mt-2 text-left text-sm text-red-600 dark:text-red-500">
        <span class="font-medium">{{ errors[0] }}</span>
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'select-root',
  props: {
    value: {
      type: [String, Number, Array, Object],
    },
    placeholder: {
      type: String,
      default: () => '請選擇',
    },
    itemText: {
      type: [String],
    },
    bgc: {
      type: [String],
    },
    itemValue: {
      type: [String],
    },
    list: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    objectReturn: {
      type: Boolean,
      default: () => false,
    },
    multiple: {
      type: Boolean,
      default: () => false,
    },
    errors: {
      type: [Array],
      default: () => [],
    },
    isFull: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      uuid: this.$uuid(),
      isFocus: false,
    };
  },
  methods: {
    setVal(value) {
      if (this.itemValue) {
        if (this.objectReturn) {
          this.$emit('input', value);
        } else {
          this.$emit('input', value[`${this.itemValue}`]);
        }
      } else {
        this.$emit('input', value);
      }
    },
    focusOut() {
      this.isFocus = false;
    },
  },
  computed: {
    valueContext() {
      let text = '';
      if (this.itemValue) {
        if (this.objectReturn) {
          text = this.value[`${this.itemText}`];
        } else {
          const seletedListItem = this.list.find(
            (listItem) => this.value === listItem[`${this.itemValue}`],
          );
          text = seletedListItem ? seletedListItem[`${this.itemText}`] : '';
        }
      } else {
        text = this.value;
      }
      return text;
    },
    isSeletedItem() {
      return (listItem) => {
        let status = false;
        if (this.itemValue) {
          if (this.objectReturn) {
            status = this.value === listItem;
          } else {
            status = this.value === listItem[`${this.itemValue}`];
          }
        } else {
          status = this.value === listItem;
        }
        return status;
      };
    },
    errorMsgStatus() {
      return !this.hideErrors && this.errors.length > 0;
    },
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
