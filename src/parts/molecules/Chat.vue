<template>
  <div class="chat-area chat-data-list">
    <div v-if="isSelectableTo">
      <dl>
        <dd style="width: 100%;">
          <TextInput v-model="state.message.text" class="input-chat-area" />
        </dd>
      </dl>
      <dl>
        <dd style="width: 100%;">
          <SelectBox
            v-model="state.message.to"
            :options="state.options"
            class="input-chat-area"
          />
        </dd>
        <dd>
          <span class="conjunction">に</span>
        </dd>
        <dd style="width: 80px;">
          <Button label="送信" @click="sendMessage" />
        </dd>
      </dl>
    </div>
    <div v-else>
      <dl>
        <dd style="width: 100%;">
          <TextInput v-model="state.message.text" class="input-chat-area" />
        </dd>
        <dd style="width: 80px;">
          <Button label="送信" @click="sendMessage" />
        </dd>
      </dl>
    </div>
    <dl class="outputchat-area" v-bind:style="'height:' + height">
      <dd>
        <div v-for="message in messages" :key="message">
          <span v-if="message.fromPlayerName" :style="'color:' + message.type">
            {{ message.fromPlayerName }}「{{ message.text }}」
          </span>
          <span v-else :style="'color:' + message.color">
            システム：{{ message.text }}
          </span>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "vue";
import TextInput from "@/parts/atoms/TextInput.vue";
import SelectBox from "@/parts/atoms/SelectBox.vue";
import Button from "@/parts/atoms/Button.vue";

export default defineComponent({
  components: { TextInput, SelectBox, Button },
  props: {
    isSelectableTo: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      default: "580px",
    },
  },
  emits: ["send"],
  setup(props, { emit }) {
    const state = reactive({
      member: [],
      options: [{ value: "all", label: "全員" }],
      message: {
        text: undefined,
        to: 'all',
      },
    });
    const sendMessage = () => {
      console.log("sendMessage");
      emit("send", state.message);
    };
    onMounted(() => {
      makeOptions();
    });
    const makeOptions = () => {
      for (const player of state.member) {
        state.options.push({
          value: player.id,
          label: player.name,
        });
      }
    };
    return {
      state,
      sendMessage,
    };
  },
});
</script>

<style scoped>
.conjunction {
  padding-left: 6px;
  padding-right: 6px;
  position: relative;
  top: 6px;
}
.chat-data-list {
  display: block;
}
.chat-data-list dl {
  display: flex;
  margin-top: 0px;
}

.chat-data-list dd {
  margin: 0px;
}

.input-chat-area {
  height: 32px;
  width: 100%;
  border: 2px solid black;
  box-sizing: border-box;
  padding: 5px 10px;
  border-radius: 10px;
}
.outputchat-area dd div:first-child {
  font-weight: bold;
}
.outputchat-area span {
  display: block;
  width: 100%;
  font-size: 14px;
  margin-block-start: 0em;
  margin-block-end: 0em;
  color: black;
  margin-top: 4px;
  margin-left: 6px;
  line-height: 1em;
  text-align: left;
}
/* SP用 */
@media (max-width: 767px) {
  .pc-shown {
    display: none;
  }
  .chat-area {
    width: 100vw;
    height: 24vh;
    position: fixed;
    left: 0px;
    bottom: 0px;
    z-index: 110;
    min-height: 112px;
    background: white;
  }
  .outputchat-area {
    width: 100%;
    height: 18vh;
    min-height: 80px;
    background-color: white;
    border: 4px solid black;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  .chat-area dl {
    margin-bottom: 0px;
  }
}

/* PC用 */
@media (min-width: 768px) {
  .chat-area {
    width: 40vw;
    margin: 0px 5vw;
  }
  .outputchat-area {
    background-color: white;
    border: 4px solid black;
    box-sizing: border-box;
    overflow-y: scroll;
  }
}
</style>
