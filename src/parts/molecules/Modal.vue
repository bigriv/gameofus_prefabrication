<template>
  <teleport to="body">
    <div class="modal">
      <div class="modal-content">
        <button type="button" class="modal-close-button" @click="onClose">
          ×
        </button>
        <dl class="modal-data-list">
          <div v-for="data in list" :key="data">
            <dt>
              {{ data.label }}
              <em v-if="data.required" class="red-emphasis">※必須</em>
            </dt>
            <dd v-if="data.type === 'text'">
              <TextInput
                v-model="data.value"
                :type="'text'"
                :placeholder="data.placeholder"
                :width="'100%'"
                :height="'36px'"
                :value="data.value"
                :disabled="data.disabled ?? false"
              />
            </dd>
            <dd v-else-if="data.type === 'select'">
              <SelectBox
                v-model="data.value"
                :selectedValue="data.value"
                :options="data.options"
                :width="'100px'"
                :height="'30px'"
                :disabled="data.disabled ?? false"
                style="margin-left: 12px;"
              />
            </dd>
            <dd v-else-if="data.type === 'textarea'">
              <TextArea
                v-model="data.value"
                :placeholder="data.placeholder"
                :maxlength="200"
                :width="'100%'"
                :height="'100px'"
                :disabled="data.disabled ?? false"
              />
            </dd>
          </div>
          <dd style="text-align: center;margin-top: 30px;">
            <Button
              :label="buttonLabel"
              :width="'100%'"
              :height="'32px'"
              @click="onSave"
            />
          </dd>
        </dl>
      </div>
      <div class="black-background"></div>
    </div>
  </teleport>
</template>

<script>
import { defineComponent, computed } from "vue";
import TextInput from "@/parts/atoms/TextInput.vue";
import Button from "@/parts/atoms/Button.vue";
import SelectBox from "@/parts/atoms/SelectBox.vue";
import TextArea from "@/parts/atoms/TextArea.vue";

export default defineComponent({
  name: "Modal",
  components: { Button, TextInput, SelectBox, TextArea },
  props: {
    dataList: {
      type: Array,
      required: true,
    },
    buttonLabel: {
      type: String,
      default: "保存",
    },
  },
  emits: ["update:dataList", "close", "save"],
  setup(props, { emit }) {
    const list = computed({
      get: () => props.dataList,
      set: (newValue) => emit("update:dataList", newValue),
    });
    const onClose = () => {
      emit("close");
    };
    const onSave = () => {
      console.log("onSave", list);
      emit("save", list.value);
    };
    return {
      list,
      onClose,
      onSave,
    };
  },
});
</script>

<style>
.red-emphasis {
  color: red;
}
.modal {
  text-align: left;
}
.modal-data-list {
  color: black;
}
.modal-data-list dt {
  margin-left: 12px;
}
.modal-data-list dd {
  margin: 0px 12px 12px 12px;
}
.modal-content {
  border-radius: 40px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 300;
  height: 520px;
  max-height: 90vh;
  border: 2px solid black;
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.modal-content::-webkit-scrollbar {
  display: none;
}
.modal-close-button {
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  position: relative;
  top: -4px;
  right: 0px;
  float: right;
  font-size: 30px;
  cursor: pointer;
}
.black-background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 200;
}
</style>
