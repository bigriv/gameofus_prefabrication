<template>
  <button
    :type="type"
    :name="name"
    :style="getSize"
    :disabled="disabled"
    @click="onClick"
    class="button"
  >
    {{ label }}
  </button>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "Button",
  props: {
    type: {
      type: String,
      default: "button",
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "32px",
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
  emits: ["click"],
  setup(props, { emit }) {
    const getSize = {
      width: props.width,
      height: props.height,
    };
    const onClick = () => {
      emit("click");
    };
    return {
      getSize,
      onClick,
    };
  },
});
</script>

<style>
.button {
  border-radius: 10px;
  background-color: #eee;
  border: 2px solid black;
  appearance: none;
  box-sizing: border-box;
  cursor: pointer;
}
.button:hover {
	background-color: #ccc;
}
</style>
