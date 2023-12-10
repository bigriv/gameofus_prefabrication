import { reactive } from "vue";
import useApi from "@/methods/logics/useApi";
import { getRooms, postEditRoom, postJoinRoom } from "@/methods/api/room";
import { useStore } from "vuex";
import router from "@/router";
import { getGameById } from "@/methods/utils/const";
import { newObject } from "@/methods/utils/convert";

export default function useLobby(gameId) {
  const store = useStore();
  const lobbyState = reactive({
    searchForm: {
      gameId: gameId,
      keyword: undefined,
    },
    editForm: {
      gameId: gameId,
      name: undefined,
      editer: undefined,
      capacity: undefined,
      password: undefined,
      comment: undefined,
    },
    joinForm: {
      gameId: gameId,
      id: undefined,
      editer: undefined,
      password: undefined,
    },
    rooms: [],
  });
  const getRoomsApi = useApi({
    caller: () => getRooms(lobbyState.searchForm),
    successFunc: (data) => {
      console.log(data);
      let tempRooms = []
      data?.responce?.rooms?.forEach(room => {
        tempRooms.push({
          id: room.id,
          name: room.name,
          editer: room.editer,
          capacity: room.capacity,
          member: room.member,
          password: room.password,
          comment: room.comment,
        })
      })
      lobbyState.rooms = newObject(tempRooms);
    },
  });
  const postEditRoomApi = useApi({
    caller: () => postEditRoom(lobbyState.editForm),
    successFunc: (data) => {
      console.log(data);
      store.commit("setGame", gameId);
      store.commit("setRoomId", data?.responce?.player?.roomId);
      store.commit("setUserId", data?.responce?.player?.id);
      store.commit("setUserName", data?.responce?.player?.name);
      store.commit("setUserIsEditer", true);
      router.push({
        name: getGameById(gameId)?.label,
      });
    },
  });
  const postJoinRoomApi = useApi({
    caller: () => postJoinRoom(lobbyState.joinForm),
    successFunc: (data) => {
      console.log(data);
      store.commit("setGame", gameId);
      store.commit("setRoomId", data?.responce?.player?.roomId);
      store.commit("setUserId", data?.responce?.player?.id);
      store.commit("setUserName", data?.responce?.player?.name);
      store.commit("setUserIsEditer", false);
      router.push({
        name: getGameById(gameId)?.label,
      });
    },
  });
  return {
    lobbyState,
    getRoomsApi,
    postEditRoomApi,
    postJoinRoomApi,
  };
}
