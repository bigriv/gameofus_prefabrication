<template>
  <div class="main-panel">
    <div class="left-panel">
      <div class="othello-field">
        <dl v-for="i in FIELD_HEIGHT" :key="i" class="othello-row">
          <dd v-for="j in FIELD_WIDTH" :key="j" class="othello-column">
            <div class="othello-cell">
              <button
                v-if="state.field[i - 1][j - 1] === BLANK"
                class="othello-cell-button"
                @click="action(j - 1, i - 1)"
              />
              <span
                v-else-if="state.field[i - 1][j - 1] === BLACK_STONE"
                class="black-stone"
              />
              <span
                v-else-if="state.field[i - 1][j - 1] === WHITE_STONE"
                class="white-stone"
              />
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="right-panel">
      <Member :member="state.member" :user="state.user" class="member-area" />
      <Chat :messages="state.messages" :height="'270px'" @send="onSendMessage" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from "vue";
import Chat from "@/parts/molecules/Chat.vue";
import Member from "@/parts/molecules/Member.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Othello",
  components: { Chat, Member },
  props: {},
  setup() {
    const store = useStore();
    const state = reactive({
      user: {
        id: computed(() => store.state.userId),
        isEditer: true,
      },
      member: [
        {
          id: 0,
          name: "よしを",
        },
        {
          id: 1,
          name: "田中",
        },
        {
          id: 2,
          name: "hiroshi",
        },
      ],
      messages: [
        {
          color: "red",
          from: "吉田",
          text: "よろしく",
        },
        {
          color: "gray",
          from: null,
          text: "開始",
        },
        {
          color: "gray",
          text: "終了",
        },
      ],
      field: [
        [BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK],
        [BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK],
        [BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK],
        [BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK],
        [BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK],
        [BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK],
        [BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK],
        [BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK],
      ],
      turn: undefined,
    });
    const BLANK = null;
    const BLACK_STONE = 0;
    const WHITE_STONE = 1;
    const FIELD_WIDTH = 8;
    const FIELD_HEIGHT = 8;
    const action = (x, y) => {
      if (isSetable(x, y)) {
        putStone(x, y);
        reverseStones(x, y);
        turnChange();
      }
    };
    const isSetable = (x, y) => {
      console.log("set check", x, y);
      for (let dir = 0; dir < 9; dir++) {
        if (dir === 4) {
          continue;
        }
        const i = y + Math.floor(dir / 3) - 1;
        const j = x + (dir % 3) - 1;
        if (!(i >= 0 && j >= 0 && i < FIELD_HEIGHT && j < FIELD_WIDTH)) {
          continue;
        }
        if (state.field[i][j] === state.turn || state.field[i][j] === BLANK) {
          continue;
        }
        let k = y + (Math.floor(dir / 3) - 1) * 2;
        let l = x + ((dir % 3) - 1) * 2;
        while (k >= 0 && l >= 0 && k < FIELD_HEIGHT && l < FIELD_WIDTH) {
          if (state.field[k][l] === BLANK) {
            break;
          }
          if (state.field[k][l] === state.turn) {
            console.log(k, l);
            return true;
          }
          k += Math.sign(i - y); // 上方向なら+1, 下方向なら-1
          l += Math.sign(j - x); // 左方向なら+1, 右方向なら-1
        }
      }
      return false;
    };
    const putStone = (x, y) => {
      state.field[y][x] = state.turn;
    };
    const reverseStones = (x, y) => {
      for (let dir = 0; dir < 9; dir++) {
        if (dir === 4) {
          continue;
        }
        const i = y + Math.floor(dir / 3) - 1;
        const j = x + (dir % 3) - 1;
        if (!(i >= 0 && j >= 0 && i < FIELD_HEIGHT && j < FIELD_WIDTH)) {
          continue;
        }
        if (state.field[i][j] === state.turn || state.field[i][j] === BLANK) {
          continue;
        }
        let k = y + (Math.floor(dir / 3) - 1) * 2;
        let l = x + ((dir % 3) - 1) * 2;
        while (k >= 0 && l >= 0 && k < FIELD_HEIGHT && l < FIELD_WIDTH) {
          if (state.field[k][l] === BLANK) {
            break;
          }
          if (state.field[k][l] === state.turn) {
            let m = k;
            let n = l;
            while (
              (Math.floor(dir / 3) === 1 || y !== m) &&
              (dir % 3 === 1 || x !== n)
            ) {
              console.log(m, n);
              state.field[m][n] = state.turn;
              m -= Math.sign(i - y); // 上方向なら-1, 下方向なら+1
              n -= Math.sign(j - x); // 左方向なら-1, 右方向なら+1
            }
            break;
          }
          k += Math.sign(i - y); // 上方向なら+1, 下方向なら-1
          l += Math.sign(j - x); // 左方向なら+1, 右方向なら-1
        }
      }
    };
    const turnChange = () => {
      state.turn = state.turn !== WHITE_STONE ? WHITE_STONE : BLACK_STONE;
      console.log("turn change", state.turn);
    };
    const onSendMessage = (message) => {
      console.log("send message", message);
      // メッセージ整形
      // チャット登録API呼び出し
    };
    onMounted(() => {
      state.field = new Array(FIELD_HEIGHT);
      for (let i = 0; i < FIELD_HEIGHT; i++) {
        state.field[i] = new Array(FIELD_WIDTH);
        for (let j = 0; j < FIELD_WIDTH; j++) {
          state.field[i][j] = BLANK;
        }
      }
      const VERTICAL_CENTER = Math.floor(FIELD_HEIGHT / 2) - 1;
      const HORIZONAL_CENTER = Math.floor(FIELD_WIDTH / 2) - 1;
      state.field[VERTICAL_CENTER][HORIZONAL_CENTER] = BLACK_STONE;
      state.field[VERTICAL_CENTER][HORIZONAL_CENTER + 1] = WHITE_STONE;
      state.field[VERTICAL_CENTER + 1][HORIZONAL_CENTER] = WHITE_STONE;
      state.field[VERTICAL_CENTER + 1][HORIZONAL_CENTER + 1] = BLACK_STONE;
      state.turn = BLACK_STONE;
    });
    return {
      state,
      action,
      onSendMessage,
      FIELD_HEIGHT,
      FIELD_WIDTH,
      BLANK,
      BLACK_STONE,
      WHITE_STONE,
    };
  },
});
</script>

<style scoped>
.main-panel {
  display: flex;
}
.othello-field {
  border: black solid 2px;
  display: inline-block;
  align-self: center;
  margin-bottom: 30px;
}
.othello-row {
  display: flex;
  margin: 0px;
}
.othello-column {
  display: flex;
  margin: 0px;
}
.othello-cell {
  width: 50px;
  height: 50px;
  border: black solid 2px;
  background-color: green;
  text-align: center;
}
.othello-cell-button {
  border: none;
  background-color: green;
  width: 50px;
  height: 50px;
  display: block;
  cursor: pointer;
}
.othello-cell :hover {
  background-color: darkgreen;
}
.black-stone {
  display: block;
  background: black;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.white-stone {
  display: block;
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* SP用 */
@media (max-width: 767px) {
  .pc-shown {
    display: none;
  }
  .main-panel {
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
  .right-panel {
    width: 50vw;
  }
  .left-panel {
    width: 50vw;
  }
  .member-area {
    margin: 0px 5vw;
  }
}
</style>
