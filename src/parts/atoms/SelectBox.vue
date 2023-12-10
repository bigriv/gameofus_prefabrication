<template>
  <select
    v-model="value"
    :style="getSize"
    :disabled="disabled"
    class="select-box"
  >
    <option v-for="option in options" :value="option.value" :key="option">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "SelectBox",
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => [
        { value: "", label: "" },
        { value: "1", label: "ラベル１" },
        { value: "2", label: "ラベル２" },
      ],
    },
    height: {
      type: String,
      default: "100%",
    },
    width: {
      type: String,
      default: "100%",
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', "onFocus", "onBlur"],
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (newValue) => emit('update:modelValue', newValue)
    })
    const getSize = {
      width: props.width,
      height: props.height,
    };
    return {
      value,
      getSize,
    };
  },
});
</script>

<style>
.select-box {
  border: 2px solid #c3c3c3;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid #c3c3c3;
  box-sizing: border-box;
}
</style>
