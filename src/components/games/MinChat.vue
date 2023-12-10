<template>
  <div class="mainPanel">
    <Chat
      :isSelectableTo="true"
      :messages="chatState.messages"
      @send="onSendMessage"
    />
    <div class="roomArea">
      <Member :member="gameState.member" :user="state.user" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from "vue";
import Chat from "@/parts/molecules/Chat.vue";
import Member from "@/parts/molecules/Member.vue";
import { useStore } from "vuex";
import useGame from "@/methods/logics/useGame";
import useChat from "@/methods/logics/useChat";

export default defineComponent({
  name: "MinChat",
  components: { Chat, Member },
  props: {},
  setup() {
    const { gameState, getPlayersApi } = useGame();
    const {
      chatState,
      getUnreadMessageApi,
      getAllMessageApi,
      postSendMessageApi,
      setMessageForm,
    } = useChat();
    const store = useStore();
    const state = reactive({
      user: computed(() => store.state.user),
    });
    const onSendMessage = (message) => {
      console.log("send message", message);
      // メッセージ整形
      chatState.messageForm.text = message.text
      let sendTarget = []
      if (message.to === 'all') {
        chatState.messageForm.type = 99
        sendTarget = [...gameState.member]
      } else {
        chatState.messageForm.type = 1
        sendTarget.push(message.to)
      }
      setMessageForm(sendTarget)
      // チャット登録API呼び出し
      postSendMessageApi.execute()
    };
    onMounted(async () => {
      await getPlayersApi.execute();
      await getAllMessageApi.execute();
    });
    return {
      state,
      gameState,
      onSendMessage,
      getPlayersApi,
      chatState,
      getUnreadMessageApi,
      getAllMessageApi,
      postSendMessageApi,
    };
  },
});
</script>

<style scoped>
.mainPanel {
  display: flex;
}
/* SP用 */
@media (max-width: 767px) {
  .pc-shown {
    display: none;
  }
  .roomArea {
    display: flex;
    flex-direction: column;
    width: 100vw;
    margin-left: auto;
    margin-right: auto;
    height: calc(630px + 24vw);
  }
}
/* PC用 */
@media (min-width: 768px) {
  .roomArea {
    width: 40vw;
    margin: 0px 5vw;
  }
}
</style>
