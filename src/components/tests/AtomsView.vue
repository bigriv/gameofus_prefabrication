<template>
  <TextInput
    v-model="state.textInputValue"
    :type="'text'"
    placeholder="テキスト"
    :width="'100%'"
    :height="'36px'"
  />
  <br />
  {{ state.textInputValue }}
  <br />

  <TextArea
    v-model="state.textAreaValue"
    placeholder="テキストエリア"
    :maxlength="200"
    :width="'100%'"
    :height="'100px'"
  />
  <br />
  {{ state.textAreaValue }}
  <br />

  <Button label="ボタン" :width="'100%'" :height="'32px'" @click="onClick" />
  <br />
  {{ state.buttonAction }}
  <br />

  <SelectBox
    v-model="state.selectedValue"
    :options="options"
    :width="'100px'"
    :height="'30px'"
    style="margin-left: 12px;"
  />
  <br />
  {{ state.selectedValue }}
  <br />
</template>

<script>
import { defineComponent, reactive } from "vue";
import TextInput from "@/parts/atoms/TextInput.vue";
import TextArea from "@/parts/atoms/TextArea.vue";
import Button from "@/parts/atoms/Button.vue";
import SelectBox from "@/parts/atoms/SelectBox.vue";

export default defineComponent({
  components: {
    TextInput,
    TextArea,
    Button,
    SelectBox,
  },
  setup() {
    const state = reactive({
      textInputValue: undefined,
      textAreaValue: undefined,
      buttonAction: undefined,
      selectedValue: '0',
    });
    const options = [
        { value: '0', label: '0'}, 
        { value: '1', label: '1'}, 
        { value: '2', label: '2'}, 
    ]
    const onClick = () => {
      console.log("on click button");
    };
    const onUpdate = (value) => {
        console.log('update', value)
        // state.textInputValue=value
    }
    return {
      state,
      options,
      onClick,
      onUpdate
    };
  },
});
</script>
