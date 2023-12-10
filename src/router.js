import { createRouter, createWebHistory } from "vue-router";
import { getGameByLabel } from "@/methods/utils/const";
import store from './store'

const routes = [
  {
    path: "/",
    name: "Top",
    component: () => import("@/components/Top.vue"),
  },
  {
    path: "/lobby/:gameLabel",
    name: "Lobby",
    component: () => import("@/components/Lobby.vue"),
    props: (route) => ({ gameId: getGameByLabel(route.params.gameLabel)?.id }),
  },
  {
    path: "/game",
    name: "Game",
    component: () => import("@/components/Game.vue"),
    children: [
      {
        path: "/game/minchat",
        name: "minchat",
        component: () => import("@/components/games/MinChat.vue"),
        meta: { needViaLobby: true },
      },
      {
        path: "/game/othello",
        name: "othello",
        component: () => import("@/components/games/Othello.vue"),
        meta: { needViaLobby: true },
      },
      {
        path: "/game/numberplace",
        name: "numberplace",
        component: () => import("@/components/games/NumberPlace.vue"),
      },
    ],
  },
  {
    path: "/test/atoms",
    name: "AtomsTest",
    component: () => import("@/components/tests/AtomsView.vue"),
  },
  {
    path: "/test/modal",
    name: "ModalTest",
    component: () => import("@/components/tests/ModalTest.vue"),
  },
  {
    path: "/test/api",
    name: "ApiTest",
    component: () => import("@/components/tests/ApiTest.vue"),
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: () => import("@/components/NotFound.vue"),
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: () => import("@/components/Forbidden.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;

router.beforeEach((to) => {
  if (to.meta.needViaLobby) {
    if (!store.state.game.id || !store.state.roomId) {
      return { name: "Forbidden" };
    }
  }
});

router.afterEach(() => {
  if (window !== undefined) {
    window.scrollTo(0, 0);
  }
});
