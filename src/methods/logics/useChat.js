import { reactive, computed } from "vue";
import { useStore } from "vuex";
import useApi from "@/methods/logics/useApi";
import {
  getUnreadMessage,
  getAllMessage,
  postSendMessage,
} from "@/methods/api/message";
import { newObject } from "@/methods/utils/convert";

export default function useGame() {
  const store = useStore();
  const chatState = reactive({
    getForm: {
      gameId: computed(() => store.state.game?.id),
      roomId: computed(() => store.state.roomId),
      playerId: computed(() => store.state.user?.id),
    },
    playerName: computed(() => store.state.user?.name),
    messageForm: {
      gameId: computed(() => store.state.game?.id),
      roomId: computed(() => store.state.roomId),
      fromPlayerId: computed(() => store.state.user?.id),
      fromPlayerName: computed(() => store.state.user?.name),
      text: undefined,
      type: undefined,
      toMessages: [],
    },
    messages: [],
  });
  const getUnreadMessageApi = useApi({
    caller: () => getUnreadMessage(chatState.getForm),
    successFunc: (data) => {
      console.log(data);
      let tempMessages = [];
      data?.responce?.messages?.forEach((message) =>
        tempMessages.push({
          id: message.fromMessage.id,
          fromPlayerName: message.fromMessage.fromPlayerName,
          text: message.fromMessage.type,
          type: message.fromMessage.type,
        })
      );
      chatState.messages = newObject(tempMessages).reverse();
    },
  });
  const getAllMessageApi = useApi({
    caller: () => getAllMessage(chatState.getForm),
    successFunc: (data) => {
      console.log(data);
      let tempMessages = [];
      data?.responce?.messages?.forEach((message) =>
        tempMessages.push({
          id: message.fromMessage.id,
          fromPlayerName: message.fromMessage.fromPlayerName,
          text: message.fromMessage.text,
          type: message.fromMessage.type,
        })
      );
      chatState.messages = newObject(tempMessages).reverse();
    },
  });
  const postSendMessageApi = useApi({
    caller: () => postSendMessage(chatState.messageForm),
    successFunc: (data) => {
      console.log(data);
      const message = data?.responce?.message;
      chatState.messages.unshift({
        id: message.id,
        fromPlayerName: message.fromPlayerName,
        text: message.text,
        type: message.type,
      });
      console.log(chatState.messages);
    },
  });
  const setMessageForm = (sendTargets) => {
    let toPlayers = [];
    sendTargets.forEach((target) => {
      if (target.id === chatState.messageForm.fromPlayerId) {
        return;
      }
      toPlayers.push({
        toPlayerId: target.id,
      });
    });
    chatState.messageForm.toMessages = toPlayers;
    console.log(chatState.messageForm.toMessages)
  };
  return {
    chatState,
    getUnreadMessageApi,
    getAllMessageApi,
    postSendMessageApi,
    setMessageForm,
  };
}
