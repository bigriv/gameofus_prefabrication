<template>
  <Button :label="'APIテスト'" @click="onSend" />
  <div style="text-align: left;margin: 10px 15px;">
    request: {{ state.form }}<br />
    <hr />
    responce: {{ state.responce }}
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import Button from "@/parts/atoms/Button.vue";
import useApi from "@/methods/logics/useApi";
// import { getPlayer } from "@/methods/api/player";
import { getRooms } from "@/methods/api/room";
export default defineComponent({
  name: "ModalTest",
  components: { Button },
  setup() {
    const state = reactive({
      form: {
        gameId: 1,
        roomId: 1,
        keyword: undefined,
      },
      responce: undefined,
    });
    const getRoomsApi = useApi({
      caller: () => getRooms(state.form),
      successFunc: (responce) => {
          state.responce = responce.data;
      },
      errorFunc: (responce) => {
          console.log(responce);
      }
    })
    const onSend = () => {
      // getPlayer(state.form);
      getRoomsApi.execute()
    };
    return {
      state,
      onSend,
    };
  },
});
</script>
