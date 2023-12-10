<template>
  <textarea
    v-model="value"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :style="getSize"
    :disabled="disabled"
    @onFocus="onFocus"
    @onBlur="onBlur"
    class="text-area"
  ></textarea>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { computed } from "@vue/reactivity";
export default defineComponent({
  name: "TextArea",
  props: {
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    maxlength: {
      type: Number,
      default: 100,
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
  emits: ["update:modelValue", "onFocus", "onBlur"],
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (newValue) => emit('update:modelValue', newValue)
    })
    const getSize = {
      width: props.width,
      height: props.height,
    };
    const onFocus = () => {
      emit("onFocus");
    };
    const onBlur = () => {
      emit("onBlur");
    };
    return {
      value,
      getSize,
      onFocus,
      onBlur,
    };
  },
});
</script>
<style>
.text-area {
  min-height: 30px;
  font-size: 14px;
  line-height: 20px;
  padding: 5px 10px;
  border-radius: 10px;
  border: 2px solid #c3c3c3;
  box-sizing: border-box;
  resize: none;
}
</style>
