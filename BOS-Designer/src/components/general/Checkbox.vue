<template>
  <div class="checkbox">
    <input
      type="checkbox" :id="uuid" :value="value"
      :checked="value"
      @change="$emit('input',value)"
    />
    <label :for="uuid" class="flex items-center text-left">
      {{label}}
    </label>
  </div>
</template>

<script>
export default {
  name: 'default-checkbox',
  props: {
    value: {
      type: [Object, Boolean, Array],
    },
    label: {
      type: [String],
    },
  },
  data() {
    return {
      uuid: this.$uuid(),
    };
  },
};
</script>

<style lang="scss" scoped>
$color-green: #FEB401;
.checkbox {
    width: 100%;
    margin: 4px auto;
    position: relative;
    display: block;
    label {
        position: relative;
        min-height: 32px;
        // display: block;
        padding-left: 32px;
        margin-bottom: 0;
        font-weight: normal;
        cursor: pointer;
        span {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            margin: 4px;
            width: 22px;
            height: 22px;
            transition: transform 0.28s ease;
            border-radius: 3px;
            border: 1px solid;
        }
        &:after {
            content: '';
            display: block;
            width: 10px;
            height: 5px;
            border-bottom: 2px solid $color-green;
            border-left: 2px solid $color-green;
            transform: rotate(-45deg) scale(0);
            transition: transform ease 0.25s;
            position: absolute;
            top: 12px;
            left: 10px;
        }
    }
    input[type="checkbox"] {
        width: auto;
        opacity: 0.00000001;
        position: absolute;
        left: 0;
        width: 0;
        height: 0;
        // margin-left: -20px;
        &:checked ~ label{
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

</style>
