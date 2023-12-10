<template>
  <header>
    <h1>{{ game.name }}</h1>
    <nav class="pc-nav">
      <ul>
        <li><router-link :to="{ name: 'Top' }">トップに戻る</router-link></li>
        <li v-if="isDispLobbyLink">
          <router-link :to="{ name: 'Lobby', params: { gameLabel: game.label } }">
            ロビーに戻る
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Header",
  components: {},
  props: {
    game: {
      type: Object,
      required: true,
    },
    isDispLobbyLink: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
});
</script>

<style>
header {
  background-color: white;
  color: #4b4b4b;
  padding: 10px 4% 10px;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 30px;
  border-bottom: outset;
}
header h1 {
  margin: 0;
  padding: 0;
  font-size: 32px;
}
header a {
  text-decoration: none;
  color: #4b4b4b;
}
header ul {
  list-style: none;
  margin: 0;
  display: flex;
}
header li {
  margin: 0 0 0 15px;
  font-size: 14px;
}
header nav {
  margin: 0 0 0 auto;
}
/* SP用 */
@media ( max-width : 767px) {
	.pc-shown {
		display: none;
	}
  header h1 {
    text-align: left;
  }
  header ul {
    justify-content: right;
  }
}
/* PC用 */
@media ( min-width : 768px) {
  header {
    display: flex;
  }
}
</style>
