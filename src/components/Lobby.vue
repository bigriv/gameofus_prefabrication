<template>
  <Header :game="state.game" />

  <div class="search-data-list">
    <dl>
      <dd class="search-input">
        <TextInput
          v-model="lobbyState.searchForm.keyword"
          :type="'search'"
          :name="'roomName'"
          :placeholder="'部屋名を入力する'"
        />
      </dd>
      <dd class="search-submit">
        <Button :label="'検索'" @click="onSearch" />
      </dd>
    </dl>
  </div>

  <div class="room-data-list">
    <dl class="room-head-area">
      <dd class="room-name-area">部屋名：</dd>
      <dd class="room-action-area">
        <Button
          :label="'作成'"
          :width="'60px'"
          :height="'36px'"
          @click="onOpen('edit')"
        />
      </dd>
    </dl>
    <dl class="room-body-area">
      <dd>
        <div>
          作成者：<br />
          定員： 0 / 0<br />
          パスワード：<br />
          <div class="pc-shown">コメント：<br /></div>
        </div>
      </dd>
    </dl>

    <div v-for="room in lobbyState.rooms" :key="room">
      <dl class="room-head-area">
        <dd class="room-name-area">部屋名：{{ room.name }}</dd>
        <dd class="room-action-area">
          <Button
            :label="'参加'"
            :width="'60px'"
            :height="'36px'"
            @click="onOpen('join', room)"
          />
        </dd>
      </dl>
      <dl class="room-body-area">
        <dd>
          <div>
            作成者：{{ room.editer }}<br />
            定員： {{ room.member }} / {{ room.capacity }}<br />
            パスワード：
            <span v-if="room.password == undefined">なし</span>
            <span v-else>あり</span>
            <br />
            <div class="pc-shown">コメント：{{ room.comment }}<br /></div>
          </div>
        </dd>
      </dl>
    </div>
  </div>

  <!-- 部屋作成モーダル -->
  <div v-if="state.editModalIsOpen">
    <Modal
      v-model:dataList="state.modalOptions"
      :buttonLabel="'部屋を作る'"
      @close="onClose('edit')"
      @save="onEdit"
    />
  </div>

  <!-- 部屋参加モーダル -->
  <div v-if="state.joinModalIsOpen">
    <Modal
      v-model:dataList="state.modalOptions"
      :buttonLabel="'部屋に入る'"
      @close="onClose('join')"
      @save="onJoin"
    />
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { onMounted, reactive } from "vue";
import TextInput from "@/parts/atoms/TextInput.vue";
import Button from "@/parts/atoms/Button.vue";
import Modal from "@/parts/molecules/Modal.vue";
import Header from "@/parts/molecules/Header.vue";
import { games } from "@/methods/utils/const";
import useLobby from "@/methods/logics/useLobby";

