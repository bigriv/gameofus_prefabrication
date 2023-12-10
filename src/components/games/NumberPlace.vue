<template>
  <div class="main-panel">
    <div class="numberplace">
      <div class="all-frame">
        <dl
          v-for="(frame, frameNumber) in state.frames"
          :key="frame"
          class="frame"
        >
          <dd v-for="(cell, cellNumber) in frame" :key="cell" class="cell">
            <select
              class="number-pulldown"
              v-bind:name="'cell_' + frameNumber + '_' + cellNumber"
            >
              <option value="" style="background-color: white;"></option>
              <option value="1" style="background-color: white;">1</option>
              <option value="2" style="background-color: white;">2</option>
              <option value="3" style="background-color: white;">3</option>
              <option value="4" style="background-color: white;">4</option>
              <option value="5" style="background-color: white;">5</option>
              <option value="6" style="background-color: white;">6</option>
              <option value="7" style="background-color: white;">7</option>
              <option value="8" style="background-color: white;">8</option>
              <option value="9" style="background-color: white;">9</option>
            </select>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Othello",
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const state = reactive({
      user: {
        id: computed(() => store.state.userId),
        isEditer: true,
      },
      frames: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    });
    return {
      state,
    };
  },
});
</script>

<style scoped>
.main-panel {
  display: flex;
}
.numberplace {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60px;
}
.all-frame {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  border: 2px solid black;
  margin: 0px;
  width: 480px;
  height: 480px;
}
.frame {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  border: 2px solid black;
  margin: 0px;
}
.cell {
  border: 1px solid black;
  margin: 0px;
  text-align: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.number-pulldown {
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
  text-align-last: center;
  appearance: none;
  background-color: white;
}
.number-pulldown:hover {
  background-color: lightgray;
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
}
</style>
