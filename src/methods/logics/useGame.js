import { reactive, computed } from "vue";
import { useStore } from "vuex";
import useApi from "@/methods/logics/useApi";
import { getPlayers } from "@/methods/api/player";
import { newObject } from "@/methods/utils/convert";

export default function useGame() {
  const store = useStore();
  const gameState = reactive({
    getForm: {
      gameId: computed(() => store.state.game?.id),
      roomId: computed(() => store.state.roomId),
    },
    member: [],
  });
  const getPlayersApi = useApi({
    caller: () => getPlayers(gameState.getForm),
    successFunc: (data) => {
      console.log(data);
      let tempMember = [];
      data?.responce?.players?.forEach((player) =>
        tempMember.push({
          id: player.id,
          name: player.name,
        })
      );
      gameState.member = newObject(tempMember);
    },
  });
  return {
    gameState,
    getPlayersApi,
  };
}
