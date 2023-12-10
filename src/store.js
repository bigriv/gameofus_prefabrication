import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { games } from "@/methods/utils/const";

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    game: {
      id: null,
      label: null,
      name: null,
    },
    roomId: null,
    user: {
      id: null,
      name: null,
      isEditer: null,
    },
  },
  mutations: {
    setGame: (state, gameId) => {
      state.game = games[gameId - 1];
    },
    setRoomId: (state, roomId) => {
      state.roomId = roomId;
    },
    setUserId: (state, id) => {
      state.user.id = id;
    },
    setUserName: (state, name) => {
      state.user.name = name;
    },
    setUserIsEditer: (state, isEditer) => {
      state.user.isEditer = isEditer;
    },
    destruction: (state) => {
      state.game = {
        id: null,
        label: null,
        name: null,
      };
      state.roomId = null;
      state.user = {
        id: null,
        name: null,
        isEditer: null,
      };
    },
  },
});
