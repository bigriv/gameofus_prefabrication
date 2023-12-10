<template>
  <Header :game="state.game" :isDispLobbyLink="true" />

	<main>
    <router-view />
	</main>
</template>

<script>
import { defineComponent, reactive, computed } from "vue";
import Header from "@/parts/molecules/Header.vue";
import { useStore } from "vuex"

export default defineComponent({
  name: "Game",
  components: {
    Header
  },
  props: {},
  setup() {
    const store = useStore()
    const state = reactive({
      game: computed(() => store.state.game),
    })
    return {
      state
    }
  }
})
</script>
