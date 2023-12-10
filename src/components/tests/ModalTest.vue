<template>
  <div v-if="state.isOpen">
    <Modal v-model:dataList="state.dataList" @close="onClose" @save="onSave" />
  </div>
  <Button :label="'モーダルテスト'" @click="onOpen" />
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { reactive } from "@vue/reactivity";
import Button from "@/parts/atoms/Button.vue";
import Modal from "@/parts/molecules/Modal.vue";
export default defineComponent({
  name: "ModalTest",
  components: { Modal, Button },
  setup() {
    const state = reactive({
      dataList: [
        {
          label: "部屋名",
          type: "text",
          required: true,
          placeholder: "部屋名を入力",
        },
        {
          label: "プレイヤー名",
          type: "text",
          required: false,
          placeholder: "プレイヤー名を入力",
        },
        {
          label: "定員",
          type: "select",
          required: false,
          selectedValue: "",
        },
        {
          label: "パスワード",
          type: "text",
          required: false,
          disabled: true
        },
        {
          label: "コメント",
          type: "textarea",
          required: false,
          placeholder: "200文字まで入力できます",
        },
      ],
      isOpen: false
    })
    const onOpen = () => {
      state.isOpen = true
    }
    const onClose = () => {
      state.isOpen = false
    }
    const onSave = (data) => {
      console.log(data)
    }
    return {
      state,
      onOpen,
      onClose,
      onSave
    }
  },
});
</script>