export default defineComponent({
  name: "Lobby",
  components: { Button, TextInput, Modal, Header },
  props: {
    gameId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const {
      lobbyState,
      getRoomsApi,
      postEditRoomApi,
      postJoinRoomApi,
    } = useLobby(props.gameId);
    const state = reactive({
      game: {
        id: props.gameId,
        label: games[props.gameId - 1].label,
        name: games[props.gameId - 1].name,
      },
      editModalIsOpen: false,
      joinModalIsOpen: false,
      modalOptions: [
        {
          label: "部屋名",
          type: "text",
          required: true,
          placeholder: "部屋名を入力",
          value: undefined,
          disabled: false,
        },
        {
          label: "プレイヤー名",
          type: "text",
          required: true,
          placeholder: "プレイヤー名を入力",
          value: undefined,
        },
        {
          label: "定員",
          type: "select",
          required: true,
          value: undefined,
          disabled: false,
          options: [
            { value: "", label: "" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
            { value: 5, label: "5" },
            { value: 6, label: "6" },
            { value: 7, label: "7" },
            { value: 8, label: "8" },
            { value: 9, label: "9" },
            { value: 10, label: "10" },
          ],
        },
        {
          label: "パスワード",
          type: "text",
          required: false,
          placeholder: "パスワードを入力",
          value: undefined,
          disabled: false,
        },
        {
          label: "コメント",
          type: "textarea",
          required: false,
          placeholder: "200文字まで入力できます",
          value: undefined,
          disabled: false,
        },
      ],
    });
    const onSearch = () => {
      // 部屋検索API呼び出し
      getRoomsApi.execute();
    };
    const onOpen = (modalName, room) => {
      if (modalName === "edit") {
        state.modalOptions.forEach((option) => {
          option.value = undefined;
        });
        state.modalOptions.forEach((option) => {
          option.disabled = false;
        });
        state.editModalIsOpen = true;
      } else if (modalName === "join") {
        lobbyState.joinForm.id = room.id;
        state.modalOptions[0].value = room.name
        state.modalOptions[0].disabled = true
        state.modalOptions[1].value = undefined
        state.modalOptions[1].disabled = false
        state.modalOptions[2].value = room.capacity
        state.modalOptions[2].disabled = true
        state.modalOptions[3].value = room.password
        state.modalOptions[3].disabled = !room.password
        state.modalOptions[4].value = room.comment
        state.modalOptions[4].disabled = true
        state.joinModalIsOpen = true;
      }
    };
    const onClose = (modalName) => {
      if (modalName === "edit") {
        state.editModalIsOpen = false;
      } else if (modalName === "join") {
        state.joinModalIsOpen = false;
      }
    };
    const onEdit = async () => {
      lobbyState.editForm.name = state.modalOptions[0].value;
      lobbyState.editForm.editer = state.modalOptions[1].value;
      lobbyState.editForm.capacity = state.modalOptions[2].value;
      lobbyState.editForm.password = state.modalOptions[3].value;
      lobbyState.editForm.comment = state.modalOptions[4].value;
      // 部屋作成API呼び出し
      postEditRoomApi.execute();
    };
    const onJoin = async () => {
      lobbyState.joinForm.editer = state.modalOptions[1].value;
      lobbyState.joinForm.password = state.modalOptions[3].value;
      // 部屋参加API呼び出し
      postJoinRoomApi.execute();
    };
    onMounted(() => {
      getRoomsApi.execute();
    });
    return {
      lobbyState,
      state,
      onSearch,
      onOpen,
      onClose,
      onEdit,
      onJoin,
    };
  },
});
</script>

<style scoped>
.search-data-list {
  border-radius: 4px;
  margin-bottom: 20px;
  place-content: center;
  display: inline-block;
}

.search-data-list dl {
  display: flex;
  flex-wrap: wrap;
  place-content: center;
  width: 90vw;
}

.search-input {
  width: 50%;
  margin: 0px;
}
.search-submit {
  width: 100px;
  margin-left: 40px;
}
.room-data-list dl {
  display: inline-block;
  flex-wrap: wrap;
  place-content: center;
  width: 60vw;
}

.room-data-list dd {
  margin: 0px;
  height: 100%;
}
.room-head-area {
  margin-bottom: 0px;
  height: auto;
  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
}
.room-name-area {
  text-align: left;
  float: left;
  border: 2px solid black;
  border-radius: 10px;
  padding: 5px 10px;
  box-sizing: border-box;
}
.room-action-area {
  display: inline-block;
}
.room-body-area {
  background-color: #fff;
  text-align: left;
  font-size: 14px;
  height: 100%;
  min-height: 50px;
  line-height: 16px;
  box-sizing: border-box;
  padding: 5px 10px;
  margin-top: 0px;
  border: 2px solid black;
  border-radius: 10px;
}

/* SP用 */
@media (max-width: 767px) {
  .pc-shown {
    display: none;
  }
  .room-data-list dl {
    width: 90vw;
  }
  .room-name-area {
    width: calc(100% - 60px);
  }
  .room-body-area {
    width: 100%;
  }
}

/* PC用 */
@media (min-width: 768px) {
  .room-data-list dl {
    width: 60vw;
  }
  .room-name-area {
    width: calc(100% - 60px);
  }
  .room-body-area {
    width: 100%;
  }
}
</style>
