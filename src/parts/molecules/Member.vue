<template>
  <div class="member-area member-data-list">
    <dl>
      <dt style="width: 100%;">メンバー</dt>
    </dl>
    <dl>
      <dt class="member-name-data">名前</dt>
      <dt class="member-kick-data">キック</dt>
    </dl>
    <div>
      <dl v-for="player in member" :key="player">
        <dd class="member-name-data">
          {{ player.name }}
          <span v-if="user.id == player.id">
            （自分）
          </span>
        </dd>
        <dd v-if="player.id === user.id" class="member-kick-data">
          <Button :label="'退出'" :height="'100%'" @click="onExit" />
        </dd>
        <dd v-else-if="user.isEditer" class="member-kick-data">
          <Button
            :label="'キック'"
            :height="'100%'"
            @click="onKick(player.id)"
          />
        </dd>
        <dd v-else class="member-kick-data"></dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Button from "@/parts/atoms/Button.vue";

export default defineComponent({
  components: {
    Button,
  },
  props: {
    member: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  emits: ["exit"],
  setup(props, { emit }) {
    const onExit = () => {
      console.log("exit");
      // 退出API呼び出し
      emit("exit");
    };
    const onKick = (playerId) => {
      console.log("kick", playerId);
      // 退出API呼び出し
    };
    return {
      onExit,
      onKick,
    };
  },
});
</script>

<style scoped>
.member-area {
  min-height: 340px;
  margin-bottom: 20px;
}

.member-data-list dl {
  display: flex;
  place-content: center;
  margin: 0px;
  border: solid black;
  border-width: 1px 2px 0px 0px;
}

.member-data-list dt {
  background-color: #eee;
  color: black;
  text-align: center;
  border: solid black;
  border-width: 1px 0px 1px 2px;
  padding: 2px 4px;
  font-weight: bold;
  font-size: 14px;
  margin: 0px;
  box-sizing: border-box;
}

.member-data-list dd {
  background-color: white;
  color: black;
  border: solid black;
  border-width: 0px 0px 2px 2px;
  padding: 2px 4px;
  font-size: 14px;
  margin: 0px;
  box-sizing: border-box;
}

.member-name-data {
  width: 80%;
  text-align: left;
}

.member-kick-data {
  width: 20%;
  text-align: center;
}
/* SP用 */
@media (max-width: 767px) {
  .pc-shown {
    display: none;
  }
}
</style>
