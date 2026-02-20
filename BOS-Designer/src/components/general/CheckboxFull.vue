<template>
  <div class="checkbox">
    <input type="checkbox" :id="uuid" :value="inputValue" v-model="model" :disabled="disabled" />
    <!-- :checked="inputValue" -->
    <label :for="uuid" class="flex items-center text-left" :class="labelClass">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'default-checkbox-full',
  props: {
    value: {
      type: [Array, Boolean],
    },
    label: {
      type: [String],
    },
    inputValue: {
      type: [String, Object],
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    labelClass: {
      type: [String, Object],
    },
  },
  data() {
    return {
      uuid: this.$uuid(),
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
$color-green: #feb401;
.checkbox {
  position: relative;
  display: flex;
  justify-content: center;

  input[type="checkbox"] {
    width: auto;
    opacity: 0.00000001;
    position: absolute;
    left: 0;
    margin-left: -20px;
    &:checked ~ label {
      &:before {
        border: 2px solid $color-green;
      }
      &:after {
        transform: rotate(-45deg) scale(1);
      }
    }
    &:focus + label::before {
      outline: 0;
    }
  }
}
label {
  position: relative;
  height: 20px;
  display: inline-block;
  padding-left: 22px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto 4px;
    width: 15px;
    height: 15px;
    transition: transform 0.28s ease;
    border-radius: 3px;
    border: 1px solid;
  }
  &:after {
    content: "";
    display: block;
    width: 8px;
    height: 5px;
    border-bottom: 2px solid $color-green;
    border-left: 2px solid $color-green;
    transform: rotate(-45deg) scale(0);
    transition: transform ease 0.25s;
    position: absolute;
    top: 0;
    bottom: 2px;
    margin: auto 0;
    left: 7px;
  }
}
</style>
