<template>
  <v-container fluid>
    <nav-bar :drawer="drawer" />
    <app-bar @drawerEvent="drawer = !drawer" />
    <router-view />
  </v-container>
</template>

<script>
import AppBar from "../components/appbar.vue";
import NavBar from "../components/navbar";
export default {
  name: "Home",
  components: {
    AppBar,
    NavBar,
  },

  data: () => ({
    cards: ["today", "yesterday"],
    drawer: null,
  }),
};
</script>