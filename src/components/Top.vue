<template>
  <h1>ゲーム一覧</h1>
  <ul>
    <li><router-link :to="{ name: 'Lobby', params: { gameLabel: 'minchat' } }">みんなでチャット</router-link></li>
    <li><router-link :to="{ name: 'Lobby', params: { gameLabel: 'othello' } }">ただのオセロ</router-link></li>
    <li><router-link :to="{ name: 'Lobby', params: { gameLabel: 'numberplace' } }">数独やるマン</router-link></li>
  </ul>
</template>

<script>
export default {
  name: "Top",
  props: {
    msg: String,
  },
};
</script>
